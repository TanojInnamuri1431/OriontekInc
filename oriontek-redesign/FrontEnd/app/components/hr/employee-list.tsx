
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const mockEmployees = [
  {
    id: '1',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@oriontekinc.com',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    status: 'Active',
    phone: '+1-234-567-8901'
  }
];

export default function EmployeeList() {
  const [employees] = useState(mockEmployees);

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Terminated': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {employees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{employee.department}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{employee.employeeId}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {getStatusBadge(employee.status)}
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/hr/employees/${employee.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/hr/employees/${employee.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
