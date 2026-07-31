"use client";

import React, { createContext, useContext, useState } from "react";

export type Chapter =
  | "netflix"
  | "instagram"
  | "snapchat"
  | "rave"
  | "spotify"
  | "gallery"
  | "letter"
  | "ending";

interface ChapterContextType {
  currentChapter: Chapter;
  setChapter: (chapter: Chapter) => void;
}

const ChapterContext = createContext<ChapterContextType | undefined>(undefined);

export function ChapterProvider({ children }: { children: React.ReactNode }) {
  const [currentChapter, setCurrentChapter] = useState<Chapter>("netflix");

  return (
    <ChapterContext.Provider value={{ currentChapter, setChapter: setCurrentChapter }}>
      {children}
    </ChapterContext.Provider>
  );
}

export function useChapter() {
  const context = useContext(ChapterContext);
  if (context === undefined) {
    throw new Error("useChapter must be used within a ChapterProvider");
  }
  return context;
}
