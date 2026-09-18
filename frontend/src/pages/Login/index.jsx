import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/config/firebase';
import api from '@/services/api';
import useAppStore from '@/store/useAppStore';
import LogoHeader from '@/components/LogoHeader';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Sync with backend using axios
      const response = await api.post('/auth/firebase-login', {
        email: user.email,
        name: user.displayName,
        image: user.photoURL
      });

      if (response.status === 200) {
        const dbUser = response.data;
        setUser(dbUser);

        if (dbUser.onboardingCompleted) {
          navigate('/home');
        } else {
          navigate('/profession');
        }
      }
    } catch (error) {
      console.error("Firebase Login Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6 pt-16">
      <LogoHeader className="mb-24" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Good morning.</h1>
        <h2 className="text-4xl font-heading italic text-primary">News on go.</h2>
        <p className="mt-6 text-muted-foreground text-sm max-w-[80%]">
          Personalised audio news for Indian professionals — curated every morning.
        </p>
      </motion.div>

      <div className="mt-auto pt-8 space-y-4">
        <button 
          onClick={handleGoogleLogin}
          className="w-full py-4 rounded-2xl bg-card border border-border text-foreground font-semibold flex items-center justify-center gap-3 hover:bg-muted transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81z"/></svg>
          Continue with Google
        </button>
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our <span className="underline cursor-pointer">Terms</span> & <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
