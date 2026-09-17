import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/language');
    }, 2500); // Redirect after 2.5s
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-2 mb-8">
          {/* Mock Logo */}
          <div className="flex gap-1">
            <div className="w-1 h-6 bg-primary rounded-full animate-pulse" />
            <div className="w-1 h-8 bg-blue-500 rounded-full animate-pulse delay-75" />
            <div className="w-1 h-5 bg-primary rounded-full animate-pulse delay-150" />
          </div>
          <h1 className="text-3xl font-bold font-sans tracking-tight">
            Nuzio <span className="text-primary text-sm tracking-normal align-top font-semibold">AI</span>
          </h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-12 text-center"
      >
        <h2 className="text-3xl font-heading italic text-gray-200 mb-2">News on go</h2>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Your audio brief, every morning
        </p>
      </motion.div>

      <div className="absolute bottom-12 flex items-center gap-2 text-xs text-muted-foreground tracking-widest">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        CURATING YOUR BRIEF_
      </div>
    </div>
  );
}
