
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { documentFormSchema } from '@/lib/validations';
import { DocumentFormData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (status && status !== 'all') {
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      if (status === 'expired') {
        where.expiryDate = { lt: now };
      } else if (status === 'expiring') {
        where.expiryDate = { gte: now, lte: thirtyDaysFromNow };
      } else if (status === 'valid') {
        where.OR = [
          { expiryDate: null },
          { expiryDate: { gt: thirtyDaysFromNow } }
        ];
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { fileName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const documents = await prisma.document.findMany({
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
      orderBy: { uploadDate: 'desc' },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Documents GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = await documentFormSchema.validate(body) as DocumentFormData;

    const document = await prisma.document.create({
      data: {
        ...validatedData,
        fileName: body.fileName || 'placeholder.pdf',
        filePath: body.filePath || '/documents/placeholder.pdf',
        fileSize: body.fileSize || 1024,
        fileType: body.fileType || 'application/pdf',
        expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
        uploadedBy: 'HR Admin',
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
        title: 'New Document Uploaded',
        message: `Document "${document.title}" uploaded for ${document.employee.firstName} ${document.employee.lastName}`,
        type: 'Info',
        targetId: document.id,
        targetType: 'document',
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Document POST error:', error);
    
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
