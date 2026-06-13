'use server';
/**
 * @fileOverview An AI agent that drafts technical case studies from raw project descriptions.
 *
 * - draftCaseStudy - A function that handles the case study drafting process.
 * - DraftCaseStudyInput - The input type for the draftCaseStudy function.
 * - DraftCaseStudyOutput - The return type for the draftCaseStudy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftCaseStudyInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('Raw description of the project, including technical details, challenges, and solutions.'),
  targetAudience: z.string().describe('The intended audience for the case study (e.g., potential clients, technical recruiters, developers).'),
  tone: z.string().describe('The desired tone for the case study (e.g., professional, innovative, detailed, concise).'),
});
export type DraftCaseStudyInput = z.infer<typeof DraftCaseStudyInputSchema>;

const DraftCaseStudyOutputSchema = z.object({
  caseStudy: z.string().describe('The drafted technical case study.'),
});
export type DraftCaseStudyOutput = z.infer<typeof DraftCaseStudyOutputSchema>;

export async function draftCaseStudy(input: DraftCaseStudyInput): Promise<DraftCaseStudyOutput> {
  return draftCaseStudyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftCaseStudyPrompt',
  input: {schema: DraftCaseStudyInputSchema},
  output: {schema: DraftCaseStudyOutputSchema},
  prompt: `You are an expert technical writer specializing in creating professional and engaging case studies.

Draft a comprehensive technical case study based on the following project description, tailored for the specified audience and tone.

Focus on clearly articulating the technical challenges, the solutions implemented, and the positive outcomes. Structure the case study with a clear introduction, problem statement, solution overview, technical implementation details, results/impact, and a conclusion.

Project Description: {{{projectDescription}}}
Target Audience: {{{targetAudience}}}
Desired Tone: {{{tone}}}`,
});

const draftCaseStudyFlow = ai.defineFlow(
  {
    name: 'draftCaseStudyFlow',
    inputSchema: DraftCaseStudyInputSchema,
    outputSchema: DraftCaseStudyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
