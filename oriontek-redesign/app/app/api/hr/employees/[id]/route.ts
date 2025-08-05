
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { employeeFormSchema } from '@/lib/validations';
import { EmployeeFormData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      include: {
        documents: {
          orderBy: { uploadDate: 'desc' },
        },
        timesheets: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Employee GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employee' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = await employeeFormSchema.validate(body) as EmployeeFormData;

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: params.id },
    });

    if (!existingEmployee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    // Check if employee ID already exists (excluding current employee)
    if (validatedData.employeeId !== existingEmployee.employeeId) {
      const duplicateEmployeeId = await prisma.employee.findUnique({
        where: { employeeId: validatedData.employeeId },
      });

      if (duplicateEmployeeId) {
        return NextResponse.json(
          { error: 'Employee ID already exists' },
          { status: 400 }
        );
      }
    }

    // Check if email already exists (excluding current employee)
    if (validatedData.email !== existingEmployee.email) {
      const duplicateEmail = await prisma.employee.findUnique({
        where: { email: validatedData.email },
      });

      if (duplicateEmail) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    // Create notification for employee update
    await prisma.notification.create({
      data: {
        title: 'Employee Updated',
        message: `${employee.firstName} ${employee.lastName}'s information has been updated`,
        type: 'Info',
        targetId: employee.id,
        targetType: 'employee',
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Employee PUT error:', error);
    
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    await prisma.employee.delete({
      where: { id: params.id },
    });

    // Create notification for employee deletion
    await prisma.notification.create({
      data: {
        title: 'Employee Deleted',
        message: `${employee.firstName} ${employee.lastName} has been removed from the system`,
        type: 'Warning',
        targetId: employee.id,
        targetType: 'employee',
      },
    });

    return NextResponse.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Employee DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    );
  }
}
