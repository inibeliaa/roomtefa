/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
// import remark from '../../../../public/assets/icon/Plus.svg'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Harga from '@/components/reservation/popupharga'
import Swal from 'sweetalert2'

function Page() {
  const [nama, setnama] = useState<string>("");
  const [checkin, setCheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [roomNo, setRoomNo] = useState<number>();
  const [roomType, setRoomType] = useState<string>("deluxe");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [adult, setAdult] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [stay, setStay] = useState<number>();
  const [rate, setRate] = useState<number>()
  const [booked, setBooked] = useState<string>("");
  const [down, setDown] = useState<number>();
  const [remaining, setRemaining] = useState<number>();
  const [total, setTotal] = useState<number>();
  // const [remarks, setRemarks] = useState<any[]>([
  //   {
  //     detail: ""
  //   }
  // ]);
  const router = useRouter();
  const handleCancel = () => {
    router.replace("/Reservation")
  }
  useEffect(() => {
    setRoomType('deluxe');
  }, []);
  // const handleAddRemarks = () => {
  //   setRemarks([
  //     ...remarks,
  //     {
  //       detail: "",
  //     }
  //   ]);
  // };
  // const handleChangeField = (e: any, i: number) => {
  //   const { name, value } = e.target;
  //   const onChange: any = [...remarks];
  //   onChange[i][name] = value;
  //   setRemarks(onChange);
  // };
  // const formatDate = (date: string) => {
  //   const [day, month, year] = date.split(" ");
  //   return `${year}-${month}-${day}`;
  // };
  const [showModal, setShowModal] = useState(false);
  const [reservationId, setReservationId] = useState<number>();
  async function Reservation() {
    const url = `${process.env.NEXT_PUBLIC_URL}api/reservasi`
    // const checkinFormatted = formatDate(checkin);
    // const checkoutFormatted = formatDate(checkout);
    try {
      const res = await axios.post(
        url,
        {
          name: nama,
          checkin: checkin,
          checkout: checkout,
          roomNo: roomNo,
          roomType: roomType,
          email: email,
          phone: phone,
          children: children,
          adult: adult,
          // remarks: remarks,
          stay: stay,
          bookedBy: booked,
          down: down,
          remaining: remaining,
          rate: rate,
          total: total,
          payment: payment
        },
        {
          withCredentials: true
        }
      )
      setReservationId(res.data.id)
      console.log(res.data)
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 2000,
        text: error.response.data.message,
        width: "25%",
        color: "#0E7793",
        iconColor: "#e70008",
        customClass: {
          container:"alert"
        },
        showConfirmButton: false
      });
      console.log(error)
    }
  }
  const [data, setData] = useState<any[]>([]);

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

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoom = Number(e.target.value); 
    setRoomNo(selectedRoom);

    const selectedRoomData = data.find((room) => room.roomNo === selectedRoom);
    if (selectedRoomData) {
      setRate(selectedRoomData.harga || 0); 
    } else {
      setRate(0); 
    }
  };
  
  useEffect(() => {
    setTotal(calculateTotal());
  }, [stay, rate]);
  
  useEffect(() => {
    setRemaining(calculateRemaining());
  }, [down, total]);
  
  const calculateTotal = (): number => {
    return stay && rate ? stay * rate : 0;
  };
  const calculateRemaining = (): number => (down ? calculateTotal() - down : 0);  
  
  
  // const handleDelete = (i: number) => {
  //   const deleteRemarks = [...remarks];
  //   deleteRemarks.splice(i, 1);
  //   setRemarks(deleteRemarks);
  // };
 
  useEffect(() => {
    const setTanggalminmax = () => {
      const sekarang = new Date();
      const tahun = sekarang.getFullYear();
      const bulan = String(sekarang.getMonth() + 1).padStart(2, '0'); 
      const hari = String(sekarang.getDate()).padStart(2, '0'); 
      const formatTanggal = `${tahun}-${bulan}-${hari}`; 

      const sebulan = new Date();
      sebulan.setMonth(sekarang.getMonth() + 1);
      const tahunMax = sebulan.getFullYear();
      const bulanMax = String(sebulan.getMonth() + 1).padStart(2, '0'); 
      const hariMax = String(sebulan.getDate()).padStart(2, '0'); 
      const formatTanggalMax = `${tahunMax}-${bulanMax}-${hariMax}`; 

      const checkinInput = document.getElementById('checkin-date') as HTMLInputElement | null;
      const checkoutInput = document.getElementById('checkout-date') as HTMLInputElement | null;

      checkinInput?.setAttribute('min', formatTanggal);
      checkoutInput?.setAttribute('min', formatTanggal);
      checkinInput?.setAttribute('max', formatTanggalMax);
      checkoutInput?.setAttribute('max', formatTanggalMax);
    };

    setTanggalminmax();
  }, []);
  
  useEffect(() => {
    console.log("Stay:", stay, "Rate:", rate, "Total:", calculateTotal());
  }, [stay, rate]);
  
  
  return (
    <div className="overflow-x-hidden  w-full min-h-screen">    
    <div className='bg-white translate-x-80 pb-[10%]'>
            <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
               Reservation Data &gt; Reservation Form
              </div> 
              <div className="bg-[#84D2D89C] flex-col px-[2%] mt-[1%] rounded-[20px] py-[3%] ms-[3%] flex space-y-[3%] w-[70%] min-h-screen">
          <button onClick={handleCancel} className='w-[120px] cursor-pointer absolute left-[61%] top-[12%] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Cancel
          </button>
                  <div className='w-[49%]'>
                    <label htmlFor="Guest Name" className="text-[20px]">Guest Name</label>
                    <input type="text" onChange={(e) => setnama((e.target as HTMLInputElement).value)} name='Guest Name' className='bg-white p-2 w-full h-[50px] rounded-md' />
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
                  <div className="flex space-x-5 w-full">
                    <div className='w-[25%]'>
                      <label htmlFor="Check In" className="text-[20px]">Check In</label>
                      <input type="date" min="" max="" id="checkin-date" onChange={(e) => setCheckin((e.target as HTMLInputElement).value)}  name='Check In' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[25%]'>
                    <label htmlFor="Check Out" className="text-[20px]">Check Out</label>
                    <input type="date" min="" max="" id="checkout-date" onChange={(e) => setCheckout((e.target as HTMLInputElement).value)}  name='Check Out' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div>  
            <div className='w-[25%]'>
                      <label htmlFor="Stay" className="text-[20px]">Stay</label>
                      <input type="text" name='Stay' onChange={(e) => setStay(Number((e.target as HTMLInputElement).value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div>
            <div className='w-[25%]'>
                      <label htmlFor="booked" className="text-[20px]">Booked By</label>
                      <input type="text" name='booked' onChange={(e) => setBooked((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          </div> 
          <div className="flex space-x-5 w-full">
                    <div className='w-[20%]'>
                      <label htmlFor="Room Type" className="text-[20px]">Room Type</label>
              <input type="text" name='Room Type' defaultValue={roomType} readOnly onChange={(e) => setRoomType((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[20%] flex flex-col'>
                    <label htmlFor="Room No" className="text-[20px]">Room No</label>
                    <select name='Room No' value={roomNo} onChange={handleRoomChange}  className='bg-white p-2  w-full h-[50px] rounded-md' id='Room No'>
                    <option value="">Choose Room No</option>
                    {data.map((room) => (
                      <option key={room.roomNo} value={room.roomNo}>
                        {room.roomNo}
                      </option>
                    ))}
                    </select>
                    {/* <input type="text" name='Room No'  onChange={(e) => setRoomNo(Number((e.target as HTMLInputElement).value))}  className='bg-white p-2 w-full h-[50px] rounded-md' /> */}
            </div> 
            <div className="flex flex-col w-[20%]">
              <h1 className='text-[20px]'>Preferency</h1>
            <div className="">
                    <input type="radio" name='preferency' onChange={(e) => setPayment((e.target as HTMLInputElement).value)} value="Smoking" id='Smoking'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="Smoking" className='ms-3 translate-y-[3px] '>Smoking</label>
              </div>
              <div className="">
                    <input type="radio" name='preferency' onChange={(e) => setPayment((e.target as HTMLInputElement).value)} value="No Smmoking" id='No Smmoking'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="No Smmoking" className='ms-3 translate-y-[3px] '>No Smoking</label>
                    </div>
            </div>
            <div className='w-[20%]'>
                      <label htmlFor="Adult" className="text-[20px]">Adult</label>
                      <input type="text" name='Adult' onChange={(e) => setAdult((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[20%]'>
                    <label htmlFor="Children" className="text-[20px]">Children</label>
                    <input type="text" name='Children' onChange={(e) => setChildren((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div> 
          </div>
          <div className="flex space-x-5">
          <div className='w-[25%]'>
                      <label htmlFor="Rate" className="text-[20px]">Rate</label>
              <input type="text" name='Rate' defaultValue={rate} readOnly onChange={(e) => setRate(Number(e.target.value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div>
            <div className='w-[25%]'>
                      <label htmlFor="Total" className="text-[20px]">Total</label>
                      <input type="text" name='Total' defaultValue={calculateTotal()} onChange={(e)=> setTotal(Number(e.target.value))}readOnly className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[25%]'>
                    <label htmlFor="dp" className="text-[20px]">Down Payment</label>
                    <input type="text" name='dp' onChange={(e) => setDown(Number(e.target.value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> 
            <div className='w-[25%]'>
                      <label htmlFor="Remaining" className="text-[20px]">Remaining Payment</label>
                      <input type="text" name='Remaining' defaultValue={calculateRemaining()} readOnly onChange={(e) => setRemaining(Number(e.target.value))} className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          </div>
          <div className="flex space-x-[2%]">
          <p className="text-[20px]">Billing Instruction Charge To:</p>
          <div className="flex space-x-[15%] ">
                    <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn' onChange={(e) => setPayment((e.target as any as HTMLInputElement).value)} value="cash" id='cash'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                    </div>
                    <div className="whitespace-nowrap">
       
                <input type="radio" name='paymentIn' onChange={(e) => setPayment((e.target as HTMLInputElement).value)} value="debit" id='debit'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
              </div>
              <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn' onChange={(e) => setPayment((e.target as HTMLInputElement).value)} value="transfer" id='transfer'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="transfer" className='ms-3 translate-y-[3px] text-[20px]'>Transfer</label>
                    </div>
          </div>
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
          <button onClick={Reservation} className='w-[120px] cursor-pointer bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Submit
          </button>
         </div>
      </div>
      {showModal && (
        <Harga
        id={reservationId ?? 0}
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Page