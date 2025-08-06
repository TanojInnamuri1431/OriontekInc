
import { NextRequest, NextResponse } from 'next/server';
import { generateOTP } from '@/lib/otp-utils';
import { HR_PREDEFINED_PASSWORDS, PASSWORD_RESET_EMAIL } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { identifier, purpose = 'login' } = await request.json();

    if (!identifier) {
      return NextResponse.json(
        { error: 'Identifier is required' },
        { status: 400 }
      );
    }

    if (purpose === 'login') {
      // Check if identifier is valid for login
      const validPasswords = Object.keys(HR_PREDEFINED_PASSWORDS);
      if (!validPasswords.includes(identifier)) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } else if (purpose === 'password_reset') {
      // For password reset, identifier should be the email
      if (identifier !== PASSWORD_RESET_EMAIL) {
        return NextResponse.json(
          { error: 'Invalid email for password reset' },
          { status: 401 }
        );
      }
    }

    const result = await generateOTP(identifier, purpose);

    return NextResponse.json({
      success: true,
      email: result.email,
      expiresAt: result.expiresAt,
      message: `OTP sent to ${result.email}`
    });
  } catch (error) {
    console.error('Generate OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to generate OTP' },
      { status: 500 }
    );
  }
}
