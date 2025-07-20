"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userObj) {
      window.location.href = '/auth/login';
      return;
    }
    fetch(`/api/orders?userId=${userObj._id}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setError('Failed to fetch orders.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <p>Welcome to your profile. Below are your recent orders:</p>
      {loading ? (
        <div className="text-center py-12">Loading your orders...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-12">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-muted-foreground">You have not placed any orders yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {orders.map(order => (
            <Card key={order._id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Order #{order._id.slice(-6)}
                  <Badge variant={order.status === 'pending' ? 'default' : order.status === 'confirmed' ? 'secondary' : 'outline'}>{order.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><b>Product:</b> {order.name}</div>
                <div><b>Placed on:</b> {new Date(order.createdAt).toLocaleString()}</div>
                <div><b>Payment:</b> {order.paymentMode}</div>
                <div><b>Address:</b> {order.address}</div>
                <div><b>Phone:</b> {order.phone}</div>
                <div><b>Status History:</b>
                  <ul className="ml-4 list-disc text-xs">
                    {order.statusHistory?.map((h: any, i: number) => (
                      <li key={i}>{h.status} at {new Date(h.changedAt).toLocaleString()}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 