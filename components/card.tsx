import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = { id?: string; delay?: number; className?: string; children: ReactNode };

export function Card({ id, delay, className = "", children }: Props) {
  return (
    <Reveal
      id={id}
      delay={delay}
      className={`rounded-3xl border border-glass bg-card p-6 shadow-soft md:p-10 backdrop-blur-lg transition-reveal hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(43,122,120,0.15)] ${className}`}
    >
      {children}
    </Reveal>
  );
}

export function CardIcon({ children }: { children: ReactNode }) {
  return (
    <div className="mb-[1.8rem] flex size-[60px] items-center justify-center rounded-2xl bg-linear-135 from-secondary/20 to-primary/10 text-[1.8rem]">
      {children}
    </div>
  );
}
