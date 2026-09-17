import { create } from 'zustand';

const useAppStore = create((set) => ({
  user: {
    language: 'en',
    profession: null,
    interests: [],
    voice: null,
    briefLength: 5,
    deliveryTime: '07:00 AM',
    notifications: false,
  },
  setUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
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

