
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const timesheet = await prisma.timesheet.findUnique({
      where: { id: params.id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            department: true,
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

    return NextResponse.json(timesheet);
  } catch (error) {
    console.error('Timesheet GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timesheet' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    await prisma.timesheet.delete({
      where: { id: params.id },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        title: 'Timesheet Deleted',
        message: `Timesheet for ${timesheet.employee.firstName} ${timesheet.employee.lastName} has been deleted`,
        type: 'Warning',
        targetId: timesheet.id,
        targetType: 'timesheet',
      },
    });

    return NextResponse.json({ message: 'Timesheet deleted successfully' });
  } catch (error) {
    console.error('Timesheet DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete timesheet' },
      { status: 500 }
    );
  }
}
