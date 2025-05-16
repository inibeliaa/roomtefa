/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import remark from "../../../../public/assets/icon/Plus.svg"
import axios from 'axios'
import Swal from 'sweetalert2'

function page() {
  const router = useRouter();
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
  const handleCancel = () => {
    router.back();
  }
  const [arrangements, setArrangements] = useState<any[]>([
    {
      meal: "",
      tours: "",
      account: ""
    }
  ]);
  const [arrival, setArrival] = useState<{ datee: string, flight: string, time: string }[]>([
    {
      datee: "",
      flight: "",
      time: ""
    }
  ]);
    
  const [departure, setDeparture] = useState<{ datee: string, flight: string, time: string }[]>([
    {
      datee: "",
      flight: "",
      time: ""
    }
  ]);
    
  //  const handleChangeFieldArrival = (e: React.ChangeEvent<HTMLInputElement>, i:  number) => {
  //   const { name, value } = e.target;
  //   setArrival((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   })
  //    );
  //    console.log("data yang dikirim", value)
  // };
  
  const handleChangeFieldArrival = (e: any, i: number) => {
    const { name, value } = e.target;
    const onChange: any = [...arrival];
    onChange[i][name] = value;
    setArrival(onChange);
  };
  const handleChangeFieldDeparture = (e: any, i: number) => {
    const { name, value } = e.target;
    const onChange: any = [...departure];
    onChange[i][name] = value;
    setDeparture(onChange);
  };
  
    
  const handleAddArrangement = () => {
    setArrangements([
      ...arrangements,
      {
        meal: "",
        tours: "",
        account: ""
      }
    ]);
  };
  const handleChangeFieldArrangement = (e: any, i: number) => {
    const { name, value } = e.target;
    const onChange: any = [...arrangements];
    onChange[i][name] = value;
    setArrangements(onChange);
  };
  const handleDeleteArrangement = (i: number) => {
    const deleteArrangements = [...arrangements];
    deleteArrangements.splice(i, 1);
    setArrangements(deleteArrangements);
  };
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
  
      // Update state secara atomic
      setAccomodation(prev => {
        const updated = [...prev];
        updated[i] = {
          ...updated[i],
          rate: numberValue,
          sub_total: numberValue * updated[i].stay
        };
        return updated;
      });
  
      setDisplayRates(prev => ({ ...prev, [i]: formattedValue }));
      return;
    }
  
    // Untuk field stay, perlu menghitung ulang sub_total
    if (name === "stay") {
      setAccomodation(prev => {
        const updated = [...prev];
        updated[i] = {
          ...updated[i],
          stay: Number(value),
          sub_total: updated[i].rate * Number(value)
        };
        return updated;
      });
      return;
    }
  
    // Untuk field lainnya
    setAccomodation(prev => {
      const updated = [...prev];
      updated[i] = {
        ...updated[i],
        [name]: value
      };
      return updated;
    });
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
    const [room, setroom] = useState<string>("101 Deluxe Twin ");
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
            if (!room) setroom(res.data[0].gabungan); 
          }
        } catch (error) {
          console.error(error);
        }
    }
    const [remaining, setRemaining] = useState(0);
    const [total, setTotal] = useState(0);
    const [down, setDown] = useState(0);
    // useEffect(() => {
    //     const interval = setInterval(calculateSubTotal, 100)
    //     calculateSubTotal();
    //     return () => clearInterval(interval)
    // })
    // const calculateSubTotal = () => {
    //     const calculateSub_Total = stayy * ratee;
    //     setSubtotal(calculateSub_Total);
    // }
    // useEffect(() => {
    //     setSubtotal(calculateTotal());
    //   }, [ratee, stayy]);
      
    useEffect(() => {
      const totalAwal = calculateTotal();
      const newTotal = totalAwal + totalAwal * 0.21
      setTotal(newTotal);
    }, [accomodation]); // `total` diperbarui setiap kali `accomodation` berubah
    
    const calculateTotal = () => {
      return accomodation.reduce((sum, item) => sum + (item.sub_total || 0), 0);
    };
    
        const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
     useEffect(() => {
        setRemaining(calculateRemaining());
      }, [down, total]);
  const calculateRemaining = (): number => (down ? total - down : 0);  
  const [payment, setPayment] = useState<string>("");
  const [namaGroup, setnamaGroup] = useState<string>("");
  const [travel, setTravel] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [adult, setAdult] = useState<string>("");
  const [clrek, setClrek] = useState<string>("");
  const [dateC, setdateC] = useState<string>("");
  const [followUp, setfollowUp] = useState<string>("");
  const [romming, setRomming] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
  // const [phone, setPhone] = useState<string>("");
  // const [letter, setLetter] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [facsimile, setFacsimile] = useState<string>("");
  const [charter, setCharter] = useState<string>("");
  const [booking, setBooking] = useState<string>("");
  const [rack, setRack] = useState<string>("");
  const [initial, setInitial] = useState<string>("");
  const [enter, setEnter] = useState<string>("");
  const [company, setCompany] = useState<string>("");
    async function AddGroup() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/reservasiGroup`;
        try {
          const res = await axios.post(url,
            {
              name: namaGroup,
              name_of_travel: travel,
              address: address,
              contact: contact,
              down: down,
              orCompany: company,
              roomG: accomodation,
              remarks: remarks,
              makanan: arrangements,
              remaining: remaining,
              payment: payment,
              children: children,
              adult: adult,
              total: total,
              clrek: clrek,
              dateC: dateC,
              followup: followUp,
              romming: romming,
              phone: phone,
              // letter: letter,
              email: email,
              // facsimile: facsimile,
              metodeBooking: booking,
              rack: rack,
              charter: charter,
              entered_by: enter,
              arrival: arrival,
              departure: departure,
              // down: 0,
              initialDate: initial
            },
            {
                withCredentials: true
            })
          console.log(res);
          
            // setIsLoading(false);
        Swal.fire({
                   text: "Success Add Reservation Data",
                   icon: "success",
          timer: 2000,
          backdrop: false,
                   iconColor: "#0E7793cc",
                   color: "#0E7793",
                   width: "25%",
                   showConfirmButton: false,
                   customClass: {
                     container: "alert",
                     
                   }
                 });
                 router.push("/Reservation")
                 
               } catch (error:any) {
                 // setIsLoading(false);
                 console.log(error)
                 Swal.fire({
                   icon: "error",
                   title: "Oops...",
                   backdrop: false,
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
        const dateCC = document.getElementById('date-C') as HTMLInputElement | null;
        const initial = document.getElementById('initial') as HTMLInputElement | null;
        const charterDate = document.getElementById('charter') as HTMLInputElement | null;
        checkinInput?.setAttribute('min', formatTanggal);
        checkoutInput?.setAttribute('min', formatTanggal);
        dateCC?.setAttribute('min', formatTanggal);
        dateCC?.setAttribute('max', formatTanggalMax);
        initial?.setAttribute('min', formatTanggal);
        initial?.setAttribute('max', formatTanggalMax);
        charterDate?.setAttribute('min', formatTanggal);
        charterDate?.setAttribute('max', formatTanggalMax);
        checkinInput?.setAttribute('max', formatTanggalMax);
        checkoutInput?.setAttribute('max', formatTanggalMax);
      };
  
      setTanggalminmax();
    }, []);
  return (
    <div className="overflow-x-hidden  w-full min-h-screen">    
    <div className='bg-white translate-x-80 pb-[10%]'>
            <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
               Reservation Data &gt; Reservation Form Group
              </div> 
              <div className="bg-[#84D2D89C] flex-col px-[2%] mt-[1%] rounded-[20px] py-[3%] ms-[3%] flex space-y-[2%] w-[70%] min-h-screen">
              <div className="relative w-full" >

<button onClick={handleCancel} className='w-[120px] cursor-pointer absolute right-[0%] top-[8%] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
            Cancel
</button>
</div>
                  <div className='w-[100%]'>
                    <label htmlFor="Name of Group" className="text-[20px]">Name of Group</label>
            <input type="text" value={namaGroup} onChange={(e)=>setnamaGroup(e.target.value)} name='Name of Group' className='bg-white p-2 w-full h-[50px] rounded-md' />
          </div>
          <div className="flex space-x-[2%] w-[100%]">           
                    <div className='w-[25%]'>
                        <input type='radio' value="phone" onChange={(e)=>setBooking(e.target.value)} name='ReservationType' className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5' />
                        <label htmlFor="phone" className="text-[20px] whitespace-nowrap ms-1">Phone Reservation</label>
                    </div>
                    <div className='w-[25%]'>
                        <input type='radio' value="letter" onChange={(e)=>setBooking(e.target.value)} name='ReservationType' className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5' />
                        <label htmlFor="letter" className="text-[20px] whitespace-nowrap ms-1">Letter Reservation</label>
                      </div>
                      <div className='w-[25%]'>
                        <input type='radio' value="email" onChange={(e)=>setBooking(e.target.value)} name='ReservationType' className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5' />
                        <label htmlFor="email" className="text-[20px] whitespace-nowrap ms-1">Email Reservation</label>
                    </div>
                    <div className='w-[25%]'>
                        <input type='radio' value='facsimile' name='ReservationType' onChange={(e)=>setBooking(e.target.value)} className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5' />
                        <label htmlFor=" facsimile" className="text-[20px] whitespace-nowrap ms-1"> Facsimile Reservation</label>
                    </div>
          </div>
          <div className="flex w-full space-x-3">
            <div className="w-[50%]">
              <label htmlFor="Phone" className="text-[20px]">Phone</label>
                <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} name='Phone' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
              <div className="w-[50%]">
              <label htmlFor="Email" className="text-[20px]">Email</label>
                    <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} name='Email' className='bg-white p-2 w-full h-[50px] rounded-md' />
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
                            {accomodation.map((acc, i) => (
                            <div key={i} className="flex space-x-5 w-full">
                                <div className="w-[30%]">
                                <label htmlFor="room" className="text-[20px]">
                                Room
                                </label>
                                <select
                                    name="room"
                                    value={acc.room}
                                    onChange={(e) => handleChangeFieldAccomodation(e,i)}
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                    >
                                    {/* <option value="">
                                        Choose Room
                                    </option> */}
                                    {data.length > 0
                                        ? data && data.map((room:any) => (
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
                                            value={displayRates[i] ?? 0}
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                    </div>
                                    <div className="w-[30%]">
                                <label htmlFor="stay" className="text-[20px]">
                                    Stay
                                </label>
                                <input
                                            type="text"        
                                    onChange={(e) => handleChangeFieldAccomodation(e, i)}
                                            name="stay"
                                            value={acc.stay}
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                    </div>
                                    <div className="w-[30%]">
                                <label htmlFor="sub_total" className="text-[20px]">
                                    Sub Total
                                </label>
                                        <input
                                            value={formatHarga(acc.sub_total)}
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
          <div className='flex space-x-[2%]'>
                    <div className='w-[33%]'>
                      <label htmlFor="Total" className="text-[20px]">Total<span className='text-xs ms-1 text-gray-500'>( include 21% tax )</span></label>
                      <input type="text" name='Total' value={formatHarga(total)} onChange={(e)=>setTotal(Number(e.target.value))} readOnly className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[33%]'>
                    <label htmlFor="dp" className="text-[20px]">Deposit Received</label>
                    <input type="text" value={displayDown} onChange={handleDownChange} name='dp' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> 
            <div className='w-[33%]'>
                      <label htmlFor="Remaining" className="text-[20px]">Remaining Payment</label>
                          <input type="text" value={formatHarga(calculateRemaining())} onChange={(e)=>setRemaining(Number(e.target.value))} readOnly name='Remaining' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          </div>
          <div className="flex space-x-[2%]">
          <p className="text-[20px]">Billing Instruction Charge To:</p>
          <div className="flex space-x-[15%] ">
                    <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn'  value="cash" id='cash'
                     onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                    </div>
                    <div className="whitespace-nowrap">
       
                <input type="radio" name='paymentIn' value="debit" id='debit'
                       onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
              </div>
              <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn' value="transfer" id='transfer'
                        onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="transfer" className='ms-3 translate-y-[3px] text-[20px]'>Transfer</label>
                    </div>
          </div>
                  </div>
          <div className="flex-col flex space-y-[2%]">
          <p  className="text-[20px]">Number of Guest</p>
            <div className='w-[100%] flex space-x-[2%]'>
              <div className="w-[50%]">
                  <label htmlFor="Adult" className="text-[20px]">Adult</label>
                  <input type="text" value={adult} onChange={(e)=>setAdult(e.target.value)} name='Name of Group' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
              <div className="w-[50%]">
                  <label htmlFor="Children" className="text-[20px]">Children</label>
                  <input type="text" value={children} onChange={(e)=>setChildren(e.target.value)} name='Name of Group' className='bg-white p-2 w-full h-[50px] rounded-md' />
                </div>
              </div>
          </div>
                  <div className="flex space-x-[2%] w-[100%]">                   
            <div className="flex-col space-y-[2%] w-[50%]">    
              <p className="text-[20px]">Arrival</p>
              {arrival.map((data, i) => (            
                        <div key={i}><div className='w-[100%]'>
                  <label htmlFor="datee" className="text-[20px]">Date</label>
                  <input value={data.datee} onChange={(e) => handleChangeFieldArrival(e,i)} id="checkin-date" type="date" name='datee' className='bg-white p-2 w-full h-[50px] rounded-md' />
                </div><div className='w-[100%]'>
                    <label htmlFor="flight" className="text-[20px]">Flight</label>
                    <input value={data.flight} onChange={(e) => handleChangeFieldArrival(e,i)} type="text" name='flight' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div><div className='w-[100%]'>
                    <label htmlFor="time" className="text-[20px]">Time</label>
                    <input value={data.time} type="time" onChange={(e) => handleChangeFieldArrival(e,i)} name='time' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div></div>
              ))}
                    </div>
                    <div className="flex-col space-y-[2%] w-[50%]">           
                    <p className="text-[20px]">Departure</p>
              {departure.map((item, id) => (
                      
                        <div key={id}><div className='w-[100%]'>
                  <label htmlFor="datee" className="text-[20px]">Date</label>
                  <input value={item.datee} type="date" onChange={(e) => handleChangeFieldDeparture(e,id)} id="checkout-date" name='datee' className='bg-white p-2 w-full h-[50px] rounded-md' />
                </div><div className='w-[100%]'>
                    <label htmlFor="flight" className="text-[20px]">Flight</label>
                    <input value={item.flight} type="text" onChange={(e) => handleChangeFieldDeparture(e,id)} name='flight' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div><div className='w-[100%]'>
                    <label htmlFor="time" className="text-[20px]">Time</label>
                    <input value={item.time} type="time" onChange={(e) => handleChangeFieldDeparture(e,id)} name='time' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div></div>
                    ))}
                    </div>
                  </div>
                  <div className="flex space-x-[2%] w-[100%]">           
                    <div className='w-[50%]'>
                        <label htmlFor="Name of Travel" className="text-[20px]">Name of Travel Agent</label>
                        <input value={travel} onChange={(e)=>setTravel(e.target.value)} type="text" name='Name of Travel' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="Or Company" className="text-[20px]">Or Company</label>
                        <input value={company} onChange={(e)=>setCompany(e.target.value)} type="text" name='Or Company' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                  </div>
                  <div className='w-[100%]'>
                    <label htmlFor="Address" className="text-[20px]">Address</label>
                    <textarea name='Address' value={address} onChange={(e)=>setAddress(e.target.value)} className='bg-white p-2 w-full h-[70px] rounded-md' />
                  </div>
                  <div className="flex space-x-[2%] w-[100%]">           
                    <div className='w-[100%]'>
                        <label htmlFor="Contact" className="text-[20px]">Contact</label>
                        <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} name='Contact' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    {/* <div className='w-[50%]'>
                        <label htmlFor="Deposit" className="text-[20px]">Deposit Received</label>
                        <input type="text" name='Deposit' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div> */}
                  </div>
               
                  {/* <div className="">
                  <p>Arrangements</p>
                  <Image
                    className='cursor-pointer'
                    src={arrangements}
                    onClick={() => handleAdd()}
                    alt="add arrangements"
                    width={30}
                    height={30}
                />
                  </div>
                  {arrangements.map((data, i) => (
                      
                <div className='flex' key={i}>
                  <div className="ms-7 -translate-y-4 w-[95%] mt-[5%] flex-col">
                    <label
                      htmlFor="nama arrangements"
                      className="text-[#8EAEA6] text-[20px] font-semibold mt-[3%]"
                    >
                      Nama arrangements
                    </label>
                    <input
                      type="text"
                      name="nama_variasi"
                      onChange={(e) => handleChangeField(e, i)}
                      className="w-[100%] mt-1 bg-white h-[45px]
                              text-[20px] px-3 text-[#3F9272] rounded-md"
                      required
                    />
                          </div>
                          <div className="ms-7 -translate-y-4 w-[95%] mt-[5%] flex-col">
                    <label
                      htmlFor="nama arrangements"
                      className="text-[#8EAEA6] text-[20px] font-semibold mt-[3%]"
                    >
                      Nama arrangements
                    </label>
                    <input
                      type="text"
                      name="nama_variasi"
                      onChange={(e) => handleChangeField(e, i)}
                      className="w-[100%] mt-1 bg-white h-[45px]
                              text-[20px] px-3 text-[#3F9272] rounded-md"
                      required
                    />
                          </div>
                          <div className="ms-7 -translate-y-4 w-[95%] mt-[5%] flex-col">
                    <label
                      htmlFor="nama arrangements"
                      className="text-[#8EAEA6] text-[20px] font-semibold mt-[3%]"
                    >
                      Nama arrangements
                    </label>
                    <input
                      type="text"
                      name="nama_variasi"
                      onChange={(e) => handleChangeField(e, i)}
                      className="w-[100%] mt-1 bg-white h-[45px]
                              text-[20px] px-3 text-[#3F9272] rounded-md"
                      required
                    />
                  </div>
                  {/* <div>
                      <button
                        className="px-7 ms-4 bg-[#8EAEA6] h-[45px] mt-7 font-bold text-white rounded-md"
                        onClick={() => handleDelete(i)}
                      >
                        X
                      </button>
                    </div> */}
                {/* </div>
              ))} */} 
                      
                  <div className="flex flex-col space-y-[2%]">
                    <div className="flex space-x-[2%]">
                        <Image
                            className='cursor-pointer'
                            src={remark}
                            onClick={() => handleAddArrangement()}
                            alt="add arrangements"
                            width={30}
                            height={30}
                        />
                        <p className="text-[20px] mt-[5px] ms-[1px]">Guest Preferences and Arrangements</p>
                        </div>
                            {arrangements.map((data, i) => (
                            <div key={i} className="flex space-x-5 w-full">
                                <div className="w-[30%]">
                                <label htmlFor="meal" className="text-[20px]">
                                Meal Arrangements
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => handleChangeFieldArrangement(e, i)}
                                    name="meal"
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                    </div>
                                    <div className="w-[30%]">
                                <label htmlFor="tours" className="text-[20px]">
                                    Transfer/Tours
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => handleChangeFieldArrangement(e, i)}
                                    name="tours"
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                    </div>
                                    <div className="w-[30%]">
                                <label htmlFor="account" className="text-[20px]">
                                    Account Instruction
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => handleChangeFieldArrangement(e, i)}
                                    name="account"
                                    className="bg-white p-2 w-full h-[50px] rounded-md"
                                />
                                </div>
                                <button onClick={() => handleDeleteArrangement(i)} className='cursor-pointer rounded-md font-bold bg-white mt-[3.3%] w-[5%] h-[50px]'>
                                    x
                                </button>
                            </div>
                            ))}
          </div>
          <div className="flex">
              <Image
                className='cursor-pointer'
                src={remark}
                onClick={() => handleAddRemarks()}
                alt="add remark"
                width={30}
                height={30}
              />
              <p className="text-[20px] mt-[5px] ms-[1px]">Remarks</p>
            </div>
            {remarks.map((data, i) => (
              <div key={i} className="flex space-x-5 w-full">
                <div className="w-[93%]">
                  <label htmlFor="detail" className="text-[20px]">
                    Detail
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleChangeFieldRemark(e, i)}
                    name="detail"
                    className="bg-white p-2 w-full h-[50px] rounded-md"
                  />
                </div>
                  <button onClick={() => handleDeleteRemark(i)} className='cursor-pointer rounded-md font-bold bg-white mt-[3.3%] w-[5%] h-[50px]'>
                    x
                  </button>
              </div>
            ))}
                  <div className="flex space-x-[2%] w-[100%]">           
                    <div className='w-[50%]'>
                        <label htmlFor="Signature of Clerk" className="text-[20px]">Signature of Clerk Agent</label>
                        <input type="text" value={clrek} onChange={(e)=>setClrek(e.target.value)} name='Signature of Clerk' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="Date" className="text-[20px]">Date</label>
                        <input type="date" id="date-C" value={dateC} onChange={(e)=>setdateC(e.target.value)} name='Date' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                  </div>
                
                  <div className="flex space-x-[5%]">
                      <div className="flex translate-y-[30px] space-x-[2%]">          
                  <div className="flex">
                    <input type="radio" name='followup' value="3 Months" id='3 Months'
                       onChange={(e)=>setfollowUp(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="3 Months" className='ms-3 translate-y-[3px] whitespace-nowrap '>3 Months Follow-Up</label>
              </div>
              <div className="flex">
                    <input type="radio" name='followup' value="2 Months" id='2 Months'
                        onChange={(e)=>setfollowUp(e.target.value)}  className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="2 Months" className='ms-3 translate-y-[3px] whitespace-nowrap '>2 Months Follow-Up</label>
                  </div>
                  <div className="flex">
                    <input type="radio" name='followup' value="1 Months" id='1 Months'
                        onChange={(e)=>setfollowUp(e.target.value)}  className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="1 Months" className='ms-3 translate-y-[3px] whitespace-nowrap '>1 Months Follow-Up</label>
                      </div>
                      </div>
                      <div className=' w-[40%]'>
                        <label htmlFor="Romming" className="text-[20px]">Romming List Received</label>
              <input type="text" value={romming} onChange={(e)=>setRomming(e.target.value)}  name='Romming' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                  </div>
                  {/* <div className="flex space-x-[2%] w-[100%]">           
                    <div className='w-[25%]'>
                        <label htmlFor="Phone Reservation" className="text-[20px]">Phone Reservation</label>
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} name='Phone Reservation' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[25%]'>
                        <label htmlFor="Letter Reservation" className="text-[20px]">Letter Reservation</label>
                        <input type="text" value={letter} onChange={(e)=>setLetter(e.target.value)} name='Letter Reservation' className='bg-white p-2 w-full h-[50px] rounded-md' />
                      </div>
                      <div className='w-[25%]'>
                        <label htmlFor="Clerk Reservation" className="text-[20px]">Clerk Reservation</label>
                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name='Clerk Reservation' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[25%]'>
                        <label htmlFor=" Facsimile Reservation" className="text-[20px]"> Facsimile Reservation</label>
                        <input type="text" name='  Facsimile Reservation'  value={facsimile} onChange={(e)=>setFacsimile(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                  </div> */}
                  <div className="flex space-x-[2%] w-[100%]">           
            <div className='w-[33%] flex flex-col'>
                        <label htmlFor="Rack Slip" className="text-[20px]">Rack Slip / Initial Date</label>
              <div className="flex w-full">
              <div className="w-[15%]">
              <input type="text" name='Rack Slip' value={rack} onChange={(e)=>setRack(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-l-md border-r-2 border-black' />
              </div>
              <div className="w-[85%]">

                        <input type="date" name='Rack Slip' value={initial} id='initial' onChange={(e)=>setInitial(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-r-md' />
              </div>
             
              </div>
                    </div>
                    <div className='w-[33%] flex flex-col'>
                        <label htmlFor="Charter Date" className="text-[20px]">Charter Date</label>
              <div className="flex w-full">
              {/* <div className="w-[15%]">
              <input type="text" name='Charter Date' value={charter} onChange={(e)=>setCharter(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-l-md border-r-2 border-black' />
              </div> */}
              <div className="w-[100%]">

                        <input type="date" name='Charter Date' value={charter} id='charter' onChange={(e)=>setCharter(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
             
              </div>
                    </div>
                      <div className='w-[33%]'>
                        <label htmlFor="Entered By" className="text-[20px]">Entered By</label>
                        <input type="text" name='Entered By' value={enter} onChange={(e)=>setEnter(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                  </div>
                  {/* <div className="flex">
              <Image
                className='cursor-pointer'
                src={remark}
                onClick={() => handleAddRemarks()}
                alt="add remark"
                width={30}
                height={30}
              />
              <p className="text-[20px] mt-[5px] ms-[1px]">Remarks</p>
            </div>
            {remarks.map((data, i) => (
              <div key={i} className="flex space-x-5 w-full">
                <div className="w-[93%]">
                  <label htmlFor="detail" className="text-[20px]">
                    Detail
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleChangeFieldRemark(e, i)}
                    name="detail"
                    className="bg-white p-2 w-full h-[50px] rounded-md"
                  />
                </div>
                  <button onClick={() => handleDeleteRemark(i)} className='cursor-pointer rounded-md font-bold bg-[#84D2D89C] mt-[3.5%] w-[5%] h-[50px]'>
                    x
                  </button>
              </div>
            ))} */}
                  {/* <div className='flex space-x-[2%]'>
                    <div className='w-[33%]'>
                      <label htmlFor="Total" className="text-[20px]">Total</label>
                      <input type="text" name='Total' defaultValue={formatHarga(calculateTotal())} readOnly className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[33%]'>
                    <label htmlFor="dp" className="text-[20px]">Down Payment</label>
                    <input type="text" value={down} onChange={(e)=>setDown(Number(e.target.value))} name='dp' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> 
            <div className='w-[33%]'>
                      <label htmlFor="Remaining" className="text-[20px]">Remaining Payment</label>
                          <input type="text" defaultValue={formatHarga(calculateRemaining())} readOnly name='Remaining' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          </div> */}
                     {/* <div className='flex space-x-[2%]'>
                    <div className='w-[33%]'>
                      <label htmlFor="Total" className="text-[20px]">Total<span className='text-xs ms-1 text-gray-500'>( include 21% tax )</span></label>
                      <input type="text" name='Total' value={formatHarga(total)} onChange={(e)=>setTotal(Number(e.target.value))} readOnly className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[33%]'>
                    <label htmlFor="dp" className="text-[20px]">Deposit Received</label>
                    <input type="text" value={down} onChange={(e)=>setDown(Number(e.target.value))} name='dp' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> 
            <div className='w-[33%]'>
                      <label htmlFor="Remaining" className="text-[20px]">Remaining Payment</label>
                          <input type="text" value={formatHarga(calculateRemaining())} onChange={(e)=>setRemaining(Number(e.target.value))} readOnly name='Remaining' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          </div>
          <div className="flex space-x-[2%]">
          <p className="text-[20px]">Billing Instruction Charge To:</p>
          <div className="flex space-x-[15%] ">
                    <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn'  value="cash" id='cash'
                     onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                    </div>
                    <div className="whitespace-nowrap">
       
                <input type="radio" name='paymentIn' value="debit" id='debit'
                       onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
              </div>
              <div className="whitespace-nowrap">
                    <input type="radio" name='paymentIn' value="transfer" id='transfer'
                        onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                        border-2 border-[#0E7793] w-5 h-5" />
                    <label htmlFor="transfer" className='ms-3 translate-y-[3px] text-[20px]'>Transfer</label>
                    </div>
          </div>
                  </div> */}
                  
          <button onClick={AddGroup} className='w-[120px] cursor-pointer bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            Submit
          </button>
                  </div>
          </div>
          </div>
  )
}

export default page