import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Tag } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Placeholder data for offers
const offers = [
  { id: 1, title: '10% Off All Sofa Sets', code: 'SOFA10', status: 'Active', usage: 15 },
  { id: 2, title: 'Diwali Special - 20% Off', code: 'DIWALI20', status: 'Active', usage: 42 },
  { id: 3, title: 'New Year Sale', code: 'NEWYEAR', status: 'Expired', usage: 120 },
];

export default function AdminOffersPage() {
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
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Promo Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{offer.code}</Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant={offer.status === 'Active' ? 'default' : 'outline'}>
                        {offer.status}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-right">{offer.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
