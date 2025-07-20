
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Mail, MessageCircle } from "lucide-react";
import { useRouter } from 'next/navigation';

const replyFormSchema = z.object({
  replyMessage: z.string().min(10, "Reply must be at least 10 characters."),
});

type ReplyFormValues = z.infer<typeof replyFormSchema>;

type Contact = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
}

export function ReplyForm({ contact }: { contact: Contact }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replyFormSchema),
    defaultValues: {
        replyMessage: `Hi ${contact.name},\n\nThank you for reaching out to Shyam Furniture.\n\n`,
    }
  });

  async function handleEmailReply(data: ReplyFormValues) {
    setIsSubmitting(true);
    try {
        const response = await fetch(`/api/admin/contacts/${contact._id}/reply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: contact.email,
                message: data.replyMessage,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to send email.");
        }
        
        toast({ title: "Reply sent successfully via Email!" });
        router.refresh();

    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: (error as Error).message });
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleWhatsAppReply = (data: ReplyFormValues) => {
    if (!contact.phone) {
        toast({ variant: "destructive", title: "No Phone Number", description: "This contact does not have a phone number."});
        return;
    }
    const whatsappUrl = `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(data.replyMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reply to {contact.name}</CardTitle>
        <CardDescription>Compose your reply below. The status will be updated to "replied" after a successful email send.</CardDescription>
      </CardHeader>
      <CardContent>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEmailReply)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="replyMessage"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Your reply..."
                            rows={8}
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-2">
                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={form.handleSubmit(handleWhatsAppReply)} 
                        disabled={isSubmitting || !contact.phone}
                    >
                         <MessageCircle className="mr-2" /> Reply via WhatsApp
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                         {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                         <Mail className="mr-2" /> Reply via Email
                    </Button>
                </div>
            </form>
         </Form>
      </CardContent>
    </Card>
  );
}
