import Image from 'next/image'
import React from 'react'
import FlowChart from './_components/flowchart'
import Marquee from '@/components/magicui/maruqee'

export default function Page() {
  return (
    <div className='flex items-center justify-center flex-col pt-2 h-screen'>
       
        {/* <Marquee>
          p by 1 pes
        </Marquee> */}

        <h1 className='text-7xl'>
          By x1 pes 
        </h1>
        {/* <Image src="/erd.png" alt="hero" width={1080} height={1080} /> */}
     
        {/* <FlowChart /> */}
    </div>
  )
}
