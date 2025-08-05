
import { prisma } from "./db";
import { HR_PREDEFINED_PASSWORDS, PASSWORD_RESET_EMAIL } from "./constants";
import { sendOTPEmail } from "./email-service";

export async function generateOTP(identifier: string, purpose: "login" | "password_reset" = "login") {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  let email = "";
  
  if (purpose === "login") {
    email = HR_PREDEFINED_PASSWORDS[identifier as keyof typeof HR_PREDEFINED_PASSWORDS];
    if (!email) {
      throw new Error("Invalid identifier");
    }
  } else if (purpose === "password_reset") {
    email = PASSWORD_RESET_EMAIL;
  }

  // Clean up old OTP records for this identifier
  await prisma.oTPVerification.deleteMany({
    where: {
      identifier: identifier,
      purpose: purpose,
      verified: false
    }
  });

  // Create new OTP record
  const otpRecord = await prisma.oTPVerification.create({
    data: {
      identifier,
      email,
      otp,
      purpose,
      expiresAt
    }
  });

  // Send OTP email
  console.log(`🚀 Sending OTP to ${email} for ${identifier}...`);
  
  try {
    const emailResult = await sendOTPEmail(email, otp);
    
    if (!emailResult.success) {
      console.error(`❌ Failed to send OTP email: ${emailResult.error}`);
      // Still return success but log the email failure
      // The OTP is saved in database and can be used for verification
      console.log(`⚠️ OTP saved in database: ${otp} (fallback for ${email})`);
    }
  } catch (emailError) {
    console.error('❌ Email service error:', emailError);
    console.log(`⚠️ OTP saved in database: ${otp} (fallback for ${email})`);
  }

  return {
    success: true,
    email: email,
    expiresAt: expiresAt
  };
}

export async function verifyOTP(identifier: string, otp: string, purpose: "login" | "password_reset" = "login") {
  const otpRecord = await prisma.oTPVerification.findFirst({
    where: {
      identifier,
      otp,
      purpose,
      verified: false,
      expiresAt: {
        gt: new Date()
      }
    }
  });

  if (!otpRecord) {
    // Increment attempts
    await prisma.oTPVerification.updateMany({
      where: {
        identifier,
        purpose,
        verified: false
      },
      data: {
        attempts: {
          increment: 1
        }
      }
    });
    return { success: false, error: "Invalid or expired OTP" };
  }

  // Mark as verified
  await prisma.oTPVerification.update({
    where: { id: otpRecord.id },
    data: {
      verified: true,
      verifiedAt: new Date()
    }
  });

  return { success: true };
}

export async function cleanupExpiredOTPs() {
  await prisma.oTPVerification.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  });
}
