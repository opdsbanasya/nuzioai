import { useNavigate } from 'react-router-dom';
import MainHeader from '@/components/MainHeader';

export default function Billing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24">
      <MainHeader  />

      <div className="px-6 mb-8">
        <h1 className="text-4xl font-heading mb-2 text-gray-200">Plan & billing</h1>
        <p className="text-muted-foreground text-sm">Start free. Upgrade when mornings pay for themselves.</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Free Plan */}
        <div className="bg-card border border-border rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <div className="text-3xl font-heading text-primary mb-4">₹0<span className="text-sm font-sans text-muted-foreground italic">/mo</span></div>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
            5 article summaries per niche daily. Ad supported. Push notifications.
          </p>
          <button className="w-full py-4 rounded-xl bg-muted text-frontend font-semibold cursor-default">
            Current plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-background border border-secondary rounded-3xl p-6 shadow-[0_0_30px_rgba(52,211,153,0.1)] relative">
          <div className="absolute top-6 right-6 bg-secondary/20 text-secondary px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">LAUNCH OFFER</div>
          <h2 className="text-xl font-bold mb-2">Pro</h2>
          <div className="text-4xl font-heading text-blue-500 mb-4">₹79<span className="text-sm font-sans text-muted-foreground italic">/mo</span></div>
          <p className="text-sm text-muted-foreground mb-6 pr-8">
            Unlimited custom briefings, premium AI voices, multi-language support.
          </p>
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-lg hover:opacity-90 transition-opacity">
            Upgrade to Pro
          </button>
        </div>

        {/* Pro Annual */}
        <div className="bg-card border border-border rounded-3xl p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">BEST VALUE</div>
          <h2 className="text-xl font-bold mb-2">Pro Annual</h2>
          <div className="text-4xl font-heading text-primary mb-4">₹1,499<span className="text-sm font-sans text-muted-foreground italic">/yr</span></div>
          <p className="text-sm text-muted-foreground mb-6">
            All Pro benefits, offline mode, priority features. Locks in your rate.
          </p>
          <button className="w-full py-4 rounded-xl bg-muted text-muted-foreground font-bold hover:opacity-90 transition-opacity">
            Choose Annual
          </button>
        </div>
      </div>
    </div>
  );
}
