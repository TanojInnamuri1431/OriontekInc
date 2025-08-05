
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const timesheet = await prisma.timesheet.findUnique({
      where: { id: params.id },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!timesheet) {
      return NextResponse.json(
        { error: 'Timesheet not found' },
        { status: 404 }
      );
    }

    const updatedTimesheet = await prisma.timesheet.update({
      where: { id: params.id },
      data: {
        status,
        approvedAt: status === 'Approved' ? new Date() : null,
        approvedBy: status === 'Approved' ? 'HR Admin' : null,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        title: `Timesheet ${status}`,
        message: `Timesheet for ${timesheet.employee.firstName} ${timesheet.employee.lastName} has been ${status.toLowerCase()}`,
        type: status === 'Approved' ? 'Success' : status === 'Rejected' ? 'Warning' : 'Info',
        targetId: timesheet.id,
        targetType: 'timesheet',
      },
    });

    return NextResponse.json(updatedTimesheet);
  } catch (error) {
    console.error('Timesheet status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update timesheet status' },
      { status: 500 }
    );
  }
}
