"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useChapter } from "@/context/ChapterContext";

export default function NetflixIntro() {
  const { setChapter } = useChapter();
  const [phase, setPhase] = useState<"intro" | "profiles" | "transitioning">("intro");

  // We will transition to "profiles" when the video ends natively, so no strict setTimeout is needed here.
  // However, just in case the video fails to load, we can add a fallback timer.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "intro") setPhase("profiles");
    }, 8000); // 8s fallback
    return () => clearTimeout(timer);
  }, [phase]);

  const handleProfileClick = (profile: "me" | "her") => {
    if (profile === "her") {
      setPhase("transitioning");
      setTimeout(() => {
        setChapter("instagram");
      }, 1500); // 1.5s transition into Instagram
    }
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-black text-white flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {phase === "intro" && (
        <motion.div
          className="flex items-center justify-center relative w-full h-full overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <video 
            autoPlay 
            muted 
            playsInline
            onEnded={() => setPhase("profiles")}
            className="w-full h-full object-cover"
          >
            <source src="/videos/netflix-intro.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {(phase === "profiles" || phase === "transitioning") && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === "transitioning" ? 0 : 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold mb-20 tracking-tight text-white drop-shadow-2xl">
            Who&apos;s Watching?
          </h1>
          
          <div className="flex gap-12 md:gap-24">
            {/* Her Profile */}
            <motion.div
              className="flex flex-col items-center cursor-pointer group"
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleProfileClick("her")}
            >
              <motion.div
                layoutId="profile-her"
                className="w-40 h-40 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-transparent group-hover:border-white transition-all duration-300 relative bg-zinc-800 flex items-center justify-center shadow-2xl group-hover:shadow-[0_0_80px_rgba(236,72,153,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-700 via-rose-600 to-purple-900 opacity-80 group-hover:opacity-100 transition-opacity" />
                <img src="/images/profile-logo.png" alt="Her Profile" className="w-full h-full object-cover relative z-10 filter drop-shadow-xl" />
              </motion.div>
              <span className="mt-8 text-2xl text-gray-400 group-hover:text-white transition-colors font-medium">Her</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
