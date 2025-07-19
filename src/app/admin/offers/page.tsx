
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import dbConnect from '@/lib/dbConnect';
import Offer from '@/models/Offer';
import { OfferList } from './OfferList';

async function getOffers() {
    await dbConnect();
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(offers));
}


export default async function AdminOffersPage() {
  const offers = await getOffers();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Offers</h1>
        <Button asChild>
          <Link href="/admin/offers/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Offer
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Promotions</CardTitle>
          <CardDescription>
            Create and manage discounts and special offers for your customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <OfferList initialOffers={offers} />
        </CardContent>
      </Card>
    </div>
  );
}
