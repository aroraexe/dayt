"use client";

import { motion } from "framer-motion";
import { useChapter } from "@/context/ChapterContext";
import { useAudio } from "@/context/AudioContext";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.467-.077-.334.132-.67.467-.745 3.808-.87 7.076-.496 9.715 1.115.293.18.386.563.207.853zm1.2-3.195c-.227.37-.706.495-1.076.267-2.693-1.655-6.8-2.14-9.742-1.17-.417.135-.86-.094-.996-.51-.137-.417.093-.86.51-.997 3.393-1.115 7.94-.572 11.037 1.332.37.228.495.707.267 1.078zm.116-3.34c-3.23-1.92-8.544-2.096-11.62-.116-.494.316-1.137.173-1.453-.322-.317-.494-.173-1.137.32-1.453 3.535-2.27 9.42-2.074 13.167 1.152.443.382.49 1.05.108 1.493-.38.443-1.05.49-1.493.108h-.028z" />
  </svg>
);

export default function Spotify() {
  const { setChapter } = useChapter();
  const { currentTrack, isPlaying, togglePlay, progress } = useAudio();

  const formatTime = (percent: number) => {
    const totalSeconds = 259; // 4:19
    const currentSeconds = Math.floor((percent / 100) * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#4a1c1c] via-[#121212] to-[#121212] text-white flex flex-col px-6 py-8 relative">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 z-10">
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-semibold uppercase tracking-widest opacity-80 mb-1">Playing from Playlist</span>
          <span className="text-[13px] font-bold">For My Girl ❤️</span>
        </div>
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>
        </button>
      </div>

      {/* Album Art */}
      <motion.div 
        className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img 
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop" 
          alt="Album Art" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Song Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <motion.h2 
            className="text-2xl font-bold mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentTrack?.title || "Perfect"}
          </motion.h2>
          <motion.p 
            className="text-zinc-400 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentTrack?.artist || "Ed Sheeran"}
          </motion.p>
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-[#1db954]">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col mb-6">
        <div className="w-full h-1 bg-zinc-700 rounded-full mb-2 overflow-hidden relative group cursor-pointer">
          <div 
            className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1db954] transition-colors"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-zinc-400 text-[11px] font-mono tracking-wider">
          <span>{formatTime(progress)}</span>
          <span>- {formatTime(100 - progress)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2 mb-8">
        <button className="text-[#1db954]">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
        </button>
        <button className="text-white hover:opacity-80 transition-opacity">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>
        <button 
          onClick={togglePlay}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button onClick={() => setChapter("gallery")} className="text-white hover:opacity-80 transition-opacity">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
        <button className="text-zinc-400">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
        </button>
      </div>

      {/* Lyrics Card */}
      <div 
        onClick={() => setChapter("gallery")}
        className="mt-auto bg-[#873a3a] rounded-t-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-[#9a4545] transition-colors group"
      >
        <span className="font-bold text-sm tracking-wide">Lyrics</span>
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}
