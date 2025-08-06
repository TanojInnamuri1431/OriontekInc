
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Calendar, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { prisma } from '@/lib/db';
import { formatDate, isAfter, addDays } from 'date-fns';

interface DocumentDetailPageProps {
  params: {
    id: string;
  };
}

async function getDocument(id: string) {
  try {
    const document = await prisma.document.findUnique({
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
    return document;
  } catch (error) {
    return null;
  }
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const document = await getDocument(params.id);
  
  if (!document) {
    notFound();
  }

  const getExpiryStatus = (expiryDate: Date | null) => {
    if (!expiryDate) return null;
    
    const now = new Date();
    const expiry = new Date(expiryDate);
    const thirtyDaysFromNow = addDays(now, 30);
    
    if (isAfter(now, expiry)) {
      return { status: 'expired', variant: 'error' as const };
    } else if (isAfter(thirtyDaysFromNow, expiry)) {
      return { status: 'expiring', variant: 'warning' as const };
    }
    return { status: 'valid', variant: 'success' as const };
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const expiryStatus = getExpiryStatus(document.expiryDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title={document.title}
        description={`Document for ${document.employee.firstName} ${document.employee.lastName}`}
        icon={FileText}
      >
        <div className="flex space-x-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" asChild>
            <Link href="/hr/documents">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documents
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Document Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Title:</span>
                        <p className="text-sm text-gray-900">{document.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Category:</span>
                        <Badge variant="outline" className="ml-2">
                          {document.category}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">File Name:</span>
                        <p className="text-sm text-gray-900">{document.fileName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">File Size:</span>
                        <p className="text-sm text-gray-900">{formatFileSize(document.fileSize)}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">File Type:</span>
                        <p className="text-sm text-gray-900">{document.fileType}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Dates</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <span className="text-sm font-medium text-gray-500">Upload Date:</span>
                          <p className="text-sm text-gray-900">
                            {formatDate(new Date(document.uploadDate), 'MMMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      {document.expiryDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <span className="text-sm font-medium text-gray-500">Expiry Date:</span>
                            <p className="text-sm text-gray-900">
                              {formatDate(new Date(document.expiryDate), 'MMMM dd, yyyy')}
                            </p>
                            {expiryStatus && (
                              <Badge variant={expiryStatus.variant} className="ml-2">
                                {expiryStatus.status === 'expired' && 'Expired'}
                                {expiryStatus.status === 'expiring' && 'Expiring Soon'}
                                {expiryStatus.status === 'valid' && 'Valid'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {document.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{document.description}</p>
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
                      {document.employee.firstName} {document.employee.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Employee ID:</span>
                    <p className="text-sm text-gray-900">{document.employee.employeeId}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Department:</span>
                    <p className="text-sm text-gray-900">{document.employee.department}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Position:</span>
                    <p className="text-sm text-gray-900">{document.employee.position}</p>
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
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Document
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/hr/employees/${document.employee.id}`}>
                      <User className="mr-2 h-4 w-4" />
                      View Employee
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/hr/documents">
                      View All Documents
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document Status */}
            <Card>
              <CardHeader>
                <CardTitle>Document Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Uploaded by</div>
                    <div className="font-medium">{document.uploadedBy}</div>
                  </div>
                  {expiryStatus && (
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Status</div>
                      <Badge variant={expiryStatus.variant} className="mt-1">
                        {expiryStatus.status === 'expired' && 'Expired'}
                        {expiryStatus.status === 'expiring' && 'Expiring Soon'}
                        {expiryStatus.status === 'valid' && 'Valid'}
                      </Badge>
                    </div>
                  )}
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
