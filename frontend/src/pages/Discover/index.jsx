import { useNavigate } from 'react-router-dom';
import MainHeader from '@/components/MainHeader';
import BottomNav from '@/components/BottomNav';

export default function Discover() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24">
      <MainHeader />

      <div className="px-6 mb-8">
        <h1 className="text-4xl font-heading mb-2 text-gray-200">Discover</h1>
        <p className="text-muted-foreground text-sm">Inshorts-style — swipe the world.</p>
      </div>

      <div className="px-6 mb-6">
        <div className="bg-card border border-border rounded-2xl flex items-center gap-3 p-4">
          <span className="text-primary">🔍</span>
          <input type="text" placeholder="Search stories, sources, topics..." className="bg-transparent border-none outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground" />
        </div>
      </div>

      <div className="px-6 flex gap-2 overflow-x-auto hide-scrollbar mb-8 pb-2">
        <button className="px-5 py-2 rounded-full bg-secondary text-black font-semibold text-sm">All</button>
        <button className="px-5 py-2 rounded-full bg-card text-muted-foreground border border-border text-sm font-semibold whitespace-nowrap">AI & Tech</button>
        <button className="px-5 py-2 rounded-full bg-card text-muted-foreground border border-border text-sm font-semibold whitespace-nowrap">Markets</button>
        <button className="px-5 py-2 rounded-full bg-card text-muted-foreground border border-border text-sm font-semibold whitespace-nowrap">Startups</button>
      </div>

      <div className="px-6 space-y-4">
        {/* Story Card */}
        <div className="bg-card border border-border rounded-2xl p-5 relative">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3">
            <span className="text-primary bg-primary/20 px-2 py-0.5 rounded">AI & TECH</span>
            <span className="text-muted-foreground">THE VERGE ↗</span>
          </div>
          <h3 className="text-xl font-bold mb-3">Anthropic ships Claude 4.5 with 2M-token memory and native tools.</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            Anthropic's new memory layer lets Claude hold entire codebases in mind while it works.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">3 MIN READ</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-black">▶</button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">☆</button>
            </div>
          </div>
        </div>

        {/* Story Card 2 */}
        <div className="bg-card border border-border rounded-2xl p-5 relative">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3">
            <span className="text-blue-500 bg-blue-500/20 px-2 py-0.5 rounded">GLOBAL</span>
            <span className="text-muted-foreground">BLOOMBERG ↗</span>
          </div>
          <h3 className="text-xl font-bold mb-3">Fed minutes hint at a September policy shift.</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            Officials flagged growing confidence that inflation is cooling toward target.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">2 MIN READ</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-black">▶</button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">☆</button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
