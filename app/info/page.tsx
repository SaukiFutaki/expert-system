import Image from 'next/image'
import React from 'react'

export default function Page() {
  return (
    <div className='flex items-center justify-center flex-col pt-2'>
        <h1 className='text-4xl'>
            ERD Sistem Pakar Sipil
        </h1>
        <Image src="/erd.png" alt="hero" width={1080} height={1080} />
    </div>
  )
}
