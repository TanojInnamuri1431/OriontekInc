
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { timesheetFormSchema } from '@/lib/validations';
import { TimesheetFormData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const employee = searchParams.get('employee');
    const project = searchParams.get('project');

    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (employee && employee !== 'all') {
      where.employeeId = employee;
    }

    if (project && project !== 'all') {
      where.project = project;
    }

    const timesheets = await prisma.timesheet.findMany({
      where,
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
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(timesheets);
  } catch (error) {
    console.error('Timesheets GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timesheets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = await timesheetFormSchema.validate(body) as TimesheetFormData;

    const timesheet = await prisma.timesheet.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
      },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        title: 'New Timesheet Submitted',
        message: `Timesheet submitted by ${timesheet.employee.firstName} ${timesheet.employee.lastName} for ${timesheet.hoursWorked} hours`,
        type: 'Info',
        targetId: timesheet.id,
        targetType: 'timesheet',
      },
    });

    return NextResponse.json(timesheet, { status: 201 });
  } catch (error) {
    console.error('Timesheet POST error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
