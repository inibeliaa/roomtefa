"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter();
  const handleCancel = () => {
    router.replace("/Checkin")
  }
  return (
    <div className="overflow-x-hidden  w-full min-h-screen">    
    <div className='bg-white translate-x-80 pb-[10%]'>
            <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
               Check In Data &gt; Check In Form
              </div> 
              <div className="bg-[#84D2D89C] flex-col px-[2%] mt-[1%] rounded-[20px] py-[3%] ms-[3%] flex space-y-[3%] w-[70%] min-h-screen">
                  <div className="flex mb-[1.2%]">
                      <h1 className='font-semibold text-[23px] translate-y-[10px]'>Reservation Information</h1>
                    <button onClick={handleCancel} className='w-[120px] absolute left-[61%] top-[8%] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                                Cancel
                    </button>
                  </div>
                  <div className="bg-white grid grid-cols-2 space-y-[1%] p-[2%] flex-col w-full h-[200px] rounded-md">
                      {/* <div className="flex space-x-[30%]">
                          <p className="text-[18px]">Reservation Code        :<span>1</span></p>
                          <p className="text-[18px]">Guest Name       :</p>
                      </div>
                      <div className="flex space-x-[30.5%]">
                          <p className="text-[18px]">Reservation Date       :</p>
                          <p className="text-[18px]">Phone Number       :</p>
                      </div>
                      <div className="flex space-x-[30%]">
                          <p className="text-[18px]">No of Adult/Child       :</p>
                          <p className="text-[18px]">Email        :</p>
                      </div>
                      <div className="flex space-x-[32.7%]">
                          <p className="text-[18px]">Room Quantity        :</p>
                          <p className="text-[18px]">Booked By       :</p>
                      </div>
                      <div className="flex space-x-[37%]">
                          <p className="text-[18px]">Room Type        :</p>
                          <p className="text-[18px]">Room Number        :</p>
                      </div> */}
                      <div className="">
                          <ul className='flex-col space-y-[2%]'>
                              <li>Reservation Code        :<span> 1</span></li>
                              <li>Reservation Date        :<span> 20-okt-2007</span></li>
                              <li>No. of Adult/Children  :<span> 2 adult</span></li>
                              <li>Room Quantity           :<span> 2</span></li>
                              <li>Room Type                 :<span> Deluxe</span></li>
                          </ul>
                      </div>
                      <div className="">
                          <ul className='flex-col space-y-[2%]'>
                              <li>Room Number            :<span> 101</span></li>
                              <li>Guest Name       :<span> Belia</span></li>
                              <li>Phone Number   :<span> 082992928</span></li>
                              <li>Email                :<span> beheh@</span></li>
                              <li>Booked By         :<span> bey</span></li>
                          </ul>
                      </div>
                  </div>
                  <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="Check In" className="text-[20px]">Check In</label>
                      <input type="date" name='Check In' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Check Out" className="text-[20px]">Check Out</label>
                    <input type="date" name='Check Out' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
          </div> 
          <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="Wake" className="text-[20px]">Wake Up Call</label>
                      <input type="datetime-local" name='Wake' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Nationality" className="text-[20px]">Nationality</label>
                    <input type="text" name='nationality' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
                  </div> 
                  <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="desc" className="text-[20px]">Description</label>
                      <textarea name='desc' className='bg-white p-2 w-full h-[150px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Purpose" className="text-[20px]">Purpose of Visit</label>
                    <input type="text" name='Purpose' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
                  </div>
                  <div className="flex-col">
                      <h1 className='text-[20px]'>Remarks</h1>
                      <div className="bg-white rounded-md pb-[2%] p-2 w-full">
                          <ul className='flex justify-around'>
                              <li className="text-[20px] text-[#0E7793] px-[15%]">Detail</li>
                              <li className="text-[20px] text-[#0E7793]">Price</li>
                          </ul>
                          <ul className='grid grid-cols-3 mt-[1%]'>
                              <li className="text-[20px] col-span-2 px-[15%] text-center">contoh</li>
                              <li className="text-[20px] text-center">Price</li>
                          </ul>
                      </div>
                  </div>
                  <div className="relative">
                      <h1 className='absolute right-0 text-[20px]'>Subtotal : <span>188188</span></h1>
                  </div>
          <button className='w-[120px] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Submit
          </button>
         </div>
        </div>
    </div>
  )
}

export default Page