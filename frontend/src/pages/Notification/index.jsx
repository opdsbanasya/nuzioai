import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import OnboardingHeader from '@/components/OnboardingHeader';

export default function Notification() {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();

  const handleAllow = () => {
    setUser({ notifications: true });
    navigate('/all-set');
  };

  const handleSkip = () => {
    setUser({ notifications: false });
    navigate('/all-set');
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 pt-12 overflow-hidden">
      <OnboardingHeader step={5} skipTo="/home" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Stay in<br/><span className="font-heading italic text-primary">the loop.</span></h1>
        <p className="text-muted-foreground text-sm mt-2">Turn on notifications so you never miss your brief.</p>
      </motion.div>

      <div className="bg-card border-border border rounded-2xl p-4 mb-4 relative overflow-hidden">
        <div className="absolute top-2 right-4 text-[10px] text-muted-foreground uppercase font-bold">Now</div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-primary rounded" />
          <span className="font-bold text-xs">Nuzio</span>
        </div>
        <div className="font-bold mb-1 flex items-center gap-2 text-sm">
          <span>🌅</span> Your morning brief is ready
        </div>
        <div className="text-[11px] text-muted-foreground line-clamp-1">
          {user.briefLength || 5} stories · {user.interests.length > 0 ? user.interests.slice(0,2).join(', ') : 'AI & Tech, Markets'}... · Voice: {user.voice || 'Aria'} · 18:30
        </div>
      </div>

      <div className="mb-2 text-[10px] text-primary font-bold tracking-widest uppercase">WHAT YOU'LL RECEIVE</div>

      <div className="space-y-4 mb-4">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-lg">🌅</div>
          <div className="flex-1">
            <div className="font-bold flex justify-between text-sm">
              <span>Morning brief ready</span>
              <span className="text-[10px] text-muted-foreground font-normal">Daily · {user.deliveryTime || '7:00 AM'}</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Your daily audio briefing is waiting</div>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-lg">⚡</div>
          <div className="flex-1">
            <div className="font-bold flex justify-between text-sm">
              <span>Breaking story</span>
              <span className="text-[10px] text-muted-foreground font-normal">When it happens</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">A major story just broke in your niches</div>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-lg">📌</div>
          <div className="flex-1">
            <div className="font-bold flex justify-between text-sm">
              <span>Weekly digest</span>
              <span className="text-[10px] text-muted-foreground font-normal">Sundays · 9:00 AM</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">The most-saved stories from this week</div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <button 
          onClick={handleAllow}
          className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Allow notifications
        </button>
        <button 
          onClick={handleSkip}
          className="w-full py-3.5 rounded-2xl text-muted-foreground font-semibold hover:text-foreground transition-colors"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
