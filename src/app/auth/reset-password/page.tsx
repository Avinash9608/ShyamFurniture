"use client";

import { Suspense } from "react";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ResetPasswordPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');
      setSuccess('Password reset! You can now log in.');
      setTimeout(() => router.push('/auth/login'), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter the OTP sent to your email and set a new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
              <Input id="email" name="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-1">OTP</label>
              <Input id="otp" name="otp" type="text" required value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium mb-1">New Password</label>
              <Input id="new-password" name="new-password" type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</Button>
          </form>
          {error && <div className="mt-4 text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="mt-4 text-green-600 text-sm text-center">{success}</div>}
          <div className="mt-6 text-center text-sm">
            Back to{' '}
            <Link href="/auth/login" className="text-primary hover:underline">Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPageInner />
    </Suspense>
  );
} 