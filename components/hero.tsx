import type { ReactNode } from "react";
import { Orb, Parallax } from "./parallax";

type Props = {
  className: string;
  top?: ReactNode;
  badge: string;
  /** 可用 <wbr /> 標出允許斷行的位置；中文只會在空白與 <wbr /> 處換行。 */
  title: ReactNode;
  description: string;
  children: ReactNode;
};

export function Hero({ className, top, badge, title, description, children }: Props) {
  return (
    <header
      className={`hero-glow relative isolate flex flex-col items-center justify-center overflow-hidden px-[5%] pt-24 pb-8 text-center md:pt-[100px] ${className}`}
    >
      <Orb speed={0.5} className="-top-16 -right-16 size-56 bg-secondary/25 md:size-96" />
      <Orb speed={0.3} className="top-1/3 -left-20 size-48 bg-primary/15 md:size-80" />
      <Orb speed={-0.2} className="right-[12%] -bottom-24 size-40 bg-secondary/20 md:size-72" />
      <Parallax speed={0.4} className="pointer-events-none absolute top-[18%] left-[8%] -z-10 hidden size-24 rounded-full border-2 border-secondary/25 md:block" />
      <Parallax speed={-0.15} className="pointer-events-none absolute right-[9%] bottom-[22%] -z-10 hidden size-14 rounded-full bg-primary/10 md:block" />

      {top && <Parallax speed={0.1}>{top}</Parallax>}
      <Parallax speed={0.2} className="flex flex-col items-center">
        {/* text-balance：中文斷行時平均分配兩行，避免最後一兩個字單獨掉到下一行。 */}
        <div className="mb-6 animate-slide-down text-balance rounded-3xl border border-secondary/30 bg-secondary/15 px-[1.4rem] py-[0.6rem] text-[0.85rem] font-semibold text-primary md:rounded-full md:text-[0.95rem]">
          {badge}
        </div>
        <h1 className="mb-6 animate-fade-in text-balance break-keep text-[clamp(2.1rem,5vw,4.5rem)] leading-[1.2] font-bold [animation-delay:200ms]">
          {title}
        </h1>
        <p className="mb-6 max-w-[650px] animate-fade-in text-base text-muted [animation-delay:400ms] md:mb-10 md:text-[1.2rem]">
          {description}
        </p>
      </Parallax>
      <Parallax speed={0.3} className="mt-2 flex animate-fade-in flex-wrap justify-center gap-3 [animation-delay:600ms] md:mt-6 md:gap-4">
        {children}
      </Parallax>
    </header>
  );
}
