const fs = require('fs').promises;
const path = require('path');
const axios = require('axios'); // 需要先安装: npm install axios
const Buffer = require('buffer').Buffer;

/**
 * 读取 Markdown 文件内容
 * @param {string} filePath - Markdown 文件路径
 * @returns {Promise<string>} Markdown 文件内容
 */
async function readMarkdownFile(filePath) {
    return await fs.readFile(filePath, 'utf-8');
}

/**
 * 将 Markdown 内容转换为图像
 * @param {string} markdownContent - Markdown 内容
 * @returns {Promise<object>} 图像的 Buffer 数据字典
 */
async function convertMarkdownToImage(markdownContent) {
    const apiUrl = "https://markdown-to-image-serve.jcommon.top/api/generatePoster";
    const jsonData = { markdown: markdownContent };
    
    try {
        const response = await axios.post(apiUrl, jsonData);
        return response.data;
    } catch (error) {
        console.log(`请求失败: ${error.message}`);
        return null;
    }
}

/**
 * 将base64编码的图片保存为文件
 * @param {string} base64String - base64编码的字符串
 * @param {string} outputPath - 输出文件路径
 */
async function saveBase64Image(base64String, outputPath) {
    // 移除base64字符串中可能包含的header
    const base64Data = base64String.includes(',') 
        ? base64String.split(',')[1] 
        : base64String;
    
    const imageBuffer = Buffer.from(base64Data, 'base64');
    await fs.writeFile(outputPath, imageBuffer);
}

/**
 * 将字典格式的 Buffer 数据保存为图像文件
 * @param {object} bufferDict - 图像的 Buffer 数据字典
 * @param {string} filePath - 保存图像的文件路径
 */
async function saveImageFromDict(bufferDict, filePath) {
    const buffer = Buffer.from(Object.values(bufferDict));
    await fs.writeFile(filePath, buffer);
}

/**
 * 主函数
 */
async function main() {
    try {
        // 获取当前文件所在目录
        const currentDir = __dirname;
        
        // 构建markdown文件路径
        const markdownFile = path.join(currentDir, 'news_poster.md');
        
        // 构建输出图片路径
        const outputDir = path.join(currentDir, 'output');
        await fs.mkdir(outputDir, { recursive: true });
        const outputFile = path.join(outputDir, 'news_poster.png');
        
        // 读取markdown内容
        const markdownContent = await readMarkdownFile(markdownFile);
        
        // 转换为图片
        const result = await convertMarkdownToImage(markdownContent);
        
        if (result) {
            console.log(result);
            
            // 保存图片
            await saveImageFromDict(result, outputFile);
            console.log(`图片已保存到: ${outputFile}`);
        } else {
            console.log("API返回数据中没有找到图片内容");
        }
        
    } catch (error) {
        console.error(`发生错误: ${error.message}`);
    }
}

// 执行主函数
main(); 