
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import EmployeeForm from '@/components/hr/employee-form';
import { prisma } from '@/lib/db';
import Link from 'next/link';

interface EditEmployeePageProps {
  params: {
    id: string;
  };
}

async function getEmployee(id: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    return employee;
  } catch (error) {
    return null;
  }
}

export default async function EditEmployeePage({ params }: EditEmployeePageProps) {
  const employee = await getEmployee(params.id);
  
  if (!employee) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title={`Edit ${employee.firstName} ${employee.lastName}`}
        description={`Update employee information for ${employee.employeeId}`}
        icon={Edit}
      >
        <Button variant="outline" asChild>
          <Link href={`/hr/employees/${employee.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employee
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmployeeForm
          initialData={{
            employeeId: employee.employeeId,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone || '',
            department: employee.department,
            position: employee.position,
            startDate: employee.startDate.toISOString().split('T')[0],
            endDate: employee.endDate ? employee.endDate.toISOString().split('T')[0] : '',
            status: employee.status,
            salary: employee.salary || undefined,
            address: employee.address || '',
            city: employee.city || '',
            state: employee.state || '',
            country: employee.country || '',
            zipCode: employee.zipCode || '',
            emergencyContact: employee.emergencyContact || '',
            emergencyPhone: employee.emergencyPhone || '',
          }}
          isEdit={true}
          employeeId={employee.id}
        />
      </div>

      <Footer />
    </div>
  );
}
