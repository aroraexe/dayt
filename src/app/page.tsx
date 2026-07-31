"use client";

import { useChapter } from "@/context/ChapterContext";
import { useAudio } from "@/context/AudioContext";
import NetflixIntro from "@/components/NetflixIntro";
import Instagram from "@/components/Instagram";
import Snapchat from "@/components/Snapchat";
import Rave from "@/components/Rave";
import Spotify from "@/components/Spotify";
import Gallery from "@/components/Gallery";
import LoveLetter from "@/components/LoveLetter";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { currentChapter } = useChapter();
  const { playChapterMusic, startAudio, started } = useAudio();
  const [mounted, setMounted] = useState(false);
  const [overlayActive, setOverlayActive] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Update music when chapter changes (but only if audio has been started)
  useEffect(() => {
    if (started) {
      playChapterMusic(currentChapter);
    }
  }, [currentChapter, started, playChapterMusic]);

  if (!mounted) return null;

  const handleStart = () => {
    startAudio();
    setOverlayActive(false);
  };

  // Is it a mobile app chapter?
  const isApp = ["instagram", "snapchat", "rave", "spotify"].includes(currentChapter);
  // Netflix is technically an app, but we run it full screen then shrink to phone.
  const isNetflix = currentChapter === "netflix";
  // The final chapters are full screen cinematic
  const isCinematic = ["gallery", "letter"].includes(currentChapter);

  return (
    <main className="w-full h-screen overflow-hidden bg-[#050505] flex items-center justify-center relative">
      
      {/* Start Experience Overlay */}
      <AnimatePresence>
        {overlayActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer group"
            onClick={handleStart}
          >
            <div className="flex flex-col items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white tracking-[0.2em] uppercase font-bold text-sm transition-colors shadow-2xl"
              >
                Begin Experience
              </motion.button>
              <p className="text-zinc-500 text-xs mt-6 uppercase tracking-[0.3em] font-medium opacity-50 group-hover:opacity-100 transition-opacity">Turn on your sound</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Ambient Background Blur (Only when iPhone is visible) */}
      <AnimatePresence>
        {isApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            transition={{ duration: 3 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {/* Dynamic ambient lights based on the app */}
            <motion.div 
              animate={{
                backgroundColor: currentChapter === "instagram" ? "rgba(236, 72, 153, 0.15)" : 
                                 currentChapter === "snapchat" ? "rgba(234, 179, 8, 0.15)" :
                                 currentChapter === "rave" ? "rgba(147, 51, 234, 0.15)" :
                                 currentChapter === "spotify" ? "rgba(34, 197, 94, 0.15)" : "rgba(0,0,0,0)",
              }}
              transition={{ duration: 2 }}
              className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full filter blur-[120px] mix-blend-screen" 
            />
            <motion.div 
              animate={{
                backgroundColor: currentChapter === "instagram" ? "rgba(249, 115, 22, 0.15)" : 
                                 currentChapter === "snapchat" ? "rgba(59, 130, 246, 0.15)" :
                                 currentChapter === "rave" ? "rgba(220, 38, 38, 0.15)" :
                                 currentChapter === "spotify" ? "rgba(16, 185, 129, 0.15)" : "rgba(0,0,0,0)",
              }}
              transition={{ duration: 2 }}
              className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full filter blur-[120px] mix-blend-screen" 
            />
            {/* Subtle grain overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Dynamic Device / Container */}
      <motion.div
        layout
        initial={false}
        animate={{
          width: isNetflix ? "100vw" : isCinematic ? "100vw" : "375px",
          height: isNetflix ? "100vh" : isCinematic ? "100vh" : "812px",
          borderRadius: isNetflix || isCinematic ? "0px" : "48px",
          scale: isNetflix || isCinematic ? 1 : 1,
        }}
        transition={{ 
          duration: 1.5, 
          ease: [0.25, 1, 0.5, 1], // cinematic smooth easing
          layout: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } 
        }}
        className={`relative z-10 bg-black overflow-hidden flex flex-col ${
          isApp ? "shadow-[0_0_0_12px_#1a1a1a,0_40px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/10" : ""
        }`}
      >
        {/* Dynamic Island / iPhone Notch (Only visible in Phone mode) */}
        <AnimatePresence>
          {isApp && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-0 w-full h-7 flex justify-center z-[100] pointer-events-none mt-2"
            >
              <div className="w-32 h-7 bg-black rounded-full shadow-md" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-full h-full overflow-hidden bg-black">
          {!overlayActive && (
            <AnimatePresence mode="wait">
              {currentChapter === "netflix" && <NetflixIntro key="netflix" />}
              {currentChapter === "instagram" && <Instagram key="instagram" />}
              {currentChapter === "snapchat" && <Snapchat key="snapchat" />}
              {currentChapter === "rave" && <Rave key="rave" />}
              {currentChapter === "spotify" && <Spotify key="spotify" />}
              {currentChapter === "gallery" && <Gallery key="gallery" />}
              {currentChapter === "letter" && <LoveLetter key="letter" />}
            </AnimatePresence>
          )}
        </div>

        {/* Ambient Light Reflection on Phone Bezel */}
        <AnimatePresence>
          {isApp && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 pointer-events-none rounded-[3rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
