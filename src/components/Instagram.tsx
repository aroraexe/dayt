"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { instagramPosts } from "@/data/instagram";
import { useChapter } from "@/context/ChapterContext";

const InstagramIcon = () => (
  <img 
    src="/images/instagram-logo.svg" 
    alt="Instagram" 
    className="h-8 filter invert brightness-0 object-contain" 
  />
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg aria-label="Like" fill={filled ? "#ff3040" : "currentColor"} height="24" role="img" viewBox="0 0 24 24" width="24">
    {filled ? (
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    ) : (
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" stroke="currentColor" strokeWidth="1" />
    )}
  </svg>
);

const CommentIcon = () => (
  <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const ShareIcon = () => (
  <svg aria-label="Share Post" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
    <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083" />
    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const BookmarkIcon = () => (
  <svg aria-label="Save" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
    <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const MessengerIcon = () => (
  <svg aria-label="Messenger" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M12.003 2.001a9.705 9.705 0 1 1-0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.279-.598 9.18 9.18 0 0 1-3.133-7.143c0-5.185 4.549-9.703 10-9.703ZM14.922 10.428l-2.023 3.197a.89.89 0 0 1-1.463.076l-1.706-2.128a.49.49 0 0 0-.756-.025l-2.062 2.502a.294.294 0 0 0 .47.375l2.023-3.196a.89.89 0 0 1 1.463-.077l1.706 2.128a.49.49 0 0 0 .756.025l2.062-2.502a.294.294 0 0 0-.47-.375Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const ExactInstagramPost = ({ post }: { post: { id: number, imageUrl: string, likes: number, caption: string, comments: { user: string, text: string }[] } }) => {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleTap = () => {
    setLiked(true);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <div className="w-full bg-black border-b border-zinc-800 pb-3">
      {/* Post Header */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[1.5px]">
            <div className="w-full h-full rounded-full border border-black overflow-hidden bg-zinc-900">
              <img src="/images/her/1.jpg" alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="font-semibold text-[13px] text-white">okshravani</span>
        </div>
        <button className="text-white">
          <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5" /><circle cx="6" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" /></svg>
        </button>
      </div>

      {/* Post Image */}
      <div 
        className="relative w-full aspect-square bg-zinc-900 cursor-pointer overflow-hidden"
        onDoubleClick={handleDoubleTap}
      >
        <img src={post.imageUrl} alt="post" className="w-full h-full object-cover" />
        
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <HeartIcon filled={true} />
          </motion.div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => setLiked(!liked)}>
            <HeartIcon filled={liked} />
          </button>
          <button>
            <CommentIcon />
          </button>
          <button>
            <ShareIcon />
          </button>
        </div>
        <button>
          <BookmarkIcon />
        </button>
      </div>

      {/* Likes and Caption */}
      <div className="px-3 text-[13px]">
        <div className="font-semibold mb-1">{liked ? post.likes + 1 : post.likes} likes</div>
        <div className="mb-1">
          <span className="font-semibold mr-1">okshravani</span>
          {post.caption.startsWith("okshravani ") ? post.caption.substring(11) : post.caption}
        </div>
        
        {/* Render actual comments */}
        {post.comments && post.comments.length > 0 && (
          <div className="mb-1">
            {post.comments.map((comment, i) => (
              <div key={i} className="mb-0.5">
                <span className="font-semibold mr-1">{comment.user}</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-zinc-500 mb-1">View all {post.comments.length} comments</div>
        <div className="text-zinc-500 text-[11px] uppercase">2 hours ago</div>
      </div>
    </div>
  );
};

export default function Instagram() {
  const { setChapter } = useChapter();

  return (
    <div className="w-full h-full bg-black text-white flex flex-col overflow-hidden relative">
      
      {/* Exact Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-black z-20">
        <div className="mt-1">
          <InstagramIcon />
        </div>
        <div className="flex items-center gap-6">
          <HeartIcon filled={false} />
          <MessengerIcon />
        </div>
      </div>

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar relative z-0">
        {/* Stories Tray */}
        <div className="flex gap-4 px-3 py-3 overflow-x-auto border-b border-zinc-900 no-scrollbar">
          {[
            { img: "/images/her/2.jpg", name: "Your Story" },
            { img: "/images/her/3.jpg", name: "Gorgeous" },
            { img: "/images/her/4.jpg", name: "Beautiful" },
            { img: "/images/her/5.jpg", name: "Cute" },
            { img: "/images/her/6.jpg", name: "Angel" },
            { img: "/images/her/7.jpg", name: "Mine" }
          ].map((story, i) => (
            <div key={i} className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-zinc-900">
                  <img src={story.img} alt="story" className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-[11px] text-zinc-300">{story.name}</span>
            </div>
          ))}
        </div>

        {/* Posts */}
        {instagramPosts.map((post) => (
          <ExactInstagramPost key={post.id} post={post} />
        ))}
        
        {/* Transition to next chapter */}
        <div className="py-20 flex justify-center border-b border-zinc-900">
          <button 
            onClick={() => setChapter("rave")}
            className="text-blue-500 font-semibold text-[13px]"
          >
            Open Rave...
          </button>
        </div>
      </div>

      {/* Exact Bottom Nav */}
      <div className="absolute bottom-0 w-full h-[85px] bg-black border-t border-zinc-900 flex items-center justify-between px-8 pb-5 z-20">
        <svg aria-label="Home" fill="currentColor" height="26" role="img" viewBox="0 0 24 24" width="26"><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" /></svg>
        <svg aria-label="Search" fill="currentColor" height="26" role="img" viewBox="0 0 24 24" width="26"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" x1="16.511" x2="22" y1="16.511" y2="22" /></svg>
        <svg aria-label="Reels" fill="currentColor" height="26" role="img" viewBox="0 0 24 24" width="26"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.725" x2="16.273" y1="15.56" y2="11.78" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.725" x2="16.273" y1="15.56" y2="19.34" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.725" x2="9.725" y1="19.34" y2="11.78" /><rect fill="none" height="20" rx="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="20" x="2" y="2" /></svg>
        <svg aria-label="Shop" fill="currentColor" height="26" role="img" viewBox="0 0 24 24" width="26"><path d="M3.197 6h17.606l-1.125 15H4.322L3.197 6Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /><path d="M15.939 12.019A3.94 3.94 0 0 1 12 15.958a3.94 3.94 0 0 1-3.939-3.939" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /><path d="M7.747 6 8.5 2h7l.753 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
        <div className="w-[26px] h-[26px] rounded-full border border-white overflow-hidden bg-zinc-900">
          <img src="/images/her/1.jpg" alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
