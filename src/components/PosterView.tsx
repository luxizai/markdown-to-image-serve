
'use client';
import React, { useState, ChangeEvent, TextareaHTMLAttributes, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from './ui/button'
import { Md2PosterContent, Md2Poster, Md2PosterHeader, Md2PosterFooter } from 'markdown-to-poster'
import { Copy, LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';


const Textarea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ onChange, ...rest }) => {
  return (
    <textarea
      className="border-none bg-gray-100 p-8 w-full resize-none h-full min-h-screen
      focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0
      text-gray-900/70 hover:text-gray-900 focus:text-gray-900 font-light font-inter
      "
      {...rest}
      onChange={(e) => onChange?.(e)}
    />
  )
}

const defaultMd = `# AI Morning News - April 29th
![image](https://imageio.forbes.com/specials-images/imageserve/64b5825a5b9b4d3225e9bd15/artificial-intelligence--ai/960x0.jpg?format=jpg&width=1440)
1. **MetaElephant Company Releases Multi-Modal Large Model XVERSE-V**: Supports image input of any aspect ratio, performs well in multiple authoritative evaluations, and has been open-sourced.
2. **Tongyi Qianwen Team Open-Sources Billion-Parameter Model Qwen1.5-110B**: Uses Transformer decoder architecture, supports multiple languages, and has an efficient attention mechanism.
3. **Shengshu Technology and Tsinghua University Release Video Large Model Vidu**: Adopts a fusion architecture of Diffusion and Transformer, generates high-definition videos with one click, leading internationally.
4. **Mutable AI Launches Auto Wiki v2**: Automatically converts code into Wikipedia-style articles, solving the problem of code documentation.
5. **Google Builds New Data Center in the U.S.**: Plans to invest $3 billion to build a data center campus in Indiana, expand facilities in Virginia, and launch an artificial intelligence opportunity fund.
6. **China Academy of Information and Communications Technology Releases Automobile Large Model Standard**: Aims to standardize and promote the intelligent development of the automotive industry.
7. Kimi Chat Mobile App Update: Version 1.2.1 completely revamps the user interface, introduces a new light mode, and provides a comfortable and intuitive experience.
  `

export default function PosterView() {
  // const [mdString, setMdString] = useState(defaultMd)
  // 需要根据url参数，作为mdString 的默认值
  const searchParams = useSearchParams()
  const [mdString, setMdString] = useState(searchParams?.get('content') || defaultMd)
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMdString(e.target.value)
  }
  const markdownRef = useRef<any>(null)
  const [copyLoading, setCopyLoading] = useState(false)
  const handleCopyFromChild = async () => {
    try {
      setCopyLoading(true);
      
      // 调用生成海报的 API
      const response = await fetch('/api/generatePoster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown: mdString }),
      });

      if (!response.ok) {
        throw new Error('生成海报失败');
      }

      // 获取图片 blob
      const imageBlob = await response.blob();
      
      // 创建临时URL
      const imageUrl = URL.createObjectURL(imageBlob);
      
      // 复制到剪贴板
      try {
        const data = new ClipboardItem({
          'image/png': imageBlob
        });
        await navigator.clipboard.write([data]);
        alert('复制成功！');
      } catch (err) {
        // 如果复制失败，则提供下载
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'poster.png';
        link.click();
      }
      
      // 清理
      URL.revokeObjectURL(imageUrl);
      setCopyLoading(false);
      
    } catch (error) {
      console.error('处理失败:', error);
      alert('生成海报失败');
      setCopyLoading(false);
    }
  }
  const copySuccessCallback = () => {
    console.log('copySuccessCallback')
  }
  return (
    <div className="poster-content" style={{display: "inline-block"}}>
          {/* Preview */}
            <Md2Poster theme="SpringGradientWave" copySuccessCallback={copySuccessCallback} ref={markdownRef}>
              <Md2PosterHeader className="flex justify-center items-center px-4 font-medium text-lg">
                <span>{new Date().toISOString().slice(0, 10)}</span>
              </Md2PosterHeader>
              <Md2PosterContent>{mdString}</Md2PosterContent>
              <Md2PosterFooter className='text-center'>
                <img src="/logo.png" alt="logo" className='inline-block mr-2 w-5' />
                Powered by BeePoster.com
              </Md2PosterFooter>
            </Md2Poster>
    </div>
  )
}
