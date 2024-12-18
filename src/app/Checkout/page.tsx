/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import print from '../../../public/assets/icon/Print.svg'
import Print from '@/components/checkout/print'
import axios from 'axios'
import searchIcon from '../../../public/assets/icon/Search.svg'

function Page() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any[]>([])
    const [selectedPrintId, setSelectedPrintId] = useState<number | null>(null);
    useEffect(() => {
        getOut();
    }, []);
    async function getOut() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/getOut`;
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
    const handlePrintClick = (id: number) => {
        setSelectedPrintId(id);
        setShowModal(true);
    };

    // const handlePrintClose = (printed: boolean) => {
    //     setShowModal(false);
    //      if (printed) {
    //          getRoom();
    //      }
    // };

    return (
        <div className="overflow-x-hidden  w-full min-h-screen"> 
            <div className='bg-white translate-x-80 pb-[10%]'>
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Checkout Data
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
                <ul className='flex ps-[6%] mt-[4%] space-x-[8%]'>
                    <li className='text-[18px] pe-[6%]'>Guest Name</li>
                    <li className='text-[18px]'>Check In</li>
                    <li className='text-[18px]'>Check Out</li>
                    <li className='text-[18px]'>Room No</li>
                </ul>
        <div className="bg-[#84D2D89C] flex-col px-[2%] py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
                    {filteredData.length > 0 ? (
                        filteredData.map((item: any) => (  
                                <div key={item.id} >
                            <div   className="bg-white p-[2%] grid grid-cols-7 w-full h-[60px] rounded-[6px]">
                            {showModal && selectedPrintId !== null && (
                            <Print
                                isVisible={showModal}
                                onClose={()=>setShowModal(false)}
                                id={selectedPrintId}
                            />
                        )}
                                <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>{item.name}</p>
                                <p className='text-[18px] translate-x-[28%]'>{formatTanggal(item.checkin)}</p>
                                    <p className='text-[18px] translate-x-[80%]'>{formatTanggal(item.checkout)}</p>
                                <p className='text-[18px] translate-x-[180px] pe-[50%] ms-[3%]'>{item.roomNo}</p>
                                <div onClick={() => handlePrintClick(item.id)} className="cursor-pointer translate-x-[170px]">
                                    <Image className="" src={print} width={25} height={25} alt="checkin" />
                                </div>
                                </div>
                            </div>
                                    ))
                                    ):(
                                        <div className="flex items-center mt-[30%] justify-center">
                                        <p className='text-[40px] text-[#0E7793]  text-opacity-35'>Data tidak ada</p>      
                                    </div>
                                    )
                                }
        </div>
    </div>
      </div>
  )
}

export default Page
