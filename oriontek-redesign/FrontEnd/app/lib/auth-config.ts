
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";
import { HR_PREDEFINED_PASSWORDS } from "./constants";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        step: { label: "Step", type: "text" } // password_entry, otp_verification
      },
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.step) {
          return null;
        }

        try {
          if (credentials.step === "password_entry") {
            // Check if the entered password is one of the predefined passwords
            const targetEmail = HR_PREDEFINED_PASSWORDS[credentials.password as keyof typeof HR_PREDEFINED_PASSWORDS];
            
            if (targetEmail) {
              // Generate and "send" OTP (in real implementation, this would send email)
              const otp = Math.floor(100000 + Math.random() * 900000).toString();
              const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

              // Store OTP in database
              await prisma.oTPVerification.create({
                data: {
                  identifier: credentials.password,
                  email: targetEmail,
                  otp: otp,
                  purpose: "login",
                  expiresAt: expiresAt
                }
              });

              // Return success indicator for password step
              return {
                id: "password_step_success",
                email: targetEmail,
                step: "otp_required"
              };
            }
          } else if (credentials.step === "otp_verification") {
            // Verify OTP
            if (!credentials.otp) {
              return null;
            }

            const otpRecord = await prisma.oTPVerification.findFirst({
              where: {
                identifier: credentials.password,
                otp: credentials.otp,
                purpose: "login",
                verified: false,
                expiresAt: {
                  gt: new Date()
                }
              }
            });

            if (!otpRecord) {
              return null;
            }

            // Mark OTP as verified
            await prisma.oTPVerification.update({
              where: { id: otpRecord.id },
              data: { 
                verified: true,
                verifiedAt: new Date()
              }
            });

            // Find or create user
            let user = await prisma.user.findUnique({
              where: { email: otpRecord.email }
            });

            if (!user) {
              // Create new user for HR access
              let userName = "Admin";
              if (otpRecord.identifier === "Anil@oriontek") {
                userName = "Anil";
              } else if (otpRecord.identifier === "Subha@oriontek") {
                userName = "Subha";
              } else if (otpRecord.identifier === "Nageswararao@ORIONTEKINC.COM") {
                userName = "Nageswararao";
              }
              
              user = await prisma.user.create({
                data: {
                  email: otpRecord.email,
                  name: userName,
                  role: "admin",
                  lastLogin: new Date()
                }
              });
            } else {
              // Update last login
              user = await prisma.user.update({
                where: { id: user.id },
                data: { lastLogin: new Date() }
              });
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.step = user.step;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role;
        session.user.step = token.step;
      }
      return session;
    },
  },
  pages: {
    signIn: "/hr/login",
    error: "/hr/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
};
