
'use client';

import { useEffect, useState } from 'react';
import { Users, FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsData {
  totalEmployees: number;
  activeEmployees: number;
  pendingTimesheets: number;
  totalDocuments: number;
  recentActivity: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    totalEmployees: 0,
    activeEmployees: 0,
    pendingTimesheets: 0,
    totalDocuments: 0,
    recentActivity: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for stats
    const fetchStats = async () => {
      try {
        // In a real implementation, this would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStats({
          totalEmployees: 5,
          activeEmployees: 5,
          pendingTimesheets: 8,
          totalDocuments: 12,
          recentActivity: 15
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Employees',
      value: stats.activeEmployees,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Timesheets',
      value: stats.pendingTimesheets,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Total Documents',
      value: stats.totalDocuments,
      icon: FileText,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-12" />
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 ${stat.bgColor} rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                Updated just now
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
