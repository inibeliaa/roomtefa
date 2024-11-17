"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import charge from '../../../../public/assets/icon/Plus.svg'
import Image from 'next/image'
function Page() {
  const router = useRouter();
  const handleCancel = () => {
    router.replace("/Checkout")
  }
  return (
    <div className="overflow-x-hidden  w-full min-h-screen">    
    <div className='bg-white translate-x-80 pb-[10%]'>
            <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
               <span onClick={handleCancel}>Check Out Data</span> &gt; Check Out Form
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
                      <label htmlFor="desc" className="text-[20px]">Description</label>
                      <textarea name='desc' className='bg-white p-2 w-full h-[150px] rounded-md' />
                    </div>
                    <div className="flex flex-col space-y-[5%]">
                    <p className="text-[20px]">Payment Method:</p>
                    <div className="pt-[4%]">
                    <input type="radio" name='Payment' value="Cash" id='Cash'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="Cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                    </div>
                    <div className="">
                    <input type="radio" name='Payment' value="Debit" id='Debit'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="Debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
                    </div>
          </div>
                  </div> 
                  <div className="flex flex-col w-full space-y-2">
            <div className="flex">
              <Image src={charge} alt="add charge" width={30} height={30} />
              <p className='text-[20px] mt-[2px] ms-[1px]'>Other Charge</p>
            </div>
            <div className="flex space-x-5 w-full">
                    <div className='w-[60%]'>
                      <label htmlFor="Detail" className="text-[20px]">Detail</label>
                      <input type="text" name='Detail' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[40%]'>
                    <label htmlFor="Price" className="text-[20px]">Price</label>
                    <input type="text" name='Price' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
          </div>
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