"use client";
import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const shippingSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(5, "A valid postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  paymentMode: z.enum(['cod', 'upi']),
});

const checkoutSchema = shippingSchema;

const paymentModes = [
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'upi', label: 'UPI (via)' },
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (mounted && cart.length === 0) {
      router.push('/');
    }
    if (mounted && !isLoggedIn) {
      router.push('/auth/login');
    }
  }, [mounted, cart.length, isLoggedIn, router]);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '', firstName: '', lastName: '', address: '',
      city: '', postalCode: '', country: 'India', phone: '', paymentMode: 'cod',
    },
  });

  if (!mounted || !isLoggedIn || cart.length === 0) return null;

  const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    if (!/saharsa/i.test(data.address)) {
      toast({ title: 'Error', description: 'Orders are only available for Saharsa district addresses.', variant: 'destructive' });
      return;
    }
    const userObj = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userObj) {
      router.push('/auth/login');
      return;
    }
    try {
      for (const item of cart) {
        const payload = {
          userId: userObj._id,
          productId: item._id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          address: `${data.address}, ${data.city}, ${data.postalCode}, ${data.country}`,
          paymentMode: data.paymentMode,
        };
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. Your order is being processed.",
      });
      clearCart();
      router.push('/');
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to place order.', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Checkout</h1>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle className="font-headline text-2xl">Shipping Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="email" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Email</FormLabel><FormControl><Input {...field} autoComplete="email" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="firstName" control={form.control} render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} autoComplete="given-name" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="lastName" control={form.control} render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} autoComplete="family-name" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="address" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Address <span className="text-xs text-red-500">(Only Saharsa district orders are accepted)</span></FormLabel><FormControl><Input {...field} autoComplete="shipping street-address" placeholder="Enter your address (must include Saharsa)" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="city" control={form.control} render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} autoComplete="shipping address-level2" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="postalCode" control={form.control} render={({ field }) => (<FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} autoComplete="shipping postal-code" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="country" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Country</FormLabel><FormControl><Input {...field} autoComplete="country-name" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="phone" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Phone (Optional)</FormLabel><FormControl><Input {...field} autoComplete="tel" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="paymentMode" control={form.control} render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Payment Mode</FormLabel>
                    <FormControl>
                      <select className="w-full border rounded px-3 py-2" {...field}>
                        {paymentModes.map(mode => (
                          <option key={mode.value} value={mode.value}>{mode.label}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader><CardTitle className="font-headline text-2xl">Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item._id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">INR {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span><span>INR {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span><span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span><span>INR {cartTotal.toFixed(2)}</span>
                </div>
                <Button type="submit" size="lg" className="w-full gradient-cta hover:opacity-90">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}