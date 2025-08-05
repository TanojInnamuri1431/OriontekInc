
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
import { documentFormSchema } from '@/lib/validations';
import { DocumentFormData, Employee } from '@/lib/types';
import { DOCUMENT_CATEGORIES } from '@/lib/constants';

export default function DocumentUploadForm() {
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
  } = useForm<DocumentFormData>({
    resolver: yupResolver(documentFormSchema),
  });

  const watchedEmployee = watch('employeeId');
  const watchedCategory = watch('category');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/hr/employees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoadingEmployees(false);
    }
  };

  const onSubmit = async (data: DocumentFormData) => {
    setIsSubmitting(true);
    try {
      // Note: In a real application, you would handle file upload here
      // For now, we'll just create a placeholder document entry
      const response = await fetch('/api/hr/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          fileName: 'placeholder.pdf',
          filePath: '/documents/placeholder.pdf',
          fileSize: 1024,
          fileType: 'application/pdf',
        }),
      });

      if (response.ok) {
        toast.success('Document uploaded successfully!');
        router.push('/hr/documents');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload document');
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
          <CardTitle>Document Information</CardTitle>
          <CardDescription>
            Upload a new document for an employee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Document Title *</Label>
              <Input
                id="title"
                {...register('title')}
                className={errors.title ? 'border-red-500' : ''}
                placeholder="Employment Contract"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={watchedCategory}
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

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
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                {...register('expiryDate')}
                className={errors.expiryDate ? 'border-red-500' : ''}
              />
              {errors.expiryDate && (
                <p className="text-sm text-red-500 mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                className={errors.description ? 'border-red-500' : ''}
                placeholder="Document description..."
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="file">File Upload</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="cursor-pointer"
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">
                File upload functionality would be implemented here in a real application
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/hr/documents')}
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
              Uploading...
            </>
          ) : (
            'Upload Document'
          )}
        </Button>
      </div>
    </form>
  );
}
