
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { ContactList } from './ContactList';

export const revalidate = 0;

async function getContacts() {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(contacts));
}

export default async function AdminContactsPage() {
    const contacts = await getContacts();

    return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Contact Submissions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            Messages received from the contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactList initialContacts={contacts} />
        </CardContent>
      </Card>
    </div>
    );
}
