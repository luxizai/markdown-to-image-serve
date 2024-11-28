/*
 * @Author: wxingheng
 * @Date: 2024-11-27 17:50:50
 * @LastEditTime: 2024-11-27 17:52:15
 * @LastEditors: wxingheng
 * @Description: 
 * @FilePath: /example/src/app/poster/page.tsx
 */
'use client'
import Section from '@/components/Section'
import dynamic from 'next/dynamic'

const PosterView = dynamic(() => import('@/components/PosterView'), {
 ssr: false,
})
export default function Home() {
  return (
    <div>
      <Section className='relative'><PosterView /></Section>
    </div>
  )
}
