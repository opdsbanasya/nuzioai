import { useNavigate } from 'react-router-dom';

export default function MainHeader({ title, rightAction }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-6 pt-12">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <div className="w-1 h-6 bg-blue-500 rounded-full" />
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
        <span className="font-bold text-lg">Nuzio <span className="text-primary text-xs align-top">AI</span></span>
      </div>
      <div className="flex gap-3">
        {rightAction === 'close' ? (
          <button onClick={() => navigate(-1)} className="text-xs text-muted-foreground uppercase tracking-widest font-bold hover:text-foreground">
            Close ✕
          </button>
        ) : (
          <>
            <button onClick={() => navigate('/discover')} className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border">🔍</button>
            <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border relative">
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
