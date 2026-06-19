'use client';

import { useAuth } from '@/context/AuthContext';

export default function SiteNavLinks() {
  const { isAdmin, loading } = useAuth();

  return (
    <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.3em] font-bold text-white/70">
      <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
      <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
      {!loading && !isAdmin && (
        <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
      )}
    </div>
  );
}
