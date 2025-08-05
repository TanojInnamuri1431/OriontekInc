
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { prisma } from '@/lib/db';
import { formatDate } from 'date-fns';

interface TimesheetDetailPageProps {
  params: {
    id: string;
  };
}

async function getTimesheet(id: string) {
  try {
    const timesheet = await prisma.timesheet.findUnique({
      where: { id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            employeeId: true,
            department: true,
            position: true,
          },
        },
      },
    });
    return timesheet;
  } catch (error) {
    return null;
  }
}

export default async function TimesheetDetailPage({ params }: TimesheetDetailPageProps) {
  const timesheet = await getTimesheet(params.id);
  
  if (!timesheet) {
    notFound();
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title="Timesheet Details"
        description={`${timesheet.employee.firstName} ${timesheet.employee.lastName} - ${formatDate(new Date(timesheet.date), 'MMMM dd, yyyy')}`}
        icon={Clock}
      >
        <Button variant="outline" asChild>
          <Link href="/hr/timesheets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Timesheets
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timesheet Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Timesheet Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Work Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <span className="text-sm font-medium text-gray-500">Date:</span>
                          <p className="text-sm text-gray-900">
                            {formatDate(new Date(timesheet.date), 'MMMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Hours Worked:</span>
                        <p className="text-sm text-gray-900">{timesheet.hoursWorked} hours</p>
                      </div>
                      {timesheet.project && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Project:</span>
                          <p className="text-sm text-gray-900">{timesheet.project}</p>
                        </div>
                      )}
                      {timesheet.taskType && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Task Type:</span>
                          <p className="text-sm text-gray-900">{timesheet.taskType}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Status Information</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Status:</span>
                        <Badge variant={getStatusBadgeVariant(timesheet.status)} className="ml-2">
                          {timesheet.status}
                        </Badge>
                      </div>
                      {timesheet.approvedBy && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Approved By:</span>
                          <p className="text-sm text-gray-900">{timesheet.approvedBy}</p>
                        </div>
                      )}
                      {timesheet.approvedAt && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Approved At:</span>
                          <p className="text-sm text-gray-900">
                            {formatDate(new Date(timesheet.approvedAt), 'MMMM dd, yyyy HH:mm')}
                          </p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-500">Created:</span>
                        <p className="text-sm text-gray-900">
                          {formatDate(new Date(timesheet.createdAt), 'MMMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {timesheet.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Work Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{timesheet.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Employee Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Employee Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Employee:</span>
                    <p className="text-sm text-gray-900">
                      {timesheet.employee.firstName} {timesheet.employee.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Employee ID:</span>
                    <p className="text-sm text-gray-900">{timesheet.employee.employeeId}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Department:</span>
                    <p className="text-sm text-gray-900">{timesheet.employee.department}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Position:</span>
                    <p className="text-sm text-gray-900">{timesheet.employee.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/hr/employees/${timesheet.employee.id}`}>
                      <User className="mr-2 h-4 w-4" />
                      View Employee
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/hr/timesheets">
                      View All Timesheets
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timesheet Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{timesheet.hoursWorked}</div>
                    <div className="text-sm text-gray-600">Hours Worked</div>
                  </div>
                  <div className="text-center">
                    <Badge variant={getStatusBadgeVariant(timesheet.status)}>
                      {timesheet.status}
                    </Badge>
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
