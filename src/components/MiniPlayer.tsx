"use client";

import { useAudio } from "@/context/AudioContext";
import { useChapter } from "@/context/ChapterContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, progress, togglePlay, started } = useAudio();
  const { setChapter } = useChapter();
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (currentTrack) {
      setShowNowPlaying(true);
      const timeout = setTimeout(() => setShowNowPlaying(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentTrack]);

  if (!started || !currentTrack) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-20 right-6 z-[999] flex flex-col items-end gap-3"
    >
      {/* Now Playing Tooltip */}
      <AnimatePresence>
        {showNowPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 shadow-lg"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-xs font-semibold tracking-wider uppercase">Now Playing</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mini Player */}
      <div className="relative">
        
        {/* Navigation Menu Popup */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-4 right-0 bg-black/80 backdrop-blur-2xl border border-white/20 p-2 rounded-2xl flex flex-col gap-1 w-48 shadow-2xl z-50"
            >
              <div className="px-3 py-2 text-xs font-bold text-white/50 uppercase tracking-widest border-b border-white/10 mb-1">Jump to</div>
              <button onClick={() => { setChapter('netflix'); setIsMenuOpen(false); }} className="text-left px-3 py-2 hover:bg-white/10 rounded-xl text-white text-sm font-semibold transition-colors">Netflix</button>
              <button onClick={() => { setChapter('instagram'); setIsMenuOpen(false); }} className="text-left px-3 py-2 hover:bg-white/10 rounded-xl text-white text-sm font-semibold transition-colors">Instagram</button>
              <button onClick={() => { setChapter('gallery'); setIsMenuOpen(false); }} className="text-left px-3 py-2 hover:bg-white/10 rounded-xl text-white text-sm font-semibold transition-colors">Gallery</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-2xl border border-white/10 p-3 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-[320px]">
        
        {/* Album Art (Abstract representation since we don't have images for each track) */}
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-tr from-purple-900 to-indigo-500 flex items-center justify-center">
          <div className={`absolute inset-0 bg-white/20 ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '8s' }} />
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white" className="relative z-10"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <motion.div 
            key={currentTrack.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <span className="text-white font-bold text-sm truncate">{currentTrack.title}</span>
            <span className="text-white/60 text-xs truncate">{currentTrack.artist}</span>
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 px-2">
          
          <button 
            onClick={togglePlay} 
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
        </div>

      </div>
      </div>
    </motion.div>
  );
}
