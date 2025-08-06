
'use client';

import { useState } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const mockNotifications = [
  {
    id: '1',
    title: 'Welcome to HR Portal',
    message: 'The new HR portal system is now live. Please explore the features.',
    type: 'Info',
    isRead: false,
    createdAt: new Date('2024-01-15T10:00:00')
  }
];

export default function NotificationList() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'Success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'Error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-blue-600' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{notification.type}</Badge>
                    {!notification.isRead && (
                      <Badge className="bg-blue-100 text-blue-800">New</Badge>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {notification.createdAt.toLocaleDateString()} at {notification.createdAt.toLocaleTimeString()}
                  </span>
                  {!notification.isRead && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
