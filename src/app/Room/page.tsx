/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import edit from '../../../public/assets/icon/Edit.svg'
import axios from 'axios'
import EditHarga from '@/components/room/edit'

function Page() {
    const [data, setData] = useState<any[]>([])
    const [showModal, setShowModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

    useEffect(() => {
        getRoom();
    }, []);

    async function getRoom() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/getRoom`;
        try {
            const res = await axios.get(url, { withCredentials: true });
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = (id: number) => {
        setSelectedRoomId(id);
        setShowModal(true);
    };

    const handleEditClose = (edited: boolean) => {
        setShowModal(false);
        if (edited) {
            getRoom();
        }
    };

    const formatHarga = (harga: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(harga);
    };

    return (
      <div className="overflow-x-hidden w-full min-h-screen">
            <div className='bg-white translate-x-80 pb-[10%]'>
                <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                    Room Data
                </div>
                <ul className='flex ps-[6%] mt-[4%] space-x-[10%]'>
                    <li className='text-[18px]'>Room No</li>
                    <li className='text-[18px] pe-[4%]'>Room Type</li>
                    <li className='text-[18px] pe-[1.5%]'>Price</li>
                    <li className='text-[18px]'>Status</li>
                </ul>
                <div className="bg-[#84D2D89C] px-[2%] flex-col py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <div key={item.id} className="bg-white p-[2%] grid grid-cols-6 w-full h-[60px] rounded-[6px]">
                                <p className='text-[18px] translate-x-[20%]'>{item.roomNo}</p>
                                <p className='text-[18px] col-span-2 translate-x-[28%] line-clamp-1 whitespace-nowrap'>{item.roomType}</p>
                                <p className='text-[18px] translate-x-[15%]'>{formatHarga(item.harga)}</p>
                                <p className='text-[18px] translate-x-[66%]'>{item.statusRoom}</p>
                                <div className="translate-x-[65%]">
                                    <Image
                                        onClick={() => handleEditClick(item.id)}
                                        className="cursor-pointer"
                                        src={edit}
                                        width={25}
                                        height={25}
                                        alt="edit room"
                                    />
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
            {showModal && selectedRoomId !== null && (
                <EditHarga
                    isVisible={showModal}
                    onClose={(updated) => handleEditClose(updated)}
                    id={selectedRoomId}
                />
            )}
      </div>
    )
}

export default Page;
