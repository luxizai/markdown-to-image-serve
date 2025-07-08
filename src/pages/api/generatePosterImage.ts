/*
 * @Author: wxingheng
 * @Date: 2024-11-28 14:20:13
 * @LastEditTime: 2025-03-15 17:18:48
 * @LastEditors: wxingheng
 * @Description: 生成海报; 返回海报图片 url
 * @FilePath: /markdown-to-image-serve/src/pages/api/generatePosterImage.ts
 */
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
    console.log("===============>", process.env.NODE_ENV, process.env.CHROME_PATH)

      // 修改字体加载部分
      try {
        await chromium.font(path.posix.join(process.cwd(), 'public', 'fonts', 'SimSun.ttf'));
      } catch (error: any) {
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }

    const browser = await puppeteer.launch({
      // args: [...chromium.args, '--hide-scrollbars', '--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
      // 只有 production 环境才需要 args
      args: process.env.NODE_ENV === 'production' ? [...chromium.args, '--hide-scrollbars', '--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'] : [],
      defaultViewport: chromium.defaultViewport,
      // executablePath: process.env.NODE_ENV === 'production' ? await chromium.executablePath(
      //   `https://github.com/Sparticuz/chromium/releases/download/v123.0.1/chromium-v123.0.1-pack.tar`
      // ) :  process.env.CHROME_PATH,
      executablePath: process.env.CHROME_PATH,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // 设置视口大小
    await page.setViewport({ width: 1200, height: 1600 });

    // 本地开发环境
    const baseUrl = "http://localhost:3000";

    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `/poster?content=${encodeURIComponent(markdown)}`;
    const fullUrl = `${baseUrl}${url}`;

    await page.goto(fullUrl);

    // 调试：截图页面，便于排查元素是否渲染
    // await page.screenshot({ path: 'debug-before-wait.png' });

    try {
      // 等待海报元素渲染完成
      await page.waitForSelector(".poster-content", { timeout: 10000 });
    } catch (e) {
      // 超时时输出页面 HTML 便于排查
      // const html = await page.content();
      // fs.writeFileSync('debug-timeout.html', html);
      // await page.screenshot({ path: 'debug-timeout.png' });
      throw e;
    }
    
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
    const saveDir = process.env.NODE_ENV === 'production' 
      ? path.join('/tmp', 'uploads', 'posters')
      : path.join(process.cwd(), "public", "uploads", "posters");
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
    const imageUrl = process.env.NODE_ENV === 'production'
      ? `/api/images/${fileName}` // 新的 API 路由来处理图片
      : `/uploads/posters/${fileName}`;
    res.status(200).json({ url: `${baseUrl}${imageUrl}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate poster" });
  }
}
