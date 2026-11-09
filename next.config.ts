import type { NextConfig } from "next";
import { basePath } from "./lib/site";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // 輸出成 outcomes/index.html，避免 outcomes.html 與 outcomes/ 資料夾在 GitHub Pages 上衝突。
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
