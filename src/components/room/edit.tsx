/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
type EditPop = {
    id: number;
    isVisible: boolean;
    onClose: (isClose: boolean) => void;
}
type Harga = {
    harga: number;
}
const EditHarga: React.FC<EditPop> = ({ id, isVisible, onClose }) => {
    if (!isVisible) return null;
    const [harga, setHarga] = useState<number>()
    const [data, setData] = useState<Harga>();
    useEffect(() => {
        getRoom();
    }, [])
    async function getRoom() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/oneRoom/${id}`
        try {
            const res = await axios.get<Harga>(
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
    async function EditRoom() {
        // setIsLoading(true);
        const url = `${process.env.NEXT_PUBLIC_URL}api/editRoom/${id}` 
        try {
          const res = await axios.put(
            url,
            {
                id: id,
                harga: harga
            },
            { withCredentials: true }
          );
          Swal.fire({
            text: "Success Update Room Price",
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
            console.log(res);
            onClose(true)
          // setIsLoading(false);
        } catch (error:any) {
          // setIsLoading(false);
          console.log(error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            timer: 2000,
            text: error.response.data.message,
            width: "25%",
            color: "#0E7793",
            iconColor: "#e70008",
            showConfirmButton: false
          });
        }
    }
   
  return (
    <div className='fixed inset-0 z-50 flex ps-[25%] justify-center items-center '>
              {data && (              
          <div className="w-[30%] h-[27%] px-[2%] bg-white rounded-md">
                <div className="mt-[10%] mb-[3%]">
                    <label htmlFor="harga">Harga </label>
                    <input type="text" onChange={(e) => setHarga(Number(e.target.value))} defaultValue={data.harga} name='harga' className='w-[100%] py-1 px-2 bg-[#DEF1F1]/80 h-[40px]' />
                </div>
              <div className="flex relative mt-[8%] whitespace-nowrap"> 
                  <div className="absolute right-1">
                    <button  onClick={() => onClose(true)} className='cursor-pointer me-[5%] py-1 px-2 rounded-md top-2 bg-[#84D2D89C]'>
                        Cancel
                    </button>
                      <button onClick={EditRoom} className='cursor-pointer py-1 px-2 rounded-md top-2 bg-[#84D2D89C]'>
                        Update
                    </button>
                  </div>  
              </div>
          </div> 
              )}
    </div>
  )
}

export default EditHarga