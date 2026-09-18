import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import api from '@/services/api';

export default function AllSet() {
  const navigate = useNavigate();
  const { user } = useAppStore();

  const [isSaving, setIsSaving] = React.useState(false);

  const handleStart = async () => {
    setIsSaving(true);
    try {
      if (user._id) {
        await api.post('/users/preferences', {
          userId: user._id,
          language: user.language,
          profession: user.profession,
          interests: user.interests,
          voice: user.voice,
          briefLength: user.briefLength,
          deliveryTime: user.deliveryTime,
        });
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSaving(false);
      navigate('/home');
    }
  };

  // Safe fallbacks for data
  const profession = user.profession ? user.profession.charAt(0).toUpperCase() + user.profession.slice(1) : 'Technology';
  const interestsCount = user.interests.length;
  const nichesText = interestsCount > 0 
    ? `${user.interests.slice(0, 3).map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}${interestsCount > 3 ? ` +${interestsCount - 3}` : ''}`
    : 'AI, Markets, Startups +1';
  const voiceInfo = user.voice === 'meera' ? 'Meera — Indian, bright' : user.voice === 'kai' ? 'Kai — American, crisp' : 'Aria — British, warm';
  
  return (
    <div className="relative flex flex-col h-full bg-background text-foreground p-6 pt-12 overflow-hidden">
      {/* Background Blob */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="text-[10px] text-green-500 font-bold tracking-widest uppercase flex items-center gap-2">
          <span>✓</span> ALL SET
        </div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center mb-4 relative z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400 p-[2px] mb-4">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">
          You're ready,<br/>
          <span className="font-heading italic text-emerald-400">{user.name ? user.name.split(' ')[0] : 'Professional'}.</span>
        </h1>
        <p className="text-muted-foreground text-[11px] text-center max-w-[260px] leading-tight">
          Your first brief will be ready tomorrow at {user.deliveryTime || '7:00 AM'}.
          <br/>We're already curating.
        </p>
      </motion.div>

      <div className="mb-2 text-[10px] text-primary font-bold tracking-widest uppercase relative z-10">YOUR BRIEF PROFILE</div>

      <div className="space-y-2.5 mb-2 overflow-y-auto hide-scrollbar flex-1 relative z-10">
        
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-2.5">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-sm">💻</div>
          <div className="flex-1">
            <div className="text-[9px] text-muted-foreground uppercase font-bold mb-0.5">Profession</div>
            <div className="font-bold text-xs">{profession}</div>
          </div>
          <div className="text-emerald-400 text-sm">✓</div>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-2.5">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-sm">📡</div>
          <div className="flex-1">
            <div className="text-[9px] text-muted-foreground uppercase font-bold mb-0.5">Niches</div>
            <div className="font-bold text-xs">{nichesText}</div>
          </div>
          <div className="text-emerald-400 text-sm">✓</div>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-2.5">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-sm">🎙️</div>
          <div className="flex-1">
            <div className="text-[9px] text-muted-foreground uppercase font-bold mb-0.5">Voice</div>
            <div className="font-bold text-xs">{voiceInfo}</div>
          </div>
          <div className="text-emerald-400 text-sm">✓</div>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-2.5">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-sm">⏱️</div>
          <div className="flex-1">
            <div className="text-[9px] text-muted-foreground uppercase font-bold mb-0.5">Length</div>
            <div className="font-bold text-xs">{user.briefLength || 5} stories · ~18 min</div>
          </div>
          <div className="text-emerald-400 text-sm">✓</div>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-2.5">
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-sm">🌅</div>
          <div className="flex-1">
            <div className="text-[9px] text-muted-foreground uppercase font-bold mb-0.5">Delivery</div>
            <div className="font-bold text-xs">Daily at {user.deliveryTime || '7:00 AM'}</div>
          </div>
          <div className="text-emerald-400 text-sm">✓</div>
        </div>

      </div>

      <div className="mt-auto relative z-10">
        <button 
          onClick={handleStart}
          disabled={isSaving}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-blue-500 text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSaving ? 'Saving profile...' : 'Start listening →'}
        </button>
      </div>
    </div>
  );
}
