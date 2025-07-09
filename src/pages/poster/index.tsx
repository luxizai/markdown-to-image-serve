/*
 * @Author: wxingheng
 * @Date: 2024-11-27 17:50:50
 * @LastEditTime: 2025-07-09 15:48:21
 * @LastEditors: wxingheng
 * @Description:
 * @FilePath: /markdown-to-image-serve/src/pages/poster/index.tsx
 */
"use client";
import dynamic from "next/dynamic";
import "markdown-to-poster/dist/style.css";

// .bg-spring-gradient-wave 需要设置这个css 的样式

const PosterView = dynamic(() => import("@/components/PosterView"), {
  ssr: false,
});
export default function Home() {
  return <PosterView />;
}
