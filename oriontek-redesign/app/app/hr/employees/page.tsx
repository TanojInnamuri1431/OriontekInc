
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import EmployeeList from '@/components/hr/employee-list';
import { authOptions } from '@/lib/auth-config';

export default async function EmployeesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/hr/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isHRSection />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                <p className="text-sm text-gray-600">
                  Manage employee information and records
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link href="/hr/employees/new">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Filter employees by criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Search</label>
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>All Departments</option>
                      <option>Engineering</option>
                      <option>HR</option>
                      <option>Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employee List */}
          <div className="lg:col-span-3">
            <EmployeeList />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
