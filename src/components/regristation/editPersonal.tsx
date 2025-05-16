/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import remark from '../../../public/assets/icon/Plus.svg'
import Image from 'next/image'

// type ReservationData = {
//   id: number;
//   fullname: string;
//   birth: string;
//   nationality: string;
//   id_number: string;
//   createdAt: string;
//   adult: string;
//   children: string;
//   roomNo: string;
//   roomType: string;
//   phone: string;
//   email: string;
//   bookedBy: string;
//   checkin: string;
//   checkout: string;
//   preferency: string;
//   remaining: number;
//   total: number;
//   stay: number;
//   rate: number;
//   roomRs: {
//     rate: number;
//     room: string;
//     stay: number;
// sub_total: number
//   }[]
// }
type EditPop = {
  isVisible: boolean;
  onClose: (isClose: boolean) => void;
  id: number | undefined;
  getPersonal: () => void;
};
const EditPersonal: React.FC<EditPop> = ({ isVisible, getPersonal, onClose, id }) => {
  if (!isVisible) return null;
  const [data, setData] = useState<any>();
  const [fullname, setFullname] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subTotal, setSubtotal] = useState<number>(0);
  const [deposit, setdeposit] = useState<number>(0);
  const [total, settotal] = useState<number>(0);
  const [Card, setCard] = useState("");
  const [cvv, setcvv] = useState("");
  const [exp, setexp] = useState("");
  const [front, setfront] = useState("");
  const [payment, setPayment] = useState("");
  const [remaining, setRemaining] = useState<number>(0)
    // const [checkin, setCheckin] = useState("");
  // const [checkout, setCheckout] = useState("");
  //  const calculateTotal = (): number => (deposit ? subTotal - deposit : 0);
  const [birth, setBirth] = useState<string>("")
  const [loyalNumber, setLoyalNumber] = useState<string>("")
  const [loyalLevel, setLoyalLevel] = useState<string>("")
  const [nationality, setNationality] = useState<string>("")
  const [room, setroom] = useState<string>("101 Deluxe Twin ");
  const [datas, setDatas] = useState<any[]>();
   const [checkin, setCheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [adult, setAdult] = useState<string>("");
  // useEffect(() => {
  //     settotal(calculateTotal());
  // }, [deposit, subTotal]);
   
    const [accomodation, setAccomodation] = useState<any[]>([
        {
          room: "101 Deluxe Twin",
          rate: 0,
          stay: 0,
          sub_total: 0
        }
    ]);
  
    const [remarks, setRemarks] = useState<any[]>([
    {
      detail: ""
    }
  ]);
  // useEffect(() => {
  //   // const interval = setInterval(getReservasi, 3000)
  //       getReservasi();
  //       // return () => clearInterval(interval)
  // }, [id]);
  // async function getReservasi() {
  //   const url = `${process.env.NEXT_PUBLIC_URL}api/onePersonal/${id}`;
  //   try {
  //       const res = await axios.get<any>(url,
  //           {
  //               withCredentials: true
  //         });
  //     setBirth(res.data.birth)
  //     setNationality(res.data.nationality)
  //     setNumber(res.data.id_number)
  //     setTitle(res.data.title)
  //     setType(res.data.itype)
  //     setAddress(res.data.address)
  //     setLoyalLevel(res.data.loyalLevel)
  //     setLoyalNumber(res.data.loyalNumber)
  //     setPhone(res.data.phone)
  //     setEmail(res.data.email)
  //     setdeposit(res.data.deposit)
  //     setPayment(res.data.paymentmethod)
  //     setCard(res.data.cardNo)
  //     setcvv(res.data.cvv)
  //     setexp(res.data.exp)
  //     setRemarks(res.data.regisP)
  //     setfront(res.data.front_desk)
  //     setCheckin((res.data.checkin)); // Set nilai checkin
  //     setCheckout((res.data.checkout));
  //     setFullname(res.data.fullname)
  //     setAccomodation(res.data?.roomRs)
  //     setData(res.data);
  //     setSubtotal(res.data.remaining)
  //     setPostal(res.data.postal)
  //     console.log(res.data);
  //     console.log("Data ditemukan:", res.data, res.data.id);
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }
  const formatTanggal = (tanggal: string) => {
    const opsiTanggal: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
  };
        
        
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
               setdeposit(numberValue);
             };
      
      
      
          
            const handleDeleteAccomodation = (i: number) => {
                const deleteAccomodation = [...accomodation];
                deleteAccomodation.splice(i, 1);
                setAccomodation(deleteAccomodation);
  };
  

    async function Checkin() {
        // setIsLoading(true);
       
const url = `${process.env.NEXT_PUBLIC_URL}api/editRPersonal/${id}`;
        try {
          const res = await axios.put(
            url,
            {
                id_reservasi: id,
              birth: birth,
              nationality: nationality,
              loyalNumber: loyalNumber,
              loyalLevel: loyalLevel,
              title: title,
              fullname: fullname,
              address: address,
              postal: postal,
              deposit: deposit,
              total: total,
              subtotal: subTotal,
              
              paymentmethod: payment,
              cardNo: Card,
              cvv: cvv,
              exp: exp,
              front_desk: front,
                id_number: number,
                itype: type,
                email: email,
                phone: phone,
              remarksR: remarks,
                remaining: remaining,
                checkin: checkin,
              checkout: checkout,
              stay: stay,
              roomR: accomodation,
              adult: adult,
                children: children
            },
            { withCredentials: true }
          );
          console.log(res.data)
          Swal.fire({
            text: "Registration data edited",
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
          onClose(true)
          getPersonal()
          console.log(res.data.message);
          console.log(id)
          // setIsLoading(false);
        } catch (error:any) {
          // setIsLoading(false);
          console.log(error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.response?.data?.message,
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
  const formatHarga = (itung: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(itung);
  };
  const handleAddRemarks = () => {
    setRemarks([
      ...remarks,
      {
        detail: "",
      }
    ]);
  };
  const handleChangeField = (e: any, i: number) => {
    const { name, value } = e.target;
    const onChange: any = [...remarks];
    onChange[i][name] = value;
    setRemarks(onChange);
  };
  // const formatDate = (date: string) => {
  //   const [day, month, year] = date.split(" ");
  //   return `${year}-${month}-${day}`;
  // };
    const handleDelete = (i: number) => {
        const deleteRemarks = [...remarks];
        deleteRemarks.splice(i, 1);
        setRemarks(deleteRemarks);
  };
   
    useEffect(() => {
      getRoom();
    }, []);
    
    async function getRoom() {
      const url = `${process.env.NEXT_PUBLIC_URL}api/getRoom`;
      try {
        const res = await axios.get(url, { withCredentials: true });
        if (res.data && res.data.length > 0) {
          setDatas(res.data);
          if (!room) setroom(res.data[0].gabungan); // Atur room pertama sebagai default
        }
      } catch (error) {
        console.error(error);
      }
  }
   const [stay, setStay] = useState<number>(0);
  
  useEffect(() => {
    getOne()
  }, [])

  async function getOne() {
    // if (!id) return null;
    const url = `${process.env.NEXT_PUBLIC_URL}api/onePersonal/${id}`
    try {
        const res = await axios.get(url, {
            withCredentials: true
        })
        // setPersonal(res.data)
      if (res.data) {
        setChildren(res.data.children)
        setAdult(res.data.adult);
        setStay(res.data.stay)
        setBirth(res.data.birth)
            setNationality(res.data.nationality)
            setNumber(res.data.id_number)
            setTitle(res.data.title)
            setType(res.data.itype)
            setAddress(res.data.address)
            setLoyalLevel(res.data.loyalLevel)
            setLoyalNumber(res.data.loyalNumber)
            setPhone(res.data.phone)
            setEmail(res.data.email)
            setdeposit(res.data.deposit)
            setPayment(res.data.paymentmethod)
            setCard(res.data.cardNo)
            setcvv(res.data.cvv)
            setexp(res.data.exp)
            setRemarks(res.data.regisP)
            setfront(res.data.front_desk)
            setCheckin((res.data.checkin)); // Set nilai checkin
            setCheckout((res.data.checkout));
            setFullname(res.data.fullname)
            setAccomodation(res.data?.roomRs)
            setData(res.data);
            setSubtotal(res.data.remaining)
            setPostal(res.data.postal)
            
      }
      console.log(res.data)
    } catch (error) {
        console.log(error)
    }
  }
  
    //  useEffect(() => {
    //       settotal(calculateTotal());
    //     }, [stay, rate]);
        
        useEffect(() => {
          setRemaining(calculateRemaining());
        }, [deposit, total]);
        
        // const calculateTotal = (): number => {
        //   return stay && rate ? stay * rate + stay * rate * 21/100 : 0;
        // };
        // const calculateRemaining = (): number => (deposit ? calculateTotal() - deposit : 0);  
        
  
      useEffect(() => {
           const totalAwal = calculateTotal();
           const newTotal = totalAwal + totalAwal * 0.21
           settotal(newTotal);
         }, [accomodation]); // `total` diperbarui setiap kali `accomodation` berubah
         
         const calculateTotal = () => {
           return accomodation?.reduce((sum, item) => sum + (item.sub_total || 0), 0);
  };
       useEffect(() => {
          setRemaining(calculateRemaining());
        }, [deposit, total]);
    const calculateRemaining = (): number => (deposit ? total - deposit : 0);  
         
      //    useEffect(() => {
      //      setRemaining(calculateRemaining());
      //    }, [deposit, calculateTotal]);
         
      //  const calculateRemaining = (): number => (deposit ? total - deposit : 0);  
      const [minTanggal, setMinTanggal] = useState('');
      const [maxTanggal, setMaxTanggal] = useState('');
      
      useEffect(() => {
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
      
        setMinTanggal(formatTanggal);
        setMaxTanggal(formatTanggalMax);
      }, []);
  
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

                  <div className="flex mb-[1.2%]">
            <h1 className='font-semibold text-[23px] translate-y-[10px] whitespace-nowrap'>Personal Information</h1>
            <div className="relative w-full" >

                    <button onClick={()=>onClose(true)} className='w-[120px] cursor-pointer absolute right-[0%] top-[8%] bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                                Cancel
                    </button>
            </div>
          </div>
          <div style={{ top: window.scrollY }} className="flex-col rounded-[20px]  flex space-y-[2%] w-[100%] min-h-screen">
            <div className="flex  space-x-3">
              <div className='w-[70%] h-[50px]'>
                          <label htmlFor="Full" className="text-[20px]">Full Name</label>
                          <input type='text'
                            name="Full"
                  // maxLength={180}
                  value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-[100%] h-[30px] p-4 border bg-white rounded-md"
                />
                </div>
                <div className="flex flex-col space-y-[3.5%] w-[30%]">
                <div className="flex flex-col ">
                  <p className="text-[20px]">Title</p>
                  <div className="flex space-x-[3%]">
                            <div className="whitespace-nowrap">
                            <input type="radio" name='title' checked={title === "mr"} value="mr" onChange={(e) => setTitle((e.target as any as HTMLInputElement).value)} id='mr'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="Mr" className='ms-3 translate-y-[3px] text-[20px]'>Mr</label>
                            </div>
                            <div className="whitespace-nowrap">
                        <input type="radio" name='title' checked={title === "mrs"} value="mrs" onChange={(e) => setTitle((e.target as HTMLInputElement).value)} id='mrs'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="Mrs" className='ms-3 translate-y-[3px] text-[20px]'>Mrs</label>
                      </div>
                      <div className="whitespace-nowrap">
                            <input type="radio" name='title' checked={title === "ms"} value="ms" onChange={(e) => setTitle((e.target as HTMLInputElement).value)} id='ms'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="Ms" className='ms-3 translate-y-[3px] text-[20px]'>Miss/Ms</label>
                            </div>
              </div>
              </div>
              </div>
             
            </div>
            <div className="flex space-x-5 w-full">
                    <div className='w-[50%]'>
                      <label htmlFor="Date of birth" className="text-[20px]">Date of birth</label>
                      <input type="date" onChange={(e)=> setBirth(e.target.value)} value={birth} name='Date of birth' className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Natioality" className="text-[20px]">Nationality</label>
                    <input type="text" name='Natioality'  onChange={(e)=> setNationality(e.target.value)} value={nationality} className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div>  
            </div> 
            <div className="flex w-full space-x-3">
            <div className="w-[50%]">
              <label htmlFor="id number" className="text-[20px]">ID Number</label>
                <input type="text" value={number} onChange={(e)=>setNumber(e.target.value)} name='id number' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
              <div className="w-[50%]">
              <label htmlFor="Type" className="text-[20px]">Type</label>
              <div className="flex space-x-[3%] translate-y-2">
                            <div className="whitespace-nowrap">
                            <input type="radio" name='KTP' checked={type === "KTP/SIM"} onChange={(e) => setType((e.target as HTMLInputElement).value)} value="KTP/SIM" id='KTP/SIM'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="KTP" className='ms-3 translate-y-[3px] text-[20px]'>KTP/SIM</label>
                            </div>
                            <div className="whitespace-nowrap">
                        <input type="radio" name='Pass' checked={type === "Passport"} onChange={(e) => setType((e.target as HTMLInputElement).value)} value="Passport" id='Password'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="Pass" className='ms-3 translate-y-[3px] text-[20px]'>Passport</label>
                  </div>
                  <div className="whitespace-nowrap">
                        <input type="radio" name='Lain' checked={type === "Other"} onChange={(e) => setType((e.target as HTMLInputElement).value)} value="Other" id='Password'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="Lain" className='ms-3 translate-y-[3px] text-[20px]'>Other</label>
                      </div>
              </div>
              </div>
            </div>
             
            <div className="flex w-[100%] space-x-2">

<div className='w-[50%]'>
            <label htmlFor="Address" className="text-[20px]">Address</label>
            <textarea
  value={address}
  onChange={(e)=>setAddress(e.target.value)}
              name="Address"
              maxLength={300}
              className="w-[100%] h-[100px] p-4 border bg-white rounded-md"
  /> 
  </div>
    <div className='flex-col w-[25%] space-y-1'>
                <label htmlFor="Postal" className="text-[20px] whitespace-nowrap ">Postal Code</label>
                <input
                value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  name="Postal"
                  maxLength={6}
                  className="w-[100%] p-2 border bg-white rounded-md"
      />
      
              </div>
  </div>
          
            <div className="flex w-full space-x-3">
            <div className="w-[50%]">
              <label htmlFor="Phone" className="text-[20px]">Phone</label>
              <input type="text" onChange={(e) => setPhone(e.target.value)} name='Phone' value={phone} className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
              <div className="w-[50%]">
              <label htmlFor="Email" className="text-[20px]">Email</label>
                    <input type="text" onChange={(e)=> setEmail(e.target.value)} name='Email' value={email} className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
            </div>
            <div className="flex w-full space-x-3">
            <div className="w-[50%]">
              <label htmlFor="Loyalty Number" className="text-[20px]">Loyalty Number</label>
                <input type="text" onChange={(e)=> setLoyalNumber(e.target.value)} value={loyalNumber} name='Loyalty Number' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
              <div className="w-[50%]">
              <label htmlFor="Loyalty Level" className="text-[20px]">Loyalty Level</label>
                    <input type="text" onChange={(e)=> setLoyalLevel(e.target.value)} value={loyalLevel} name='Loyalty Level' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
            </div>
          </div>
          {data && data.checkin && data.checkout && (  
            <>
              <h1 className='font-semibold text-[23px] translate-y-[10px]'>Reservation Detail</h1>
                  <div className="bg-white grid grid-cols-2 space-y-[1%] p-[2%] flex-col w-full h-[200px] rounded-md">
            <div className="">
                <ul className='flex-col space-y-[2%]'>
                  <li>Reservation Code        :<span> {data.id}</span></li>
                  <li>Reservation Date        :<span> {formatTanggal(data.createdAt)}</span></li>
                  <li>No. of Adult/Children  :<span> {data.adult} adult {data.children} children</span></li>
                  {/* <li>Room Quantity           :<span> 2</span></li> */}
                    <li>Checkin Date                   :<span> {formatTanggal(data.checkin)}</span></li>
                    <li>Checkout Date                  :<span> {formatTanggal(data.checkout)}</span></li>
                </ul>
                </div>
                <div className="">
                  <ul className='flex-col space-y-[2%]'>
                    <li>Stay       :<span> {data.stay} Days</span></li>
                    <li>Rate   :<span> {formatHarga(data.rate)}</span></li>
                    <li>Special Request                :<span> {data.preferency}</span></li>
                    <li>Booked By         :<span> {data.bookedBy}</span></li>
                  </ul>
                </div>
              </div>
             
              
            </>
          )}
              <div className="flex w-full space-x-5">
           
           <div className="flex space-x-5 w-full">
             <div className='w-[33%]'>
               <label htmlFor="Check In" className="text-[20px]">Check In</label>
         <input type="date" defaultValue={checkin} onChange={(e) => setCheckin(e.target.value)} min={!id ? minTanggal : checkin} max={maxTanggal} name='Check In' className='bg-white p-2 w-full h-[50px] rounded-md' />
             </div>
             <div className='w-[33%]'>
             <label htmlFor="Check Out" className="text-[20px]">Check Out</label>
             <input type="date" name='Check Out'  defaultValue={checkout} onChange={(e)=>setCheckout(e.target.value)} min={!id ? minTanggal : checkin} max={maxTanggal} className='bg-white p-2 w-full h-[50px] rounded-md' />
       </div>  
       <div className='w-[33%]'>
               <label htmlFor="Stay" className="text-[20px]">Stay</label>
               <input type="text" name='Stay' value={stay} onChange={(e) => setStay(Number((e.target as HTMLInputElement).value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
     </div>
     </div> 
       </div>
           <div className="flex flex-col mt-3 space-y-[2%]">
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
                                    {datas && datas?.map((room: any) => (
                                      <option key={room.gabungan} value={room.gabungan}>
                                        {room.gabungan}
                                      </option>
                                    ))
                                      // : <option disabled>No Rooms Available</option>}
                                    }
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
                
                {/* <div className='w-[50%]'>
                      <label htmlFor="Stay" className="text-[20px]">Stay</label>
                      <input type="text" name='Stay' value={stay} onChange={(e) => setStay(Number((e.target as HTMLInputElement).value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> */}
                    <div className='w-[50%]'>
                      <label htmlFor="Adult" className="text-[20px]">Adult</label>
                      <input type="text" name='Adult' value={adult} onChange={(e) => setAdult((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[50%]'>
                    <label htmlFor="Children" className="text-[20px]">Children</label>
                    <input type="text" name='Children' value={children} onChange={(e) => setChildren((e.target as HTMLInputElement).value)}  className='bg-white p-2 w-full h-[50px] rounded-md' />
                  </div> 
          </div>
          
          <div className="">
            <h1 className='font-semibold text-[23px] translate-y-[10px]'>Payment Detail</h1>
            <div className="flex space-x-5 mt-2">
          {/* <div className='w-[25%]'>
                      <label htmlFor="Rate" className="text-[20px]">Rate</label>
              <input type="text" name='Rate' value={rate} onChange={(e)=>setRate(Number(e.target.value))}  className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> */}
           <div className='w-[33%]'>
                      <label htmlFor="Total" className="text-[20px] whitespace-nowrap">Total<span className='text-xs ms-1 text-gray-500'>( include 21% tax )</span></label>
                      <input type="text" name='Total' value={formatHarga(total)} onChange={(e)=>settotal(Number(e.target.value))} readOnly className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
                    <div className='w-[33%]'>
                    <label htmlFor="dp" className="text-[20px] whitespace-nowrap">Deposit</label>
                    <input type="text" value={displayDown || (deposit ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(deposit) : "")} onChange={handleDownChange} name='dp' className='bg-white p-2 w-full h-[50px] rounded-md' />
            </div> 
            <div className='w-[33%]'>
                      <label htmlFor="Remaining" className="text-[20px] whitespace-nowrap">Remaining Payment</label>
                      <input type="text" name='Remaining' value={formatHarga(calculateRemaining())} readOnly onChange={(e) => setRemaining(Number(e.target.value))} className='bg-white p-2 w-full h-[50px] rounded-md' />
                    </div>
          </div>
          </div>
          <div className="flex w-[100%] mt-3 space-x-[2%]">
              <label htmlFor="payments" className="text-[20px]">Payment Methods</label>
              <div className="flex space-x-[3%]">
                            <div className="whitespace-nowrap">
                            <input type="radio" name='payments' checked={payment === "cash"} onChange={(e) => setPayment(e.target.value)} value="cash" id='cash'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="cash" className='ms-3 translate-y-[3px] text-[20px]'>Cash</label>
                            </div>
                            <div className="whitespace-nowrap">
                        <input type="radio" name='payments' checked={payment === "debit"} onChange={(e) => setPayment(e.target.value)} value="debit" id='debit'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="debit" className='ms-3 translate-y-[3px] text-[20px]'>Credit / Debit</label>
              </div>
              <div className="whitespace-nowrap">
                        <input type="radio" name='payments' checked={payment === "Bank"} onChange={(e) => setPayment(e.target.value)} value="Bank" id='Bank'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="Bank" className='ms-3 translate-y-[3px] text-[20px]'>Bank Transfer</label>
              </div>
              <div className="whitespace-nowrap">
                        <input type="radio" name='payments' checked={payment === "Other"} onChange={(e) => setPayment(e.target.value)} value="Other" id='Other'
                                className="translate-y-1 appearance-none bg-white cursor-pointer text-[#0E7793] checked:bg-[#0E7793] checked:border-white rounded-full
                                border-2 border-[#0E7793] w-5 h-5" />
                            <label htmlFor="Other" className='ms-3 translate-y-[3px] text-[20px]'>other Transfer</label>
              </div>
            </div>
              </div>
            <div className="flex w-full space-x-3">
            <div className="w-[33%]">
              <label htmlFor="Card No" className="text-[20px]">Card No</label>
              <input type="text" onChange={(e)=> setCard(e.target.value)} value={Card} name='Card No' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
              <div className="w-[33%]">
              <label htmlFor="CVV" className="text-[20px]">CVV</label>
            <input type="text" onChange={(e) => setcvv(e.target.value)} value={cvv}  name='CVV' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
              <div className="w-[33%]">
              <label htmlFor="Exp Date" className="text-[20px]">Exp Date</label>
              <input
  type="datetime-local"
  value={exp ? new Date(exp).toISOString().slice(0, 16) : ''}
  onChange={(e) => setexp(e.target.value)}
  name="Exp Date"
  className="bg-white p-2 w-full h-[50px] rounded-md"
/>

              </div>
            </div>
          <div className="flex flex-col w-full space-y-2">
          <h1 className='font-semibold text-[23px] translate-y-[10px]'>Additional</h1>
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
                  <input
                    type="text"
                    value={data.detail}
                    onChange={(e) => handleChangeField(e, i)}
                    name="detail"
                    className="bg-white p-2 w-full h-[50px] rounded-md"
                  />
                </div>
                  <button onClick={() => handleDelete(i)} className='cursor-pointer rounded-md font-bold bg-white w-[5%] h-[50px]'>
                    x
                  </button>
              </div>
            ))}
          <div className="w-full">
              <label htmlFor="Front" className="text-[20px]">Front Desk Agent</label>
                    <input type="text" onChange={(e)=>setfront(e.target.value)} value={front} name='Front' className='bg-white p-2 w-full h-[50px] rounded-md' />
              </div>
          </div> 
          <div className="mt-3">
            <button onClick={Checkin} className='w-[120px] cursor-pointer bg-white shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                              Submit
            </button>

         
        </div>
        </div>
    </div>
  )
}

export default EditPersonal