
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/loading-spinner';
import { timesheetFormSchema } from '@/lib/validations';
import { TimesheetFormData, Employee } from '@/lib/types';
import { TASK_TYPES } from '@/lib/constants';

export default function TimesheetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TimesheetFormData>({
    resolver: yupResolver(timesheetFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const watchedEmployee = watch('employeeId');
  const watchedTaskType = watch('taskType');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/hr/employees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data.filter((emp: Employee) => emp.status === 'Active'));
      }
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoadingEmployees(false);
    }
  };

  const onSubmit = async (data: TimesheetFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/hr/timesheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Timesheet created successfully!');
        router.push('/hr/timesheets');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create timesheet');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Timesheet Information</CardTitle>
          <CardDescription>
            Record working hours for an employee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employeeId">Employee *</Label>
              <Select
                value={watchedEmployee}
                onValueChange={(value) => setValue('employeeId', value)}
              >
                <SelectTrigger className={errors.employeeId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {loadingEmployees ? (
                    <div className="p-4">
                      <LoadingSpinner size="sm" />
                    </div>
                  ) : (
                    employees.map(employee => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName} - {employee.employeeId}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.employeeId && (
                <p className="text-sm text-red-500 mt-1">{errors.employeeId.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="hoursWorked">Hours Worked *</Label>
              <Input
                id="hoursWorked"
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                {...register('hoursWorked')}
                className={errors.hoursWorked ? 'border-red-500' : ''}
                placeholder="8.0"
              />
              {errors.hoursWorked && (
                <p className="text-sm text-red-500 mt-1">{errors.hoursWorked.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="taskType">Task Type</Label>
              <Select
                value={watchedTaskType}
                onValueChange={(value) => setValue('taskType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_TYPES.map(taskType => (
                    <SelectItem key={taskType} value={taskType}>{taskType}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                {...register('project')}
                placeholder="Project Alpha"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Description of work performed..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/hr/timesheets')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Creating...
            </>
          ) : (
            'Create Timesheet'
          )}
        </Button>
      </div>
    </form>
  );
}
