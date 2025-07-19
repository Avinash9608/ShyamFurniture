
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type Offer = {
    _id: string;
    title: string;
    code: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    usageCount: number;
}

export function OfferList({ initialOffers }: { initialOffers: Offer[] }) {
    const [offers, setOffers] = useState(initialOffers);
    const [isDeleting, setIsDeleting] = useState(false);
    const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);
    const { toast } = useToast();

    const handleDelete = async () => {
        if (!offerToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/admin/offers/${offerToDelete._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete offer.');
            }

            setOffers(offers.filter(o => o._id !== offerToDelete._id));
            toast({ title: "Offer deleted successfully!" });
        } catch (error) {
            toast({ variant: 'destructive', title: "Error", description: (error as Error).message });
        } finally {
            setIsDeleting(false);
            setOfferToDelete(null);
        }
    };

    const getStatus = (offer: Offer) => {
        const now = new Date();
        const endDate = new Date(offer.endDate);
        if (!offer.isActive) return { text: 'Inactive', variant: 'outline' as const };
        if (endDate < now) return { text: 'Expired', variant: 'destructive' as const };
        return { text: 'Active', variant: 'default' as const };
    };

    return (
        <>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Promo Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {offers.map((offer) => {
                    const status = getStatus(offer);
                    return (
                        <TableRow key={offer._id}>
                            <TableCell className="font-medium">{offer.title}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{offer.code}</Badge>
                            </TableCell>
                            <TableCell>{offer.discountPercentage}%</TableCell>
                            <TableCell>
                                <Badge variant={status.variant}>
                                    {status.text}
                                </Badge>
                            </TableCell>
                             <TableCell>{format(new Date(offer.endDate), "PPP")}</TableCell>
                            <TableCell className="text-right">{offer.usageCount}</TableCell>
                            <TableCell>
                               <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/offers/edit/${offer._id}`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => setOfferToDelete(offer)}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>

            <AlertDialog open={!!offerToDelete} onOpenChange={() => setOfferToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the offer
                        <span className="font-semibold"> {offerToDelete?.title}</span>.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Delete
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
