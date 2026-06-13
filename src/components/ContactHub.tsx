
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Github, Linkedin, Twitter, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactHub() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon at rusilmarvaniya@gmail.com.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8 tracking-tighter">
            Let's build <br />
            <span className="text-accent">the next vertex.</span>
          </h2>
          <p className="text-muted-foreground text-xl mb-12 max-w-md">
            Open for collaborations, interesting technical challenges, or just a virtual coffee about 3D web.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:rusilmarvaniya@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <span className="font-headline font-bold text-lg group-hover:text-accent transition-colors">rusilmarvaniya@gmail.com</span>
            </a>
            
            <div className="flex gap-4 pt-6">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/5 transition-all text-muted-foreground hover:text-accent">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" className="bg-transparent border-white/10 focus:border-accent transition-colors h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" className="bg-transparent border-white/10 focus:border-accent transition-colors h-12" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">Subject</Label>
              <Input id="subject" name="subject" placeholder="Project Opportunity" className="bg-transparent border-white/10 focus:border-accent transition-colors h-12" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</Label>
              <Textarea id="message" name="message" placeholder="Tell me about your project..." className="bg-transparent border-white/10 focus:border-accent transition-colors min-h-[150px]" required />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 bg-accent hover:bg-accent/80 text-black font-bold text-lg group"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Send Message
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
      
      <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted-foreground text-sm font-light">© 2024 Vertex Studio. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </footer>
    </section>
  );
}
