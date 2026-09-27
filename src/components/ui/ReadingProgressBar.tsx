"use client";

import { useEffect } from "react";

export function ReadingProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;

    const onScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        bar.style.width = `${(winScroll / height) * 100}%`;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-sky-400 z-[60] transition-all duration-75"
      id="progress-bar"
    />
  );
}
