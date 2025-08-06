
import { Clock, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import TimesheetList from '@/components/hr/timesheet-list';
import TimesheetFilters from '@/components/hr/timesheet-filters';
import Link from 'next/link';

export default function TimesheetsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      <PageHeader
        title="Timesheet Management"
        description="Manage employee timesheets and track working hours"
        icon={Clock}
      >
        <Button asChild>
          <Link href="/hr/timesheets/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Timesheet
          </Link>
        </Button>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search timesheets..."
                  className="pl-10"
                />
              </div>
            </div>
            <TimesheetFilters />
          </div>
        </div>

        {/* Timesheet List */}
        <TimesheetList />
      </div>

      <Footer />
    </div>
  );
}
