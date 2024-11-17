/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import remark from '../../../../public/assets/icon/Plus.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function Page() {
  const [names, setNames] = useState<string>("");
  const [checkin, setCheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [roomNo, setRoomNo] = useState<number>();
  const [roomType, setRoomType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [adult, setAdult] = useState<string>("");
  const [remarks, setRemarks] = useState<any[]>([
    {
      detail: "",
      price: 0
    }
  ]);
  const router = useRouter();
  const handleCancel = () => {
    router.replace("/Reservation")
  }
  const handleAddRemarks = () => {
    setRemarks([
      ...remarks,
      {
        detail: "",
        price: 0
      }
    ]);
  };
  const handleChangeField = (e: any, i: number) => {
    const { name, value } = e.target;
    const onChange: any = [...remarks];
    onChange[i][name] = value;
    setRemarks(onChange);
  };
  async function Reservation() {
    const url = `${process.env.NEXT_URL_PUBLIC}api/reservasi`
    try {
      const res = await axios.post(
        url,
        {
          nama: names,
          checkin: checkin,
          checkout: checkout,
          roomNo: roomNo,
          roomType: roomType,
          email: email,
          phone: phone,
          children: children,
          adult: adult,
          remarks
        },
        {
          withCredentials: true
        }
      )
      alert("Success add reservation")
      console.log(res.data)
    } catch (error) {
      console.log(error)
      alert("error")
    }
  }
  const handleDelete = (i: number) => {
    const deleteRemarks = [...remarks];
    deleteRemarks.splice(i, 1);
    setRemarks(deleteRemarks);
  };
  return (
    <div className="overflow-x-hidden  w-full min-h-screen">    
    <div className='bg-white translate-x-80 pb-[10%]'>
            <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
               Reservation Data &gt; Reservation Form
              </div> 
              <div className="bg-[#84D2D89C] flex-col px-[2%] mt-[1%] rounded-[20px] py-[3%] ms-[3%] flex space-y-[3%] w-[70%] min-h-screen">
          <button onClick={handleCancel} className='w-[120px] absolute left-[61%] top-[12%] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Cancel
                  </button>
                  <div className='w-[49%]'>
                    <label htmlFor="Guest Name" className="text-[20px]">Guest Name</label>
                    <input type="text" onChange={(e) => setNames((e.target as HTMLInputElement).value)} name='Guest Name' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
                  <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="Check In" className="text-[20px]">Check In</label>
                      <input type="date" onChange={(e) => setCheckin((e.target as HTMLInputElement).value)}  name='Check In' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Check Out" className="text-[20px]">Check Out</label>
                    <input type="date" onChange={(e) => setCheckout((e.target as HTMLInputElement).value)}  name='Check Out' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
          </div> 
          <div className="flex space-x-5 w-full">
                    <div className='w-[25%]'>
                      <label htmlFor="Room Type" className="text-[20px]">Room Type</label>
                      <input type="text" name='Room Type' onChange={(e) => setRoomType((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[25%]'>
                    <label htmlFor="Room No" className="text-[20px]">Room No</label>
                    <input type="text" name='Room No'  onChange={(e) => setRoomNo(Number((e.target as HTMLInputElement).value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> 
            <div className='w-[25%]'>
                      <label htmlFor="Adult" className="text-[20px]">Adult</label>
                      <input type="text" name='Adult' onChange={(e) => setAdult((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[25%]'>
                    <label htmlFor="Children" className="text-[20px]">Children</label>
                    <input type="text" name='Children' onChange={(e) => setChildren((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div> 
          </div>
          <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="Email" className="text-[20px]">Email</label>
                      <input type="email" name='Email' onChange={(e) => setEmail((e.target as HTMLInputElement).value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Phone Number" className="text-[20px]">Phone Number</label>
                    <input type="tel" name='Phone Number' onChange={(e) => setPhone((e.target as HTMLInputElement).value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
          </div> 
          <div className="flex flex-col w-full space-y-2">
            <div className="flex">
              <Image
                src={remark}
                onClick={() => handleAddRemarks()}
                alt="add remark"
                width={30}
                height={30}
              />
              <p className="text-[20px] mt-[2px] ms-[1px]">Remarks</p>
            </div>
            {remarks.map((data, i) => (
              <div key={i} className="flex space-x-5 w-full">
                <div className="w-[50%]">
                  <label htmlFor="detail" className="text-[20px]">
                    Detail
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleChangeField(e, i)}
                    name="detail"
                    className="bg-white p-2 w-full h-[50px] rounded-md"
                  />
                </div>
                <div className="w-[40%]">
                  <label htmlFor="price" className="text-[20px]">
                    Price
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleChangeField(e, i)}
                    name="price"
                    className="bg-white p-2 w-full h-[50px] rounded-md"
                  />
                </div>
                  <button onClick={() => handleDelete(i)} className='rounded-md font-bold bg-[#84D2D89C] mt-[3.5%] w-[5%] h-[50px]'>
                    x
                  </button>
              </div>
            ))}
          </div>
          {/* // <div className="flex space-x-[3%]">
          //   <p className="text-[20px]">Payment Method:</p>
          //   <div className="">
          //     <input type="radio" name='Payment' value="Cash" id='Cash'
          //       className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
          //        border-2 border-[#0E7793] w-5 h-5" />
          //     <label htmlFor="Cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
          //   </div>
          //   <div className="">
          //     <input type="radio" name='Payment' value="Debit" id='Debit'
          //       className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
          //        border-2 border-[#0E7793] w-5 h-5" />
          //     <label htmlFor="Debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
          //   </div>
          // </div> */}
          <button onClick={Reservation} className='w-[120px] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Submit
          </button>
         </div>
        </div>
    </div>
  )
}

export default Page