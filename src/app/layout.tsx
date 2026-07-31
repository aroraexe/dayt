import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChapterProvider } from "@/context/ChapterContext";
import { AudioProvider } from "@/context/AudioContext";
import MiniPlayer from "@/components/MiniPlayer";
import PhoneNavigation from "@/components/PhoneNavigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Girlfriend's Day",
  description: "A cinematic love story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased bg-black text-white`}
    >
      <body className="min-h-full flex flex-col m-0 p-0 overflow-hidden">
        <AudioProvider>
          <ChapterProvider>
            {children}
            <MiniPlayer />
            <PhoneNavigation />
          </ChapterProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
