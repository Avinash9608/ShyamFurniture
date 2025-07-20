"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const paymentModes = [
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'upi', label: 'UPI (via)' },
];

function BuyNowPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; userId: string } | null>(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState(paymentModes[0].value);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userObj = JSON.parse(localStorage.getItem('user') || 'null');
      if (userObj) {
        setUser({ name: userObj.username, email: userObj.email, userId: userObj.userId || userObj._id });
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/auth/login');
    }
  }, [mounted, isLoggedIn, router]);

  if (!mounted || !isLoggedIn || !user) return null;

  const productId = searchParams.get('product');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !address) {
      setError('Phone and address are required.');
      return;
    }
    if (!/saharsa/i.test(address)) {
      setError('Orders are only available for Saharsa district addresses.');
      return;
    }
    setError('');
    setSubmitting(true);
    const payload = {
      userId: user.userId,
      productId,
      name: user.name,
      email: user.email,
      phone,
      address,
      paymentMode,
    };
    console.log('Submitting order payload:', payload);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order failed');
      setSuccess('Order placed successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Buy Now</CardTitle>
          <CardDescription>Complete your purchase by filling in the details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input value={user.name} readOnly disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={user.email} readOnly disabled />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} required placeholder="Enter your phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address <span className="text-xs text-red-500">(Only Saharsa district orders are accepted)</span></label>
              <Input value={address} onChange={e => setAddress(e.target.value)} required placeholder="Enter your address (must include Saharsa)" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Mode</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={paymentMode}
                onChange={e => setPaymentMode(e.target.value)}
              >
                {paymentModes.map(mode => (
                  <option key={mode.value} value={mode.value}>{mode.label}</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>{submitting ? 'Placing Order...' : 'Place Order'}</Button>
          </form>
          {error && <div className="mt-4 text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="mt-4 text-green-600 text-sm text-center">{success}</div>}
        </CardContent>
      </Card>
    </div>
  );
}

export default function BuyNowPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyNowPageInner />
    </Suspense>
  );
} 