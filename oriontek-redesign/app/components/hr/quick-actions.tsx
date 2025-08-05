
'use client';

import Link from 'next/link';
import { UserPlus, FileText, Clock, Bell, Upload, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuickActions() {
  const actions = [
    {
      title: 'Add Employee',
      description: 'Add a new employee to the system',
      icon: UserPlus,
      href: '/hr/employees/new',
      color: 'blue'
    },
    {
      title: 'Upload Document',
      description: 'Upload employee documents',
      icon: Upload,
      href: '/hr/documents/new',
      color: 'green'
    },
    {
      title: 'Review Timesheets',
      description: 'Approve pending timesheets',
      icon: Clock,
      href: '/hr/timesheets',
      color: 'yellow'
    },
    {
      title: 'Notifications',
      description: 'View system notifications',
      icon: Bell,
      href: '/hr/notifications',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string; hover: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', hover: 'hover:bg-green-100' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', hover: 'hover:bg-yellow-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:bg-purple-100' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          Common HR tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const colors = getColorClasses(action.color);
          return (
            <Button
              key={index}
              variant="ghost"
              asChild
              className={`w-full justify-start p-4 h-auto ${colors.bg} ${colors.hover} ${colors.border} border transition-all duration-200`}
            >
              <Link href={action.href}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <action.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          );
        })}
        
        {/* Additional Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-3">Today's Summary</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">New Timesheets</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending Approvals</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Employees</span>
              <span className="font-medium">5</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
