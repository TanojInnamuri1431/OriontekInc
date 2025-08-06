
import { Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import TimesheetForm from '@/components/hr/timesheet-form';
import Link from 'next/link';

export default function NewTimesheetPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title="Add Timesheet"
        description="Record working hours for an employee"
        icon={Clock}
      >
        <Button variant="outline" asChild>
          <Link href="/hr/timesheets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Timesheets
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TimesheetForm />
      </div>

      <Footer />
    </div>
  );
}
