import { motion } from 'framer-motion';

export default function AudioWaveform({ isPlaying }) {
  const BARS = 35;

  return (
    <div className="flex items-end justify-between h-10 w-full gap-[2px]">
      {Array.from({ length: BARS }).map((_, i) => {
        // Randomize base properties for each bar to create organic feel
        const randomHeight = Math.random() * 0.6 + 0.4; // 0.4 to 1.0
        const delay = Math.random() * -2; // Negative delay to start immediately at different phases
        const duration = Math.random() * 0.4 + 0.3; // 0.3 to 0.7s

        // Idle state: subtle movement
        const idleScale = [0.15, Math.random() * 0.15 + 0.2, 0.15];
        const idleDuration = duration * 2.5;

        // Active state: aggressive organic movement
        const activeScale = [
          Math.random() * 0.2 + 0.1, 
          randomHeight, 
          Math.random() * 0.4 + 0.2, 
          randomHeight * 0.9, 
          Math.random() * 0.2 + 0.1
        ];
        
        return (
          <motion.div
            key={i}
            className="w-1 bg-primary rounded-full origin-bottom"
            style={{ 
              height: '100%', 
              backgroundColor: '#8B5CF6'
            }}
            initial={{ scaleY: 0.1 }}
            animate={{
              scaleY: isPlaying ? activeScale : idleScale,
              opacity: isPlaying ? 1 : 0.4,
              boxShadow: isPlaying ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'
            }}
            transition={{
              scaleY: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: isPlaying ? duration : idleDuration,
                delay: delay,
                ease: "easeInOut"
              },
              opacity: { duration: 0.4 },
              boxShadow: { duration: 0.4 }
            }}
          />
        );
      })}
    </div>
  );
}
