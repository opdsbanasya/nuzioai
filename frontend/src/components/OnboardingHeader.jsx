import { useNavigate } from 'react-router-dom';

export default function OnboardingHeader({ step, totalSteps = 6, skipTo = '/home' }) {
  const navigate = useNavigate();
  
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-primary rounded-full" />
            <div className="w-1 h-5 bg-blue-500 rounded-full" />
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
          <span className="font-bold text-sm">Nuzio <span className="text-primary text-[10px] align-top">AI</span></span>
        </div>
        <button onClick={() => navigate(skipTo)} className="text-xs text-muted-foreground uppercase tracking-widest hover:text-foreground">
          Skip →
        </button>
      </div>

      <div className="flex gap-1 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < step ? (i === step - 1 ? 'bg-primary' : 'bg-secondary') : 'bg-border'}`} />
        ))}
      </div>
      
      <div className="text-xs text-primary font-bold tracking-widest uppercase mb-2">
        Step {step} of {totalSteps}
      </div>
    </div>
  );
}
