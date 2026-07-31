"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useChapter } from "@/context/ChapterContext";

const RaveMessage = ({ text, isMe, username }: { text: string, isMe: boolean, username: string }) => (
  <div className={`flex flex-col mb-3 ${isMe ? "items-end" : "items-start"}`}>
    <span className="text-[10px] text-zinc-500 font-bold mb-1 ml-1 uppercase">{username}</span>
    <div className={`px-4 py-2 rounded-full text-[14px] ${isMe ? "bg-[#5E2BFF] text-white" : "bg-[#1A1A1D] text-white border border-white/10"}`}>
      {text}
    </div>
  </div>
);

export default function Rave() {
  const { setChapter } = useChapter();
  const [messages, setMessages] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  const chatSequence = [
    { text: "This scene always gets me 🥺", isMe: false, username: "okshravani" },
    { text: "I know right? The cinematography is beautiful", isMe: true, username: "okaadiiii" },
    { text: "Just like you ❤️", isMe: true, username: "okaadiiii" },
    { text: "You're so cheesy haha", isMe: false, username: "okshravani" },
    { text: "But you love it.", isMe: true, username: "okaadiiii" },
    { text: "Maybe a little bit...", isMe: false, username: "okshravani" },
    { text: "I wish I was there holding you right now.", isMe: true, username: "okaadiiii" },
    { text: "Me too. I'd be resting my head on your shoulder.", isMe: false, username: "okshravani" },
    { text: "And I'd be playing with your hair.", isMe: true, username: "okaadiiii" },
    { text: "This movie is supposed to be sad, but I'm just smiling.", isMe: false, username: "okshravani" },
    { text: "You make everything better.", isMe: true, username: "okaadiiii" },
    { text: "Look at the screen! You're missing the best part!", isMe: false, username: "okshravani" },
    { text: "I can't help it, I'm too distracted by you.", isMe: true, username: "okaadiiii" },
    { text: "I'm literally just a tiny circle on your screen 😂", isMe: false, username: "okshravani" },
    { text: "Still the most beautiful thing on the screen.", isMe: true, username: "okaadiiii" },
    { text: "Okay fine, you win. I'm blushing again.", isMe: false, username: "okshravani" },
    { text: "I love making you blush.", isMe: true, username: "okaadiiii" },
    { text: "I love you. So much.", isMe: false, username: "okshravani" },
    { text: "I love you more. Forever and always. ✨", isMe: true, username: "okaadiiii" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessages((prev) => {
        if (prev < chatSequence.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 3500); // New message every 3.5s to ensure it lasts over 1 minute

    return () => clearInterval(timer);
  }, [chatSequence.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoProgress(p => (p >= 100 ? 100 : p + 0.5));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#09090B] text-white flex flex-col overflow-hidden relative">
      
      {/* Exact Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#09090B] border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <button>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="font-bold text-[16px] tracking-wide">Rave</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />
          </button>
          <button>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="w-full aspect-video bg-black relative flex items-center justify-center shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop" 
          alt="Movie" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M6 4l15 8-15 8z"/></svg>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-red-600" style={{ width: `${videoProgress}%` }} />
            </div>
            <span className="text-[10px] font-mono">1:24:03</span>
          </div>
        </div>
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold text-red-500 uppercase tracking-widest backdrop-blur-sm border border-white/10">
          Netflix
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col bg-[#09090B] no-scrollbar">
        {chatSequence.slice(0, messages).map((msg, i) => (
          <RaveMessage key={i} text={msg.text} isMe={msg.isMe} username={msg.username} />
        ))}

        {messages === chatSequence.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full mt-4 flex justify-center"
          >
            <button
              onClick={() => setChapter("spotify")}
              className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-8 rounded-full text-[14px] flex items-center gap-2 transition-transform active:scale-95 shadow-[0_0_20px_rgba(29,185,84,0.3)]"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.467-.077-.334.132-.67.467-.745 3.808-.87 7.076-.496 9.715 1.115.293.18.386.563.207.853zm1.2-3.195c-.227.37-.706.495-1.076.267-2.693-1.655-6.8-2.14-9.742-1.17-.417.135-.86-.094-.996-.51-.137-.417.093-.86.51-.997 3.393-1.115 7.94-.572 11.037 1.332.37.228.495.707.267 1.078zm.116-3.34c-3.23-1.92-8.544-2.096-11.62-.116-.494.316-1.137.173-1.453-.322-.317-.494-.173-1.137.32-1.453 3.535-2.27 9.42-2.074 13.167 1.152.443.382.49 1.05.108 1.493-.38.443-1.05.49-1.493.108h-.028z" /></svg>
              Open Spotify
            </button>
          </motion.div>
        )}
      </div>

      {/* Mic / Voice Indicator Area */}
      <div className="w-full bg-[#1A1A1D] px-4 py-3 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5E2BFF] to-blue-500 flex items-center justify-center p-[2px]">
              <img src="/images/her/1.jpg" className="w-full h-full rounded-full object-cover border-2 border-black" alt="avatar" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1A1A1D]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-white">okshravani</span>
            <span className="text-[10px] text-green-500 font-semibold uppercase tracking-wider">Speaking</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
