"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      bar.current!.style.width = `${(scrollTop / (scrollHeight - clientHeight)) * 100}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={bar} className="fixed top-0 left-0 z-9999 h-1 w-0 bg-secondary transition-[width] duration-100" />;
}
