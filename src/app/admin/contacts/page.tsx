
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';

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
              {contacts.map((contact: any) => (
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
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/contacts/${contact._id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    );
}

