
// NextAuth type extensions
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role?: string;
      step?: string;
    }
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role?: string;
    step?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    step?: string;
  }
}

// Application types
export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  department: string;
  position: string;
  startDate: Date;
  endDate?: Date | null;
  status: string;
  salary?: number | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  emergencyContact?: string | null;
  emergencyPhone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  description?: string | null;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  uploadDate: Date;
  expiryDate?: Date | null;
  isExpired: boolean;
  category: string;
  employeeId: string;
  uploadedBy: string;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  date: Date;
  hoursWorked: number;
  description?: string | null;
  project?: string | null;
  taskType?: string | null;
  status: string;
  approvedBy?: string | null;
  approvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  employee?: Employee;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  targetId?: string | null;
  targetType?: string | null;
  createdAt: Date;
  readAt?: Date | null;
}

export interface OTPVerification {
  id: string;
  identifier: string;
  email: string;
  otp: string;
  purpose: string;
  verified: boolean;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
  verifiedAt?: Date | null;
}

// Form types
export interface EmployeeFormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  startDate: string;
  endDate?: string;
  status: string;
  salary?: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface TimesheetFormData {
  employeeId: string;
  date: string;
  hoursWorked: number;
  description?: string;
  project?: string;
  taskType?: string;
}

export interface DocumentFormData {
  title: string;
  description?: string;
  category: string;
  employeeId: string;
  expiryDate?: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Filter and search types
export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: string;
  position?: string;
}

export interface TimesheetFilters {
  search?: string;
  employeeId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  project?: string;
}

export interface DocumentFilters {
  search?: string;
  category?: string;
  employeeId?: string;
  isExpired?: boolean;
}
