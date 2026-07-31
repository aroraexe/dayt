"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useChapter } from "@/context/ChapterContext";

const photos = [
  { id: 11, url: "/images/her/11.jpg", caption: "Glowing in the dark." },
  { id: 12, url: "/images/her/12.jpg", caption: "Breathtaking." },
  { id: 13, url: "/images/her/13.jpg", caption: "Shining brighter than the stars." },
  { id: 14, url: "/images/her/14.jpg", caption: "Ethereal beauty." },
  { id: 15, url: "/images/her/15.jpg", caption: "Those eyes... I'm lost." },
  { id: 16, url: "/images/her/16.jpg", caption: "My stunning model." },
  { id: 17, url: "/images/her/17.jpg", caption: "A timeless beauty." },
  { id: 18, url: "/images/her/18.jpg", caption: "That smile. Always that smile." },
  { id: 19, url: "/images/her/19.jpg", caption: "You have all my attention." },
  { id: 20, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.32 PM (1).jpeg", caption: "So beautiful." },
  { id: 21, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.32 PM.jpeg", caption: "Perfect moments." },
  { id: 22, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.33 PM (1).jpeg", caption: "My everything." },
  { id: 23, url: "/images/her/new/cropped_23.jpeg", caption: "Always shining." },
  { id: 24, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.33 PM.jpeg", caption: "Gorgeous." },
  { id: 25, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.34 PM (1).jpeg", caption: "Just wow." },
  { id: 26, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.34 PM.jpeg", caption: "That smile." },
  { id: 27, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.35 PM (1).jpeg", caption: "Breathtaking." },
  { id: 28, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.23.35 PM.jpeg", caption: "Love this." },
  { id: 29, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.24.01 PM.jpeg", caption: "Flawless." },
  { id: 30, url: "/images/her/new/WhatsApp Image 2026-07-31 at 10.24.02 PM.jpeg", caption: "My whole world." }
];

const GalleryItem = ({ photo, index }: { photo: { url: string, caption: string }, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150, rotateX: 40, filter: "blur(20px)", scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px" }}
      className="relative mb-6 rounded-2xl overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
    >
      <div className="w-full h-full transform-gpu transition-transform duration-1000 group-hover:scale-105">
        <img src={photo.url} alt="Memory" className="w-full object-cover" />
      </div>
      
      {/* Light Sweep Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-[150%] group-hover:translate-x-[150%] transition-all duration-1000 ease-out pointer-events-none mix-blend-overlay" />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
        <p className="text-white font-serif italic text-2xl translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] drop-shadow-lg">
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
};

export default function Gallery() {
  const { setChapter } = useChapter();

  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: "#000000" }}
      animate={{ opacity: 1, backgroundColor: "#fdfdfa" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full text-black overflow-y-auto overflow-x-hidden"
    >
        <div className="max-w-7xl mx-auto px-4 py-20">
          
          <motion.header 
            initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-32 relative z-10"
          >
            <h1 className="text-7xl md:text-[9rem] font-serif font-bold tracking-tighter leading-none mb-8 text-black drop-shadow-sm mix-blend-darken">A Lifetime of <br/> Memories</h1>
            <p className="text-gray-500 tracking-[0.3em] uppercase text-sm md:text-lg font-semibold">Every picture tells your story</p>
          </motion.header>

          {/* Masonry Layout Approximation */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {photos.map((photo, index) => (
              <GalleryItem key={photo.id} photo={photo} index={index} />
            ))}
          </div>

          <motion.div 
            className="mt-32 mb-32 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setChapter("letter")}
              className="px-12 py-5 bg-black text-white rounded-full font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors shadow-2xl hover:scale-105 active:scale-95 duration-300"
            >
              Read My Letter
            </button>
          </motion.div>

        </div>
    </motion.div>
  );
}
