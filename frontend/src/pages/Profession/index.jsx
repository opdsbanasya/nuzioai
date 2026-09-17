import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import OnboardingHeader from '@/components/OnboardingHeader';

const professions = [
  { id: 'finance', label: 'Finance & Trading', icon: '📈' },
  { id: 'legal', label: 'Legal', icon: '⚖️' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'health', label: 'Healthcare', icon: '🩺' },
  { id: 'consulting', label: 'Consulting', icon: '💼' },
  { id: 'marketing', label: 'Marketing & Media', icon: '📣' },
  { id: 'gov', label: 'Government & Policy', icon: '🏛️' },
  { id: 'realestate', label: 'Real Estate', icon: '🏢' },
  { id: 'edu', label: 'Education', icon: '🎓' },
  { id: 'founder', label: 'Founder / Builder', icon: '🚀' },
];

export default function Profession() {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6 pt-16">
      <OnboardingHeader step={1} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">What's your<br/><span className="font-heading italic text-primary">profession?</span></h1>
        <p className="text-muted-foreground text-sm mt-4">We'll tune every brief to what actually moves your day.</p>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {professions.map((prof) => (
          <button
            key={prof.id}
            onClick={() => setUser({ profession: prof.id })}
            className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 transition-colors ${user.profession === prof.id ? 'border-primary bg-primary/20 text-primary font-medium' : 'border-border bg-card hover:bg-muted'}`}
          >
            <span>{prof.icon}</span> {prof.label} {user.profession === prof.id && '✓'}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <button 
          onClick={() => navigate('/interests')}
          disabled={!user.profession}
          className="w-full py-4 rounded-2xl bg-primary text-white font-semibold disabled:opacity-50 transition-opacity"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
