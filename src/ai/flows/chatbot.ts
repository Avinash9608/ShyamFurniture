'use server';

/**
 * @fileOverview A chatbot flow for Shyam Furniture.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const MessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    system: `You are a friendly and helpful customer support assistant for Shyam Furniture, a premium furniture retailer in Saharsa, Bihar.

Your goal is to answer user questions about products, services, and company information. Be concise and conversational.

Use the provided conversation history to maintain context.

Company Information:
- Location: Saharsa, Bihar. Delivery is currently limited to this region.
- Ordering: Via WhatsApp or email.
- Custom Orders: Yes, custom orders are accepted.
- Delivery Time: 3-7 working days.
- Payment: UPI, bank transfer, cash on delivery.
- Physical Store: Yes, there is a showroom in Saharsa.
- Return Policy: Only for damaged/defective items reported within 24 hours.
`,
    prompt: `{{#each history}}
{{role}}: {{{content}}}
{{/each}}
user: {{{message}}}
model:`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return { response: output!.response };
  }
);
