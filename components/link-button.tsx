import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-primary text-white shadow-[0_4px_15px_rgba(43,122,120,0.3)] hover:bg-primary-dark",
  outline: "border-2 border-primary text-primary hover:bg-primary/10",
};

type Props = { href: string; variant?: keyof typeof variants; children: ReactNode };

export function LinkButton({ href, variant = "primary", children }: Props) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`inline-block rounded-full px-8 py-[0.8rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
