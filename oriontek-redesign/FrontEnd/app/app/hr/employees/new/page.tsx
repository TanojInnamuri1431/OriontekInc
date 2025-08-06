
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import EmployeeForm from '@/components/hr/employee-form';
import Link from 'next/link';

export default function NewEmployeePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title="Add New Employee"
        description="Create a new employee record with all required information"
        icon={UserPlus}
      >
        <Button variant="outline" asChild>
          <Link href="/hr/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmployeeForm />
      </div>

      <Footer />
    </div>
  );
}
