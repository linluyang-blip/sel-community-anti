"use client";

import { useRef, useState, type FormEvent } from "react";
import { contactEndpoint } from "@/lib/content";

type Toast = { id: number; message: string; type: "success" | "error"; leaving?: boolean };

const field = "rounded-lg border border-[#ccc] p-2.5";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const showToast = (message: string, type: Toast["type"]) => {
    const id = nextId.current++;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 400);
    }, 3500);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        showToast("表單已成功送出！我們會盡快與您聯繫。", "success");
        form.reset();
      } else {
        showToast("發生錯誤，請重新確認後再試。", "error");
      }
    } catch {
      showToast("發生錯誤，請檢查網路連線。", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form action={contactEndpoint} method="POST" onSubmit={submit} className="flex flex-col gap-4">
        <input type="hidden" name="_subject" value="來自 SEL 共學社群網站的新訊息" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="name" placeholder="您的姓名" required className={field} />
        <input type="email" name="email" placeholder="您的電子信箱" required className={field} />
        <textarea name="message" placeholder="想對我們說的話..." rows={4} required className={`${field} resize-y`} />
        <button
          type="submit"
          disabled={sending}
          className="mt-2 cursor-pointer self-center rounded-full bg-primary px-8 py-[0.8rem] font-semibold text-white shadow-[0_4px_15px_rgba(43,122,120,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          {sending ? "傳送中..." : "送出信件"}
        </button>
      </form>

      <div className="fixed inset-x-4 bottom-4 z-10000 flex flex-col gap-2.5 sm:right-[30px] sm:bottom-[30px] sm:left-auto">
        {toasts.map(({ id, message, type, leaving }) => (
          <div
            key={id}
            className={`rounded-xl border border-glass bg-white/95 px-6 py-4 font-medium shadow-[0_10px_25px_rgba(43,122,120,0.2)] backdrop-blur-[10px] transition-all duration-400 ease-spring starting:translate-y-[50px] starting:opacity-0 ${type === "error" ? "border-l-4 border-l-[#e74c3c]" : "border-l-4 border-l-primary"} ${leaving ? "translate-y-[50px] opacity-0" : ""}`}
          >
            {message}
          </div>
        ))}
      </div>
    </>
  );
}
