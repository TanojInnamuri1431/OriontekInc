
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/loading-spinner';
import { employeeFormSchema } from '@/lib/validations';
import { EmployeeFormData } from '@/lib/types';
import { DEPARTMENTS, EMPLOYEE_STATUS } from '@/lib/constants';

interface EmployeeFormProps {
  initialData?: EmployeeFormData;
  isEdit?: boolean;
  employeeId?: string;
}

export default function EmployeeForm({ initialData, isEdit = false, employeeId }: EmployeeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeFormSchema),
    defaultValues: initialData || {
      startDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    },
  });

  const watchedDepartment = watch('department');

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      const url = isEdit ? `/api/hr/employees/${employeeId}` : '/api/hr/employees';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(isEdit ? 'Employee updated successfully!' : 'Employee created successfully!');
        router.push('/hr/employees');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save employee');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Basic personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                {...register('employeeId')}
                className={errors.employeeId ? 'border-red-500' : ''}
                placeholder="EMP001"
              />
              {errors.employeeId && (
                <p className="text-sm text-red-500 mt-1">{errors.employeeId.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="john.doe@oriontekinc.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Employment Information</CardTitle>
          <CardDescription>
            Job-related details and organizational information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={watchedDepartment}
                onValueChange={(value) => setValue('department', value)}
              >
                <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-sm text-red-500 mt-1">{errors.department.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                {...register('position')}
                className={errors.position ? 'border-red-500' : ''}
                placeholder="Senior Developer"
              />
              {errors.position && (
                <p className="text-sm text-red-500 mt-1">{errors.position.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate')}
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500 mt-1">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                {...register('salary')}
                className={errors.salary ? 'border-red-500' : ''}
                placeholder="75000"
              />
              {errors.salary && (
                <p className="text-sm text-red-500 mt-1">{errors.salary.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
          <CardDescription>
            Residential address and location details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register('address')}
                className={errors.address ? 'border-red-500' : ''}
                placeholder="123 Main Street, Apt 4B"
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register('city')}
                className={errors.city ? 'border-red-500' : ''}
                placeholder="Atlanta"
              />
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                {...register('state')}
                className={errors.state ? 'border-red-500' : ''}
                placeholder="Georgia"
              />
              {errors.state && (
                <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                {...register('country')}
                className={errors.country ? 'border-red-500' : ''}
                placeholder="United States"
              />
              {errors.country && (
                <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                {...register('zipCode')}
                className={errors.zipCode ? 'border-red-500' : ''}
                placeholder="30024"
              />
              {errors.zipCode && (
                <p className="text-sm text-red-500 mt-1">{errors.zipCode.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>
            Emergency contact information for urgent situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                {...register('emergencyContact')}
                className={errors.emergencyContact ? 'border-red-500' : ''}
                placeholder="Jane Doe"
              />
              {errors.emergencyContact && (
                <p className="text-sm text-red-500 mt-1">{errors.emergencyContact.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                {...register('emergencyPhone')}
                className={errors.emergencyPhone ? 'border-red-500' : ''}
                placeholder="+1 (555) 987-6543"
              />
              {errors.emergencyPhone && (
                <p className="text-sm text-red-500 mt-1">{errors.emergencyPhone.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/hr/employees')}
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
              {isEdit ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEdit ? 'Update Employee' : 'Create Employee'
          )}
        </Button>
      </div>
    </form>
  );
}
