import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import useAppStore from '@/store/useAppStore';
import api from '@/services/api';
import Layout from './layouts/layout';
import Splash from './pages/Splash';
import Language from './pages/Language';
import Login from './pages/Login';
import Profession from './pages/Profession';
import Interests from './pages/Interests';
import Voice from './pages/Voice';
import Time from './pages/Time';
import Notification from './pages/Notification';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import AllSet from './pages/AllSet';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const setUser = useAppStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await api.post('/auth/firebase-login', {
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            image: firebaseUser.photoURL
          });
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Failed to rehydrate user session:", error);
        }
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-center" theme="dark" richColors />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Splash />} />
          <Route path="/language" element={<Language />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profession" element={<Profession />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/time" element={<Time />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/all-set" element={<AllSet />} />

          {/* Main App Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/billing" element={<Billing />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;