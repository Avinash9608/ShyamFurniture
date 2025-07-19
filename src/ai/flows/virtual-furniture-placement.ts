'use server';

/**
 * @fileOverview A virtual furniture placement AI agent.
 *
 * - virtualFurniturePlacement - A function that handles the furniture placement process.
 * - VirtualFurniturePlacementInput - The input type for the virtualFurniturePlacement function.
 * - VirtualFurniturePlacementOutput - The return type for the virtualFurniturePlacement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualFurniturePlacementInputSchema = z.object({
  roomPhotoDataUri: z
    .string()
    .describe(
      "A photo of the room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  furniturePhotoDataUri: z
    .string()
    .describe(
      "A photo of the furniture, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The description of the room and furniture.'),
});
export type VirtualFurniturePlacementInput = z.infer<typeof VirtualFurniturePlacementInputSchema>;

const VirtualFurniturePlacementOutputSchema = z.object({
  placedFurniturePhotoDataUri: z
    .string()
    .describe(
      'A photo of the room with the furniture virtually placed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type VirtualFurniturePlacementOutput = z.infer<typeof VirtualFurniturePlacementOutputSchema>;

export async function virtualFurniturePlacement(
  input: VirtualFurniturePlacementInput
): Promise<VirtualFurniturePlacementOutput> {
  return virtualFurniturePlacementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'virtualFurniturePlacementPrompt',
  input: {schema: VirtualFurniturePlacementInputSchema},
  output: {schema: VirtualFurniturePlacementOutputSchema},
  prompt: `You are an expert interior designer specializing in virtually placing furniture in rooms.

You will use the information about the room and furniture to place the furniture in the room.

Description: {{{description}}}
Room Photo: {{media url=roomPhotoDataUri}}
Furniture Photo: {{media url=furniturePhotoDataUri}}

Create a new image with the furniture placed in the room.  The output should be a data URI of the new image.`,
});

const virtualFurniturePlacementFlow = ai.defineFlow(
  {
    name: 'virtualFurniturePlacementFlow',
    inputSchema: VirtualFurniturePlacementInputSchema,
    outputSchema: VirtualFurniturePlacementOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.roomPhotoDataUri}},
        {media: {url: input.furniturePhotoDataUri}},
        {text: `Place the furniture in the room, taking into account the description: ${input.description}`},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return {placedFurniturePhotoDataUri: media!.url};
  }
);
