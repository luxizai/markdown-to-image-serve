/*
 * @Author: wxingheng
 * @Date: 2024-11-27 17:50:50
 * @LastEditTime: 2024-11-27 17:52:15
 * @LastEditors: wxingheng
 * @Description:
 * @FilePath: /example/src/app/poster/page.tsx
 */
"use client";
import dynamic from "next/dynamic";
import "markdown-to-poster/dist/style.css";

const PosterView = dynamic(() => import("@/components/PosterView"), {
  ssr: false,
});
export default function Home() {
  return <PosterView />;
}
