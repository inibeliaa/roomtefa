/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import checkinIcon2 from '../../../public/assets/icon/Hotel Check In (1).svg'
import Image from 'next/image'
import axios from 'axios';
import Link from 'next/link';
import print from '../../../public/assets/icon/Print.svg'
import searchIcon from '../../../public/assets/icon/Search.svg'
import mail from '../../../public/assets/icon/Email Send.svg'
import edit from '../../../public/assets/icon/Pen Squared.svg'
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import EditPersonal from './editPersonal';
type Personal = {
  name: string;
  checkin: string;
  checkout: string;
  id: number;
  room: string;
  stay: number;
  rate: number;
  roomgs: {
    room: string,
    stay: string,
    rate: number
  }[];
  total: number;
  remaining: number;
  createdAt: string;
  phone: string;
  email: string;
  payment: string;
  down: number;
  bookedBy: string;
}[]
function PersonalData() {
    const [data, setData] = useState<Personal>([]);
    // const { id } = useParams();
    // const [printData, setPrintData] = useState<any>();
    // useEffect(() => {
    //     Printt()
    // }) 
    // async function Printt() {
    //     const url = `${process.env.NEXT_PUBLIC_URL}api/One/${id}`;
    //     try {
    //         const res = await axios.get(url, {
    //             withCredentials: true,
    //         })
    //         setPrintData(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
    const handlePrint = (id: number) => {
        const selectedItem = data.find((item) => item.id === id); 
        const totalRate = selectedItem?.roomgs?.reduce(
          (acc: number, room: any) => acc + (room.rate || 0), 0
        );
        if (selectedItem) {
            
        document.title = `${selectedItem.id}_Reservation_Confirmation_${selectedItem.name}_${formatTanggal2(selectedItem.checkin)}`;
          const printContent = `
            <html>
              <head>
               <title>${document.title}</title>
                <style>
                  @media print {
                    body {
                      font-family: 'Times New Roman', Times, serif;
                      font-size: 14px;
                      margin: 0;
                      padding: 0;
                    }
                    .table {
                      width: 100%;
                      border-collapse: collapse;
                    }
                    .table th, .table td {
                      padding: 10px;
                      border: 1px solid #000;
                    }
                    .text-center {
                      text-align: center;
                    }
                    .text-right {
                      text-align: right;
                    }
                    .highlight-row {
                      background-color: #f0f8ff;
                        font-size: 0.875rem /* 14px */;
                        line-height: 1.25rem /* 20px */;
                    }
                    .whitespace-nowrap {
                        white-space: nowrap;
                    }
                    .text-xl {
                        font-size: 1.20rem /* 20px */;
                        line-height: 0.70rem 
                    }
                        .text-2xl {
                        font-size: 1.20rem /* 20px */;
                        line-height: 1.70rem 
                    }
                    .flex {
                        display: flex;
                    }
                    .justify-between {
                        justify-content: space-between;
                    }
                        .space-x-4 > :not([hidden]) ~ :not([hidden]) {
                        --tw-space-x-reverse: 0;
                        margin-right: calc(1rem /* 16px */ * var(--tw-space-x-reverse));
                        margin-left: calc(1rem /* 16px */ * calc(1 - var(--tw-space-x-reverse)));
                    }
                    .text-sm {
                        font-size: 0.875rem /* 14px */;
                        line-height: 1.25rem /* 20px */;
                    }
                    .mt-6 {
                        margin-top: 5rem 
                    }
                    .mt-5 {
                        margin-top: 1.5rem 
                    }
                    .text-gede{     
                    font-size: 1.3rem /* 24px */;
                    line-height: 2rem /* 32px */;
                }
                    .font-semibold {
                    font-weight: 580;
                }
                  }
                </style>
              </head>
              <body>
                <div id="print-content" style="max-width: 100%; padding: 20px;">
                <div class="flex space-x-4">
                <img src="/assets/image/logo.png" alt="Logo" style="width: 80px; height: 80px;"/>
                <h2>MILENIAL HOTEL<br/> SMK Negeri 1 Cisarua</h2>
                </div>
                <div class="flex justify-between">
                <p class="text-2xl ">Nomor: ${selectedItem.id}</p>
                    <p class="text-xl">${formatTanggal2(selectedItem.createdAt)}</p>
                </div>
                <div class="leading-none">
                    <p class="text-xl ">Detail</p>
                    <p class="text-xl">Guest Name   : ${selectedItem.name}</p>
                    <p class="text-xl">Phone Number : ${selectedItem.phone}</p>
                    <p class="text-xl">Email        : ${selectedItem.email}</p>
                </div>
                  <p class="text-center mt-5 text-gede font-semibold">Subject : Reservation Confirmation Letter </p>
                  <p class="text-xl mt-5">Room Reservation Details</p>
                  <table class="table">
                    <thead>
                      <tr class="text-center">
                        <th class="text-left text-sm whitespace-nowrap">GUEST NAME</th>
                        <th class="text-left text-sm whitespace-nowrap">IN</th>
                        <th class="text-left text-sm whitespace-nowrap">OUT</th>
                        <th class="text-left text-sm whitespace-nowrap">STAY</th>
                        <th class="text-left text-sm whitespace-nowrap">ROOM</th>
                         <th class="text-left text-sm whitespace-nowrap">RATE</th>
                        <th class="text-left text-sm whitespace-nowrap">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="highlight-row text-sm text-center">
                        <td class="px-4 py-2">${selectedItem.name}</td>
                        <td class="px-4 py-2">${formatTanggal(selectedItem.checkin)}</td>
                        <td class="px-4 py-2">${formatTanggal(selectedItem.checkout)}</td>
                        <td class="px-4 py-2">${selectedItem.stay}</td>
                        <td class="px-4 py-2">${selectedItem.roomgs.map((room) => (
                          room.room
                        ))}</td>
                         <td class="px-4 py-2">${formatHarga(totalRate ?? 0)}</td>
                        <td class="px-4 py-2">${formatHarga(selectedItem.total)}</td>
                        </tr>
                        <tr>
                        <td colSpan="6" class="text-right">Payment by ${selectedItem.payment} at ${formatTanggal2(selectedItem.createdAt)}</td>
                         <td class="px-4 py-2">${formatHarga(selectedItem.down)}</td>
                        </tr>
                         <tr>
                        <td colSpan="6" class="ms-72">GRAND TOTAL</td>
                         <td class="px-4 py-2">${formatHarga(selectedItem.remaining)}</td>
                        </tr>
                    </tbody>
                  </table>
                  <p class="text-xl">Description:  </p>
                  <ol class="text-2xl">
                  <li>Please note that we enforce a strict check in and check out time policy:</br>
                  a) Check-in: 14.00 PM  </br>
                    b) Check-out: 12.00 PM </li>
                    <li> Requests for adjoining rooms and so on can only be made during check
                    at the reception desk and are subject to room availability.  </li>
                    <li>Cancellation of reservations must be made 3 (three) days prior to the check-in date. </li>
                    <li>Total payment is considered forfeited for cancellations made 2 (two) days </li>
                  </ol>
                  <p class="text-center mt-6">Milenial Hotel SMKN 1 Cisarua. Jl. Kolonel Masturi No.300, RT.04/RW.14,</br> Jambudipa, Kec. Cisarua, Kabupaten Bandung Barat, Jawa Barat 40551</p>
                </div>
              </body>
            </html>
          `
          const iframe = document.createElement("iframe");
          iframe.style.position = "absolute";
          iframe.style.width = "0";
          iframe.style.height = "0";
          iframe.style.border = "none";
          document.body.appendChild(iframe);
    
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(printContent);
            iframeDoc.close();
    
            iframe.onload = () => {
              iframe.contentWindow?.focus();
              iframe.contentWindow?.print();
              document.body.removeChild(iframe);
            };
          }
        }
      };
    
      
    useEffect(() => {
        // const interval = setInterval(getReservasi, 100);
        getReservasi(); 
        // return () => clearInterval(interval); 
    }, []);
    async function getReservasi() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/getReservasi`;
        try {
            const res = await axios.get<Personal>(url,
                {
                    withCredentials: true
                });
            setData(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    async function cancel(id:number) {
        const url = `${process.env.NEXT_PUBLIC_URL}api/cancel/${id}`;
        try {
            const res = await axios.delete(url,
                {
                    withCredentials: true
                });
            console.log(res.data);
            Swal.fire({
                icon: "success",
                title: "Success Cancelled Reservation",
                iconColor: "#0E7793",
              width: "35%",
              backdrop: false,
                confirmButtonColor: "#0E7793",
                timer: 1500,
            })
            getReservasi();
        } catch (error) {
            console.log(error)
        }
    }
  const router = useRouter();
  const handleCancel = (id: number) => {
   Swal.fire({
         title: "Are you sure you want to cancel this reservation?",
         showCancelButton: true,
         icon: "question",
         confirmButtonText: "Yes",
         iconColor: "#0E7793cc",
         color: "#0E7793",
         width: "35%",
         backdrop: false,
         confirmButtonColor: "#0E7793"
   }).then((result) => {
     if (result.isConfirmed) {
       cancel(id);
      
     } else if (result.isDenied) {
       Swal.fire({
         title: "Please Try Again!",
         icon: "warning",
         color: "#0E7793",
         iconColor: "#e70008",
         timer: 2000,
         backdrop: false,
       })
     }
})
  }
  const formatTanggal = (tanggal: string) => {
    const opsiTanggal: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
    };
    const formatTanggal2 = (tanggal: string) => {
        const opsiTanggal: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
        };
                        const [search, setSearch] = useState("");
                        const filteredData = data.filter(item => item.name &&
                            item.name.toLowerCase().includes(search.toLowerCase()) || item.checkin &&
                            item.checkin.includes(search.toLowerCase()) || item.checkout &&
                            item.checkout.includes(search.toLowerCase())
                        );
                        function handleEmailClick(id: number) {
                            const selectedItem = data.find((item) => item.id === id);
                            if (selectedItem?.email) {
                              const penerima = selectedItem.email;
                                const subject = `Reservation Confirmation For ${selectedItem.name}`
                                const body = `Dear ${selectedItem.name}! Thank you for your reservation at Milenial Hotel. We are pleased to confirm your booking. For the complete reservation details, please refer to the attached document. We look forward to welcoming you!
                                
                                Best regards, ${selectedItem.bookedBy}
                                
                                
                                
                                Milenial Hotel
                                
                                
                                
                                SMK Negeri 1 Cisarua`;
                                
                                const mailtoLink = `mailto:${penerima}?subject=${subject}&body=${body}`;
                            
                                
                              window.location.href = mailtoLink;
                            } else {
                              console.error("Email tidak ditemukan untuk item dengan ID:", id);
                            }
                          }
                          const [showKonten, setShowKonten] = useState(false)
  const [selectedEdit, setselectedEdit] = useState<number>();  
  const handleEditKonten = (id: number) => {
    setselectedEdit(id);
    setShowKonten(true);
    console.log("id", id)
  };
  
    return (
      <div className="overflow-x-hidden  w-full min-h-screen">  
        {showKonten &&
        <div className="w-full max-h-[90vh]">
            <EditPersonal
              getReservasi={getReservasi}
          id={selectedEdit}
          isVisible={showKonten}
          onClose={() => setShowKonten(false)}
          />
          
        </div>
        }
                    <div  className='bg-white'>
                <div className="relative">
                <Image
                src={searchIcon}
                alt="pass icon"
                width={22}
                height={22}
                className="absolute top-1/2 left-[4%] cursor-pointer z-0"
              />
                <input name="search" onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='ms-[3%] ps-[4%] w-[25%] mt-[2%] px-[1%] shadow-md h-[40px] rounded-lg cursor-none font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'/>
                </div>
                <table className="w-[70%] table-auto mt-6 ml-[4%]">
                    <thead>
                        <tr className="bg-[#0E7793] h-[70px] text-white">
                            <th className="px-4 py-2">Guest Name</th>
                            <th className="px-4 py-2">Checkin Date</th>
                            <th className="px-4 py-2">Checkout Date</th>
                            <th className="px-4 py-2">Room</th>
                            <th className="px-4 py-2">Actions</th>
                            <th className="px-4 py-2">Cancel</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {filteredData && filteredData.length > 0 ? (
                             filteredData.map((item: any, i:number) => ( 
                                <tr  key={item.id}  className={`popup-body h-[60px] justify-items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]' }`}>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.name}</td>
                                    <td className='text-[18px] text-center px-4 py-2 '>{formatTanggal(item.checkin)}</td>
                                     <td className='text-[18px] text-center px-4 py-2'>{formatTanggal(item.checkout)}</td>
                                     <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.roomgs.map((room: any) => room.room).join(', ')}
                                     </td>
                                    <td className="px-4 flex py-2 items-center justify-center space-x-[5%]">
                                    <Link
                                        href={`/Registration/Build/${item.id}`}
                                        >
                                        <Image className="cursor-pointer" src={checkinIcon2} width={25} height={25} alt="checkin"/>
                                         </Link>
                                         <Image className="cursor-pointer" onClick={() => handlePrint(item.id)} src={print} width={25} height={25} alt="checkin" />
                                   <Image className="cursor-pointer" src={mail} onClick={() => handleEmailClick(item.id)} width={25} height={25} alt="mail" />
                                   <Image className="cursor-pointer" src={edit} onClick={()=>handleEditKonten(item.id)} width={25} height={25} alt="edit"/>
                                     </td>
                                     <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>
                                         <button onClick={()=>handleCancel(item.id)} className='bg-[#0E7793] px-2 py-1 rounded-md text-white'>Cancel</button>
                                     </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-xl text-[#0E7793] opacity-50">
                                    Data tidak ada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* <ul className='flex ps-[6%] mt-[2%] space-x-[8%]'>
                    <li className='text-[18px] pe-[6%]'>Guest Name</li>
                    <li className='text-[18px]'>Check In</li>
                    <li className='text-[18px]'>Check Out</li>
                    <li className='text-[18px]'>Room No</li>
                </ul> */}
        {/* <div className="bg-[#84D2D89C] flex-col px-[2%] py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
            {filteredData.length > 0 ? (
                filteredData.map((item: any) => (        
        <div key={item.id} className="bg-white grid p-[2%] grid-cols-7 w-full h-[60px] rounded-[6px]">
                    <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>{item.name}</p>
                    <p className='text-[18px] translate-x-[28%]'>{formatTanggal(item.checkin)}</p>
                    <p className='text-[18px] translate-x-[80%]'>{formatTanggal(item.checkout)}</p>
                        <p className='text-[18px] translate-x-[180px] pe-[50%] ms-[3%]'>{item.roomNo}</p>
                        <div className="translate-x-[170px]">
                        <Link
                            href={`/Registration/Build/${item.id}`}
                            className="flex"
                            >
                            <Image className="" src={checkinIcon2} width={25} height={25} alt="checkin"/>
                        </Link>
                        </div>
                        </div>
                                    ))
                                 ) : (
                                    <div className="flex items-center mt-[30%] justify-center">
                                    <p className='text-[40px] text-[#0E7793]  text-opacity-35'>Data tidak ada</p>      
                                </div>
                          )}      
            </div> */}
        </div>
      </div>
  )
}

export default PersonalData
