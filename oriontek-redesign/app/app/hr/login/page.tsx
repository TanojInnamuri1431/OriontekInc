
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Building2, ArrowLeft, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import toast from 'react-hot-toast';

type LoginStep = 'password' | 'otp' | 'reset_otp' | 'new_password';

export default function HRLoginPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<LoginStep>('password');
  const [formData, setFormData] = useState({
    password: '',
    otp: '',
    resetEmail: '',
    resetOtp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Generate OTP for the entered password
      const response = await fetch('/api/auth/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: formData.password, purpose: 'login' })
      });

      const data = await response.json();

      if (data.success) {
        setTargetEmail(data.email);
        setCurrentStep('otp');
        toast.success(`OTP sent to ${data.email}`);
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (error) {
      setError('Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        password: formData.password,
        otp: formData.otp,
        step: 'otp_verification',
        redirect: false
      });

      if (result?.ok) {
        toast.success('Login successful!');
        router.push('/hr');
      } else {
        setError('Invalid OTP or login failed');
      }
    } catch (error) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: formData.resetEmail, purpose: 'password_reset' })
      });

      const data = await response.json();

      if (data.success) {
        setCurrentStep('reset_otp');
        toast.success(`OTP sent to ${data.email}`);
      } else {
        setError(data.error || 'Invalid email');
      }
    } catch (error) {
      setError('Failed to send reset OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.resetEmail,
          otp: formData.resetOtp,
          purpose: 'password_reset'
        })
      });

      const data = await response.json();

      if (data.success) {
        setCurrentStep('new_password');
        toast.success('OTP verified! Set your new password.');
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.resetEmail,
          otp: formData.resetOtp,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Password reset successfully!');
        setCurrentStep('password');
        setFormData({
          password: '',
          otp: '',
          resetEmail: '',
          resetOtp: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (error) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Website</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">Oriontek Inc</h1>
              <p className="text-sm text-gray-600">HR Portal Access</p>
            </div>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl">HR Portal Login</CardTitle>
            <CardDescription>
              Secure access to employee management system
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="reset">Reset Password</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                {currentStep === 'password' && (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">HR Portal Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          placeholder="Enter your HR portal password"
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Use your assigned HR portal password
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Continue'
                      )}
                    </Button>
                  </form>
                )}

                {currentStep === 'otp' && (
                  <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        value={formData.otp}
                        onChange={(e) => updateFormData('otp', e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        required
                        className="text-center text-lg font-mono"
                      />
                      <p className="text-xs text-gray-500 text-center">
                        OTP sent to {targetEmail}
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex space-x-3">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep('password')}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          'Login'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="reset" className="space-y-4">
                {currentStep === 'password' && (
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetEmail">Email Address</Label>
                      <Input
                        id="resetEmail"
                        type="email"
                        value={formData.resetEmail}
                        onChange={(e) => updateFormData('resetEmail', e.target.value)}
                        placeholder="Enter your authorized email address"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Enter your authorized email address for password reset
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        'Send Reset OTP'
                      )}
                    </Button>
                  </form>
                )}

                {currentStep === 'reset_otp' && (
                  <form onSubmit={handleResetOtpVerification} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetOtp">Enter Reset OTP</Label>
                      <Input
                        id="resetOtp"
                        type="text"
                        value={formData.resetOtp}
                        onChange={(e) => updateFormData('resetOtp', e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        required
                        className="text-center text-lg font-mono"
                      />
                      <p className="text-xs text-gray-500 text-center">
                        OTP sent to your registered email address
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex space-x-3">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep('password')}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          'Verify OTP'
                        )}
                      </Button>
                    </div>
                  </form>
                )}

                {currentStep === 'new_password' && (
                  <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => updateFormData('newPassword', e.target.value)}
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Resetting...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Need help? Contact IT support at</p>
          <a href="mailto:hr@oriontekinc.com" className="text-blue-600 hover:text-blue-700 font-medium">
            hr@oriontekinc.com
          </a>
        </div>
      </div>
    </div>
  );
}
