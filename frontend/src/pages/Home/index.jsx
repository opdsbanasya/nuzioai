import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainHeader from '@/components/MainHeader';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const { user } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[100dvh] bg-background text-foreground overflow-hidden">
      <MainHeader />

      {/* Categories */}
      <div className="px-6 flex gap-2 overflow-x-auto hide-scrollbar mb-4 shrink-0">
        <button className="px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary text-[11px] font-semibold whitespace-nowrap">All</button>
        {user.interests.length > 0 ? (
          user.interests.map(i => (
            <button key={i} className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap capitalize">
              {i}
            </button>
          ))
        ) : (
          <>
            <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap">AI & Tech</button>
            <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap">Markets</button>
            <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap">Startups</button>
          </>
        )}
      </div>

      {/* Greeting */}
      <div className="px-6 mb-4 shrink-0">
        <div className="text-[9px] text-primary font-bold tracking-widest uppercase flex items-center gap-2 mb-1">
          <span>SUNDAY · 12 JULY</span> <span className="w-1 h-1 bg-border rounded-full" /> <span>MORNING BRIEF</span>
        </div>
        <h1 className="text-3xl font-heading mb-0 text-gray-200">Good morning, Aarav —</h1>
        <h2 className="text-3xl font-heading italic text-primary">{user.briefLength || 5} things.</h2>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-secondary font-medium">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Audio live <span className="text-muted-foreground">· Voice: {user.voice || 'Aria'} · {user.briefLength || 5} stories · 18:30</span>
        </div>
      </div>

      {/* Audio Card */}
      <div className="px-6 mb-4 flex-1 min-h-0 flex flex-col justify-center">
        <div className="bg-card border border-border rounded-3xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between h-full max-h-[380px]">
           <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 shrink-0">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> NOW PLAYING · AI & TECH
             </div>
             <div>01 / {user.briefLength || 5}</div>
           </div>
           
           <h3 className="text-xl font-bold mb-2 leading-tight shrink-0">Anthropic ships Claude 4.5 with 2M-token memory and native tools.</h3>
           
           <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2 shrink-0">
             THE VERGE <span className="w-1 h-1 bg-border rounded-full" /> 3 MIN <span className="w-1 h-1 bg-border rounded-full" /> SOURCE ↗
           </div>
           
           <p className="text-muted-foreground text-xs line-clamp-2 mb-3 shrink-0">
             OpenAI unveils on-device model rivaling GPT-4...
           </p>
           
           {/* Waveform Mock */}
           <div className="flex items-end justify-between h-8 gap-1 mb-2 shrink-0">
             {Array.from({length: 40}).map((_, i) => (
               <div key={i} className={`w-1 rounded-full ${i < 15 ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
             ))}
           </div>
           
           <div className="flex justify-between text-[10px] text-muted-foreground font-mono mb-3 shrink-0">
             <span>02:14</span>
             <span>-03:47</span>
           </div>
           
           <div className="flex items-center justify-between shrink-0">
             <button className="text-muted-foreground hover:text-foreground">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
             </button>
             <button className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(139,92,246,0.3)]">
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
               </div>
             </button>
             <button className="text-muted-foreground hover:text-foreground">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
             </button>
             <button className="text-muted-foreground hover:text-foreground">
                <span className="text-sm font-bold">1×</span>
             </button>
           </div>
        </div>
      </div>

      <div className="px-6 flex items-center gap-3 text-muted-foreground text-xs pb-24 shrink-0">
        <span className="text-primary animate-pulse">🎙️</span>
        <span className="font-bold line-clamp-1 flex-1">Now narrating — Anthropic ships Claude 4.5 with 2M-token...</span>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
