import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
const chromium = require("@sparticuz/chromium-min");
const puppeteer = require("puppeteer-core");
const fs = require("fs");

export const maxDuration = 60; // 增加超时时间

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "只支持 POST 请求" });
  }

  try {
    const { markdown, header = "", footer = "" } = req.body;

    const browser = await puppeteer.launch({
      args:
        process.env.NODE_ENV === "production"
          ? [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"]
          : [],
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.NODE_ENV === "production"
          ? await chromium.executablePath()
          : process.env.CHROME_PATH,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/poster?content=${encodeURIComponent(markdown)}`;

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: maxDuration * 1000,
    });

    // // 等待海报元素渲染完成
    await page.waitForSelector(".poster-content");

    // // 等待所有图片加载完成
    // await page.evaluate(() => {
    //   return Promise.all(
    //     Array.from(document.images)
    //       .filter((img) => !img.complete)
    //       .map(
    //         (img) =>
    //           new Promise((resolve) => {
    //             img.onload = img.onerror = resolve;
    //           })
    //       )
    //   );
    // });
    // // 获取元素
    const element = await page.$(".poster-content");

    if (!element) {
      throw new Error("Poster element not found");
    }

    // 获取元素的边界框
    const box = await element.boundingBox();
    if (!box) {
      throw new Error("Could not get element bounds");
    }

    const posterBuffer = await page.screenshot({
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
      type: "png",
    });

    await browser.close();

    res.setHeader("Content-Type", "image/png");
    res.send(posterBuffer);
  } catch (error) {
    res.status(500).json({ error: "生成海报时出错" });
  }
}
