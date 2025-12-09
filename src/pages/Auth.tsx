/**
 * Authentication Page
 * Supports Google login and Phone login with +251 country code
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Phone, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type AuthMethod = 'phone' | 'google';
type AuthStep = 'method' | 'phone-input' | 'otp';

const Auth: React.FC = () => {
  const [authStep, setAuthStep] = useState<AuthStep>('method');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      login({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+251911234567',
        role: 'both',
        verified: true,
        createdAt: new Date().toISOString(),
        savedProperties: [],
        viewedProperties: [],
      });
      
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle phone number submission
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 9) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('OTP sent to +251' + phoneNumber);
      setAuthStep('otp');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      login({
        id: 'user-2',
        name: 'User',
        phone: '+251' + phoneNumber,
        role: 'both',
        verified: true,
        createdAt: new Date().toISOString(),
        savedProperties: [],
        viewedProperties: [],
      });
      
      toast.success('Welcome to Gojo Rental!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Gojo Rental</title>
        <meta name="description" content="Login to Gojo Rental to browse properties, save favorites, and manage your listings." />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Home className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold">
                Gojo<span className="text-primary">Rental</span>
              </span>
            </Link>

            {/* Method Selection */}
            {authStep === 'method' && (
              <div className="animate-fade-in">
                <h1 className="heading-3 text-foreground mb-2">Welcome Back</h1>
                <p className="text-muted-foreground mb-8">
                  Sign in to access your account and continue your property search
                </p>

                <div className="space-y-4">
                  {/* Google Login */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-3 h-14"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    )}
                    Continue with Google
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        or continue with
                      </span>
                    </div>
                  </div>

                  {/* Phone Login */}
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full gap-3 h-14"
                    onClick={() => setAuthStep('phone-input')}
                  >
                    <Phone className="w-5 h-5" />
                    Continue with Phone
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-8">
                  By continuing, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}

            {/* Phone Input */}
            {authStep === 'phone-input' && (
              <div className="animate-fade-in">
                <button
                  onClick={() => setAuthStep('method')}
                  className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
                >
                  ← Back
                </button>

                <h1 className="heading-3 text-foreground mb-2">Enter Your Phone Number</h1>
                <p className="text-muted-foreground mb-8">
                  We'll send you a verification code
                </p>

                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-xl border border-border">
                        <span className="text-lg">🇪🇹</span>
                        <span className="text-foreground font-medium">+251</span>
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        placeholder="9XX XXX XXX"
                        className="flex-1 px-4 py-3 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground text-lg tracking-wide"
                        autoFocus
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Example: 911 234 567
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isLoading || phoneNumber.length < 9}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}

            {/* OTP Verification */}
            {authStep === 'otp' && (
              <div className="animate-fade-in">
                <button
                  onClick={() => setAuthStep('phone-input')}
                  className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
                >
                  ← Back
                </button>

                <h1 className="heading-3 text-foreground mb-2">Verify Your Number</h1>
                <p className="text-muted-foreground mb-8">
                  Enter the 6-digit code sent to +251{phoneNumber}
                </p>

                <form onSubmit={handleOtpVerify} className="space-y-6">
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            const prevInput = document.getElementById(`otp-${index - 1}`);
                            prevInput?.focus();
                          }
                        }}
                        className={cn(
                          "w-12 h-14 text-center text-xl font-bold rounded-xl border-2",
                          "bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none",
                          digit ? "border-primary" : "border-border"
                        )}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading || otp.some(d => !d)}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Verify & Continue'
                    )}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      onClick={handlePhoneSubmit}
                      className="text-primary hover:underline font-medium"
                    >
                      Resend
                    </button>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Image (desktop only) */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          </div>
          <div className="relative z-10 h-full flex items-center p-12">
            <div className="max-w-lg">
              <h2 className="text-4xl font-display font-bold text-background mb-6">
                Find Your Perfect Long-Term Home
              </h2>
              <p className="text-lg text-background/80 mb-8">
                Join thousands of happy renters and property owners on Ethiopia's most trusted rental platform.
              </p>
              <div className="flex gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">2,500+</div>
                  <div className="text-background/70">Properties</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1,200+</div>
                  <div className="text-background/70">Happy Tenants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-background/70">Verified Owners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
