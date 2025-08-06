
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { Users, FileText, Clock, Bell, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import DashboardStats from '@/components/hr/dashboard-stats';
import RecentActivity from '@/components/hr/recent-activity';
import QuickActions from '@/components/hr/quick-actions';
import { authOptions } from '@/lib/auth-config';

export default async function HRDashboard() {
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
                <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {session.user?.name || 'Admin'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Badge variant="success" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                System Status
              </CardTitle>
              <CardDescription>
                Current system health and operational status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">Database</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">API</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">File Storage</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Available</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">Notifications</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Working</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
