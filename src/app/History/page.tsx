/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import searchIcon from '../../../public/assets/icon/Search.svg'
type History = {
    total: number;
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
    
  const formatTanggal = (tanggal: string) => {
    const opsiTanggal: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
    };
    const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
    const [search, setSearch] = useState("");
    const filteredData = data?.checkout.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.checkin.includes(search.toLowerCase()) ||
        item.checkout.includes(search.toLowerCase())
    );
    return (
      <div className="overflow-x-hidden  w-full min-h-screen">     
                (
                <div className='bg-white translate-x-80 pb-[10%]'>
                    <div className="flex">
                        <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                            History Data
                    </div>
                    {data &&
                        <div className='px-[3%] pt-[1.2%] pb-[1%] text-center absolute left-[40%] top-[3%] shadow-md h-[60px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            <p className=''>Total :<span className='text-black'>{formatHarga(data.total)}</span></p>
                        </div>
                    }
                    
                </div>
                <div className="relative">
                <Image
                src={searchIcon}
                alt="pass icon"
                width={22}
                height={22}
                className="absolute top-1/2 left-[4%]"
              />
                <input name="search" onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='ms-[3%] ps-[4%] w-[25%] mt-[2%] px-[1%] shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'/>
                </div>
                    <ul className='flex ps-[6%] mt-[4%] space-x-[4%]'>
                        <li className='text-[18px] pe-[8%]'>Guest Name</li>
                        <li className='text-[18px]'>Check In</li>
                        <li className='text-[18px]'>Check Out</li>
                        <li className='text-[18px]'>Room No</li>
                        <li className='text-[18px]'>Sub Total</li>
                    </ul>
                    <div className="bg-[#84D2D89C] px-[2%] py-[3%] flex-col rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
                        { filteredData && filteredData.length > 0 ? (
                            filteredData.map((item: any, id:number) => (                 
                                <div key={id} className="bg-white grid p-[2%] grid-cols-7 w-full px-[1%] h-[60px] rounded-[6px]">
                                        <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>{item.name}</p>
                                        <p className='text-[18px] translate-x-[15%]'>{formatTanggal(item.checkin)}</p>
                                        <p className='text-[18px] translate-x-[25%]'>{formatTanggal(item.checkout)}</p>
                                            <p className='text-[18px] translate-x-[50px] ms-[3%]'>{item.roomNo}</p>
                                            <p className='text-[18px] translate-x-[35px] ms-[3%]'>{formatHarga(item.checkinOuts[0]?.total)}</p>
                                                
                            </div>
                            ))
                        ) : (
                            <div className="flex items-center mt-[30%] justify-center">
                            <p className='text-[40px] text-[#0E7793]  text-opacity-35'>Data tidak ada</p>      
                        </div>
                        )}
            </div>
                    </div>
      </div>
  )
}

export default Page
