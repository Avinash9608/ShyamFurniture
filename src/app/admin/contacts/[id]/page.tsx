
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReplyForm } from './ReplyForm';
import { format } from 'date-fns';

async function getContact(id: string) {
    await dbConnect();
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return null;
        }
        return JSON.parse(JSON.stringify(contact));
    } catch (error) {
        return null;
    }
}

export default async function ContactDetailPage({ params }: { params: { id: string } }) {
    const contact = await getContact(params.id);

    if (!contact) {
        notFound();
    }

    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold">Contact Inquiry</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Message from {contact.name}</CardTitle>
                            <CardDescription>
                                Received on {format(new Date(contact.createdAt), 'PPP p')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{contact.message}</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Contact Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><strong>Name:</strong> {contact.name}</p>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Phone:</strong> {contact.phone || 'N/A'}</p>
                            <p><strong>Address:</strong> {contact.address || 'N/A'}</p>
                            <p><strong>Status:</strong> <Badge variant={contact.status === 'new' ? 'destructive' : 'default'}>{contact.status}</Badge></p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ReplyForm contact={contact} />
        </div>
    );
}

