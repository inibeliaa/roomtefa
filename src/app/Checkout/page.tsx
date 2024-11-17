"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import print from '../../../public/assets/icon/Print.svg'
import Print from '@/components/checkout/print'

function Page() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="overflow-x-hidden  w-full min-h-screen"> 
            <div className='bg-white translate-x-80 pb-[10%]'>
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Checkout Data
                    </div>
                <ul className='flex ps-[6%] mt-[4%] space-x-[8%]'>
                    <li className='text-[18px] pe-[6%]'>Guest Name</li>
                    <li className='text-[18px]'>Check In</li>
                    <li className='text-[18px]'>Check Out</li>
                    <li className='text-[18px]'>Room No</li>
                </ul>
        <div className="bg-[#84D2D89C] px-[2%] py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
             <Print isVisible={showModal} onClose={() => setShowModal(false)}/>      
                    <div className="bg-white p-[2%] grid grid-cols-7 w-full h-[60px] rounded-[6px]">
                    <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>Bemdmddkdkkdkkdkpa dksksl DSeprit hhehjjedjd</p>
                    <p className='text-[18px] translate-x-[25%]'>20-02-2009</p>
                    <p className='text-[18px] translate-x-[70%]'>20-02-2023</p>
                        <p className='text-[18px] translate-x-[180px] pe-[50%] ms-[3%]'>101</p>
                        <div onClick={()=> setShowModal(true)} className="translate-x-[170px]">
                            <Image className=""src={print} width={25} height={25} alt="checkin"/>
                        </div>
            </div>
        </div>
    </div>
      </div>
  )
}

export default Page
