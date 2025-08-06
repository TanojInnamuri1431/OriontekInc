
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { PASSWORD_RESET_EMAIL } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }

    if (email !== PASSWORD_RESET_EMAIL) {
      return NextResponse.json(
        { error: 'Invalid email for password reset' },
        { status: 401 }
      );
    }

    // Verify OTP for password reset
    const otpRecord = await prisma.oTPVerification.findFirst({
      where: {
        identifier: email,
        otp: otp,
        purpose: 'password_reset',
        verified: false,
        expiresAt: {
          gt: new Date()
        }
      }
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 401 }
      );
    }

    // Mark OTP as verified
    await prisma.oTPVerification.update({
      where: { id: otpRecord.id },
      data: {
        verified: true,
        verifiedAt: new Date()
      }
    });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update or create user with new password
    const user = await prisma.user.upsert({
      where: { email: email },
      update: { password: hashedPassword },
      create: {
        email: email,
        name: 'HR Admin',
        password: hashedPassword,
        role: 'admin'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
