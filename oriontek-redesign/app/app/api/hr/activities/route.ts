
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get recent activities from different tables
    const [recentEmployees, recentDocuments, recentTimesheets, recentNotifications] = await Promise.all([
      prisma.employee.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.document.findMany({
        take: 3,
        orderBy: { uploadDate: 'desc' },
        select: {
          id: true,
          title: true,
          uploadDate: true,
          employee: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      }),
      prisma.timesheet.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          date: true,
          hoursWorked: true,
          status: true,
          createdAt: true,
          employee: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      }),
      prisma.notification.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          message: true,
          type: true,
          createdAt: true
        }
      })
    ]);

    // Format activities into a unified structure
    const activities: Array<{
      id: string;
      type: 'employee' | 'document' | 'timesheet' | 'notification';
      title: string;
      description: string;
      timestamp: Date;
      status?: string;
    }> = [];

    // Add employee activities
    recentEmployees.forEach(employee => {
      activities.push({
        id: `employee-${employee.id}`,
        type: 'employee' as const,
        title: `New Employee: ${employee.firstName} ${employee.lastName}`,
        description: 'Employee record created',
        timestamp: employee.createdAt,
        status: 'Active'
      });
    });

    // Add document activities
    recentDocuments.forEach(document => {
      activities.push({
        id: `document-${document.id}`,
        type: 'document' as const,
        title: `Document: ${document.title}`,
        description: `Uploaded by ${document.employee.firstName} ${document.employee.lastName}`,
        timestamp: document.uploadDate,
        status: 'Uploaded'
      });
    });

    // Add timesheet activities
    recentTimesheets.forEach(timesheet => {
      activities.push({
        id: `timesheet-${timesheet.id}`,
        type: 'timesheet' as const,
        title: `Timesheet: ${timesheet.employee.firstName} ${timesheet.employee.lastName}`,
        description: `${timesheet.hoursWorked} hours logged`,
        timestamp: timesheet.createdAt,
        status: timesheet.status
      });
    });

    // Add notification activities
    recentNotifications.forEach(notification => {
      activities.push({
        id: `notification-${notification.id}`,
        type: 'notification' as const,
        title: notification.title,
        description: notification.message,
        timestamp: notification.createdAt,
        status: notification.type
      });
    });

    // Sort by timestamp descending and limit to 10
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return NextResponse.json(sortedActivities);
  } catch (error) {
    console.error('Activities API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
