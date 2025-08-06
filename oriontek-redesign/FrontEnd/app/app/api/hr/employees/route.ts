
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { employeeFormSchema } from '@/lib/validations';
import { EmployeeFormData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (department && department !== 'all') {
      where.department = department;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { employeeId: { contains: search, mode: 'insensitive' } },
      ];
    }

    const employees = await prisma.employee.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            documents: true,
            timesheets: true,
          },
        },
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error('Employees GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = await employeeFormSchema.validate(body) as EmployeeFormData;

    // Check if employee ID already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { employeeId: validatedData.employeeId },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.employee.findUnique({
      where: { email: validatedData.email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    // Create notification for new employee
    await prisma.notification.create({
      data: {
        title: 'New Employee Added',
        message: `${employee.firstName} ${employee.lastName} has been added to the system`,
        type: 'Info',
        targetId: employee.id,
        targetType: 'employee',
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error('Employee POST error:', error);
    
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
