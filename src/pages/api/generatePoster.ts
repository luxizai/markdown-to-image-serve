import { NextApiRequest, NextApiResponse } from "next";
// import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "只支持 POST 请求" });
  }

  try {
    const { markdown } = req.body;

    // 启动浏览器
    // const browser = await puppeteer.launch({ headless: true });
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   executablePath: process.env.CHROME_PATH || '/opt/bin/chromium',
    //   args: ['--no-sandbox', '--disable-setuid-sandbox']
    // });
    const browser = await puppeteer.launch({
      // args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.NODE_ENV === 'production' ? await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
      ) :  process.env.CHROME_PATH,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    console.log('browser=========>>> 22222')

    const page = await browser.newPage();

    // 设置视口大小
    await page.setViewport({ width: 1200, height: 1600 });

    console.log('process.env.NEXT_PUBLIC_BASE_URL=========>>>', process.env.NEXT_PUBLIC_BASE_URL, process.env.CHROME_PATH) 

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `/poster?content=${encodeURIComponent(markdown)}`;
    const fullUrl = `${baseUrl}${url}`;
    console.log('fullUrl=========>>>', fullUrl)

    await page.goto(fullUrl);

    // 等待海报元素渲染完成
    await page.waitForSelector(".poster-content");
    
   // 等待所有图片加载完成
    await page.evaluate(() => {
        return Promise.all(
        Array.from(document.images)
            .filter(img => !img.complete)
            .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
            }))
        );
    });
    // 获取元素
    const element = await page.$(".poster-content");

    if (!element) {
      throw new Error("Poster element not found");
    }

    // 获取元素的边界框
    const box = await element.boundingBox();
    if (!box) {
      throw new Error("Could not get element bounds");
    }

    // 生成唯一文件名
    const fileName = `poster-${Date.now()}.png`;
    // 保存路径 (public/uploads/posters/)
    const saveDir = path.join(process.cwd(), "public", "uploads", "posters");
    const savePath = path.join(saveDir, fileName);

    // 确保目录存在
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    // 只截取特定元素
    await page.screenshot({
      path: savePath,
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    });

    await browser.close();

    // 返回可访问的URL
    const imageUrl = `/uploads/posters/${fileName}`;
    res.status(200).json({ url: `${baseUrl}${imageUrl}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate poster" });
  }
}
