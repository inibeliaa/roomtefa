/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
type popHarga = {
    id: number;
    isVisible: boolean;
    onClose: (isClose: boolean) => void;
}
type Price = {
    subTotalRemarks: number;
    subTotalRoom: number;
    total: number;
}
const Harga: React.FC<popHarga> = ({ id, isVisible, onClose }) => {
    if (!isVisible) return null;
    const [data, setData] = useState<Price>();
    useEffect(() => {
        getRoom();
    }, [])
    async function getRoom() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/One/${id}`
        try {
            const res = await axios.get<Price>(
                url,
                {
                    withCredentials: true
                }
            )
            setData(res.data)
            // setHarga(res.data.harga)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const router = useRouter()
    const handleClose = () => {
        onClose(true);
        Swal.fire({
            text: "Success Add Reservation Data",
            icon: "success",
            timer: 2000,
            iconColor: "#0E7793cc",
            color: "#0E7793",
            width: "25%",
            showConfirmButton: false,
            customClass: {
              container: "alert"
            }
          });
        router.replace("/Reservation")
   }
  return (
    <div className='fixed inset-0 z-50 flex ps-[25%] justify-center items-center '>
          <div className="w-[30%] pb-[5%] px-[2%] bg-white rounded-md">
              <h1>Payment</h1>
              {data && (              
                <><div className="mt-[10%] mb-[3%]">
                      <label htmlFor="harga">Remarks </label>
                      <input type="text" readOnly value={data.subTotalRemarks} name='remark' className='w-[100%] py-1 px-2 bg-[#DEF1F1]/80 h-[40px]' />
                  </div><div className="mt-[10%] mb-[3%]">
                          <label htmlFor="harga">Room </label>
                          <input type="text" readOnly value={data.subTotalRoom} name='room' className='w-[100%] py-1 px-2 bg-[#DEF1F1]/80 h-[40px]' />
                      </div><div className="mt-[10%] mb-[3%]">
                          <label htmlFor="harga">Total </label>
                          <input type="text" readOnly value={data.total} name='total' className='w-[100%] py-1 px-2 bg-[#DEF1F1]/80 h-[40px]' />
                      </div></>
              )}
              <div className="flex relative mt-[8%] whitespace-nowrap"> 
                  <div className="absolute right-1">
                    <button  onClick={handleClose} className='cursor-pointer me-[5%] py-1 px-2 rounded-md top-2 bg-[#84D2D89C]'>
                        Ok
                    </button>
                  </div>  
              </div>
          </div> 
    </div>
  )
}

export default Harga