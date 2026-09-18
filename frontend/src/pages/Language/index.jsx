import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import LogoHeader from '@/components/LogoHeader';
export default function Language() {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();

  return (
    <div className="relative flex flex-col min-h-full bg-background text-foreground p-6 pt-16 overflow-hidden">
      {/* Background Blob */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 relative z-10">
        <LogoHeader />
        
        <h1 className="text-3xl font-bold mb-2">Choose your<br/><span className="font-heading italic text-primary font-normal">language</span></h1>
        <p className="text-muted-foreground text-sm">Select the language for your daily brief.</p>
      </motion.div>

      <div className="space-y-4 relative z-10">
        <button 
          onClick={() => setUser({ language: 'en' })}
          className={`w-full p-4 rounded-2xl flex items-center gap-4 border transition-all ${user.language === 'en' ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
        >
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">GB</div>
          <div className="flex-1 text-left">
            <div className="font-semibold">English</div>
            <div className="text-xs text-muted-foreground">Briefings delivered in English</div>
          </div>
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${user.language === 'en' ? 'border-primary' : 'border-muted-foreground'}`}>
            {user.language === 'en' && <div className="w-3 h-3 rounded-full bg-primary" />}
          </div>
        </button>

        <button 
          onClick={() => setUser({ language: 'hi' })}
          className={`w-full p-4 rounded-2xl flex items-center gap-4 border transition-all ${user.language === 'hi' ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
        >
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">IN</div>
          <div className="flex-1 text-left">
            <div className="font-semibold">हिन्दी</div>
            <div className="text-xs text-muted-foreground">हिन्दी में समाचार सुनें</div>
          </div>
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${user.language === 'hi' ? 'border-primary' : 'border-muted-foreground'}`}>
            {user.language === 'hi' && <div className="w-3 h-3 rounded-full bg-primary" />}
          </div>
        </button>
      </div>

      <div className="mt-8 p-4 rounded-2xl border border-border bg-card flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">📍</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">Enable Location</div>
          <div className="text-xs text-muted-foreground">Get hyperlocal news tailored to your city.</div>
        </div>
      </div>

      <div className="mt-auto pt-8 relative z-10">
        <button 
          onClick={() => navigate('/login')}
          className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
