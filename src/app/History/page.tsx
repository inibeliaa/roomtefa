"use client"
import React from 'react'

function Page() {
    return (
      <div className="overflow-x-hidden  w-full min-h-screen">    
            <div className='bg-white translate-x-80 pb-[10%]'>
                <div className="flex">
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Room Status Data
                    </div>
                    <div className='px-[3%] pt-[1.2%] pb-[1%] text-center absolute left-[40%] top-[3%] shadow-md h-[60px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                        <p className=''>Total :<span className='text-black'> Rp. 92999999999929243444</span></p>
                    </div>
                </div>
                <ul className='flex ps-[6%] mt-[4%] space-x-[6%]'>
                    <li className='text-[18px] pe-[8%]'>Guest Name</li>
                    <li className='text-[18px]'>Check In</li>
                    <li className='text-[18px]'>Check Out</li>
                    <li className='text-[18px]'>Room No</li>
                    <li className='text-[18px]'>Sub Total</li>
                </ul>
        <div className="bg-[#84D2D89C] px-[2%] py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
        <div className="bg-white grid p-[2%] grid-cols-7 w-full px-[1%] h-[60px] rounded-[6px]">
                    <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>Bemdmddkdkkdkkdkpa dksksl DSeprit hhehjjedjd</p>
                    <p className='text-[18px] translate-x-[25%]'>20-02-2009</p>
                    <p className='text-[18px] translate-x-[60%]'>20-02-2023</p>
                        <p className='text-[18px] translate-x-[130px] ms-[3%]'>101</p>
                        <p className='text-[18px] translate-x-[110px] ms-[3%]'>Rp20000000</p>
                            
            </div>
        </div>
    </div>
      </div>
  )
}

export default Page
