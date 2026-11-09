"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  id?: string;
  delay?: number;
  className?: string;
  /** 進入畫面前套用的 class；傳空字串可改由子元素以 group-data-visible 控制。 */
  hiddenClassName?: string;
  children: ReactNode;
};

export function Reveal({ id, delay = 0, className = "", hiddenClassName = "translate-y-[30px] opacity-0", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      data-visible={visible || undefined}
      className={`${className} ${visible ? "" : hiddenClassName}`}
      style={visible && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
