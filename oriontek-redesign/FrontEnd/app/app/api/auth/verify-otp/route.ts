
import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp-utils';

export async function POST(request: NextRequest) {
  try {
    const { identifier, otp, purpose = 'login' } = await request.json();

    if (!identifier || !otp) {
      return NextResponse.json(
        { error: 'Identifier and OTP are required' },
        { status: 400 }
      );
    }

    const result = await verifyOTP(identifier, otp, purpose);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error || 'Invalid OTP' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
