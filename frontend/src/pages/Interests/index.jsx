import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import OnboardingHeader from '@/components/OnboardingHeader';

const niches = [
  { id: 'ai', label: 'AI & Technology', icon: '🤖' },
  { id: 'markets', label: 'Financial Markets', icon: '📊' },
  { id: 'business', label: 'Indian Business', icon: '🇮🇳' },
  { id: 'politics', label: 'Global Politics', icon: '🌍' },
  { id: 'startups', label: 'Startups', icon: '🚀' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'geo', label: 'Geopolitics', icon: '🗺️' },
  { id: 'health', label: 'Health & Medicine', icon: '💊' },
  { id: 'climate', label: 'Climate & Energy', icon: '🌱' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'culture', label: 'Culture & Arts', icon: '🎨' },
  { id: 'policy', label: 'Legal & Policy', icon: '⚖️' },
];

export default function Interests() {
  const navigate = useNavigate();
  const { user, toggleInterest } = useAppStore();

  return (
    <div className="flex flex-col min-h-full bg-background text-foreground p-6 pt-16">
      <OnboardingHeader step={2} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">What moves<br/><span className="font-heading italic text-primary">your world?</span></h1>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-muted-foreground text-sm">Pick up to 7 niches.</p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${user.interests.length > 0 ? 'bg-secondary/20 text-secondary border border-secondary/50' : 'bg-muted text-muted-foreground'}`}>{user.interests.length}/7</span>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {niches.map((niche) => {
          const isSelected = user.interests.includes(niche.id);
          return (
            <button
              key={niche.id}
              onClick={() => toggleInterest(niche.id)}
              className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 transition-colors ${isSelected ? 'border-primary bg-primary/20 text-primary font-medium' : 'border-border bg-card hover:bg-muted'}`}
            >
              <span>{niche.icon}</span> {niche.label} {isSelected && '✓'}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <button 
          onClick={() => navigate('/voice')}
          disabled={user.interests.length === 0}
          className="w-full py-4 rounded-2xl bg-primary text-white font-semibold disabled:opacity-50 transition-opacity"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
