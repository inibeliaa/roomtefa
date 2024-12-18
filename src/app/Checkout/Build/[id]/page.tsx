/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import chargeAdd from '../../../../../public/assets/icon/Plus.svg'
import Image from 'next/image'
import axios from 'axios'
import Swal from 'sweetalert2'
type ReservationData = {
  id: number;
  name: string;
  createdAt: string;
  adult: string;
  children: string;
  roomNo: string;
  roomType: string;
  phone: string;
  email: string;
  bookedBy: string;
  checkin: string;
  checkout: string;
  remarks: {
    detail: string;
    price: number;
  }[];
  total: number;
}
function Page() {
  const router = useRouter();

  const handleCancel = () => {
    router.replace("/Checkout")
  }
  const [data, setData] = useState<ReservationData>()
  const { id } = useParams();
  useEffect(() => {
    getReservasi();
  }, [id]);
  
  async function getReservasi() {
    const url = `${process.env.NEXT_PUBLIC_URL}api/One/${id}`;
    try {
        const res = await axios.get<ReservationData>(url,
            {
                withCredentials: true
          });
          if (res.data) {
            setData(res.data);
            setCheckin(formatTanggalForInput(res.data.checkin));
            setCheckout(formatTanggalForInput(res.data.checkout));
          } else {
            alert("Data tidak ditemukan");
          }
      console.log("Data ditemukan:", res.data);
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
  const formatTanggalForInput = (tanggal: string) => {
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  // const [wakeUp, setWakeUp] = useState("");
  //   const [nationality, setNationality] = useState("");
  //   const [purpose, setPurpose] = useState("");
  //   const [description, setDescription] = useState("");
  // const [payment, setPayment] = useState("");
  const [otherCharge, setOtherCharge] = useState<{ detail: string; price: number }[]>([
    { detail: "", price: 0 }
  ]);

  const handleAddCharge = () => {
    setOtherCharge([
      ...otherCharge,
      {
        detail: "",
        price: 0
      }
    ]);
  };
  const handleChangeField = (e: any, i: number) => {
    const { name, value } = e.target;
    const onChange: any = [...otherCharge];
    onChange[i][name] = value;
    setOtherCharge(onChange);
  };
  const handleDelete = (i: number) => {
    const deleteCharge = [...otherCharge];
    deleteCharge.splice(i, 1);
    setOtherCharge(deleteCharge);
  };
  const [checkin, setCheckin] = useState("");
  const [payOut, setPayOut] = useState<string>("");
  const [checkout, setCheckout] = useState("");
  async function Checkout() {
    const url = `${process.env.NEXT_PUBLIC_URL}api/out/${id}`;
    console.log("ID:", id);
    console.log("Data yang dikirim:", {
        id: id,
        other: otherCharge,
        paymentOut: payOut
    });
    try {
      const res = await axios.put(
        url,
        {
            other: otherCharge,
            paymentOut: payOut
        },
        {
          withCredentials: true
        }
      );
      Swal.fire({
        text: "Success Add Checkout Data",
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
      router.push("/Checkout");
      console.log(res);
      console.log(
        "id",id
      )
    } catch (error:any) {
      console.log("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        width: "25%",
        color: "#0E7793",
        iconColor: "#e70008",
        customClass: {
          container:"alert"
        },
        showConfirmButton: false
      });
    }
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
                    <button onClick={handleCancel} className='w-[120px] cursor-pointer absolute left-[61%] top-[8%] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                                Cancel
                    </button>
          </div>
          {data && data.checkin && data.checkout && (  
                <>
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
                  <li>Reservation Code        :<span> {data.id}</span></li>
                  <li>Reservation Date        :<span> {formatTanggal(data.createdAt)}</span></li>
                  <li>No. of Adult/Children  :<span> {data.adult} / {data.children}</span></li>
                  {/* <li>Room Quantity           :<span> 2</span></li> */}
                  <li>Room Type                 :<span> {data.roomType}</span></li>
                  <li>Room Number            :<span> {data.roomNo}</span></li>
                </ul>
              </div><div className="">
                  <ul className='flex-col space-y-[2%]'>
                    <li>Guest Name       :<span> {data.name}</span></li>
                    <li>Phone Number   :<span> {data.phone}</span></li>
                    <li>Email                :<span> {data.email}</span></li>
                    <li>Booked By         :<span> {data.bookedBy}</span></li>
                  </ul>
                </div>
                  </div>
                  <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="Check In" className="text-[20px]">Check In</label>
                      <input type="date" readOnly value={formatTanggalForInput(checkin)} name='Check In' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Check Out" className="text-[20px]">Check Out</label>
                    <input type="date" name='Check Out' readOnly value={formatTanggalForInput(checkout)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
            </div> 
            </>
          )}
                   <div className="flex space-x-5 w-full">
                  {/* <div className='w-[50%]'>
                     <label htmlFor="desc" className="text-[20px]">Description</label>
                      <textarea name='desc' className='bg-white p-2 w-full h-[150px] rounded-md' />
                     </div> */}
                    <div className="flex flex-col space-y-[5%]">
                    <p className="text-[20px]">Payment Method:</p>
                    <div className=" space-y-[5%] ">
                    <div className="">
                    <input type="radio" name='paymentOut' onChange={(e) => setPayOut((e.target as any as HTMLInputElement).value)} value="cash" id='cash'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                    </div>
                    <div className="">
                    <input type="radio" name='paymentOut' onChange={(e) => setPayOut((e.target as HTMLInputElement).value)} value="debit" id='debit'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
                    </div>
          </div>
          </div>
                  </div> 
                  <div className="flex flex-col w-full space-y-2">
            <div className="flex">
            <Image className='cursor-pointer' onClick={handleAddCharge} src={chargeAdd} alt="add charge" width={30} height={30} />
              <p className='text-[20px] mt-[2px] ms-[1px]'>Other Charge</p>
            </div>
            {otherCharge.map((data2, i) => (
              <div key={i} className="flex space-x-5 w-full">
                <div className="w-[50%]">
                  <label htmlFor="detail" className="text-[20px]">
                    Detail
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleChangeField(e, i)}
                    name="detail"
                    value={data2.detail}
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
                    value={data2.price}
                    className="bg-white p-2 w-full h-[50px] rounded-md"
                  />
                </div>
                  <button onClick={() => handleDelete(i)} className='cursor-pointer rounded-md font-bold bg-[#84D2D89C] mt-[3.5%] w-[5%] h-[50px]'>
                    x
                  </button>
              </div>
            ))}
          </div>
        <button onClick={Checkout} className=' cursor-pointer w-[120px] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Submit
          </button>
         </div>
    </div>
      </div>
      // </div>
      // </div>
  )
}

export default Page 