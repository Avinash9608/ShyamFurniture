
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ContactList } from './ContactList';

export default function AdminContactsPage() {
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
          <ContactList />
        </CardContent>
      </Card>
    </div>
    );
}
