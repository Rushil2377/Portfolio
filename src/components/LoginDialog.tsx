'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut, User, Key, Mail, ShieldAlert } from 'lucide-react';

export default function LoginDialog() {
  const {
    user,
    login,
    register,
    verifyOtp,
    logout,
    authDialogOpen,
    authDialogMode,
    openAuthDialog,
    setAuthDialogOpen,
  } = useAuth();
  const isRegisterMode = authDialogMode === 'register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => {
      setResendCooldown(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!authDialogOpen) {
      setOtpStep(false);
      setOtp('');
    }
  }, [authDialogOpen]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill in all fields.',
      });
      return;
    }

    setSubmitting(true);

    try {
      if (isRegisterMode) {
        const res = await register(email, password);
        if (res.success) {
          if (res.requiresOtp) {
            setOtpStep(true);
            setResendCooldown(60);
            toast({
              title: 'Verification Code Sent',
              description: `A 6-digit OTP has been sent to ${email}.`,
            });
          } else {
            toast({
              title: 'Account Created',
              description: 'Your user account was successfully created. You can now log in.',
            });
            openAuthDialog('login');
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description: res.error,
          });
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          if (res.requiresOtp) {
            setOtpStep(true);
            setResendCooldown(60);
            toast({
              title: 'Verification Code Sent',
              description: `A 6-digit OTP has been sent to ${email}.`,
            });
          } else {
            toast({
              title: 'Logged In',
              description: `Welcome back, ${email}!`,
            });
            setAuthDialogOpen(false);
            setEmail('');
            setPassword('');
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: res.error,
          });
        }
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid 6-digit verification code.',
      });
      return;
    }

    setSubmitting(true);

    try {
      const type = isRegisterMode ? 'register' : 'login';
      const res = await verifyOtp(email, otp, type);
      if (res.success) {
        toast({
          title: 'Verified Successfully',
          description: isRegisterMode ? 'Your account is verified. Welcome to Vertex!' : 'Welcome back!',
        });
        setAuthDialogOpen(false);
        setOtpStep(false);
        setOtp('');
        setEmail('');
        setPassword('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
          description: res.error || 'Invalid or expired OTP code.',
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Verification Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setSubmitting(true);
    try {
      let res;
      if (isRegisterMode) {
        res = await register(email, password);
      } else {
        res = await login(email, password);
      }
      if (res.success && res.requiresOtp) {
        setResendCooldown(60);
        toast({
          title: 'New Code Sent',
          description: 'A new verification code has been sent to your email.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Resend Failed',
          description: res.error || 'Failed to send a new verification code.',
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to request new code.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end text-xs">
          <span className="text-white/70 font-semibold max-w-[140px] truncate">{user.email}</span>
          <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
            {user.role === 'admin' ? 'Admin Portal' : 'User Portal'}
          </span>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-white rounded-full transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => openAuthDialog('login')}
          className="border-white/20 text-white rounded-full px-6 hover:bg-white hover:text-black transition-all flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-white/10 text-foreground sm:max-w-[400px] backdrop-blur-xl bg-black/80">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {otpStep ? 'Enter Verification Code' : isRegisterMode ? 'Create Account' : 'Welcome to Vertex'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {otpStep
              ? `Verification code has been emailed to ${email}.`
              : isRegisterMode
              ? 'Register a user account to explore the dashboard.'
              : 'Login as user or admin to access features.'}
          </DialogDescription>
        </DialogHeader>

        {otpStep ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="auth-otp" className="text-white text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-accent" />
                OTP Code
              </Label>
              <Input
                id="auth-otp"
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="bg-white/5 border-white/10 text-white focus:border-accent text-center tracking-[0.5em] text-2xl font-bold h-14"
                required
              />
              <p className="text-[11px] text-muted-foreground mt-1 text-center">
                Enter the 6-digit code sent to <strong className="text-white/80">{email}</strong>.
              </p>
            </div>

            <Button type="submit" disabled={submitting} className="w-full bg-accent hover:bg-accent/80 text-black font-bold h-11 rounded-xl transition-all">
              {submitting ? 'Verifying...' : 'Verify & Submit'}
            </Button>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setOtpStep(false);
                  setOtp('');
                }}
                className="text-xs text-muted-foreground hover:text-white transition-colors"
              >
                ← Back to {isRegisterMode ? 'Register' : 'Login'}
              </button>

              <button
                type="button"
                disabled={resendCooldown > 0 || submitting}
                onClick={handleResendOtp}
                className="text-xs text-accent hover:text-accent/80 disabled:text-muted-foreground transition-colors"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="auth-email" className="text-white text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent" />
                Email
              </Label>
              <Input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-accent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-password" className="text-white text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-accent" />
                Password
              </Label>
              <Input
                id="auth-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:border-accent"
                required
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-11 rounded-xl transition-all">
              {submitting ? 'Authenticating...' : isRegisterMode ? 'Register' : 'Login'}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => openAuthDialog(isRegisterMode ? 'login' : 'register')}
                className="text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                {isRegisterMode ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
