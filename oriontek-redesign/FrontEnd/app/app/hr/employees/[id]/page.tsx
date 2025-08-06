
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Building2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { prisma } from '@/lib/db';
import { formatDate } from 'date-fns';

interface EmployeeDetailPageProps {
  params: {
    id: string;
  };
}

async function getEmployee(id: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        documents: {
          orderBy: { uploadDate: 'desc' },
          take: 5,
        },
        timesheets: {
          orderBy: { date: 'desc' },
          take: 5,
        },
      },
    });
    return employee;
  } catch (error) {
    return null;
  }
}

export default async function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  const employee = await getEmployee(params.id);
  
  if (!employee) {
    notFound();
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'warning';
      case 'Terminated':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title={`${employee.firstName} ${employee.lastName}`}
        description={`Employee ID: ${employee.employeeId} • ${employee.department}`}
        icon={User}
      >
        <div className="flex space-x-2">
          <Button asChild>
            <Link href={`/hr/employees/${employee.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Employee
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/hr/employees">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Employees
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <a href={`mailto:${employee.email}`} className="text-blue-600 hover:text-blue-800">
                          {employee.email}
                        </a>
                      </div>
                      {employee.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <a href={`tel:${employee.phone}`} className="text-blue-600 hover:text-blue-800">
                            {employee.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                    <div className="text-sm text-gray-600">
                      {employee.address && (
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p>{employee.address}</p>
                            <p>
                              {employee.city && `${employee.city}, `}
                              {employee.state && `${employee.state} `}
                              {employee.zipCode}
                            </p>
                            <p>{employee.country}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  Employment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Position Details</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Department:</span>
                        <p className="text-sm text-gray-900">{employee.department}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Position:</span>
                        <p className="text-sm text-gray-900">{employee.position}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <Badge variant={getStatusBadgeVariant(employee.status)} className="ml-2">
                          {employee.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Employment Dates</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <span className="text-sm font-medium text-gray-500">Start Date:</span>
                          <p className="text-sm text-gray-900">
                            {formatDate(new Date(employee.startDate), 'MMMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      {employee.endDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <span className="text-sm font-medium text-gray-500">End Date:</span>
                            <p className="text-sm text-gray-900">
                              {formatDate(new Date(employee.endDate), 'MMMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            {(employee.emergencyContact || employee.emergencyPhone) && (
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {employee.emergencyContact && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Name:</span>
                        <p className="text-sm text-gray-900">{employee.emergencyContact}</p>
                      </div>
                    )}
                    {employee.emergencyPhone && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Phone:</span>
                        <p className="text-sm text-gray-900">{employee.emergencyPhone}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href={`/hr/employees/${employee.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Employee
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/hr/documents">
                      View Documents
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/hr/timesheets">
                      View Timesheets
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{employee.documents?.length || 0}</div>
                    <div className="text-sm text-gray-600">Documents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{employee.timesheets?.length || 0}</div>
                    <div className="text-sm text-gray-600">Timesheets</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
