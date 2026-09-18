import { useNavigate } from 'react-router-dom';
import useAppStore from '@/store/useAppStore';
import MainHeader from '@/components/MainHeader';
import BottomNav from '@/components/BottomNav';

export default function Settings() {
  const navigate = useNavigate();
  const { user, updateSetting, logout } = useAppStore();


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24">
      <MainHeader />

      <div className="px-6 mb-8">
        <h1 className="text-4xl font-heading mb-2 text-gray-200">Settings</h1>
        <p className="text-muted-foreground text-sm">Tune your morning.</p>
      </div>

      <div className="px-6 space-y-4 mb-8">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-muted transition-colors">
          {user.image ? (
            <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl uppercase">
              {user.name ? user.name.charAt(0) : 'A'}
            </div>
          )}
          <div className="flex-1">
            <div className="font-bold text-lg uppercase">{user.name ? user.name.split(' ')[0] : 'Aarav Sharma'}</div>
            <div className="text-xs text-muted-foreground capitalize">{user.profession || 'Technology'} · Mumbai, India</div>
          </div>
          <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Edit ›</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-muted transition-colors">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl text-primary">📌</div>
          <div className="flex-1">
            <div className="font-bold text-sm">Saved stories</div>
            <div className="text-xs text-muted-foreground">3 saved</div>
          </div>
          <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase">›</div>
        </div>

        <div onClick={() => navigate('/billing')} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-muted transition-colors">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl text-blue-500">💳</div>
          <div className="flex-1">
            <div className="font-bold text-sm">Plan & billing</div>
            <div className="text-xs text-muted-foreground">
              {user.subscriptionStatus === 'pro' || user.subscriptionStatus === 'annual' 
                ? `${user.subscriptionStatus.charAt(0).toUpperCase() + user.subscriptionStatus.slice(1)} — active subscription` 
                : 'Free — upgrade for unlimited'}
            </div>
          </div>
          <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            {user.subscriptionStatus || 'Free'} ›
          </div>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="text-xs text-primary font-bold tracking-widest uppercase mb-4">APPEARANCE</div>
        <div className="flex gap-2">
          <button 
            onClick={() => updateSetting('darkMode', true)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${user.darkMode ? 'bg-primary text-white' : 'bg-card border border-border text-muted-foreground'}`}
          >
            <span>🌙</span> Dark
          </button>
          <button 
            onClick={() => updateSetting('darkMode', false)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${!user.darkMode ? 'bg-primary text-white' : 'bg-card border border-border text-muted-foreground'}`}
          >
            <span>☀️</span> Light
          </button>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => updateSetting('offlineMode', !user.offlineMode)}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">💾</div>
              <div>
                <div className="font-bold text-sm">Offline mode</div>
                <div className="text-xs text-muted-foreground">Download briefs for the commute</div>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${user.offlineMode ? 'bg-secondary justify-end' : 'bg-muted justify-start'}`}>
              <div className={`w-4 h-4 rounded-full ${user.offlineMode ? 'bg-white' : 'bg-muted-foreground'}`} />
            </div>
          </div>
          <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => updateSetting('autoAdvance', !user.autoAdvance)}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">⏩</div>
              <div>
                <div className="font-bold text-sm">Auto-advance</div>
                <div className="text-xs text-muted-foreground">Play the next story automatically</div>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${user.autoAdvance ? 'bg-secondary justify-end' : 'bg-muted justify-start'}`}>
              <div className={`w-4 h-4 rounded-full ${user.autoAdvance ? 'bg-white' : 'bg-muted-foreground'}`} />
            </div>
          </div>
          <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => updateSetting('pushNotifications', !user.pushNotifications)}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">🔔</div>
              <div>
                <div className="font-bold text-sm">Push notifications</div>
                <div className="text-xs text-muted-foreground">Brief drops & breaking news</div>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${user.pushNotifications ? 'bg-secondary justify-end' : 'bg-muted justify-start'}`}>
              <div className={`w-4 h-4 rounded-full ${user.pushNotifications ? 'bg-white' : 'bg-muted-foreground'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="text-[10px] text-primary font-bold tracking-widest uppercase mb-4">BRIEF LENGTH</div>
        <div className="flex gap-2">
          {[5, 10, 30].map(len => (
            <button 
              key={len}
              onClick={() => updateSetting('briefLength', len)}
              className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-colors ${user.briefLength === len ? 'bg-primary text-white border-primary' : 'bg-card border-border text-muted-foreground'}`}
            >
              {len} min
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="text-[10px] text-primary font-bold tracking-widest uppercase mb-4">PLAYBACK</div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted transition-colors"
            onClick={() => {
              const voices = ['aria', 'kai', 'meera'];
              const currentVoice = (user.voice || 'aria').toLowerCase();
              const nextVoice = voices[(voices.indexOf(currentVoice) + 1) % voices.length];
              updateSetting('voice', nextVoice);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">🎙️</div>
              <div>
                <div className="font-bold text-sm">Voice</div>
                <div className="text-xs text-muted-foreground capitalize">{user.voice || 'aria'} — high quality AI</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-mono flex items-center gap-1">
              {user.voice || 'Aria'} <span className="text-base leading-none">›</span>
            </div>
          </div>
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted transition-colors"
            onClick={() => {
              const speeds = [0.8, 1, 1.2, 1.5];
              const nextSpeed = speeds[(speeds.indexOf(user.playbackSpeed || 1) + 1) % speeds.length];
              updateSetting('playbackSpeed', nextSpeed);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">⚡</div>
              <div>
                <div className="font-bold text-sm">Default speed</div>
                <div className="text-xs text-muted-foreground">Reading pace</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-mono flex items-center gap-1">
              {user.playbackSpeed || 1}× <span className="text-base leading-none">›</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-4">
        <button 
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full py-4 rounded-xl border border-red-500/30 text-red-500 font-bold hover:bg-red-500/10 transition-colors"
        >
          Sign out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
