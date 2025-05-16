/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import edit from '../../../public/assets/icon/Edit.svg'
import axios from 'axios'
import EditHarga from '@/components/room/edit'

function Page() {
    const [data, setData] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

    useEffect(() => {
        getRoom();
    }, []);

    async function getRoom() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/getRoom`;
        try {
            const res = await axios.get(url, { withCredentials: true });
            setData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
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

    return (
        <div className="overflow-x-hidden w-full min-h-screen">
            <div className='bg-white ml-[25%] pb-[10%]'>
                <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                    Room Data
                </div>
                <table className="w-[90%] table-auto mt-6 ml-[4%]">
                    <thead>
                        <tr className="bg-[#0E7793] h-[70px] text-white">
                            <th className="px-4 py-2">Room No</th>
                            <th className="px-4 py-2">Room Type</th>
                            <th className="px-4 py-2">Room Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {data && data.length > 0 ? (
                            data && data.map((item, i:number) => (
                                <tr key={item.id}  className={`h-[60px] ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]' }`}>
                                    <td className='text-[18px] text-center px-4 py-2'>{item.roomNo}</td>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.roomType}</td>
                                    <td className='text-[18px] text-center px-4 py-2'>{item.statusRoom}</td>
                                    <td className="px-4 py-2 flex justify-self-center">
                                        <Image
                                            onClick={() => handleEditClick(item.id)}
                                            className="cursor-pointer"
                                            src={edit}
                                            width={25}
                                            height={25}
                                            alt="edit room"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-xl text-[#0E7793] opacity-50">
                                    Data tidak ada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && selectedRoomId !== null && (
                <EditHarga
                    isVisible={showModal}
                    onClose={(updated) => handleEditClose(updated)}
                    id={selectedRoomId}
                />
            )}
        </div>
    );
}

export default Page;
