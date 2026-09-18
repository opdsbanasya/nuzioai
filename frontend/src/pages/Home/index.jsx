import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAppStore from '@/store/useAppStore';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainHeader from '@/components/MainHeader';
import BottomNav from '@/components/BottomNav';
import AudioWaveform from '@/components/AudioWaveform';

export default function Home() {
  const { user } = useAppStore();
  const navigate = useNavigate();

  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log({user})

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const userInterests = user.interests.join(',');
        const response = await api.get('/news', {
          params: { category: userInterests }
        });
        setNewsList(response.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [user.interests]);

  // Audio State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentNews = newsList[currentIndex] || {};

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleNext = () => {
    if (currentIndex < newsList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleEnded = () => {
    if (currentIndex < newsList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [currentIndex, isPlaying]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Removed static waveform heights as we use the animated component now

  const getAudioFile = () => {
    const voice = (user.voice || 'aria').toLowerCase();
    if (voice === 'kai') return '/male.mp3';
    // aria, meera, mira all use female voice
    return '/female.mp3';
  };

  const audioPath = getAudioFile();
  return (
    <div className="flex flex-col h-[100dvh] bg-background text-foreground overflow-hidden">
      <MainHeader />
      
      {/* Invisible Audio Element */}
      <audio 
        ref={audioRef}
        src={audioPath}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Categories */}
      <div className="px-6 flex gap-2 overflow-x-auto hide-scrollbar mb-4 shrink-0">
        <button className="px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary text-[11px] font-semibold whitespace-nowrap">All</button>
        {user.interests.length > 0 ? (
          user.interests.map(i => (
            <button key={i} className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap capitalize">
              {i}
            </button>
          ))
        ) : (
          <>
            <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap">AI & Tech</button>
            <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap">Markets</button>
            <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground border border-border text-[11px] font-semibold whitespace-nowrap">Startups</button>
          </>
        )}
      </div>

      {/* Greeting */}
      <div className="px-6 mb-4 shrink-0">
        <div className="text-[9px] text-primary font-bold tracking-widest uppercase flex items-center gap-2 mb-1">
          <span>TODAY</span> <span className="w-1 h-1 bg-border rounded-full" /> <span>MORNING BRIEF</span>
        </div>
        <h1 className="text-3xl font-heading mb-0 text-gray-200">Good morning, {user.name ? user.name.split(' ')[0] : 'Professional'} —</h1>
        <h2 className="text-3xl font-heading italic text-primary">{newsList.length} things.</h2>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-secondary font-medium">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Audio live <span className="text-muted-foreground">· Voice: {user.voice || 'Aria'} · {newsList.length} stories</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : newsList.length === 0 ? (
        <div className="flex-1 min-h-0 flex items-center justify-center text-muted-foreground text-sm">
          No news found for your interests.
        </div>
      ) : (
      <div className="px-6 mb-4 flex-1 min-h-0 flex flex-col justify-center">
        <div className="bg-card border border-border rounded-3xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between h-full max-h-[380px]">
           <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 shrink-0">
             <div className="flex items-center gap-2">
               {isPlaying && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />} NOW PLAYING · {(currentNews.category || '').toUpperCase()}
             </div>
             <div>{(currentIndex + 1).toString().padStart(2, '0')} / {newsList.length.toString().padStart(2, '0')}</div>
           </div>
           
           <h3 className="text-xl font-bold mb-2 leading-tight shrink-0">{currentNews.title}</h3>
           
           <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2 shrink-0">
             {currentNews.source} <span className="w-1 h-1 bg-border rounded-full" /> {currentNews.readTime} <span className="w-1 h-1 bg-border rounded-full" /> SOURCE ↗
           </div>
           
           <p className="text-muted-foreground text-xs line-clamp-2 mb-3 shrink-0">
             {currentNews.summary}
           </p>
           
           {/* Organic Equalizer Waveform */}
           <div className="mb-2 shrink-0">
             <AudioWaveform isPlaying={isPlaying} />
           </div>

           {/* Audio Progress Bar */}
           <div className="w-full bg-muted rounded-full h-1 mb-2 relative overflow-hidden shrink-0">
             <div 
               className="bg-primary h-full absolute left-0 top-0 transition-all duration-200 ease-linear shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
               style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }} 
             />
           </div>
           
           <div className="flex justify-between text-[10px] text-muted-foreground font-mono mb-3 shrink-0">
             <span>{formatTime(progress)}</span>
             <span>-{formatTime(duration - progress)}</span>
           </div>
           
           <div className="flex items-center justify-between shrink-0">
             <button onClick={handlePrev} disabled={currentIndex === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-50">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
             </button>
             <button onClick={togglePlayPause} className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform">
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                 {isPlaying ? (
                   <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                 ) : (
                   <svg className="w-4 h-4 fill-current ml-1" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
                 )}
               </div>
             </button>
             <button onClick={handleNext} disabled={currentIndex === newsList.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-50">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
             </button>
             <button className="text-muted-foreground hover:text-foreground">
                <span className="text-sm font-bold">{user.playbackSpeed || 1}×</span>
             </button>
           </div>
        </div>
      </div>
      )}

      <div className="px-6 flex items-center gap-3 text-muted-foreground text-xs pb-24 shrink-0">
        <span className={`text-primary ${isPlaying ? 'animate-pulse' : ''}`}>🎙️</span>
        <span className="font-bold line-clamp-1 flex-1">{isPlaying ? 'Now narrating — ' : 'Paused — '}{currentNews.title || 'Nothing playing'}</span>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
