"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const statusOptions = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    // Only allow admin
    const userObj = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userObj || (userObj.role !== 'admin' && userObj.email !== 'avinashmadhukar4@gmail.com')) {
      window.location.href = '/auth/login';
      return;
    }
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setError('Failed to fetch orders.'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string, adminEmail: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, changedBy: adminEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(orders => orders.map(o => o._id === orderId ? { ...o, ...data.order } : o));
      } else {
        alert(data.message || 'Failed to update order status');
      }
    } catch {
      alert('Failed to update order status');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <div className="text-center py-12">Loading all orders...</div>;
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>;

  const adminEmail = JSON.parse(localStorage.getItem('user') || 'null')?.email || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Orders (Admin)</h1>
      {orders.length === 0 ? (
        <div className="text-center text-muted-foreground">No orders found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <Card key={order._id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Order #{order._id.slice(-6)}
                  <Badge variant={order.status === 'pending' ? 'default' : order.status === 'confirmed' ? 'secondary' : 'outline'}>{order.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div><b>User:</b> {order.name} ({order.email})</div>
                <div><b>Product:</b> {order.productId}</div>
                <div><b>Placed on:</b> {new Date(order.createdAt).toLocaleString()}</div>
                <div><b>Payment:</b> {order.paymentMode}</div>
                <div><b>Address:</b> {order.address}</div>
                <div><b>Phone:</b> {order.phone}</div>
                <div><b>Status History:</b>
                  <ul className="ml-4 list-disc text-xs">
                    {order.statusHistory?.map((h: any, i: number) => (
                      <li key={i}>{h.status} at {new Date(h.changedAt).toLocaleString()} by {h.changedBy}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value, adminEmail)}
                    disabled={updating === order._id}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <Button size="sm" disabled>{updating === order._id ? 'Updating...' : 'Update'}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
