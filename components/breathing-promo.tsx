import { Wind } from "@phosphor-icons/react/ssr";
import { Card } from "./card";
import { LinkButton } from "./link-button";

/** 呼吸放鬆計時器的入口卡片，用於首頁與成果頁。 */
export function BreathingPromo() {
  return (
    <Card className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
      <div aria-hidden className="relative flex size-32 shrink-0 items-center justify-center md:size-40">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/40" />
        <div className="absolute inset-[18%] rounded-full bg-linear-135 from-secondary to-primary shadow-[0_15px_35px_rgba(43,122,120,0.3)] motion-safe:animate-breathe" />
        <Wind className="relative text-[2.2rem] text-white md:text-[2.6rem]" />
      </div>
      <div className="flex-1">
        <span className="mb-3 inline-block rounded-lg bg-secondary/10 px-3 py-[5px] text-[0.9rem] font-semibold text-secondary">
          SEL 小工具
        </span>
        <h3 className="mb-3 text-[1.4rem] font-bold text-primary md:text-[1.6rem]">呼吸放鬆計時器</h3>
        <p className="mb-6 text-muted">
          跟著圓圈的節奏吸氣、吐氣，用幾分鐘讓身心慢下來。上課前、運動後或感到緊繃時，都可以隨時練習。
        </p>
        <LinkButton href="/breathing#timer">開始練習</LinkButton>
      </div>
    </Card>
  );
}
