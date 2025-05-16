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
type Status = {
    statusRoom: string;
}
const EditStatus: React.FC<EditPop> = ({ id, isVisible, onClose }) => {
    if (!isVisible) return null;
    const [status, setStatus] = useState<string>('')
    const [data, setData] = useState<Status>();
    useEffect(() => {
        getRoom();
    }, [])
    async function getRoom() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/oneRoom/${id}`
        try {
            const res = await axios.get<Status>(
                url,
                {
                    withCredentials: true
                }
            )
            setData(res.data)
            setStatus(res.data.statusRoom)
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
               statusRoom: status
            },
            { withCredentials: true }
          );
          Swal.fire({
            text: "Success Update Room Status",
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
                    <label htmlFor="Status">Status Room</label>
            <select name='Room Status' defaultValue={status} onChange={(e)=>setStatus(e.target.value)} className='bg-white p-2  w-full h-[50px] rounded-md' id='Room Status'>
                    <option  value="VR">Vacant Ready</option>
                    <option  value="VD">Vacant Dirty</option>
                    <option  value="OC">Occupied Clean</option>
                    <option  value="OD">Occupied Dirty</option>
                    </select>
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

export default EditStatus