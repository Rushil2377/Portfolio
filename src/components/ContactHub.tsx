
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Github, Linkedin, Twitter, ArrowRight, Loader2, Send, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/app/actions/send-email';

export default function ContactHub() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: (
            <div className="flex flex-col gap-2">
              <p>Thank you, {data.name}. A confirmation email has been sent to {data.email}.</p>
              <div className="flex items-center gap-2 text-accent font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>"We are reply as soon as possible."</span>
              </div>
            </div>
          ),
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Could not send email. Please try again later.</span>
          </div>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
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
            Open for collaborations, interesting technical challenges, or just a virtual coffee.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:rushilmarvaniya@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                <span className="font-headline font-bold text-lg group-hover:text-accent transition-colors">rushilmarvaniya@gmail.com</span>
              </div>
            </a>

            <a href="tel:+919558415136" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                <span className="font-headline font-bold text-lg group-hover:text-accent transition-colors">+91 9558415136</span>
              </div>
            </a>
            
            <div className="flex gap-4 pt-6">
              {[
                { icon: Github, href: "https://github.com/Rushil2377" },
                { icon: Linkedin, href: "https://github.com/Rushil2377" },
                { icon: Twitter, href: "https://github.com/Rushil2377" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/5 transition-all text-muted-foreground hover:text-accent"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
          <div className="bg-white/[0.02] backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-accent" />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Your Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" className="bg-transparent border-white/10 focus:border-accent transition-colors h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Your Email</Label>
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
                className="w-full h-14 bg-accent hover:bg-accent/80 text-black font-bold text-lg group rounded-xl"
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
      </div>
      
      <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-bold text-white tracking-tighter uppercase">Vertex Studio</p>
          <p className="text-xs font-light">© 2024 Marvaniya Rusilkumar P. All rights reserved.</p>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </footer>
    </section>
  );
}
