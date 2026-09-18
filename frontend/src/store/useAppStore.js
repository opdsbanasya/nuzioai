import { create } from 'zustand';
import api from '@/services/api';

const useAppStore = create((set, get) => ({
  user: {
    language: 'en',
    profession: null,
    interests: [],
    voice: 'Aria',
    briefLength: 5,
    deliveryTime: '07:00 AM',
    pushNotifications: false,
    darkMode: true,
    offlineMode: false,
    autoAdvance: true,
    playbackSpeed: 1,
  },
  setUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
  
  logout: () => set({ 
    user: {
      language: 'en',
      profession: null,
      interests: [],
      voice: 'Aria',
      briefLength: 5,
      deliveryTime: '07:00 AM',
      pushNotifications: false,
      darkMode: true,
      offlineMode: false,
      autoAdvance: true,
      playbackSpeed: 1,
    }
  }),
  
  updateSetting: async (key, value) => {
    // 1. Optimistic UI update
    set((state) => ({ user: { ...state.user, [key]: value } }));
    
    // 2. Persist to MongoDB
    try {
      const { user } = get();
      if (!user._id) return; // Only save if user is logged in
      
      await api.post('/users/preferences', {
        userId: user._id,
        [key]: value
      });
    } catch (error) {
      console.error(`Failed to save setting ${key}:`, error);
      // Optional: Rollback state here if request fails
    }
  },

  toggleInterest: (interest) =>
    set((state) => {
      const interests = state.user.interests;
      if (interests.includes(interest)) {
        return { user: { ...state.user, interests: interests.filter((i) => i !== interest) } };
      }
      if (interests.length >= 7) return state; // Max 7
      return { user: { ...state.user, interests: [...interests, interest] } };
    }),
}));

export default useAppStore;

