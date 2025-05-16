/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Image from 'next/image'
import remark from "../../../../../public/assets/icon/Plus.svg"
import { Params } from 'next/dist/server/request/params';

function page() {
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
      // const handleCancel = () => {
      //   router.back();
      // }
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
      const handleChangeFieldAccomodation = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        i: number
      ) => {
        const { name, value } = e.target;
        const updatedAccomodation = [...accomodation];
        updatedAccomodation[i][name] =
          name === "rate" || name === "stay" ? parseFloat(value) || 0 : value;
      
        if (name === "rate" || name === "stay") {
          const rate = updatedAccomodation[i].rate || 0;
          const stay = updatedAccomodation[i].stay || 0;
          updatedAccomodation[i].sub_total = rate * stay;
        }
      
        setAccomodation(updatedAccomodation);
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
     useEffect(() => {
          const totalAwal = calculateTotal();
          const newTotal = totalAwal + totalAwal * 0.21
          setTotal(newTotal);
        }, [accomodation]); // `total` diperbarui setiap kali `accomodation` berubah
        
        const calculateTotal = () => {
          return accomodation && accomodation?.reduce((sum, item) => sum + (item.sub_total || 0), 0);
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
    const [charter, setCharter] = useState<string>("");
    const [booking, setBooking] = useState<string>("");
    const [rack, setRack] = useState<string>("");
    const [initial, setInitial] = useState<string>("");
    const [enter, setEnter] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [grupData, setGrup] = useState<any>()
    const id = useParams()
    useEffect(() => {
      getGroupData(id)
    }, [])
    
   
    async function getGroupData(id: Params) {
       const url = `${process.env.NEXT_PUBLIC_URL}api/getOneGroup/${id}`
      try {
        const grup = await axios.get(url, { withCredentials: true })
        setGrup(grup.data)
          if (grup.data) {
            setnamaGroup(grup.data.name || "");
            setTravel(grup.data.name_of_travel || "");
            setAddress(grup.data.address || "");
            setContact(grup.data.contact || "");
            setDown(grup.data.down || 0);
            setCompany(grup.data.orCompany || "");
            setAccomodation(grup.data.roomgs || "");
            setRemarks(grup.data.remarks || []);
            setArrangements(grup.data.makanans || []);
            setRemaining(grup.data.remaining || 0);
            setPayment(grup.data.payment || "");
            setChildren(grup.data.children || "");
            setAdult(grup.data.adult || "");
            setTotal(grup.data.total || 0);
            setClrek(grup.data.clrek || "");
            setdateC(grup.data.dateC || "");
            setfollowUp(grup.data.followup || "");
            setRomming(grup.data.romming || "");
            // setPhone(grup.data.phone || ""); // dikomen juga di AddGroup
            // setLetter(grup.data.letter || "");
            // setEmail(grup.data.email || "");
            // setFacsimile(grup.data.facsimile || "");
            setBooking(grup.data.metodeBooking || "");
            setRack(grup.data.rack || "");
            setCharter(grup.data.charter || "");
            setEnter(grup.data.entered_by || "");
            setArrival(grup.data.arrivalGroups || "");
            setDeparture(grup.data.DepartureGroups || "");
            setInitial(grup.data.initialDate || "");
                  
        }
        console.log(grup.data)
      } catch (error) {
        console.log(error)
      }
    }
      async function AddGroup() {
          const url = `${process.env.NEXT_PUBLIC_URL}api/editGroup/${id}`;
          try {
            const res = await axios.put(url,
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
                // phone: phone,
                // letter: letter,
                // email: email,
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
                     text: "Data checkin edited",
                     icon: "success",
                     timer: 2000,
                     iconColor: "#0E7793cc",
                     color: "#0E7793",
                     width: "25%",
                     showConfirmButton: false,
                     customClass: {
                       container: "alert",
                       
                     }
                   });
                //    onClose(true)
                 } catch (error:any) {
                   // setIsLoading(false);
                   console.log(error)
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
    
          checkinInput?.setAttribute('min', formatTanggal);
          checkoutInput?.setAttribute('min', formatTanggal);
          dateCC?.setAttribute('min', formatTanggal);
          dateCC?.setAttribute('max', formatTanggalMax);
          checkinInput?.setAttribute('max', formatTanggalMax);
          checkoutInput?.setAttribute('max', formatTanggalMax);
        };
    
        setTanggalminmax();
    }, []);
    const formatTanggalInput = (tanggal: string) => {
      return tanggal ? tanggal.slice(0, 10) : '';
    };
    
   
    return (
        <div className="overflow-x-hidden  w-full min-h-screen">    
        <div className='bg-white translate-x-80 pb-[10%]'>
                <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                   Registration Data &gt; Registration Group Form
                </div>
                {grupData && 
        <div className="flex-col rounded-[20px]  flex space-y-[2%] w-[100%] min-h-screen">
             
                    <div className='w-[100%]'>
                      <label htmlFor="Name of Group" className="text-[20px]">Name of Group</label>
              <input type="text" value={namaGroup} onChange={(e)=>setnamaGroup(e.target.value)} name='Name of Group' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div>
            <div className="flex space-x-[20px] w-[100%]">           
                      <div className=' flex space-x-2'>
                  <input type='radio' checked={booking === "phone"} value="phone" onChange={(e)=>setBooking(e.target.value)} name='ReservationType' className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5' />
                          <label htmlFor="phone" className="text-[20px] whitespace-nowrap ms-1">Phone Reservation</label>
                      </div>
                      <div className=' flex space-x-2'>
                          <input type='radio' checked={booking === "letter"} value="letter" onChange={(e)=>setBooking(e.target.value)} name='ReservationType' className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5' />
                          <label htmlFor="letter" className="text-[20px] whitespace-nowrap ms-1">Letter Reservation</label>
                        </div>
                        <div className=' flex space-x-2'>
                          <input type='radio' checked={booking === "email"} value="email" onChange={(e)=>setBooking(e.target.value)} name='ReservationType' className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5' />
                          <label htmlFor="email" className="text-[20px] whitespace-nowrap ms-1">Email Reservation</label>
                      </div>
                      <div className=' flex space-x-2'>
                          <input type='radio'checked={booking === "facsimile"} value='facsimile' name='ReservationType' onChange={(e)=>setBooking(e.target.value)} className='appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5' />
                          <label htmlFor=" facsimile" className="text-[20px] whitespace-nowrap ms-1"> Facsimile Reservation</label>
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
                                              value={acc?.rate}
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
                                              value={acc?.stay}
                                      className="bg-white p-2 w-full h-[50px] rounded-md"
                                  />
                                      </div>
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
            <div className='flex space-x-[2%]'>
                      <div className='w-[33%]'>
                        <label htmlFor="Total" className="text-[20px] whitespace-nowrap">Total<span className='text-xs ms-1 text-gray-500'>( include 21% tax )</span></label>
                        <input type="text" name='Total' value={formatHarga(total)} onChange={(e)=>setTotal(Number(e.target.value))} readOnly className='bg-white p-2 w-full h-[50px] rounded-md' />
                      </div>
                      <div className='w-[33%]'>
                      <label htmlFor="dp" className="text-[20px] whitespace-nowrap">Deposit Received</label>
                      <input type="text" value={down} onChange={(e)=>setDown(Number(e.target.value))} name='dp' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div> 
              <div className='w-[33%]'>
                        <label htmlFor="Remaining" className="text-[20px] whitespace-nowrap">Remaining Payment</label>
                            <input type="text" value={formatHarga(calculateRemaining())} onChange={(e)=>setRemaining(Number(e.target.value))} readOnly name='Remaining' className='bg-white p-2 w-full h-[50px] rounded-md' />
                      </div>
            </div>
            <div className="flex space-x-[2%]">
            <p className="text-[20px] whitespace-nowrap">Billing Instruction Charge To:</p>
            <div className="flex space-x-[15%] ">
                      <div className="whitespace-nowrap">
                      <input type="radio" checked={payment === "cash"} name='paymentIn'  value="cash" id='cash'
                       onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5" />
                      <label htmlFor="cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                      </div>
                      <div className="whitespace-nowrap">
         
                  <input type="radio" checked={payment === "debit"} name='paymentIn' value="debit" id='debit'
                         onChange={(e)=>setPayment(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5" />
                      <label htmlFor="debit" className='ms-3 translate-y-[3px] text-[20px]'>Debit</label>
                </div>
                <div className="whitespace-nowrap">
                      <input type="radio" checked={payment === "transfer"} name='paymentIn' value="transfer" id='transfer'
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
                {arrival && arrival?.map((data, i) => (            
                          <div key={i}><div className='w-[100%]'>
                    <label htmlFor="datee" className="text-[20px]">Date</label>
                    <input defaultValue={formatTanggalInput(data.datee)} onChange={(e) => handleChangeFieldArrival(e,i)} id="checkin-date" type="date" name='datee' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div><div className='w-[100%]'>
                      <label htmlFor="flight" className="text-[20px]">Flight</label>
                      <input defaultValue={data.flight} onChange={(e) => handleChangeFieldArrival(e,i)} type="text" name='flight' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div><div className='w-[100%]'>
                      <label htmlFor="time" className="text-[20px]">Time</label>
                      <input defaultValue={data.time} type="time" onChange={(e) => handleChangeFieldArrival(e,i)} name='time' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div></div>
                 ))} 
                      </div>
                      <div className="flex-col space-y-[2%] w-[50%]">           
                      <p className="text-[20px]">Departure</p>
                {departure && departure?.map((item, id) => (
                        
                          <div key={id}><div className='w-[100%]'>
                    <label htmlFor="datee" className="text-[20px]">Date</label>
                    <input defaultValue={formatTanggalInput(item.datee)} type="date" onChange={(e) => handleChangeFieldDeparture(e,id)} id="checkout-date" name='datee' className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div><div className='w-[100%]'>
                      <label htmlFor="flight" className="text-[20px]">Flight</label>
                      <input defaultValue={item.flight} type="text" onChange={(e) => handleChangeFieldDeparture(e,id)} name='flight' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div><div className='w-[100%]'>
                      <label htmlFor="time" className="text-[20px]">Time</label>
                      <input defaultValue={item.time} type="time" onChange={(e) => handleChangeFieldDeparture(e,id)} name='time' className='bg-white p-2 w-full h-[50px] rounded-md' />
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
                    
                    </div>
                 
               
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
                              {arrangements && arrangements.map((data, i) => (
                              <div key={i} className="flex space-x-5 w-full">
                                  <div className="w-[30%]">
                                  <label htmlFor="meal" className="text-[20px]">
                                  Meal Arrangements
                                  </label>
                                  <input
                                      type="text"
                                      defaultValue={data.meal}
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
                                      defaultValue={data.tours}
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
                                      defaultValue={data.account}
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
              {remarks && remarks.map((data, i) => (
                <div key={i} className="flex space-x-5 w-full">
                  <div className="w-[93%]">
                    <label htmlFor="detail" className="text-[20px]">
                      Detail
                    </label>
                    <input
                      defaultValue={data.detail}
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
                          <input type="date" id="date-C" value={formatTanggalInput(dateC)} onChange={(e)=>setdateC(e.target.value)} name='Date' className='bg-white p-2 w-full h-[50px] rounded-md' />
                      </div>
                    </div>
                  
                    <div className="flex space-x-[5%]">
                        <div className="flex translate-y-[30px] space-x-[2%]">          
                    <div className="flex">
                      <input type="radio" name='followup' value="3 Months" checked={followUp === "3 Months"} id='3 Months'
                         onChange={(e)=>setfollowUp(e.target.value)} className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5" />
                      <label htmlFor="3 Months" className='ms-3 translate-y-[3px] whitespace-nowrap '>3 Months Follow-Up</label>
                </div>
                <div className="flex">
                      <input type="radio" name='followup' value="2 Months" checked={followUp === "2 Months"}  id='2 Months'
                          onChange={(e)=>setfollowUp(e.target.value)}  className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                          border-2 border-[#0E7793] w-5 h-5" />
                      <label htmlFor="2 Months" className='ms-3 translate-y-[3px] whitespace-nowrap '>2 Months Follow-Up</label>
                    </div>
                    <div className="flex">
                      <input type="radio" name='followup' value="1 Months" checked={followUp === "1 Months"}  id='1 Months'
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
                  
                    <div className="flex space-x-[2%] w-[100%]">           
              <div className='w-[33%] flex flex-col'>
                          <label htmlFor="Rack Slip" className="text-[20px]">Rack Slip / Initial Date</label>
                <div className="flex w-full">
                <div className="w-[15%]">
                <input type="text" name='Rack Slip' value={rack} onChange={(e)=>setRack(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-l-md border-r-2 border-black' />
                </div>
                <div className="w-[85%]">
  
                          <input type="date" name='Rack Slip' value={formatTanggalInput(initial)} onChange={(e)=>setInitial(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-r-md' />
                </div>
               
                </div>
                      </div>
                      <div className='w-[33%] flex flex-col'>
                          <label htmlFor="Charter Date" className="text-[20px]">Charter Date</label>
                <div className="flex w-full">
               
                <div className="w-[100%]">
  
                          <input type="date" name='Charter Date' value={formatTanggalInput(charter)} onChange={(e)=>setCharter(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                </div>
               
                </div>
                      </div>
                        <div className='w-[33%]'>
                          <label htmlFor="Entered By" className="text-[20px]">Entered By</label>
                          <input type="text" name='Entered By' value={enter} onChange={(e)=>setEnter(e.target.value)} className='bg-white p-2 w-full h-[50px] rounded-md' />
                      </div>
                    </div>
                    
            <button onClick={AddGroup} className='w-[120px] cursor-pointer bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                              Submit
            </button>
                    </div>
          }
      
     </div>
        </div>
    )
  }

export default page