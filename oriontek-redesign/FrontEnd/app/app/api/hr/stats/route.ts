
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [
      totalEmployees,
      activeEmployees,
      totalDocuments,
      expiringDocuments,
      totalTimesheets,
      pendingTimesheets,
      totalNotifications,
      unreadNotifications
    ] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { status: 'Active' } }),
      prisma.document.count(),
      prisma.document.count({
        where: {
          expiryDate: {
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            gte: new Date()
          }
        }
      }),
      prisma.timesheet.count(),
      prisma.timesheet.count({ where: { status: 'Pending' } }),
      prisma.notification.count(),
      prisma.notification.count({ where: { isRead: false } })
    ]);

    return NextResponse.json({
      totalEmployees,
      activeEmployees,
      totalDocuments,
      expiringDocuments,
      totalTimesheets,
      pendingTimesheets,
      totalNotifications,
      unreadNotifications
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
