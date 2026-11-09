"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { createContext, use, useEffect, useState, type MouseEvent, type ReactNode } from "react";
import type { Photo as PhotoData } from "@/lib/content";
import { asset } from "@/lib/site";
import { Parallax } from "./parallax";

const OpenPhoto = createContext<(src: string) => void>(() => {});

const navButton =
  "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-2xl text-white transition-[background-color,scale] duration-300 hover:scale-110 hover:bg-secondary md:size-[50px] md:text-[2rem]";

export function Lightbox({ photos, children }: { photos: PhotoData[]; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const step = (delta: number) => setIndex((i) => ((i ?? 0) + delta + photos.length) % photos.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setIndex((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setIndex((i) => ((i ?? 0) + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  const openPhoto = (src: string) => {
    setIndex(photos.findIndex((p) => p.src === src));
    setOpen(true);
  };

  const nav = (delta: number) => (e: MouseEvent) => {
    e.stopPropagation();
    step(delta);
  };

  const current = index === null ? null : photos[index];

  return (
    <OpenPhoto value={openPhoto}>
      {children}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-9999 flex items-center justify-center bg-ink/85 backdrop-blur-sm transition-[opacity,visibility] duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <button
          type="button"
          aria-label="關閉"
          className="absolute top-3 right-4 cursor-pointer md:top-[25px] md:right-10 text-[45px] leading-none font-light text-white transition-colors duration-300 hover:text-secondary"
        >
          &times;
        </button>
        <button type="button" aria-label="上一張" onClick={nav(-1)} className={`${navButton} left-2 md:left-5`}>
          <CaretLeft />
        </button>
        {current && (
          // 燈箱要依照片原始比例顯示，尺寸無法事先給定，所以不用 next/image。
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(current.src)}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className={`max-h-[85vh] max-w-[90%] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 ${open ? "scale-100" : "scale-95"}`}
          />
        )}
        <button type="button" aria-label="下一張" onClick={nav(1)} className={`${navButton} right-2 md:right-5`}>
          <CaretRight />
        </button>
      </div>
    </OpenPhoto>
  );
}

export function Photo({ src, alt, featured }: PhotoData) {
  const open = use(OpenPhoto);

  return (
    <button
      type="button"
      onClick={() => open(src)}
      className={`relative w-full cursor-pointer overflow-hidden border border-black/5 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:scale-[1.03] ${featured ? "col-span-full aspect-video max-h-[480px] rounded-2xl" : "aspect-square rounded-xl"}`}
    >
      {featured ? (
        // 圖片比框高，在框內緩動時才不會露出邊緣。
        <Parallax speed={0.08} maxRatio={0.09} className="absolute inset-x-0 -inset-y-[12%]">
          <Image src={asset(src)} alt={alt} fill className="object-cover" />
        </Parallax>
      ) : (
        <Image src={asset(src)} alt={alt} fill className="object-cover" />
      )}
    </button>
  );
}
