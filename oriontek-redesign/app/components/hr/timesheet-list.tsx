
'use client';

import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const mockTimesheets = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    hoursWorked: 8,
    project: 'Oriontek Website Redesign',
    taskType: 'Development',
    status: 'Approved',
    description: 'Frontend development work',
    employeeId: '1'
  }
];

export default function TimesheetList() {
  const [timesheets] = useState(mockTimesheets);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {timesheets.map((timesheet) => (
        <Card key={timesheet.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{timesheet.date.toLocaleDateString()}</h3>
                  <p className="text-sm text-gray-600">{timesheet.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{timesheet.hoursWorked} hours</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{timesheet.project}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{timesheet.taskType}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {getStatusBadge(timesheet.status)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
