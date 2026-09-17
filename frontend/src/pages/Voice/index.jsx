import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import OnboardingHeader from '@/components/OnboardingHeader';

const voices = [
  { id: 'aria', name: 'Aria', tag: 'EN', desc: 'Warm · Unhurried · British, ♀', langDesc: 'English', color: 'bg-primary' },
  { id: 'kai', name: 'Kai', tag: 'EN', desc: 'Crisp · Focused · American, ♂', langDesc: 'English', color: 'bg-blue-500' },
  { id: 'meera', name: 'Meera', tag: 'HI', desc: 'Bright · Curious · Indian, ♀', langDesc: 'Hindi', color: 'bg-cyan-500' },
];

export default function Voice() {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 pt-12 overflow-hidden">
      <OnboardingHeader step={3} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h1 className="text-3xl font-bold mb-1">Pick a<br/><span className="font-heading italic text-primary">narrator voice.</span></h1>
        <p className="text-muted-foreground text-sm mt-2">Tap ▶ to hear a 10-second sample.</p>
      </motion.div>

      <div className="space-y-3 mb-4">
        {voices.map((v) => {
          const isSelected = user.voice === v.id;
          return (
            <div 
              key={v.id} 
              onClick={() => setUser({ voice: v.id })}
              className={`p-3 rounded-2xl flex items-center gap-3 border cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
            >
              <div className={`w-10 h-10 rounded-full ${v.color} flex items-center justify-center text-white font-bold text-base`}>
                {v.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{v.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-bold">{v.tag}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{v.desc}</div>
                <div className="text-[10px] text-muted-foreground italic mt-0.5">{v.langDesc}</div>
              </div>
              <div className="flex items-center gap-2">
                {isSelected && <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-black text-xs font-bold">✓</div>}
                <button className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-xs">
                  ▶
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto">
        <div className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1">BRIEF LENGTH</div>
        <h2 className="text-2xl font-bold mb-1">How long is<br/><span className="font-heading italic text-primary">your morning?</span></h2>
        <p className="text-muted-foreground text-xs mb-3">Set your ideal brief length.</p>
        
        <div className="flex gap-2 mb-4">
          {[5, 10, 15].map(len => (
            <button 
              key={len}
              onClick={() => setUser({ briefLength: len })}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${user.briefLength === len ? 'bg-primary text-white border-primary' : 'bg-card border-border hover:bg-muted'}`}
            >
              {len} min
            </button>
          ))}
          <button className="flex-1 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold hover:bg-muted">
            Custom
          </button>
        </div>

        <button 
          onClick={() => navigate('/time')}
          disabled={!user.voice}
          className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold disabled:opacity-50 transition-opacity flex justify-center items-center gap-2"
        >
          Continue with {voices.find(v => v.id === user.voice)?.name || 'Aria'} · {user.briefLength} stories →
        </button>
      </motion.div>
    </div>
  );
}
