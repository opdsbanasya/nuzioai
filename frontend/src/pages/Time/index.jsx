import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import OnboardingHeader from '@/components/OnboardingHeader';
import { useState } from 'react';

export default function Time() {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const [ampm, setAmpm] = useState('AM');
  const [selectedTime, setSelectedTime] = useState('7:00');

  const times = ['5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30'];

  const handleContinue = () => {
    setUser({ deliveryTime: `${selectedTime} ${ampm}` });
    navigate('/notification');
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 pt-12 overflow-hidden">
      <OnboardingHeader step={4} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold mb-2">When do you<br/><span className="font-heading italic text-primary">want your brief?</span></h1>
        <p className="text-muted-foreground text-sm mt-2">Nuzio will have your brief ready and waiting each morning.</p>
      </motion.div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setAmpm('AM')}
          className={`flex-1 py-3 rounded-xl font-bold text-lg transition-colors ${ampm === 'AM' ? 'bg-primary text-white' : 'bg-card text-muted-foreground'}`}
        >
          AM
        </button>
        <button 
          onClick={() => setAmpm('PM')}
          className={`flex-1 py-3 rounded-xl font-bold text-lg transition-colors ${ampm === 'PM' ? 'bg-primary text-white' : 'bg-card text-muted-foreground'}`}
        >
          PM
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative overflow-hidden h-48">
        {/* Mock Wheel Picker */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-10" />
        <div className="flex flex-col items-center gap-4 py-8 w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
          {times.map((t) => (
            <div 
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`snap-center cursor-pointer transition-all ${selectedTime === t ? 'text-5xl font-bold text-white bg-card w-full text-center py-4 rounded-2xl' : 'text-2xl text-muted-foreground/50 font-semibold'}`}
            >
              {t} {selectedTime === t && <span className="text-xl text-primary font-bold ml-1">{ampm}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <button 
          onClick={handleContinue}
          className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
