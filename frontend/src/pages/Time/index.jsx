import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import OnboardingHeader from '@/components/OnboardingHeader';
import { useState, useRef, useEffect } from 'react';

// Generate 24-hour times at 30-min intervals
const generateTimes = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    times.push(`${hour}:00`);
    times.push(`${hour}:30`);
  }
  return times;
};

const times = generateTimes();

export default function Time() {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const [selectedTime, setSelectedTime] = useState('07:00');
  const scrollRef = useRef(null);

  // Scroll to selected time on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        const selectedEl = scrollRef.current.querySelector('[data-time="07:00"]');
        if (selectedEl) {
          selectedEl.scrollIntoView({ block: 'center' });
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setUser({ deliveryTime: selectedTime });
    navigate('/notification');
  };

  return (
    <div className="relative flex flex-col min-h-full bg-background text-foreground p-6 pt-16 overflow-hidden">
      <OnboardingHeader step={4} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 relative z-10">
        <h1 className="text-3xl font-bold mb-2">When do you<br/><span className="font-heading italic text-primary">want your brief?</span></h1>
        <p className="text-muted-foreground text-sm mt-2">Nuzio will have your brief ready and waiting each day.</p>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center relative w-full mt-4">
        {/* Mock Wheel Picker Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-20" />
        
        {/* Fixed Highlight Bar */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-20 bg-card border border-border rounded-3xl pointer-events-none z-0 shadow-lg" />

        <div 
          ref={scrollRef}
          onScroll={(e) => {
            const container = e.target;
            const containerCenter = container.getBoundingClientRect().top + container.offsetHeight / 2;
            let closestTime = null;
            let closestDistance = Infinity;
            
            const elements = container.querySelectorAll('[data-time]');
            elements.forEach(el => {
              const rect = el.getBoundingClientRect();
              const elCenter = rect.top + rect.height / 2;
              const distance = Math.abs(containerCenter - elCenter);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestTime = el.getAttribute('data-time');
              }
            });

            if (closestTime && closestTime !== selectedTime) {
              setSelectedTime(closestTime);
            }
          }}
          className="flex flex-col items-center py-40 w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar absolute inset-0 z-10"
        >
          {times.map((t) => (
            <div 
              key={t}
              data-time={t}
              onClick={() => {
                const el = scrollRef.current.querySelector(`[data-time="${t}"]`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`snap-center shrink-0 h-20 w-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                selectedTime === t 
                  ? 'text-5xl font-bold text-white' 
                  : 'text-2xl text-muted-foreground/40 font-semibold hover:text-muted-foreground/70'
              }`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 relative z-10 bg-background/80 backdrop-blur-md pb-6 -mx-6 px-6">
        <button 
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
