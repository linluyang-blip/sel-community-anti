import type { ReactNode } from "react";

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-[1200px] px-[5%] py-14 md:py-24">
      {children}
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="relative mb-10 text-center text-[1.75rem] font-bold text-primary after:mx-auto after:mt-[0.8rem] after:block after:h-1 after:w-[60px] after:rounded-sm after:bg-secondary after:content-[''] md:mb-14 md:text-[2.2rem]">
      {children}
    </h2>
  );
}
