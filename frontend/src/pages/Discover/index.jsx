import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '@/components/MainHeader';
import BottomNav from '@/components/BottomNav';
import api from '@/services/api';

const CATEGORIES = ['All', 'AI & Tech', 'Markets', 'Startups', 'Science', 'Technology'];

export default function Discover() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Audio Playback State
  const [playingId, setPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const handlePlayPause = (newsId, audioUrl) => {
    if (!audioUrl) return;

    if (playingId === newsId) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      audioRef.current.pause();
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setPlayingId(newsId);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      setIsPlaying(false);
      setPlayingId(null);
    };
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Debounce search query
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (activeCategory !== 'All') {
          // Send original lowercase category
          if (activeCategory === 'AI & Tech') params.category = 'technology';
          else params.category = activeCategory.toLowerCase();
        }
        if (debouncedSearch) {
          params.search = debouncedSearch;
        }

        const response = await api.get('/news', { params });
        setNewsList(response.data);
      } catch (error) {
        console.error("Failed to fetch discover news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [activeCategory, debouncedSearch]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground pb-24">
      <MainHeader />

      <div className="px-6 mb-8 mt-2">
        <h1 className="text-4xl font-heading mb-2 text-gray-200">Discover</h1>
        <p className="text-muted-foreground text-sm">Inshorts-style — swipe the world.</p>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="bg-card border border-border rounded-2xl flex items-center gap-3 p-4">
          <span className="text-primary">🔍</span>
          <input
            type="text"
            placeholder="Search stories, sources, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 flex gap-2 overflow-x-auto hide-scrollbar mb-8 pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${activeCategory === cat
                ? 'bg-secondary text-black border-secondary'
                : 'bg-card text-muted-foreground border-border'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="px-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : newsList.length > 0 ? (
          newsList.map(news => (
            <div key={news._id} className="bg-card border border-border rounded-2xl overflow-hidden relative shadow-lg">
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3">
                  <span className="text-primary bg-primary/20 px-2 py-0.5 rounded">{news.category}</span>
                  <span className="text-muted-foreground">{news.source} ↗</span>
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">{news.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {news.summary}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">{news.readTime} READ</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handlePlayPause(news._id, news.audioUrl)}
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    >
                      {playingId === news._id && isPlaying ? (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                      )}
                    </button>
                    <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No stories found matching your criteria.
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
