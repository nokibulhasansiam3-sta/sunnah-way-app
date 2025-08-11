'use server';
/**
 * @fileOverview A simple text translation flow.
 *
 * - translateText - A function that translates text to a target language.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslationInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.string().describe('The language to translate the text into (e.g., "Bengali", "Urdu").'),
});

export async function translateText(text: string, targetLanguage: string): Promise<string> {
    return translateFlow({ text, targetLanguage });
}

const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: TranslationInputSchema,
    outputSchema: z.string(),
  },
  async ({ text, targetLanguage }) => {
    const prompt = `Translate the following text into ${targetLanguage}. Provide only the translation, without any additional comments or explanations. Text: "${text}"`;
    
    const { output } = await ai.generate({
      model: 'googleai/gemini-1.5-flash-preview',
      prompt,
    });
    
    return output || 'Translation not available.';
  }
);
