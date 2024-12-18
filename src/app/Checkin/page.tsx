/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import checkoutIcon2 from '../../../public/assets/icon/Hotel Check Out.svg'
// import { useRouter } from 'next/navigation';
import axios from 'axios';
import searchIcon from '../../../public/assets/icon/Search.svg'
import Link from 'next/link';
import detail from '../../../public/assets/icon/Popup.svg'
import Detail from '@/components/checkin/detail';
type CheckinData = {
    id: number;
    name: string;
    checkin: string;
    checkout: string;
    roomNo: string;
    checkinOuts: {
        id: number;
    }[];
  }
function Page() {
    // const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any[]>([])
    const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
    // const handleCheckout = () => {
    //     router.push("/Checkout/Build")
    // }
    useEffect(() => {
        getIn();
    }, []);
    async function getIn() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/getIn`;
        try {
            const res = await axios.get<CheckinData[]>(url,
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
    const handleDetail = (id: number) => {
        setSelectedDetailId(id);
        setShowModal(true);
    };
    return (
        <div className="overflow-x-hidden  w-full min-h-screen">   
                    <div  className='bg-white translate-x-80 pb-[10%]'>
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Checkin Data
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
        <div className="bg-[#84D2D89C] px-[2%] py-[3%] rounded-[20px] ms-[3%] flex flex-col space-y-3 w-[70%] min-h-screen">
        {showModal && selectedDetailId !== null && (
                            <Detail
                                isVisible={showModal}
                                onClose={()=>setShowModal(false)}
                                id={selectedDetailId}
                            />
                        )}
            {filteredData.length > 0 ?  (
                filteredData.map((item: any) => (    
                <div key={item.id} className="bg-white grid grid-cols-7 p-[2%] w-full h-[60px] rounded-[6px]">
                            <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>{item.name}</p>
                            <p className='text-[18px] translate-x-[28%]'>{formatTanggal(item.checkin)}</p>
                            <p className='text-[18px] translate-x-[80%]'>{formatTanggal(item.checkout)}</p>
                            <p className='text-[18px] translate-x-[180px] pe-[50%] ms-[3%]'>{item.roomNo}</p>
                        <div className="flex translate-x-[125%]">
                        <Image onClick={() => handleDetail(item.id)} className="cursor-pointer" src={detail} width={25} height={25} alt="detail" />
                            {item.checkinOuts.map((checkout: { id: number }) => (
                            <Link
                                key={checkout.id}
                                href={`/Checkout/Build/${checkout.id}`}
                                className="flex relative translate-x-[80%]"
                            >
                                <Image  className="" src={checkoutIcon2} width={25} height={25} alt="checkin" />
                                </Link>
                            
                            ))}
                           </div>
                    </div>
            ))
        ) : (
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
