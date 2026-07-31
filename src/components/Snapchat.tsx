"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useChapter } from "@/context/ChapterContext";

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[100]">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "110%", 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 0.8 + 0.4,
            rotate: 0
          }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: "-10%",
            x: `${Math.random() * 100}%`,
            rotate: 360
          }}
          transition={{ 
            duration: 1.5 + Math.random() * 1.5, 
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
          className="absolute text-3xl"
        >
          {['🍿', '✨', '⭐', '🎥'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </div>
  );
};

const SnapchatMessage = ({ text, isMe, delay }: { text: string, isMe: boolean, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isMe ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex flex-col mb-4 ${isMe ? "items-end" : "items-start"}`}
    >
      <div className="flex items-center gap-2">
        {!isMe && (
          <div className="w-1 h-full bg-red-500 rounded-full mr-1 py-3" />
        )}
        <div className={`flex flex-col`}>
          <span className="font-semibold text-[11px] text-zinc-500 uppercase tracking-wider mb-1">
            {isMe ? "Me" : "okshravani"}
          </span>
          <div className={`px-3 py-2 rounded-2xl max-w-[250px] text-[15px] ${isMe ? "bg-blue-600 text-white" : "bg-zinc-800 text-white"}`}>
            {text}
          </div>
        </div>
        {isMe && (
          <div className="w-1 h-full bg-blue-500 rounded-full ml-1 py-3" />
        )}
      </div>
    </motion.div>
  );
};

export default function Snapchat() {
  const { setChapter } = useChapter();
  const [messages, setMessages] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const chatSequence = [
    { text: "Hey! Are you awake?", isMe: false, delay: 1 },
    { text: "Yeah, couldn't sleep. You?", isMe: true, delay: 2.5 },
    { text: "Same. I was just thinking about you.", isMe: false, delay: 4 },
    { text: "Really? What about?", isMe: true, delay: 5.5 },
    { text: "Everything. How much I love you. How crazy it is that we found each other.", isMe: false, delay: 7.5 },
    { text: "Stop, you're making me blush 😊", isMe: true, delay: 9.5 },
    { text: "I mean it. Wanna watch something together?", isMe: false, delay: 11.5 },
    { text: "Always.", isMe: true, delay: 13 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessages((prev) => {
        if (prev < chatSequence.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 100); // 100ms interval to quickly process delays

    return () => clearInterval(timer);
  }, [chatSequence.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleJoinRave = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setChapter("rave");
    }, 2500); // Wait 2.5s for the transition to finish
  };

  return (
    <motion.div 
      animate={isTransitioning ? { backgroundColor: "#110022" } : { backgroundColor: "#000000" }}
      transition={{ duration: 2 }}
      className="w-full h-full text-white flex flex-col overflow-hidden relative"
    >
      {isTransitioning && <FloatingParticles />}
      
      {/* Exact Header */}
      <motion.div 
        animate={isTransitioning ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between px-3 py-3 border-b border-zinc-900 bg-transparent z-20"
      >
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/images/her/1.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[17px]">okshravani</span>
              <span className="text-[11px] text-zinc-500 font-semibold tracking-wide">TAP TO LOAD Snap Score</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
          </button>
        </div>
      </motion.div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-end no-scrollbar bg-transparent">
        <AnimatePresence>
          {chatSequence.slice(0, messages).map((msg, i) => (
            <motion.div
              key={i}
              animate={isTransitioning ? { 
                opacity: 0, 
                y: -50 - (chatSequence.length - i) * 10, 
                scale: 0.9, 
                filter: "blur(4px)" 
              } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: i * 0.05 }}
            >
              <SnapchatMessage text={msg.text} isMe={msg.isMe} delay={0} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {messages === chatSequence.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="w-full mt-6 z-50 relative"
          >
            <motion.button
              onClick={handleJoinRave}
              animate={isTransitioning ? { 
                scale: [1, 0.9, 50],
                opacity: [1, 1, 0],
                backgroundColor: "#110022"
              } : { scale: 1 }}
              transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut", times: [0, 0.2, 1] }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-[2rem] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(147,51,234,0.8)] transition-colors active:scale-95"
            >
              <motion.span animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}>
                Join Watch Party 🍿
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Exact Chat Input */}
      <motion.div 
        animate={isTransitioning ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-3 py-3 bg-transparent flex items-center gap-2 border-t border-zinc-900 pb-6"
      >
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
        </div>
        
        {/* Animated Input to Progress Bar */}
        <motion.div 
          animate={isTransitioning ? { 
            height: 6, 
            backgroundColor: "#222", 
            borderRadius: 8,
          } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex-1 bg-zinc-800 rounded-full h-10 flex items-center px-4 overflow-hidden relative"
        >
          <motion.span 
            animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }} 
            className="text-zinc-400 font-semibold text-[15px] whitespace-nowrap"
          >
            Send a chat
          </motion.span>
          
          {/* Fake Movie Progress Bar Fill */}
          <motion.div 
            initial={{ width: "0%" }}
            animate={isTransitioning ? { width: "45%" } : { width: "0%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "linear" }}
            className="absolute top-0 left-0 h-full bg-red-600 z-10"
          />
        </motion.div>

        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
