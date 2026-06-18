'use server';
/**
 * @fileOverview A Genkit flow for the NEXORA Stylist AI to suggest personalized, complete luxury outfits.
 *
 * - nexoraStylistAIRecommendations - A function that handles the outfit recommendation process.
 * - NEXORAStylistAIRecommendationsInput - The input type for the nexoraStylistAIRecommendations function.
 * - NEXORAStylistAIRecommendationsOutput - The return type for the nexoraStylistAIRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NEXORAStylistAIRecommendationsInputSchema = z.object({
  occasion: z
    .string()
    .describe('The specific occasion for which an outfit recommendation is needed (e.g., "evening gala", "casual brunch").'),
});
export type NEXORAStylistAIRecommendationsInput = z.infer<
  typeof NEXORAStylistAIRecommendationsInputSchema
>;

const NEXORAStylistAIRecommendationsOutputSchema = z.object({
  outfit: z
    .array(
      z.object({
        item: z.string().describe('The name or type of the luxury fashion item.'),
        description: z.string().describe('A brief description of the item.'),
        rationale: z
          .string()
          .describe("The stylist's reasoning for including this item in the outfit."),
      })
    )
    .describe('A curated list of luxury fashion items forming a complete outfit.'),
  overallRationale: z
    .string()
    .describe('An overall explanation of the styling choices for the recommended outfit.'),
});
export type NEXORAStylistAIRecommendationsOutput = z.infer<
  typeof NEXORAStylistAIRecommendationsOutputSchema
>;

export async function nexoraStylistAIRecommendations(
  input: NEXORAStylistAIRecommendationsInput
): Promise<NEXORAStylistAIRecommendationsOutput> {
  return nexoraStylistAIRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nexoraStylistAIRecommendationsPrompt',
  input: {schema: NEXORAStylistAIRecommendationsInputSchema},
  output: {schema: NEXORAStylistAIRecommendationsOutputSchema},
  prompt: `You are the NEXORA Stylist AI, an expert in luxury fashion curation for the discerning client. Your role is to provide personalized, complete luxury outfit recommendations for specific occasions, adhering to NEXORA's premium aesthetic.

Consider the occasion carefully and suggest an ensemble that exudes elegance, sophistication, and seamless style. Think about how each piece complements the others and the overall theme of the occasion. Justify your choices with detailed stylist's reasoning.

Occasion: {{{occasion}}}

Provide your recommendation in the specified JSON format, ensuring each item has a name, description, and rationale, followed by an overall styling rationale for the complete look.`,
});

const nexoraStylistAIRecommendationsFlow = ai.defineFlow(
  {
    name: 'nexoraStylistAIRecommendationsFlow',
    inputSchema: NEXORAStylistAIRecommendationsInputSchema,
    outputSchema: NEXORAStylistAIRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
