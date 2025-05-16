/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import HistoryPersonal from '@/components/history/personalHistory';
import HistoryGroup from '@/components/history/roomHistory';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
type History = {
    totalAll: number;
    totalPersonal: number;
    totalGroup: number;
    checkout: {
        name: string;
        checkin: string;
        checkout: string;
        roomNo: number;
        checkinOuts: {
            total: number;
        }[];
    }[];
}
function Page() {
    const [data, setData] = useState<History | null>(null);
    useEffect(() => {
        getHistory();
    }, []);
    async function getHistory() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/getTotal`;
        try {
            const res = await axios.get(url,
                {
                    withCredentials: true
                });
            setData(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    
//   const formatTanggal = (tanggal: string) => {
//     const opsiTanggal: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//     };
//     return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
//     };
    const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
    const [active, setActiveRegis] = useState('personal')
    return (
      <div className="overflow-x-hidden  w-full min-h-screen">     
                <div className='bg-white translate-x-80 pb-[10%]'>
                    <div className="flex">
                        <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                            History Data
                    </div>
                    {data &&
                        <div className="flex absolute left-1/3 top-[5%] space-x-3">
                        
                            <div className='px-[3%] pt-[1.2%] pb-[1%] text-center flex items-center  shadow-md h-[60px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                                <p className='whitespace-nowrap'>Total :<span className='text-black'>{formatHarga(data.totalAll)}</span></p>
                            </div>
                            {active === 'personal' ?
                            <div className='px-[3%] flex items-center pt-[1.2%] pb-[1%] text-center  shadow-md h-[60px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            <p className='whitespace-nowrap'>Total Personal:<span className='text-black'>{formatHarga(data?.totalPersonal ?? 0)}</span></p>
                        </div> : <div className='px-[3%] flex items-center pt-[1.2%] pb-[1%] text-center  shadow-md h-[60px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            <p className='whitespace-nowrap'>Total Group:<span className='text-black'>{formatHarga(data?.totalGroup ?? 0)}</span></p>
                        </div>
                            }
                        </div>
                    }
                    
                </div>
                <div className="flex space-x-5 ms-[3%] mt-[1%]">
                    <button className={`text-[18px] cursor-pointer ${active === 'personal' ? 'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('personal')}>
                    Personal
                    </button>
                    <button className={`text-[18px] cursor-pointer ${active === 'group' ?'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('group')}>
                    Group 
                    </button>
                </div>
                {active === 'personal' ? <HistoryPersonal /> : ''}
                {active === 'group' ? <HistoryGroup /> : ''}
                    </div>
      </div>
  )
}

export default Page
