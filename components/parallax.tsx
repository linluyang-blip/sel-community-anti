"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Item = { el: HTMLElement; speed: number; maxRatio?: number; offset: number };

// 所有視差元素共用一個 scroll 監聽，並以 requestAnimationFrame 節流。
const items = new Set<Item>();
let frame = 0;

function update() {
  frame = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const strength = reduced ? 0 : window.innerWidth < 768 ? 0.5 : 1;
  const { innerHeight, scrollY } = window;

  // 先讀後寫，避免反覆觸發版面重算。
  const updates = [...items].map((item) => {
    const rect = item.el.getBoundingClientRect();
    const center = rect.top - item.offset + scrollY + rect.height / 2;
    // 第一屏的元素從捲動 0 開始位移，其餘元素以「捲到畫面中央」為基準。
    const distance = scrollY - (center < innerHeight ? 0 : center - innerHeight / 2);
    const limit = item.maxRatio === undefined ? Infinity : item.maxRatio * rect.height;
    return Math.min(limit, Math.max(-limit, distance * item.speed * strength));
  });

  [...items].forEach((item, i) => {
    item.offset = updates[i];
    item.el.style.translate = `0 ${updates[i].toFixed(1)}px`;
  });
}

const schedule = () => {
  frame ||= requestAnimationFrame(update);
};

type Props = {
  /** 正值比頁面捲得慢（景深遠），負值比頁面捲得快（景深近）。 */
  speed: number;
  /** 位移上限，以元素自身高度的比例表示。 */
  maxRatio?: number;
  className?: string;
  children?: ReactNode;
};

export function Parallax({ speed, maxRatio, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item: Item = { el: ref.current!, speed, maxRatio, offset: 0 };
    items.add(item);
    if (items.size === 1) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }
    schedule();

    return () => {
      items.delete(item);
      if (items.size === 0) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
  }, [speed, maxRatio]);

  return (
    <div ref={ref} className={`will-change-[translate] ${className}`}>
      {children}
    </div>
  );
}

/** 區塊背景的模糊光暈，位於內容後方。 */
export function Orb({ speed, className }: { speed: number; className: string }) {
  return <Parallax speed={speed} maxRatio={1} className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`} />;
}
