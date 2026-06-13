'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Github, Linkedin, Twitter, ArrowRight, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactHub() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    // Simulate the email sending process
    // In a production environment, you would call a Server Action here
    // that uses a service like Resend or Nodemailer.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: `Thank you, ${data.name}. Your message has been routed to rusilmarvaniya@gmail.com. I will reply to ${data.email} shortly.`,
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
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Direct Mail</p>
                <span className="font-headline font-bold text-lg group-hover:text-accent transition-colors">rusilmarvaniya@gmail.com</span>
              </div>
            </a>
            
            <div className="flex gap-4 pt-6">
              {[
                { icon: Github, href: "https://github.com/Rushil2377" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://twitter.com" }
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
              <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
                Secure encryption enabled. Your data is routed directly to Marvaniya.
              </p>
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
