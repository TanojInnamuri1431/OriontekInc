
'use client';

import { useEffect, useState } from 'react';
import { Clock, User, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  type: 'employee' | 'document' | 'timesheet' | 'system';
  action: string;
  description: string;
  timestamp: Date;
  user?: string;
  status?: 'success' | 'pending' | 'error';
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for recent activities
    const fetchActivities = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleActivities: Activity[] = [
          {
            id: '1',
            type: 'employee',
            action: 'Employee Added',
            description: 'John Smith was added to the Engineering department',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            user: 'Admin',
            status: 'success'
          },
          {
            id: '2',
            type: 'timesheet',
            action: 'Timesheet Submitted',
            description: 'Sarah Johnson submitted timesheet for this week',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            user: 'Sarah Johnson',
            status: 'pending'
          },
          {
            id: '3',
            type: 'document',
            action: 'Document Uploaded',
            description: 'Employee handbook updated and uploaded',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            user: 'Admin',
            status: 'success'
          },
          {
            id: '4',
            type: 'timesheet',
            action: 'Timesheet Approved',
            description: 'Raj Patel\'s timesheet approved by manager',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            user: 'Manager',
            status: 'success'
          },
          {
            id: '5',
            type: 'system',
            action: 'System Update',
            description: 'HR Portal system updated to version 2.1',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            user: 'System',
            status: 'success'
          }
        ];
        
        setActivities(sampleActivities);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'employee':
        return User;
      case 'document':
        return FileText;
      case 'timesheet':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 text-xs">Success</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 text-xs">Error</Badge>;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and actions in the HR system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-start space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest updates and actions in the HR system
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No recent activity found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
                    <IconComponent className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{formatTimestamp(activity.timestamp)}</span>
                      {activity.user && (
                        <>
                          <span className="mx-1">•</span>
                          <span>by {activity.user}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
