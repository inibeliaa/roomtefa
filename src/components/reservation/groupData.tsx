/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import checkinIcon2 from '../../../public/assets/icon/Hotel Check In (1).svg'
import Image from 'next/image'
import axios from 'axios';
import Link from 'next/link';
import searchIcon from '../../../public/assets/icon/Search.svg'
import print from '../../../public/assets/icon/Print.svg'
import mail from '../../../public/assets/icon/Email Send.svg'
import Swal from 'sweetalert2';
import edit from '../../../public/assets/icon/Pen Squared.svg'
import EditGrup from './editGrup';
// import { useRouter } from 'next/navigation';

function GroupData() {
    const [data, setData] = useState<any[]>([])
    // const handleCheckin = () => {
    //     router.push("/Checkin/Build")
    // }
        useEffect(() => {
            // const interval = setInterval(getReservasi, 100);
            getReservasi(); 
            // return () => clearInterval(interval); 
        }, []);
    async function getReservasi() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/groupR`;
        try {
            const res = await axios.get(url,
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
      const url = `${process.env.NEXT_PUBLIC_URL}api/reservasiGroup/${id}`;
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
              confirmButtonColor: "#0E7793",
              timer: 1500,
              backdrop: true
          })
        getReservasi()
      } catch (error) {
          console.log(error)
      }
  }
// const router = useRouter();
const handleCancel = (id: number) => {
 Swal.fire({
       title: "Are you sure you want to cancel this reservation?",
       showCancelButton: true,
       icon: "question",
       confirmButtonText: "Yes",
       iconColor: "#0E7793cc",
       color: "#0E7793",
       width: "35%",
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
       timer: 2000
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
                        const [search, setSearch] = useState("");
                        const filteredData = data.filter(item => item.name &&
                            item.name.toLowerCase().includes(search.toLowerCase()) || item.checkin &&
                            item.checkin.includes(search.toLowerCase()) || item.checkout &&
                            item.checkout.includes(search.toLowerCase())
    );
    const formatTanggal2 = (tanggal: string) => {
        const opsiTanggal: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
    };
    const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
      const handlePrint = (id: number) => {
            const selectedItem = data.find((item) => item.id === id); 
        
            if (selectedItem) {
                
            document.title = `${selectedItem.id}_Reservation_Group_Confirmation_${selectedItem.name}`;
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
                        h2 {
                        margin: 0px;
                        padding: 0px;
                        }
                      }
                    </style>
                  </head>
                  <body>
                    <div id="print-content" style="max-width: 100%; padding: 20px;">
                    <div class="flex space-x-4">
                    <img src="/assets/image/logo.png" alt="Logo" style="width: 80px; height: 80px;"/>
                    <div>
                      <h2>Milenial Hotel</h2>
                      <p>Phone: 08964656627</p>
                      <p>Address: Jl. Kolonel Masturi 300</p>
                      </div>
                    </div>
                    <p class="text-center mt-5 text-gede font-semibold">Reservation Confirmation </p>
                    <p class="mt-5" style="font-size:18px">Thank you very much for the booking made on ${formatTanggal2(selectedItem.createdAt)}</p>
                    <table class="table">
                    <tbody>
                        <tr class="highlight-row text-sm text-center">
                        <td class="px-4 py-2" >Number of Guest</td>
                        <td class="px-4 py-2" >Adult<br/>${selectedItem.adult}</td>
                        <td class="px-4 py-2" >Children<br/>${selectedItem.children}</td>
                        <td class="px-4 py-2" >Total<br/>${formatHarga(selectedItem.total)}</td>
                        </tr>
                        <tr class="highlight-row text-sm text-center">
                        <td class="px-4 py-2">Room Required</td>
                        <td className="px-4 py-2" colSpan="3">
                        ${selectedItem.roomgs?.map((item:any) => item.room).join(',')}

                      </td>

                        </tr>
                    </tbody>
                    </table>
                    <table class="table mt-5">
                    <thead>
                    <tr class="text-center">
                        <th class="text-left text-sm whitespace-nowrap" colSpan="3">Arrival</th>
                        <th class="text-left text-sm whitespace-nowrap" colSpan="3">Departure</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr class="highlight-row text-sm text-center">
                        <td class="px-4 py-2" >Date<br/>${ formatTanggal2(selectedItem.arrivalReservasi && selectedItem.arrivalReservasi[0]?.datee)}</td>
                        <td class="px-4 py-2" >Flight<br/>${selectedItem.arrivalReservasi && selectedItem.arrivalReservasi[0]?.flight}</td>
                        <td class="px-4 py-2" >Time<br/>${selectedItem.arrivalReservasi && selectedItem.arrivalReservasi[0]?.time}</td>
                        <td class="px-4 py-2" >Date<br/>${ formatTanggal2(selectedItem.departureReservasi && selectedItem.departureReservasi[0]?.datee)}</td>
                          <td class="px-4 py-2" >Flight<br/>${selectedItem.departureReservasi && selectedItem.departureReservasi[0]?.flight}</td>
                        <td class="px-4 py-2" >Time<br/>${selectedItem.departureReservasi && selectedItem.departureReservasi[0]?.time}</td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="" style="padding-top:20px">  
                        <p class="text-xl">Company/Travel  : ${selectedItem.name_of_travel || selectedItem.orCompany}</p>
                        <p class="text-xl">Contact to : ${selectedItem.contact}</p>
                        <p class="text-xl">Address        : ${selectedItem.address}</p>
                      
                        <p class="text-xl">Remark        : ${selectedItem.reservasi?.map((remarks:any) => remarks.detail).join(',')}</p>
                    </div>
                      
                       <div style="margin-top: 5%; text-align: left;">
                        <p class="mt-5" style="font-size:18px">We are sincerely looking forward to having you with us</p>
                          <label for="Signature" style="font-size: 18px">Sincerely yours</label>
                          <div style="width: 40%; border-bottom: 1px solid #000; height: 60px;"></div>
                        </div>
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
          <EditGrup
          id={selectedEdit}
          isVisible={showKonten}
          onClose={() => setShowKonten(false)}
          />
          
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
                            <th className="px-4 py-2">Group Name</th>
                            <th className="px-4 py-2">Travel Agent or Company Name</th>
                            <th className="px-4 py-2">Arrival Date</th>
                            <th className="px-4 py-2">Departure Date</th>
                            <th className="px-4 py-2">Actions</th>
                            <th className="px-4 py-2">Cancel</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {filteredData && filteredData.length > 0 ? (
                             filteredData.map((item: any, i:number) => ( 
                                <tr key={item.id}  className={`h-[60px] justify-items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]' }`}>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.name}</td>
                                    <td className='text-[18px] text-center px-4 py-2 '>{item.name_of_travel || item.orCompany}</td>
                                    <td className='text-[18px] text-center px-4 py-2'>
                                      {item.arrivalReservasi && item.arrivalReservasi.length > 0 ? formatTanggal(item.arrivalReservasi[0]?.datee) : 'No data available'}
                                    </td>
                                    <td className='text-[18px] text-center px-4 py-2'>
                                      {item.departureReservasi && item.departureReservasi.length > 0 ? formatTanggal(item.departureReservasi[0]?.datee) : 'No data available'}
                                    </td>
                                     <td className="px-4 flex py-2 items-center space-x-[5%]">
                                    <Link
                                        href={`/Registration/BuildGroup/${item.id}`}
                                        >
                                        <Image className="cursor-pointer" src={checkinIcon2} width={45} height={45} alt="checkin"/>
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

export default GroupData
