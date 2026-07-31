"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import FinaleGalaxy from "./FinaleGalaxy";

const letterText = `Bubu Meri jaan tum meri pyaru si chotu sii bachhu hooo i loveee youu janeman i am sorry kabhi kabhi galat taunt maar deta dukhi krdeta harkato see bubu aasee pyaar sabse zyada karta huuu i lovee u please dont give up on mee and i lovee youu soo muchh ~~ AADIIII`;

export default function LoveLetter() {
  const [showEnding, setShowEnding] = useState(false);
  const [textFinished, setTextFinished] = useState(false);

  // Split text into words for staggered animation
  const words = letterText.split(" ");

  useEffect(() => {
    // Wait for the text to finish animating before showing the final button
    const timer = setTimeout(() => {
      setTextFinished(true);
    }, words.length * 150 + 2000); // 150ms per word + 2s buffer
    return () => clearTimeout(timer);
  }, [words.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 2 } }}
      transition={{ duration: 2 }}
      className="absolute inset-0 w-full h-full bg-[#f4f1ea] text-black overflow-y-auto overflow-x-hidden px-6 py-20 flex justify-center"
    >
      {/* Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] pointer-events-none" />

      {!showEnding ? (
        <div className="max-w-4xl w-full relative z-10 text-2xl md:text-4xl font-serif leading-relaxed tracking-wide text-zinc-800 my-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] mb-2"
                variants={{
                  hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <AnimatePresence>
            {textFinished && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="mt-16 flex justify-center"
              >
                <button
                  onClick={() => setShowEnding(true)}
                  className="px-8 py-4 border border-zinc-800 rounded-full font-serif italic text-xl hover:bg-zinc-800 hover:text-[#f4f1ea] transition-all duration-500"
                >
                  Close Letter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <FinaleGalaxy />
          {/* Final Cinematic Ending */}
          <div className="absolute inset-0 noise-bg pointer-events-none" />
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 3, delay: 1 }}
            className="text-6xl md:text-8xl font-serif italic mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] text-center px-4 z-10 pointer-events-none"
          >
            Happy Girlfriend&apos;s Day
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 4 }}
            className="z-10 pointer-events-none"
          >
            <p className="text-gray-400 tracking-[0.3em] text-sm uppercase drop-shadow-md font-bold">Forever and always</p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
