import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { LinkButton } from "@/components/link-button";

export const metadata: Metadata = {
  title: "找不到頁面 | SEL 運動共學社群",
};

export default function NotFound() {
  return (
    <Hero
      className="min-h-svh"
      badge="404"
      title="找不到這個頁面"
      description="網址可能有誤，或頁面已經移動。請從首頁或成果發表繼續瀏覽。"
    >
      <LinkButton href="/">回到首頁</LinkButton>
      <LinkButton href="/outcomes" variant="outline">
        成果發表
      </LinkButton>
    </Hero>
  );
}
