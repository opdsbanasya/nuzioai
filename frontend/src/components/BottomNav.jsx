import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDiscover = location.pathname === '/discover';
  const isSettings = location.pathname === '/settings';

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-50 pointer-events-none" />
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-card/80 backdrop-blur-xl border border-border px-8 py-3 rounded-full z-50 shadow-2xl">
        <button 
          onClick={() => navigate('/discover')} 
          className={`flex flex-col items-center gap-1 transition-colors ${isDiscover ? 'text-secondary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.3-4.3"/>
          </svg>
          <span className="text-[10px] font-bold tracking-widest uppercase">Discover</span>
        </button>
        <div className="relative -top-6">
          <button 
            onClick={() => navigate('/home', { state: { autoplay: true } })} 
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_10px_30px_rgba(139,92,246,0.5)] hover:scale-105 transition-transform"
          >
             <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
               <path d="M8 5v14l11-7z"/>
             </svg>
          </button>
        </div>
        <button 
          onClick={() => navigate('/settings')} 
          className={`flex flex-col items-center gap-1 transition-colors ${isSettings ? 'text-secondary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
          <span className="text-[10px] font-bold tracking-widest uppercase">Settings</span>
        </button>
      </div>
    </>
  );
}
