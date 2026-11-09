"use client";

import { CaretUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(document.documentElement.scrollTop > 300);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      aria-label="回到頂部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-4 left-4 z-1000 flex size-11 md:bottom-[30px] md:left-[30px] md:size-[50px] cursor-pointer items-center justify-center rounded-full bg-primary text-2xl text-white shadow-[0_4px_15px_rgba(43,122,120,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark ${visible ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <CaretUp />
    </button>
  );
}
