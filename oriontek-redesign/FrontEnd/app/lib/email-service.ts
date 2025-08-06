
import nodemailer from 'nodemailer';
import { createTestEmailConfig, getEmailPreviewUrl } from './email-config-dev';

// Email configuration - use development config if no production credentials
let transporterPromise: Promise<nodemailer.Transporter> | null = null;

async function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = createTransporter();
  }
  return transporterPromise;
}

async function createTransporter() {
  // Check if production email credentials are available
  const hasProductionCredentials = process.env.SMTP_USER && process.env.SMTP_PASS && 
    process.env.SMTP_USER !== 'oriontek.notifications@gmail.com';

  if (hasProductionCredentials) {
    console.log('📧 Using production email configuration');
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    console.log('📧 Using development email configuration (Ethereal Email)');
    const testConfig = await createTestEmailConfig();
    return nodemailer.createTransport(testConfig);
  }
}

// Professional OTP email template
const getOTPEmailTemplate = (otp: string, recipientEmail: string) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OrionTek HR Portal - OTP Verification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin: 20px;
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10px;
            }
            .otp-box {
                background: linear-gradient(135deg, #2563eb, #1d4ed8);
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin: 30px 0;
            }
            .otp-code {
                font-size: 36px;
                font-weight: bold;
                letter-spacing: 8px;
                margin: 10px 0;
                font-family: 'Courier New', monospace;
            }
            .warning {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #2563eb;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">OrionTek Inc</div>
                <p>HR Portal Authentication</p>
            </div>
            
            <h2>Your OTP Verification Code</h2>
            <p>Hello,</p>
            <p>You have requested access to the OrionTek HR Portal. Please use the following One-Time Password (OTP) to complete your authentication:</p>
            
            <div class="otp-box">
                <div>Your OTP Code:</div>
                <div class="otp-code">${otp}</div>
                <div>Valid for 10 minutes</div>
            </div>
            
            <div class="warning">
                <strong>Security Notice:</strong> This OTP is confidential and should not be shared with anyone. If you did not request this code, please ignore this email or contact your system administrator.
            </div>
            
            <p>This verification code will expire in <strong>10 minutes</strong> for your security.</p>
            
            <p>If you're having trouble accessing the portal, please contact your system administrator.</p>
            
            <div class="footer">
                <p><strong>OrionTek Inc</strong><br>
                Technology Solutions & Services<br>
                This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const textTemplate = `
OrionTek Inc - HR Portal Authentication

Your OTP Verification Code: ${otp}

Hello,

You have requested access to the OrionTek HR Portal. Please use the following One-Time Password (OTP) to complete your authentication:

OTP CODE: ${otp}
Valid for: 10 minutes

SECURITY NOTICE: This OTP is confidential and should not be shared with anyone. If you did not request this code, please ignore this email or contact your system administrator.

This verification code will expire in 10 minutes for your security.

If you're having trouble accessing the portal, please contact your system administrator.

---
OrionTek Inc
Technology Solutions & Services
This is an automated message, please do not reply to this email.
  `;

  return { htmlTemplate, textTemplate };
};

// Send OTP email function
export async function sendOTPEmail(email: string, otp: string): Promise<{ success: boolean; error?: string; previewUrl?: string }> {
  try {
    const transporter = await getTransporter();
    const { htmlTemplate, textTemplate } = getOTPEmailTemplate(otp, email);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'OrionTek Inc <oriontek.notifications@gmail.com>',
      to: email,
      subject: 'OrionTek HR Portal - OTP Verification Code',
      text: textTemplate,
      html: htmlTemplate,
      priority: 'high' as const,
    };

    // Send email with timeout
    const result = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout')), 25000)
      )
    ]) as any;

    console.log(`✅ OTP email sent successfully to: ${email}`);
    
    // Get preview URL for development (Ethereal Email feature)
    const previewUrl = getEmailPreviewUrl(result);
    if (previewUrl) {
      console.log(`🔗 Email preview: ${previewUrl}`);
    }
    
    console.log(`📧 Email delivered in < 30 seconds`);
    
    return { success: true, previewUrl: previewUrl || undefined };
    
  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
    
    // Return specific error messages for debugging
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return { success: false, error: 'Email sending timeout - please try again' };
      }
      if (error.message.includes('authentication')) {
        return { success: false, error: 'Email authentication failed' };
      }
      return { success: false, error: `Email delivery failed: ${error.message}` };
    }
    
    return { success: false, error: 'Unknown error occurred while sending email' };
  }
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const transporter = await getTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid and ready');
    return true;
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    return false;
  }
}
