"use client";

import { useChapter } from "@/context/ChapterContext";

export default function PhoneNavigation() {
  const { setChapter } = useChapter();

  return (
    <div className="w-full bg-black h-12 flex items-center justify-around px-8 border-t border-zinc-900 z-[9999] shrink-0">
      {/* Recent Apps Icon (Samsung style) */}
      <button className="p-3 opacity-60 hover:opacity-100 transition-opacity text-white" aria-label="Recent">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 16H5v-5" />
          <path d="M15 8h4v5" />
        </svg>
      </button>

      {/* Home Icon (Rounded square) */}
      <button 
        onClick={() => setChapter('netflix')}
        className="p-3 opacity-60 hover:opacity-100 transition-opacity text-white" 
        aria-label="Home"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      </button>

      {/* Back Icon */}
      <button className="p-3 opacity-60 hover:opacity-100 transition-opacity text-white" aria-label="Back">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>
  );
}
