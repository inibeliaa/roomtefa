"use client"
import React from 'react'
import Image from 'next/image'
import save from '../../../../public/assets/icon/Save.svg'
import { useRouter } from 'next/navigation'

function Page() {
    const router = useRouter();
    const handleBack = () => {
        router.replace("/Room")
    }
    return (
      <div className="overflow-x-hidden  w-full min-h-screen">    
            <div className='bg-white translate-x-80 pb-[10%]'>
                    <div className="text-[23px] cursor-pointer font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        <span onClick={handleBack}>Room Data</span> &gt; Room Edit
                    </div>
                <ul className='flex ps-[6%] mt-[4%] space-x-[10%]'>
                    <li className='text-[18px] '>Room No</li>
                    <li className='text-[18px] pe-[6%]'>Room Type</li>
                    <li className='text-[18px]'>Price</li>
                    <li className='text-[18px]'>Status</li>
                </ul>
        <div className="bg-[#84D2D89C] px-[2%] py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
                    <div className="bg-white px-[2%] py-[2%] grid grid-cols-6 w-full h-[60px] rounded-[6px]">
                    <p className='text-[18px] translate-x-[20%]'>101</p>
                    <p className='text-[18px] col-span-2  translate-x-[15%] line-clamp-1 whitespace-nowrap'>Double hshshh Twin Deluxe</p>
                    <p className='text-[18px] translate-x-[30%]'>Rp.1000.000</p>
                        <p className='text-[18px] translate-x-[70%]'>Available</p>
                        <div className="translate-x-[60%]">
                            <Image className=""src={save} width={25} height={25} alt="checkin"/>
                        </div>
            </div>
        </div>
    </div>
      </div>
  )
}

export default Page
