
import * as yup from 'yup';

export const contactFormSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  company: yup.string().required('Company is required').min(2, 'Company must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

export const employeeFormSchema = yup.object({
  employeeId: yup.string().required('Employee ID is required').min(3, 'Employee ID must be at least 3 characters'),
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().optional(),
  department: yup.string().required('Department is required'),
  position: yup.string().required('Position is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().optional(),
  status: yup.string().required('Status is required'),
  salary: yup.number().optional().min(0, 'Salary must be positive'),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  country: yup.string().optional(),
  zipCode: yup.string().optional(),
  emergencyContact: yup.string().optional(),
  emergencyPhone: yup.string().optional(),
});

export const timesheetFormSchema = yup.object({
  employeeId: yup.string().required('Employee is required'),
  date: yup.string().required('Date is required'),
  hoursWorked: yup.number().required('Hours worked is required').min(0.5, 'Minimum 0.5 hours').max(24, 'Maximum 24 hours'),
  description: yup.string().optional(),
  project: yup.string().optional(),
  taskType: yup.string().optional(),
});

export const documentFormSchema = yup.object({
  title: yup.string().required('Title is required').min(2, 'Title must be at least 2 characters'),
  description: yup.string().optional(),
  category: yup.string().required('Category is required'),
  employeeId: yup.string().required('Employee is required'),
  expiryDate: yup.string().optional(),
});
