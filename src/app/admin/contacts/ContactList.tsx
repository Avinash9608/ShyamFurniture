
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Trash, Loader2 } from 'lucide-react';
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

type Contact = {
    _id: string;
    name: string;
    email: string;
    status: 'new' | 'replied';
    createdAt: string;
}

export function ContactList() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchContacts() {
            setLoading(true);
            try {
                const res = await fetch('/api/admin/contacts');
                if (!res.ok) throw new Error('Failed to fetch contacts');
                const data = await res.json();
                setContacts(data);
            } catch (e) {
                toast({ variant: 'destructive', title: 'Error', description: (e as Error).message });
            } finally {
                setLoading(false);
            }
        }
        fetchContacts();
    }, [toast]);

    const handleDelete = async () => {
        if (!contactToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/admin/contacts/${contactToDelete._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete contact.');
            }

            setContacts(contacts.filter(c => c._id !== contactToDelete._id));
            toast({ title: "Contact deleted successfully!" });
        } catch (error) {
            toast({ variant: 'destructive', title: "Error", description: (error as Error).message });
        } finally {
            setIsDeleting(false);
            setContactToDelete(null);
        }
    };
    
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-8"><Loader2 className="animate-spin mr-2" /> Loading contacts...</div>
            ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {contacts.map((contact) => (
                    <TableRow key={contact._id}>
                    <TableCell>{format(new Date(contact.createdAt), "PPP")}</TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                        <Badge variant={contact.status === 'new' ? 'destructive' : 'default'}>
                        {contact.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
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
                                    <Link href={`/admin/contacts/${contact._id}`} className="flex items-center">
                                        <Eye className="mr-2 h-4 w-4" /> View
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600 flex items-center"
                                    onClick={() => setContactToDelete(contact)}
                                >
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            )}
            <AlertDialog open={!!contactToDelete} onOpenChange={() => setContactToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the message from
                        <span className="font-semibold"> {contactToDelete?.name}</span>.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Delete
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
