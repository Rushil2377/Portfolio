'use client';

import React, { useState } from 'react';
import { draftCaseStudy } from '@/ai/flows/draft-case-study-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Send, Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function CaseStudyTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const { caseStudy } = await draftCaseStudy({
        projectDescription: formData.get('description') as string,
        targetAudience: formData.get('audience') as string,
        tone: formData.get('tone') as string,
      });
      setResult(caseStudy);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Drafting failed',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-tool" className="py-24 px-6 md:px-12 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-accent text-accent">AI-Powered Intelligence</Badge>
          <h2 className="font-headline text-4xl font-bold mb-4">Case Study <span className="text-accent">Generator</span></h2>
          <p className="text-muted-foreground">Transform raw technical notes into professional, recruiter-ready case studies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <Card className="border-white/10 bg-black/40 backdrop-blur-md flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-xl">Project Details</CardTitle>
              <CardDescription>Input your project parameters</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full">
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="E.g., Built a microservices architecture using Go and Kafka to handle 10k req/s..." 
                    className="min-h-[150px] md:flex-grow bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Input id="audience" name="audience" placeholder="Technical Recruiter" className="bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Input id="tone" name="tone" placeholder="Innovative & Detailed" className="bg-white/5 border-white/10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/80 text-black font-bold h-12" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin" /> Drafting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Generate Draft
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="relative">
            {result ? (
              <Card className="h-full border-accent/20 bg-accent/[0.02] overflow-hidden flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg text-accent">Generated Draft</CardTitle>
                  <Button size="icon" variant="ghost" onClick={copyToClipboard} className="hover:bg-accent/10">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="flex-1  overflow-y-auto subtle-scrollbar min-h-0">
                  <div className="prose prose-invert prose-sm overflow-y-auto h-64">
                    <p className="whitespace-pre-wrap text-sm text-foreground/90 font-body leading-relaxed pb-6">
                      {result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl opacity-40">
                <Sparkles className="w-12 h-12 mb-4 text-accent/50" />
                <p className="text-sm">Enter project details to generate your first draft</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
