"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  file: string;
};

export const TRACKS: Record<string, Track> = {
  netflix: { id: "netflix", title: "Time", artist: "Hans Zimmer", file: "/audio/time.mp3" },
  instagram1: { id: "instagram1", title: "Until I Found You", artist: "Stephen Sanchez", file: "/audio/until-i-found-you.mp3" },
  instagram2: { id: "instagram2", title: "Golden Hour", artist: "JVKE", file: "/audio/golden-hour.mp3" },
  snapchat: { id: "snapchat", title: "Here With Me", artist: "d4vd", file: "/audio/here-with-me.mp3" },
  rave: { id: "rave", title: "A Thousand Years", artist: "Christina Perri", file: "/audio/a-thousand-years.mp3" },
  spotify: { id: "spotify", title: "Perfect", artist: "Ed Sheeran", file: "/audio/yellow.mp3" },
  gallery1: { id: "gallery1", title: "Experience", artist: "Ludovico Einaudi", file: "/audio/experience.mp3" },
  gallery2: { id: "gallery2", title: "River Flows In You", artist: "Yiruma", file: "/audio/river-flows-in-you.mp3" },
  letter: { id: "letter", title: "Married Life", artist: "Michael Giacchino", file: "/audio/married-life.mp3" },
  finale: { id: "finale", title: "Interstellar Main Theme", artist: "Hans Zimmer", file: "/audio/interstellar.mp3" },
};

const CHAPTER_TRACKS: Record<string, string[]> = {
  netflix: ["netflix"],
  instagram: ["instagram1", "instagram2"],
  snapchat: ["snapchat"],
  rave: ["rave"],
  spotify: ["spotify"],
  gallery: ["gallery1", "gallery2"],
  letter: ["letter"],
  finale: ["finale"],
};

type AudioContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  playTrack: (id: string) => void;
  playChapterMusic: (chapter: string) => void;
  togglePlay: () => void;
  skipNext: () => void;
  skipPrev: () => void;
  setDucked: (ducked: boolean) => void;
  started: boolean;
  startAudio: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  
  // Audio elements
  const audioA = useRef<HTMLAudioElement | null>(null);
  const audioB = useRef<HTMLAudioElement | null>(null);
  const activeAudio = useRef<'A' | 'B'>('A');
  
  const currentPlaylist = useRef<string[]>([]);
  const currentPlaylistIndex = useRef(0);
  
  const baseVolume = useRef(1.0);
  const ducked = useRef(false);
  
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio elements
    audioA.current = new Audio();
    audioB.current = new Audio();
    
    // Prevent default controls, just in case
    audioA.current.controls = false;
    audioB.current.controls = false;
    
    // Looping or ending logic
    const handleEnded = () => {
      skipNext();
    };
    
    audioA.current.addEventListener('ended', handleEnded);
    audioB.current.addEventListener('ended', handleEnded);
    
    return () => {
      audioA.current?.removeEventListener('ended', handleEnded);
      audioB.current?.removeEventListener('ended', handleEnded);
      if (fadeInterval.current) clearInterval(fadeInterval.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  // Update progress
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        const active = activeAudio.current === 'A' ? audioA.current : audioB.current;
        if (active && active.duration) {
          setProgress((active.currentTime / active.duration) * 100);
        }
      }, 250);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  const crossfade = (newFile: string) => {
    const fadeDuration = 3000; // 3 seconds
    const steps = 30;
    const stepTime = fadeDuration / steps;
    
    const active = activeAudio.current === 'A' ? audioA.current : audioB.current;
    const next = activeAudio.current === 'A' ? audioB.current : audioA.current;
    
    if (!active || !next) return;
    
    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
    }

    const targetVolume = ducked.current ? 0.2 : 1.0;
    baseVolume.current = targetVolume;
    
    // Setup next audio
    next.src = newFile;
    next.volume = 0;
    next.play().catch(e => console.error("Playback failed:", e));
    
    let currentStep = 0;
    
    fadeInterval.current = setInterval(() => {
      currentStep++;
      const ratio = currentStep / steps;
      
      // Fade out active, fade in next
      const volOut = Math.max(0, targetVolume * (1 - ratio));
      const volIn = Math.min(targetVolume, targetVolume * ratio);
      
      active.volume = volOut;
      next.volume = volIn;
      
      if (currentStep >= steps) {
        if (fadeInterval.current) clearInterval(fadeInterval.current);
        active.pause();
        active.currentTime = 0;
        activeAudio.current = activeAudio.current === 'A' ? 'B' : 'A';
      }
    }, stepTime);
  };

  const playTrack = (id: string) => {
    const track = TRACKS[id];
    if (!track) return;
    
    // Check if we are already playing this track
    if (currentTrack?.id === id) return;
    
    setCurrentTrack(track);
    setIsPlaying(true);
    
    if (!started) {
      setStarted(true);
      const active = activeAudio.current === 'A' ? audioA.current : audioB.current;
      if (active) {
        active.src = track.file;
        active.volume = ducked.current ? 0.2 : 1.0;
        active.play().catch(e => console.error("Playback failed:", e));
      }
    } else {
      crossfade(track.file);
    }
  };

  const playChapterMusic = (chapter: string) => {
    const tracksForChapter = CHAPTER_TRACKS[chapter];
    if (tracksForChapter && tracksForChapter.length > 0) {
      currentPlaylist.current = tracksForChapter;
      currentPlaylistIndex.current = 0;
      playTrack(tracksForChapter[0]);
    }
  };

  const startAudio = () => {
    if (!started) {
      setStarted(true);
      // Play whatever is currently queued or netflix
      const trackId = currentTrack?.id || "netflix";
      playTrack(trackId);
    }
  };

  const togglePlay = () => {
    const active = activeAudio.current === 'A' ? audioA.current : audioB.current;
    if (!active) return;
    
    if (isPlaying) {
      active.pause();
      setIsPlaying(false);
    } else {
      active.play().catch(e => console.error(e));
      setIsPlaying(true);
    }
  };

  const skipNext = () => {
    if (currentPlaylist.current.length === 0) return;
    currentPlaylistIndex.current = (currentPlaylistIndex.current + 1) % currentPlaylist.current.length;
    playTrack(currentPlaylist.current[currentPlaylistIndex.current]);
  };

  const skipPrev = () => {
    if (currentPlaylist.current.length === 0) return;
    currentPlaylistIndex.current = (currentPlaylistIndex.current - 1 + currentPlaylist.current.length) % currentPlaylist.current.length;
    playTrack(currentPlaylist.current[currentPlaylistIndex.current]);
  };

  const setDucked = (isDucked: boolean) => {
    ducked.current = isDucked;
    const targetVolume = isDucked ? 0.2 : 1.0;
    baseVolume.current = targetVolume;
    
    const active = activeAudio.current === 'A' ? audioA.current : audioB.current;
    if (active) {
      // Simple smooth volume transition
      const startVol = active.volume;
      const steps = 20;
      let step = 0;
      
      const volInterval = setInterval(() => {
        step++;
        const ratio = step / steps;
        active.volume = startVol + (targetVolume - startVol) * ratio;
        if (step >= steps) clearInterval(volInterval);
      }, 50);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      playTrack,
      playChapterMusic,
      togglePlay,
      skipNext,
      skipPrev,
      setDucked,
      started,
      startAudio
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
