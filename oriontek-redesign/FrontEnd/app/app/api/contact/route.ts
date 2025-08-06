
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { ContactFormData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = await contactFormSchema.validate(body) as ContactFormData;
    
    // Log the contact form submission (in a real app, you'd save to database)
    console.log('Contact form submission:', {
      name: validatedData.name,
      company: validatedData.company,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    });

    // In a real application, you would:
    // 1. Save to database
    // 2. Send notification email
    // 3. Integrate with CRM system
    
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    }, { status: 200 });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
