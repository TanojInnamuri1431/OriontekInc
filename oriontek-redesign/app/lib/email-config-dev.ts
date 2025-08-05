
import nodemailer from 'nodemailer';

// Development email configuration using Ethereal Email
export async function createTestEmailConfig() {
  try {
    // Create test account using ethereal email for development
    const testAccount = await nodemailer.createTestAccount();
    
    return {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
  } catch (error) {
    console.error('Failed to create test email account:', error);
    // Fallback to static ethereal credentials for development
    return {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'oriontek.dev@ethereal.email',
        pass: 'test123456',
      },
    };
  }
}

// Get preview URL for sent emails (Ethereal feature)
export function getEmailPreviewUrl(info: any): string | null {
  return nodemailer.getTestMessageUrl(info) || null;
}
