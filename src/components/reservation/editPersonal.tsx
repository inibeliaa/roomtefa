/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Image from 'next/image';
import remark from '../../../public/assets/icon/Plus.svg'

type EditPop = {
    isVisible: boolean;
    onClose: (isClose: boolean) => void;
    id: number | undefined;
    getReservasi: () => void;
  };
const EditPersonal: React.FC<EditPop> = ({ isVisible, onClose, id, getReservasi }) => {
    if (!isVisible) return null;
     const [nama, setnama] = useState<string>("");
      const [checkin, setCheckin] = useState<string>("");
      const [checkout, setCheckout] = useState<string>("");
      const [room, setroom] = useState<string>("101 Deluxe Twin ");
      const [email, setEmail] = useState<string>("");
      const [phone, setPhone] = useState<string>("");
      const [children, setChildren] = useState<string>("");
      const [adult, setAdult] = useState<string>("");
      const [payment, setPayment] = useState<string>("");
      const [stay, setStay] = useState<number>(0);
      const [rate, setRate] = useState<number>(0)
      const [booked, setBooked] = useState<string>("");
      const [preferency, setpreferency] = useState<string>("");
      const [down, setDown] = useState<number>(0);
      const [remaining, setRemaining] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    // const router = useRouter();
    const [personal, setPersonal] = useState<any>()
      const [remarks, setRemarks] = useState<any[]>([
            {
              detail: ""
            }
          ]);
          const handleAddRemarks = () => {
            setRemarks([
              ...remarks,
              {
                detail: "",
              }
            ]);
          };
          const handleChangeFieldRemark = (e: any, i: number) => {
            const { name, value } = e.target;
            const onChange: any = [...remarks];
            onChange[i][name] = value;
            setRemarks(onChange);
          };
          const handleDeleteRemark = (i: number) => {
            const deleteRemarks = [...remarks];
            deleteRemarks.splice(i, 1);
            setRemarks(deleteRemarks);
          };
      // const formatDate = (date: string) => {
      //   const [day, month, year] = date.split(" ");
      //   return `${year}-${month}-${day}`;
      // };
      // const [showModal, setShowModal] = useState(false);
      // const [reservationId, setReservationId] = useState<number>();
  
    useEffect(() => {
        getOne()
    }, [])
  
    const [accomodation, setAccomodation] = useState<any[]>([
        {
          room: "101 Deluxe Twin",
          rate: 0,
          stay: 0,
          sub_total: 0
        }
      ]);
        
        
      const handleAddAccomodation = () => {
        setAccomodation([
          ...accomodation,
          {
            room: "101 Deluxe Twin",
            rate: 0,
            stay: 0,
            sub_total: 0
          }
        ]);
      };
        const [displayRates, setDisplayRates] = useState<{[key: number]: string}>({});
     
        const handleChangeFieldAccomodation = (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
          i: number
      ) => {
          const { name, value } = e.target;
          
          if (name === "rate") {
              // Hapus semua karakter non-numeric
              const numericValue = value.replace(/[^0-9]/g, "");
              const numberValue = numericValue ? parseInt(numericValue) : 0;
          
              // Format ke Rupiah untuk tampilan
              const formattedValue = new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
              }).format(numberValue);
          
              // Update display rate
              setDisplayRates(prev => ({ ...prev, [i]: formattedValue }));
          
              // Update nilai numerik di state accomodation
              const updatedAccomodation = [...accomodation];
              updatedAccomodation[i].rate = numberValue;
              updatedAccomodation[i].sub_total = numberValue * stay;
              setAccomodation(updatedAccomodation);
              return;
          }
          
          // Untuk field lainnya
          const updatedAccomodation = [...accomodation];
          updatedAccomodation[i][name] = value;
          setAccomodation(updatedAccomodation);
      };
      
       const [displayDown, setDisplayDown] = useState<string>('');
        
        const handleDownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          
          // Hapus semua karakter non-numeric
          const numericValue = value.replace(/[^0-9]/g, "");
          const numberValue = numericValue ? parseInt(numericValue) : 0;
        
          // Format ke Rupiah untuk tampilan
          const formattedValue = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(numberValue);
        
          // Update display value
          setDisplayDown(formattedValue);
          
          // Update numeric value untuk perhitungan
          setDown(numberValue);
        };
      
          
            const handleDeleteAccomodation = (i: number) => {
                const deleteAccomodation = [...accomodation];
                deleteAccomodation.splice(i, 1);
                setAccomodation(deleteAccomodation);
  };
  
  const [address, setAddress] = useState("")
    async function getOne() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/One/${id}`
        try {
            const res = await axios.get(url, {
                withCredentials: true
            })
            setPersonal(res.data)
            if (res.data) {
                setnama(res.data.name || "");
                setCheckin(res.data.checkin || "");
                setCheckout(res.data.checkout || "");
                setroom(res.data.room || "");
              setEmail(res.data.email || "");
              setAddress(res.data.address || "")
              setPhone(res.data.phone || "");
              setAccomodation(res.data.roomgs || "");
                setChildren(res.data.children || "");
                setAdult(res.data.adult || "");
                setPayment(res.data.payment || "");
                setStay(res.data.stay || 0);
                setRate(res.data.rate || 0);
                setBooked(res.data.bookedBy || "");
                setpreferency(res.data.preferency || "");
                setDown(res.data.down || 0);
                setRemaining(res.data.remaining || 0);
                setTotal(res.data.total || 0);
                setRemarks(res.data.reservasiP || []);
          }
          console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
      async function Reservation() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/editPersonal/${id}`
        // const checkinFormatted = formatDate(checkin);
        // const checkoutFormatted = formatDate(checkout);
        try {
          const res = await axios.put(
            url,
            {
              name: nama,
              checkin: checkin,
              checkout: checkout,
              room: room,
              email: email,
              phone: phone,
              children: children,
              adult: adult,
              remarks: remarks,
              stay: stay,
              roomG: accomodation,
              bookedBy: booked,
              address: address,
              down: down,
              remaining: remaining,
              rate: rate,
              total: total,
              payment: payment,
              preferency: preferency
            },
            {
              withCredentials: true
            }
          )
           Swal.fire({
                      text: "Reservation data edited",
                      icon: "success",
                      timer: 2000,
                      iconColor: "#0E7793cc",
                      color: "#0E7793",
             width: "25%",
             backdrop: false,
                      showConfirmButton: false,
                      customClass: {
                        container: "alert",
                        
                      }
                    });
          // setReservationId(res.data.id)
          console.log(res.data)
          onClose(true)
          getReservasi()
        } catch (error:any) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            timer: 2000,
            text: error.response.data.message,
            width: "25%",
            color: "#0E7793",
            iconColor: "#e70008",
            backdrop: false,
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
          if (res.data && res.data.length > 0) {
            setData(res.data);
            if (!room) setroom(res.data[0].gabungan); // Atur room pertama sebagai default
          }
        } catch (error) {
          console.error(error);
        }
      }
      const formatHarga = (itung: number) => {
        
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
      
    
      // const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      //   const selectedRoom = Number(e.target.value); 
      //   setroom(selectedRoom);
    
      //   const selectedRoomData = data.find((room) => room.room === selectedRoom);
      //   if (selectedRoomData) {
      //     setRate(selectedRoomData.harga || 0); 
      //   } else {
      //     setRate(0); 
      //   }
      // };
      
      useEffect(() => {
         const totalAwal = calculateTotal();
         const newTotal = totalAwal + totalAwal * 0.21
         setTotal(newTotal);
       }, [accomodation]); // `total` diperbarui setiap kali `accomodation` berubah
       
       const calculateTotal = () => {
         return accomodation.reduce((sum, item) => sum + (item.sub_total || 0), 0);
       };
       
       useEffect(() => {
         setRemaining(calculateRemaining());
       }, [down, calculateTotal]);
       
     const calculateRemaining = (): number => (down ? total - down : 0);  
     
      
      // const handleDelete = (i: number) => {
      //   const deleteRemarks = [...remarks];
      //   deleteRemarks.splice(i, 1);
      //   setRemarks(deleteRemarks);
      // };
     
      // const [minTanggal, setMinTanggal] = useState('');
const [maxTanggal, setMaxTanggal] = useState('');

useEffect(() => {
  const sekarang = new Date();
  // const tahun = sekarang.getFullYear();
  // const bulan = String(sekarang.getMonth() + 1).padStart(2, '0'); 
  // const hari = String(sekarang.getDate()).padStart(2, '0'); 
  // const formatTanggal = `${tahun}-${bulan}-${hari}`; 

  const sebulan = new Date();
  sebulan.setMonth(sekarang.getMonth() + 1);
  const tahunMax = sebulan.getFullYear();
  const bulanMax = String(sebulan.getMonth() + 1).padStart(2, '0'); 
  const hariMax = String(sebulan.getDate()).padStart(2, '0'); 
  const formatTanggalMax = `${tahunMax}-${bulanMax}-${hariMax}`; 

  // setMinTanggal(formatTanggal);
  setMaxTanggal(formatTanggalMax);
}, []);

      
      useEffect(() => {
        console.log("Stay:", stay, "Rate:", rate, "Total:", calculateTotal());
      }, [stay, rate]);
      
    //   const formatTanggal = (tanggal: string) => {
    //     const opsiTanggal: Intl.DateTimeFormatOptions = {
    //       year: "numeric",
    //       month: "numeric",
    //       day: "numeric",
    //     };
    //     return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
    // };
    
    const formatTanggalInput = (tanggal: string) => {
        return tanggal ? tanggal.slice(0, 10) : '';
      };
      
      // useEffect(() => {
      //   if (isVisible) {
      //     document.body.style = 'fit';
      //   } else {
      //     document.body.style.overflow = 'auto';
      //   }
      
      //   return () => {
      //     document.body.style.overflow = 'auto';
      //   };
  // }, [isVisible]);
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);
  
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);
 
  return (
    <div className="fixed left-0 inset-0 z-50 flex py-10 overflow-y-auto overflow-x-hidden bg-[#5A72A0]/50 backdrop-blur-sm">

<div className="w-[70%] bg-[#84D2D89C] ms-9 px-[3%] py-[3%] max-h-[90vh] overflow-y-auto border-2 border-[#5A72A0] rounded-md">

        {personal && 
      <div style={{ top: window.scrollY }} className="flex-col rounded-[20px]  flex space-y-[2%] w-[100%] min-h-screen">
            <div className="relative">

            <button onClick={()=>onClose(true)} className='w-[120px] cursor-pointer absolute right-0 top-[0] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                              Cancel
            </button>
            </div>
                  <div className='w-[49%]'>
                    <label htmlFor="Guest Name" className="text-[20px]">Guest Name</label>
                          <input type="text" value={nama} onChange={(e) => setnama((e.target as HTMLInputElement).value)} name='Guest Name' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div>  
            <div className='w-[100%]'>
            <label htmlFor="Address" className="text-[20px]">Address</label>
            <textarea
  value={address}
  onChange={(e)=>setAddress(e.target.value)}
              name="Address"
              maxLength={300}
              className="w-[100%] h-[100px] p-4 border bg-white rounded-md"
  /> 
  </div>
                  <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="Email" className="text-[20px]">Email</label>
              <input type="email" value={email} name='Email' onChange={(e) => setEmail((e.target as HTMLInputElement).value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Phone Number" className="text-[20px]">Phone Number</label>
              <input type="tel" value={phone} name='Phone Number' onChange={(e) => setPhone((e.target as HTMLInputElement).value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
          </div> 
                  <div className="flex space-x-5 w-full">
                    <div className='w-[33%]'>
                      <label htmlFor="Check In" className="text-[20px]">Check In</label>
                      <input type="date" value={formatTanggalInput(checkin)} min={checkin} max={maxTanggal} id="checkin-date" onChange={(e) => setCheckin((e.target as HTMLInputElement).value)}  name='Check In' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[33%]'>
                    <label htmlFor="Check Out" className="text-[20px]">Check Out</label>
                    <input type="date"  value={formatTanggalInput(checkout)} min={checkin} max={maxTanggal} id="checkout-date" onChange={(e) => setCheckout((e.target as HTMLInputElement).value)}  name='Check Out' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div>  
            <div className='w-[33%]'>
                      <label htmlFor="Stay" className="text-[20px]">Stay</label>
                      <input type="text" name='Stay' value={stay} onChange={(e) => setStay(Number((e.target as HTMLInputElement).value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div>
            
            </div> 
            <div className="flex flex-col space-y-[2%]">
                    <div className="flex space-x-[2%]">
                        <Image
                            className='cursor-pointer'
                            src={remark}
                            onClick={() => handleAddAccomodation()}
                            alt="add accomodation"
                            width={30}
                            height={30}
                        />
                        <p className="text-[20px] mt-[5px] ms-[1px]">Type Of Accomodation</p>
                        </div>
                            {accomodation && accomodation?.map((acc, i) => (
                            <div key={i} className="flex space-x-5 w-full">
                                <div className="w-[30%]">
                                <label htmlFor="room" className="text-[20px]">
                                Room
                                </label>
                                <select
                                    name="room"
                                    defaultValue={acc.room}
                                    onChange={(e) => handleChangeFieldAccomodation(e,i)}
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                    >
                                    {/* <option value="">
                                        Choose Room
                                    </option> */}
                                    {data?.length > 0
                                        ? data && data?.map((room:any) => (
                                            <option key={room.gabungan} value={room.gabungan}>
                                            {room.gabungan}
                                            </option>
                                        ))
                                        : <option disabled>No Rooms Available</option>}
                                    </select>
                                    </div>
                                    <div className="w-[30%]">
                                <label htmlFor="rate" className="text-[20px]">
                                   Rate
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => handleChangeFieldAccomodation(e, i)}
                                            name="rate"
                                            value={displayRates[i] || (acc?.rate ? new Intl.NumberFormat("id-ID", {
                                              style: "currency",
                                              currency: "IDR",
                                              minimumFractionDigits: 0,
                                          }).format(acc.rate) : "")}
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                    </div>
                                    {/* <div className="w-[30%]">
                                <label htmlFor="stay" className="text-[20px]">
                                    Stay
                                </label>
                                <input
                                            type="text"        
                                    onChange={(e) => handleChangeFieldAccomodation(e, i)}
                                            name="stay"
                                            value={acc?.stay}
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                    </div> */}
                                    <div className="w-[30%]">
                                <label htmlFor="sub_total" className="text-[20px]">
                                    Sub Total
                                </label>
                                  <input
                                    value={formatHarga(acc?.sub_total)}
                                            // value={formatHarga(acc.sub_total)}
                                            readOnly
                                    type="text"
                                    onChange={(e) => handleChangeFieldAccomodation(e, i)}
                                    name="sub_total"
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                </div>
                                <button onClick={() => handleDeleteAccomodation(i)} className='cursor-pointer rounded-md font-bold bg-white mt-[3.3%] w-[5%] h-[50px]'>
                                    x
                                </button>
                            </div>
                            ))}
          </div>
          <div className="flex space-x-5 w-full">
                    {/* <div className='w-[20%]'>
                      <label htmlFor="Room Type" className="text-[20px]">Room Type</label>
              <input type="text" name='Room Type' value={roomType} readOnly onChange={(e) => setRoomType((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div> */}
                
            <div className="flex flex-col">
                <h1 className='text-[20px]'>Preferency</h1>
                <div className="flex space-x-4">

                <div className="flex">
                        <input type="radio" name='preferency' value="Smoking" checked={preferency === "Smoking"} onChange={(e) => setpreferency((e.target as HTMLInputElement).value)} id='Smoking'
                            className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                            border-2 border-[#0E7793] w-5 h-5" />
                        <label htmlFor="Smoking" className='ms-3 translate-y-[3px] '>Smoking</label>
                  </div>
                  <div className="flex">
                        <input type="radio" name='preferency' value="No Smoking" checked={preferency === "No Smoking"} onChange={(e) => setpreferency((e.target as HTMLInputElement).value)} id='No Smoking'
                            className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                            border-2 border-[#0E7793] w-5 h-5" />
                        <label htmlFor="No Smoking" className='ms-3 translate-y-[3px] '>No Smoking</label>
                        </div>
                </div>
            </div>
            <div className='w-[28%]'>
                      <label htmlFor="Adult" className="text-[20px]">Adult</label>
                      <input type="text" name='Adult' value={adult} onChange={(e) => setAdult((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[28%]'>
                    <label htmlFor="Children" className="text-[20px]">Children</label>
                    <input type="text" name='Children' value={children} onChange={(e) => setChildren((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div> 
          </div>
          <div className="flex space-x-5">
          {/* <div className='w-[25%]'>
                      <label htmlFor="Rate" className="text-[20px]">Rate</label>
              <input type="text" name='Rate' value={rate} onChange={(e)=>setRate(Number(e.target.value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> */}
            <div className='w-[33%]'>
                      <label htmlFor="Total" className="text-[20px]">Total <span className='text-xs ms-1 text-gray-500'>(include 21% tax)</span></label>
                      <input type="text" name='Total' value={formatHarga(total)} onChange={(e)=> setTotal(Number(e.target.value))} readOnly className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[33%]'>
                    <label htmlFor="dp" className="text-[20px]">Deposit</label>
                    <input type="text" name='dp'  value={displayDown || (down ? new Intl.NumberFormat("id-ID", {
                                              style: "currency",
                                              currency: "IDR",
                                              minimumFractionDigits: 0,
                                          }).format(down) : "")} onChange={handleDownChange}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> 
            <div className='w-[33%]'>
                      <label htmlFor="Remaining" className="text-[20px] whitespace-nowrap">Remaining Payment</label>
                      <input type="text" name='Remaining' value={formatHarga(calculateRemaining())} readOnly onChange={(e) => setRemaining(Number(e.target.value))} className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          </div>
          <div className="flex space-x-[2%]">
          <p className="text-[20px]">Billing Instruction Charge To:</p>
          <div className="flex space-x-[15%] ">
                    <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn' onChange={(e) => setPayment((e.target as any as HTMLInputElement).value)} value="cash"
                            checked={payment === "cash"} id='cash'
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                    </div>
                    <div className="whitespace-nowrap">
       
                <input type="radio" name='paymentIn' onChange={(e) => setPayment((e.target as HTMLInputElement).value)} value="debit" id='debit' checked={payment === "debit"}
                        className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
              </div>
              <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn' onChange={(e) => setPayment((e.target as HTMLInputElement).value)} value="transfer" id='transfer' checked={payment === "transfer"}
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
          <div className="flex flex-col w-full space-y-3">
          {/* <h1 className='font-semibold text-[23px] translate-y-[10px]'>Additonal</h1> */}
            <div className="flex space-x-3">
              <p className="text-[20px] mt-[5px] ms-[1px]">Remarks</p>
              <Image
                className='cursor-pointer'
                src={remark}
                onClick={() => handleAddRemarks()}
                alt="add remark"
                width={30}
                height={30}
              />
            </div>
            {remarks.map((data, i) => (
              <div key={i} className="flex space-x-5 w-full">
                <div className="w-[93%]">
                  {/* <label htmlFor="detail" className="text-[20px]">
                    Detail
                  </label> */}
                  <input
                            type="text"
                            defaultValue={data.detail}
                    onChange={(e) => handleChangeFieldRemark(e, i)}
                    name="detail"
                    className="bg-white p-2 w-full h-[50px] rounded-md"
                  />
                </div>
                  <button onClick={() => handleDeleteRemark(i)} className='cursor-pointer rounded-md font-bold bg-white w-[5%] h-[50px]'>
                    x
                  </button>
              </div>
            ))}
          </div>
          <div className='w-[25%]'>
                      <label htmlFor="booked" className="text-[20px]">Booked By</label>
                      <input type="text" name='booked' value={booked} onChange={(e) => setBooked((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          <button onClick={Reservation} className='w-[120px] cursor-pointer bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Submit
          </button>
         </div>
                  }
                  {/* <button >tutup</button> */}
      
          </div>
      </div>
  )
}

export default EditPersonal