/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import checkinIcon2 from '../../../public/assets/icon/Hotel Check In (1).svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import searchIcon from '../../../public/assets/icon/Search.svg'

function Page() {
    const router = useRouter();
    const [data, setData] = useState<any[]>([])
    const handleAdd = () => {
        router.push("/Reservation/Add")
    }
    // const handleCheckin = () => {
    //     router.push("/Checkin/Build")
    // }
    useEffect(() => {
        getReservasi();
    }, []);
    async function getReservasi() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/getReservasi`;
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
                        const [search, setSearch] = useState("");
                        const filteredData = data.filter(item =>
                            item.name.toLowerCase().includes(search.toLowerCase()) ||
                            item.checkin.includes(search.toLowerCase()) ||
                            item.checkout.includes(search.toLowerCase())
                        );

    return (
        <div className="overflow-x-hidden  w-full min-h-screen">  
                    <div  className='bg-white translate-x-80 pb-[10%]'>
                <div className="flex">
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Reservation Data
                    </div>
                    <button onClick={handleAdd} className='w-[160px] cursor-pointer absolute left-[58%] top-[3%] shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                        + Reservasi
                    </button>
                </div>
                <div className="relative">
                <Image
                src={searchIcon}
                alt="pass icon"
                width={22}
                height={22}
                className="absolute top-1/2 left-[4%] cursor-pointer z-0"
              />
                <input name="search" onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='ms-[3%] ps-[4%] w-[25%] mt-[2%] px-[1%] shadow-md h-[40px] rounded-lg cursor-none font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'/>
                </div>
                <ul className='flex ps-[6%] mt-[2%] space-x-[8%]'>
                    <li className='text-[18px] pe-[6%]'>Guest Name</li>
                    <li className='text-[18px]'>Check In</li>
                    <li className='text-[18px]'>Check Out</li>
                    <li className='text-[18px]'>Room No</li>
                </ul>
        <div className="bg-[#84D2D89C] flex-col px-[2%] py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
            {filteredData.length > 0 ? (
                filteredData.map((item: any) => (        
        <div key={item.id} className="bg-white grid p-[2%] grid-cols-7 w-full h-[60px] rounded-[6px]">
                    <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>{item.name}</p>
                    <p className='text-[18px] translate-x-[28%]'>{formatTanggal(item.checkin)}</p>
                    <p className='text-[18px] translate-x-[80%]'>{formatTanggal(item.checkout)}</p>
                        <p className='text-[18px] translate-x-[180px] pe-[50%] ms-[3%]'>{item.roomNo}</p>
                        <div className="translate-x-[170px]">
                        <Link
                            href={`/Checkin/Build/${item.id}`}
                            className="flex"
                            >
                            <Image className="" src={checkinIcon2} width={25} height={25} alt="checkin"/>
                        </Link>
                        </div>
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
