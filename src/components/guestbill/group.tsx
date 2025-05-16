/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import print from '../../../public/assets/icon/Receipt Dollar.svg'
import Print from '@/components/checkout/print'
import axios from 'axios'
import searchIcon from '../../../public/assets/icon/Search.svg'
import BillGroup from './addGroup'

function GroupBill() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any[]>([])
    const [selectedPrintId, setSelectedPrintId] = useState<number | null>(null);
    useEffect(() => {
        getOut();
    }, []);
    async function getOut() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/co`;
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
    const formatTanggal = (tanggal: string) => {
        const opsiTanggal: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
    };
    const [search, setSearch] = useState("");
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.checkin.includes(search.toLowerCase()) ||
        item.checkout.includes(search.toLowerCase())
    );
    const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
    const [service, setService] = useState(0);
     const handleGuest = (id: number) => {
                     const selectedItem = data.find((item) => item.id === id);
                     if (selectedItem) {
                       const serfis = selectedItem.total * 10 / 100
                         const tax = selectedItem.total * 11 / 100
                         const roomCharge = selectedItem.total * 0.79;
                       // setService(serfis);
                       document.title = `${selectedItem.id}_Guest_Bill_${selectedItem.name}`;
                       const printContent = `
                         <html>
                           <head>
                             <title>${document.title}</title>
                             <style>
                               * {
                                 margin: 0;
                                 padding: 0;
                                 box-sizing: border-box;
                               }
                   
                               @media print {
                                 body {
                                   font-family: 'Times New Roman', Times, serif;
                                   font-size: 16px;
                                   margin: 0;
                                   padding: 20px;
                                   line-height: 1.2;
                                 }
                   
                                 .table {
                                   width: 100%;
                                   border-collapse: collapse;
                                   margin-top: 13%;
                                   margin-bottom: 13%;
                                 }
                   
                                 .table th, .table td {
                                   padding: 8px;
                                   border: 1px solid #ddd;
                                 }
                   
                                 .text-center {
                                   text-align: center;
                                 }
                   
                                 .text-right {
                                   text-align: right;
                                 }
                   
                                 .highlight-row {
                                   background-color: #f0f8ff;
                                 }
                   
                                 .header {
                                   margin-bottom: 20px;
                                 }
                   
                                 .logo {
                                   display: inline-block;
                                   vertical-align: middle;
                                 }
                   
                                 .table-container {
                                   margin-top: 20px;
                                 }
                   
                                 .footer {
                                   margin-top: 20px;
                                   text-align: center;
                                 }
                                   .justify-between {
                                     justify-content: space-between;
                                 }
                                     .flex {
                                     display: flex;
                                 }
                               }
                             </style>
                           </head>
                           <body>
                           <h2 class="text-center">GUEST BILL</h2>
                             <div class="header justify-between flex">
                             <div>
                             <h2>Milenial Hotel</h2>
                             <p>Phone: 08964656627</p>
                             <p>Address: Jl. Kolonel Masturi 300</p>
                             </div>
                             <img class="logo" src="/assets/image/logo.png" alt="Logo" style="width: 80px; height: 80px;" />
                             </div>
                             
                             
                             <div class="details flex">
                               <p style="width: 60%">Guest Name: ${selectedItem?.name}</p>
                               <div>
                               <p>Room:   ${selectedItem?.roomRs?.map((item:any) => item.room).join(',')}</p>
                               <p>Arrival: ${formatTanggal(selectedItem?.arrivalRegistrasi[0]?.datee)}</p>
                               <p>Departure: ${formatTanggal(selectedItem?.departureRegistrasi[0]?.datee)}</p>
                               <p>Confirmation No: ${selectedItem?.id}</p>
                               <p>Cashier: FO</p>
                               <p>Invoice No: ${selectedItem?.id}</p>
                               </div>
                             </div>
                   
                             <div class="table-container">
                               <table class="table">
                                 <thead>
                                   <tr class="text-center">
                                     <th>Date</th>
                                     <th>Reference</th>
                                     <th>Charges</th>
                                     <th>Credit</th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                  <tr class="highlight-row text-center">
                                     <td>${formatTanggal(selectedItem?.departureRegistrasi[0]?.datee)}</td>
                                     <td>Room Charges</td>
                                     <td></td>
                                     <td>${formatHarga(roomCharge)}</td>
                                   </tr>
                                   <tr class="highlight-row text-center">
                                     <td>${formatTanggal(selectedItem?.departureRegistrasi[0]?.datee)}</td>
                                     <td>Deposit</td>
                                     <td></td>
                                     <td>${formatHarga(selectedItem?.down)}</td>
                                   </tr>
                                   <tr class="text-center">
                                     <td></td>
                                     <td>Government Tax</td>
                                     <td>${formatHarga(tax)}</td>
                                     <td></td>
                                   </tr>
                                   
                                   <tr class="text-center">
                                     <td></td>
                                     <td>Service Charge (10%)</td>
                                     <td>${formatHarga(serfis)}</td>
                                     <td></td>
                                   </tr>
                                   <tr class="text-center">
                                     <td colspan="3" style=" font-weight: bold;">Total</td>
                                     <td style="" class="text-center">${formatHarga(selectedItem?.total)}</td>
                                   </tr>
                                   
                                 </tbody>
                               </table>
                             </div>
                   
                             <div class="footer" style="width:85%;margin-inline-start: 7%">
                               <p>
                                 This Statement is the only receipt. I agree that I am personally liable for the above-mentioned payment 
                                 and if the person, company, or association indicated by me as being responsible for the payment fails 
                                 to pay, I understand that my liability shall be joint with such person, company, or association.
                               </p>
                               <div style="margin-top: 5%; text-align: left; margin-left: 2%">
                                 <label for="Signature">Guest Signature:</label>
                                 <div style="width: 100%; border-bottom: 1px solid #000; height: 60px;"></div>
                               </div>
                             </div>
                           </body>
                         </html>
                       `;
                   
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
      

    // const handlePrintClose = (printed: boolean) => {
    //     setShowModal(false);
    //      if (printed) {
    //          getRoom();
    //      }
  // };
  
   const [showModal2, setShowModal2] = useState(false);
      // const handlePrintClose = (printed: boolean) => {
      //     setShowModal(false);
      //      if (printed) {
      //          getRoom();
      //      }
    // };
    const [selectedEdit, setselectedEdit] = useState<number>(); 
    const handleEditBill = (id: number) => {
      setselectedEdit(id);
      setShowModal2(true);
      console.log("id", id)
  };
    return (
      <div className="overflow-x-hidden  w-full min-h-screen"> 
        <BillGroup id={selectedEdit} isVisible={showModal2} onClose={()=>setShowModal2(false)} />
            <div className='bg-white  pb-[10%]'>
                    {/* <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Guest Bill Data
                </div> */}
                <div className="relative">
                <Image
                src={searchIcon}
                alt="pass icon"
                width={22}
                height={22}
                className="absolute top-1/2 left-[4%]"
              />
                <input name="search" onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='ms-[3%] ps-[4%] w-[25%] mt-[2%] px-[1%] shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'/>
                </div>
                <table className="w-[70%] table-auto mt-6 ml-[4%]">
                    <thead>
                        <tr className="bg-[#0E7793] h-[70px] text-white">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Name of Group</th>
                            <th className="px-4 py-2">Arrival</th>
                            <th className="px-4 py-2">Departure</th>
                            <th className="px-4 py-2">Bill</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {showModal && selectedPrintId !== null && (
                            <Print
                                isVisible={showModal}
                                onClose={()=>setShowModal(false)}
                                id={selectedPrintId}
                            />
                        )}
                    {filteredData.length > 0 ? (
                            filteredData.map((item: any, i: number) => (
                                 
                                 <tr key={item.id} className={`h-[60px] justify-items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]'}`}>
                                     <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.id}</td>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.name}</td>
                                    <td className='text-[18px] text-center px-4 py-2 '>{formatTanggal(item.arrivalRegistrasi[0]?.datee)}</td>
                                     <td className='text-[18px] text-center px-4 py-2'>{formatTanggal(item.departureRegistrasi[0]?.datee)}</td>
                                     <td className="px-4 py-2 flex justify-self-center">
                                        <Image className="cursor-pointer" onClick={()=>handleEditBill(item.id)} src={print} width={25} height={25} alt="checkin" />
                            
                                              
                                           
                                     </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center ps-[20%] py-6 text-xl text-[#0E7793] opacity-50">
                                    Data not found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* <ul className='flex ps-[6%] mt-[4%] space-x-[8%]'>
                    <li className='text-[18px] pe-[6%]'>Guest Name</li>
                    <li className='text-[18px]'>Check In</li>
                    <li className='text-[18px]'>Check Out</li>
                    <li className='text-[18px]'>Room No</li>
                </ul>
        <div className="bg-[#84D2D89C] flex-col px-[2%] py-[3%] rounded-[20px] ms-[3%] flex space-y-3 w-[70%] min-h-screen">
                    {filteredData.length > 0 ? (
                        filteredData.map((item: any) => (  
                                <div key={item.id} >
                            <div   className="bg-white p-[2%] grid grid-cols-7 w-full h-[60px] rounded-[6px]">
                            {showModal && selectedPrintId !== null && (
                            <Print
                                isVisible={showModal}
                                onClose={()=>setShowModal(false)}
                                id={selectedPrintId}
                            />
                        )}
                                <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>{item.name}</p>
                                <p className='text-[18px] translate-x-[28%]'>{formatTanggal(item.checkin)}</p>
                                    <p className='text-[18px] translate-x-[80%]'>{formatTanggal(item.checkout)}</p>
                                <p className='text-[18px] translate-x-[180px] pe-[50%] ms-[3%]'>{item.roomNo}</p>
                                <div onClick={() => handlePrintClick(item.id)} className="cursor-pointer translate-x-[170px]">
                                    <Image className="" src={print} width={25} height={25} alt="checkin" />
                                </div>
                                </div>
                            </div>
                                    ))
                                    ):(
                                        <div className="flex items-center mt-[30%] justify-center">
                                        <p className='text-[40px] text-[#0E7793]  text-opacity-35'>Data tidak ada</p>      
                                    </div>
                                    )
                                }
        </div> */}
    </div>
      </div>
  )
}

export default GroupBill
