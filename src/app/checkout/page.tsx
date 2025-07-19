"use client";

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
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  cardName: z.string().min(1),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().min(3).max(4),
});

const checkoutSchema = shippingSchema.merge(paymentSchema);

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '', firstName: '', lastName: '', address: '',
      city: '', postalCode: '', country: 'United States', phone: '',
      cardNumber: '', cardName: '', expiryDate: '', cvc: '',
    },
  });

  if (cart.length === 0 && typeof window !== 'undefined') {
    router.push('/');
    return null;
  }
  
  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    console.log('Order submitted', data);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/');
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
                <FormField name="address" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Address</FormLabel><FormControl><Input {...field} autoComplete="shipping street-address" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="city" control={form.control} render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} autoComplete="shipping address-level2" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="postalCode" control={form.control} render={({ field }) => (<FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} autoComplete="shipping postal-code" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="country" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Country</FormLabel><FormControl><Input {...field} autoComplete="country-name" /></FormControl><FormMessage /></FormMessage>)} />
                <FormField name="phone" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Phone (Optional)</FormLabel><FormControl><Input {...field} autoComplete="tel" /></FormControl><FormMessage /></FormItem>)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-headline text-2xl">Payment Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="cardNumber" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Card Number</FormLabel><FormControl><Input {...field} autoComplete="cc-number" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="cardName" control={form.control} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} autoComplete="cc-name" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="expiryDate" control={form.control} render={({ field }) => (<FormItem><FormLabel>Expiry Date (MM/YY)</FormLabel><FormControl><Input {...field} autoComplete="cc-exp" /></FormControl><FormMessage /></FormItem>)} />
                <FormField name="cvc" control={form.control} render={({ field }) => (<FormItem><FormLabel>CVC</FormLabel><FormControl><Input {...field} autoComplete="cc-csc" /></FormControl><FormMessage /></FormItem>)} />
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
