/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import checkoutIcon2 from '../../../public/assets/icon/Hotel Check Out.svg'
// import { useRouter } from 'next/navigation';
import axios from 'axios';
import searchIcon from '../../../public/assets/icon/Search.svg'
// import Link from 'next/link';
import edit from '../../../public/assets/icon/Pen Squared.svg'
import print from '../../../public/assets/icon/Print.svg'
import Swal from 'sweetalert2';
import EditPersonal from './editPersonal';
import mail from '../../../public/assets/icon/Email Send.svg'
// import receipt from '../../../public/assets/icon/Receipt.svg'
// import detail from '../../../public/assets/icon/Popup.svg'
// import Detail from '@/components/checkin/detail';
type CheckinData = {
  regisP: any;
  front_desk: string;
  id: number,
  id_number: string,
  title: string;
  postal: string;
  address: string;
  itype: string;
    userId: number,
    name: string,
    email: string,
    phone: string,
    checkin:string,
    checkout: string,
    stay: number,
    bookedBy: string,
    room:string,
    preferency: string,
    adult: string,
    children: string,
    rate: number,
    total: number,
    down: number,
    remaining: number,
    payment: string,
    createdAt: string,
  updatedAt: string,
  deposit: number,
  paymentmethod: string,
  cardNo: number,
  cvv: string,
  exp: string,
  fullname: string,
  id_reservasi: number,
  roomRs: {
    id: number,
    id_registrasi: number,
    id_registrasiP: number,
    room: string,
    rate: number,
    stay: number,
    sub_total: number,
    // arrival: 2025-04-28T17:00:00.000Z,
    // departure: 2025-04-29T17:00:00.000Z,
  }[]
    reservasi: 
      {
        id: number,
        userIn: string,
        userOut: string,
        id_reservasi: number,
        fullname:string,
        title: string,
        address: string,
        postal: string,
        id_number: string,
        preferency: string,
        itype: string,
        email: string,
        phone: string,
        subtotal: number,
        deposit: number,
        total: number,
        paymentmethod: string,
        cardNo: number,
        cvv: string,
        exp: string,
        front_desk: string,
        formStatus: string,
        createdAt: string,
        updatedAt: string
      }[]
      remarksRs: {
          detail: string;
  }[]
 
  }
function  PersonalRegis() {
    // const router = useRouter();
    // const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<CheckinData[]>([])
    // const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
    // const handleCheckout = () => {
    //     router.push("/Checkout/Build")
    // }
    useEffect(() => {
        // const interval = setInterval(getIn, 1500);
        getIn();
        // return () => clearInterval(interval)
    }, []);
    async function getIn() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/regisP`;
        try {
            const res = await axios.get<CheckinData[]>(url,
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
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.checkin?.includes(search.toLowerCase()) ||
        item?.checkout?.includes(search.toLowerCase())
    );
    // const handleDetail = (id: number) => {
    //     setSelectedDetailId(id);
    //     setShowModal(true);
    // };
    // const formatHarga = (itung: number) => {
    //     return new Intl.NumberFormat("id-ID", {
    //       style: "currency",
    //       currency: "IDR",
    //     }).format(itung);
    // };
   const formatHarga = (itung: number) => {
          return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(itung);
    };
    // const formatTanggal2 = (tanggal: string) => {
    //     const opsiTanggal: Intl.DateTimeFormatOptions = {
    //       year: "numeric",
    //       month: "long",
    //       day: "numeric",
    //     };
    //     return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
    //     };
    async function co(id: number) {
      const token = localStorage.getItem("token"); 
      if (!token) {
          Swal.fire({
              icon: "error",
              title: "Not Logged In",
              text: "Please log in to proceed.",
              confirmButtonColor: "#0E7793",
          });
          return;
      }
  
      const url = `${process.env.NEXT_PUBLIC_URL}api/co/${id}`;
      try {
          const res = await axios.put(
              url,
              {},
              {
                  headers: {
                      Authorization: `Bearer ${token}`, 
                  },
                  withCredentials: true,
              }
          );
          console.log(res.data);
          Swal.fire({
              icon: "success",
              title: "Success Checkout",
              iconColor: "#0E7793",
              width: "35%",
              confirmButtonColor: "#0E7793",
              timer: 2000,
              backdrop: true,
          });
      } catch (error) {
          console.error(error);
          Swal.fire({
              icon: "error",
              title: "Checkout Failed",
              text: "An error occurred. Please try again.",
              confirmButtonColor: "#0E7793",
          });
      }
  }
      const handlePrint = (id: number) => {
          const selectedItem = data.find((item) => item.id === id); 
          const totalRate = selectedItem?.roomRs?.reduce(
            (acc: number, room: any) => acc + (room.rate || 0), 0
          );
         const subTutal = selectedItem?.roomRs?.reduce(
          (acc: number, room: any) => acc + (room.sub_total || 0), 0
        );
          if (selectedItem) {
              
          document.title = `${selectedItem.id}_Registration_${selectedItem.fullname}`;
            const printContent = `
              <html>
                <head>
                 <title>${document.title}</title>
                  <style>
                    @media print {
                      body {
                        font-family: 'Times New Roman', Times, serif;
                        font-size: 16px;
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
                      .justify-between {
    justify-content: space-between;
}
    .flex-col {
    flex-direction: column;
}
    .text-4xl {
    font-size: 2.23rem /* 36px */;
    line-height: 2.5rem /* 40px */;
}
    .justify-around {
    justify-content: space-around;
}
    .w-\[70\%\] {
    width: 70%;
}
    .-translate-y-2 {
    --tw-translate-y: -2rem /* -8px */;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
      .-translate-y-4 {
    --tw-translate-y: -4rem /* -8px */;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
    .space-y-3 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.50rem /* 12px */ * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.50rem /* 12px */ * var(--tw-space-y-reverse));
}
    .p-2 {
    padding: 0.5rem /* 12px */;
}
    .text-lg {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
}
    .w-full {
    width: 100%;
}
    .mb-2 {
    margin-bottom: 0.3rem /* 8px */;
}
    h2 {
  margin-top: 0; /* Hilangkan margin atas */
  margin-bottom: 0.0rem; /* Atur jarak bawah */
  line-height: 1.2; /* Perbaiki tinggi baris */
}
  .mb-3 {
    margin-bottom: 0.75rem /* 12px */;
}
                    }

                  </style>
                </head>
                <body>
                  <div id="print-content" style="max-width: 100%; padding: 20px;">
                  <div class="flex justify-between mb-3">
                  <img src="/assets/image/logo.png" alt="Logo" style="width: 80px; height: 80px;"/>
                  <div class="flex flex-col">
                  <h2 class="text-right">Registration Form<br/><span class="text-4xl">MILENIAL HOTEL</span></h2>
                  </div>
                  </div>
                  <h2 style="font-weight: 600">PERSONAL INFORMATION</h2>
                <div class="leading-none flex space-x-4  w-full -translate-y-4 mb-2 ">
                       <div class="flex flex-col">
                       <label for="Full Name" class="text-2xl">Full Name   : </label>
                      <textarea type="text"  style="width:700px; height:80px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" name="Full Name" readOnly class="text-xl">${selectedItem?.fullname || ''}</textarea>
                       </div>
                      <div class="flex flex-col">
                       <label for="Title" class="text-2xl">Title   : </label>
                      <input type="text" style="width:300px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Title" value="${selectedItem.id_reservasi && selectedItem?.title || ''}" readOnly class="text-xl"></input>
                       </div>
                      </div>
                       <div class="leading-none flex space-x-4  w-full  mb-2 ">
                       <div class="flex flex-col">
                       <label for="Address" class="text-2xl">Address   : </label>
                      <textarea style="width:700px; height:80px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Address" readOnly class="text-xl">${selectedItem?.address || ''}</textarea>
                       </div>
                      <div class="flex flex-col">
                       <label for="postal" class="text-2xl">Postal Code   : </label>
                      <input type="text" style="width:300px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="postal" value="${selectedItem?.postal || ''}" readOnly class="text-xl"></input>
                       </div>
                      </div>
                       <div class="leading-none flex space-x-4  w-full  mb-2 ">
                       <div class="flex flex-col">
                       <label for="ID Number" class="text-2xl">ID Number   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="ID Number" value="${selectedItem?.id_number || ''}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Type" class="text-2xl">Type   : </label>
                      <textarea style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Type" value="${selectedItem?.itype}" readOnly class="text-xl">${selectedItem.itype}</textarea>
                       </div>
                      </div>
                       <div class="leading-none flex space-x-4  w-full  mb-2 ">
                       <div class="flex flex-col">
                       <label for="phone" class="text-2xl">Phone   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="phone" value="${selectedItem?.phone || ''}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Email" class="text-2xl">Email   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Email" value="${selectedItem?.email || ''}" readOnly class="text-xl"></input>
                       </div>
                      </div>
                    <h2 style="font-weight: 600">RESERVATION DETAIL</h2>
                        <div class="leading-none flex space-x-4  w-full  mb-2 ">
                       <div class="flex flex-col">
                       <label for="Room" class="text-2xl">Room   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Room" value="${selectedItem?.roomRs && selectedItem?.roomRs?.map((rooms: any) => rooms.room || '').join(',')}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Rate" class="text-2xl">Rate   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Rate"  value=${formatHarga(totalRate ?? 0)} readOnly class="text-xl"></input>
                       </div>
                       </div>
                          <div class="leading-none flex space-x-4  w-full  mb-2 ">
                       <div class="flex flex-col">
                       <label for="Check In Date" class="text-2xl">Check In Date   : </label>
                      <input type="text" style="width:328px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Check In Date" value="${formatTanggal(selectedItem?.checkin)}" readOnly class="text-xl"></input>
                       </div>
                       <div class="flex flex-col">
                       <label for="Check Out Date" class="text-2xl">Check Out Date   : </label>
                      <input type="text" style="width:328px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Check Out Date" value="${formatTanggal(selectedItem?.checkout)}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Nights" class="text-2xl">Nights   : </label>
                      <input type="text" style="width:328px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Nights" value="${selectedItem?.stay}" readOnly class="text-xl"></input>
                       </div>
                       </div>
                          <div class="leading-none flex space-x-4  w-full  mb-2 ">
                   <p style="font-size: 1.2rem; --tw-translate-y: -0.rem">No Of Guest</p>
                       <div class="flex flex-col">
                       <label for="Adults" class="text-2xl">Adults   : </label>
                      <input type="text" style="width:442px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Adults" value="${selectedItem?.adult}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Children" class="text-2xl">Children   : </label>
                      <input type="text" style="width:442px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Children" value="${selectedItem?.children}" readOnly class="text-xl"></input>
                       </div>
                       </div>
                
                      
                   <h2 style="font-weight: 600">PAYMENT DETAIL</h2>
                          <div class="leading-none flex space-x-4  w-full  mb-2 ">
                           <p style="font-size: 1.2rem; --tw-translate-y: -0.rem">Total Payment</p>
                       <div class="flex flex-col">
                       <label for="Subtotal" class="text-2xl">Subtotal   : </label>
                      <input type="text" style="width:285px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Subtotal" value="${formatHarga(subTutal ?? 0)}" readOnly class="text-xl"></input>
                       </div>
                       <div class="flex flex-col">
                       <label for="Deposit" class="text-2xl">Deposit   : </label>
                      <input type="text" style="width:285px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Deposit" value="${formatHarga(selectedItem?.deposit)}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Total" class="text-2xl">Total   : </label>
                      <input type="text" style="width:285px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Total" value="${formatHarga(selectedItem?.total)}" readOnly class="text-xl"></input>
                       </div>
                       </div>
                        <div class="leading-none flex space-x-4  w-full  mb-2 ">
                       <div class="flex flex-col">
                       <label for="Payment Method" class="text-2xl">Payment Method   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Payment Method" value="${selectedItem?.paymentmethod}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Card No" class="text-2xl">Card No   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Card No" value="${selectedItem?.cardNo}" readOnly class="text-xl"></input>
                       </div>
                       </div>
                         <div class="leading-none flex space-x-4  w-full  mb-2 ">
                       <div class="flex flex-col">
                       <label for="CVV" class="text-2xl">CVV   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="CVV" value="${selectedItem?.cvv}" readOnly class="text-xl"></input>
                       </div>
                      <div class="flex flex-col">
                       <label for="Exp Date" class="text-2xl">Exp Date   : </label>
                      <input type="text" style="width:500px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Exp Date" value="${formatTanggal(selectedItem?.exp)}" readOnly class="text-xl"></input>
                       </div>
                       </div>
                       <h2 style="font-weight: 600">ADDITIONAL</h2>
                        <div class="leading-none flex space-x-4  w-full  mb-2 ">
                         <div class="flex flex-col">
                         <label for="Remark" class="text-2xl">Remark   : </label>
                        <textarea style="width: 500px; height: 130px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" name="Remark" readOnly class="text-xl">
                            ${selectedItem?.regisP?.map((remarks: { detail: any; }) => remarks.detail).join(',')}
                            </textarea>

                         </div>
                        <div class="flex flex-col">
                         <label for="Front Desk Agent" class="text-2xl whitespace-nowrap">Front Desk Agent   : </label>
                        <input type="text" style="width:120px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"   name="Front Desk Agent" value="${selectedItem?.front_desk}" readOnly class="text-xl"></input>
                         </div>
                        <div style="width: 300px;text-align: center; height: 130px; padding: 12px; font-size: 1.1rem; border-bottom: 2px solid #ccc;">
                            <label for="Signature" class="text-2xl text-center">Guest Signature </label>
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
      //  const [service, setService] = useState(0);
      // const handleGuest = (id: number) => {
      //   const selectedItem = data.find((item) => item.id === id);
      //   const totalnoService = (selectedItem?.total ?? 0) * 0.79;

      //         if (selectedItem) {
      //           const serfis = selectedItem.total * 10 / 100
      //           const tax = selectedItem.total * 11 / 100
      //           // setService(serfis);
      //           document.title = `${selectedItem.id}_Guest_Bill_${selectedItem.fullname}`;
      //           const printContent = `
      //             <html>
      //               <head>
      //                 <title>${document.title}</title>
      //                 <style>
      //                   * {
      //                     margin: 0;
      //                     padding: 0;
      //                     box-sizing: border-box;
      //                   }
            
      //                   @media print {
      //                     body {
      //                       font-family: 'Times New Roman', Times, serif;
      //                       font-size: 16px;
      //                       margin: 0;
      //                       padding: 20px;
      //                       line-height: 1.2;
      //                     }
            
      //                     .table {
      //                       width: 100%;
      //                       border-collapse: collapse;
      //                       margin-top: 13%;
      //                       margin-bottom: 13%;
      //                     }
            
      //                     .table th, .table td {
      //                       padding: 8px;
      //                       border: 1px solid #ddd;
      //                     }
            
      //                     .text-center {
      //                       text-align: center;
      //                     }
            
      //                     .text-right {
      //                       text-align: right;
      //                     }
            
      //                     .highlight-row {
      //                       background-color: #f0f8ff;
      //                     }
            
      //                     .header {
      //                       margin-bottom: 20px;
      //                     }
            
      //                     .logo {
      //                       display: inline-block;
      //                       vertical-align: middle;
      //                     }
            
      //                     .table-container {
      //                       margin-top: 20px;
      //                     }
            
      //                     .footer {
      //                       margin-top: 20px;
      //                       text-align: center;
      //                     }
      //                       .justify-between {
      //                         justify-content: space-between;
      //                     }
      //                         .flex {
      //                         display: flex;
      //                     }
      //                   }
      //                 </style>
      //               </head>
      //               <body>
      //               <h2 class="text-center">GUEST BILL</h2>
      //                 <div class="header justify-between flex">
      //                 <div>
      //                 <h2>Milenial Hotel</h2>
      //                 <p>Phone: 08964656627</p>
      //                 <p>Address: Jl. Kolonel Masturi 300</p>
      //                 </div>
      //                 <img class="logo" src="/assets/image/logo.png" alt="Logo" style="width: 80px; height: 80px;" />
      //                 </div>
                      
                      
      //                 <div class="details flex">
      //                   <p style="width: 60%">Guest Name: ${selectedItem.fullname}</p>
      //                   <div>
      //                   <p>Room: ${selectedItem.room}</p>
      //                   <p>Arrival: ${formatTanggal(selectedItem.checkin)}</p>
      //                   <p>Departure: ${formatTanggal(selectedItem.checkout)}</p>
      //                   <p>Confirmation No: ${selectedItem?.id}</p>
      //                   <p>Cashier: FO</p>
      //                   <p>Invoice No: ${selectedItem.id}</p>
      //                   </div>
      //                 </div>
            
      //                 <div class="table-container">
      //                   <table class="table">
      //                     <thead>
      //                       <tr class="text-center">
      //                         <th>Date</th>
      //                         <th>Reference</th>
      //                         <th>Charges</th>
      //                         <th>Credit</th>
      //                       </tr>
      //                     </thead>
      //                     <tbody>
      //                       <tr class="text-center">
      //                         <td></td>
      //                         <td>Room</td>
      //                         <td>${formatHarga(totalnoService)}</td>
      //                         <td></td>
      //                       </tr>
      //                       <tr class="highlight-row text-center">
      //                         <td>${formatTanggal(selectedItem.checkout)}</td>
      //                         <td>Deposit</td>
      //                         <td></td>
      //                         <td>${formatHarga(selectedItem?.deposit)}</td>
      //                       </tr>
      //                       <tr class="text-center">
      //                         <td></td>
      //                         <td>Government Tax</td>
      //                         <td>${formatHarga(tax)}</td>
      //                         <td></td>
      //                       </tr>
                            
      //                       <tr class="text-center">
      //                         <td></td>
      //                         <td>Service Charge (10%)</td>
      //                         <td>${formatHarga(serfis)}</td>
      //                         <td></td>
      //                       </tr>
      //                       <tr class="text-center">
      //                         <td colspan="3" style=" font-weight: bold;">Total</td>
      //                         <td style="" class="text-center">${formatHarga(selectedItem.total)}</td>
      //                       </tr>
                            
      //                     </tbody>
      //                   </table>
      //                 </div>
            
      //                 <div class="footer" style="width:85%;margin-inline-start: 7%">
      //                   <p>
      //                     This Statement is the only receipt. I agree that I am personally liable for the above-mentioned payment 
      //                     and if the person, company, or association indicated by me as being responsible for the payment fails 
      //                     to pay, I understand that my liability shall be joint with such person, company, or association.
      //                   </p>
      //                   <div style="margin-top: 5%; text-align: left; margin-left: 2%">
      //                     <label for="Signature">Guest Signature:</label>
      //                     <div style="width: 100%; border-bottom: 1px solid #000; height: 60px;"></div>
      //                   </div>
      //                 </div>
      //               </body>
      //             </html>
      //           `;
            
      //           const iframe = document.createElement("iframe");
      //           iframe.style.position = "absolute";
      //           iframe.style.width = "0";
      //           iframe.style.height = "0";
      //           iframe.style.border = "none";
      //           document.body.appendChild(iframe);
            
      //           const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      //           if (iframeDoc) {
      //             iframeDoc.open();
      //             iframeDoc.write(printContent);
      //             iframeDoc.close();
            
      //             iframe.onload = () => {
      //               iframe.contentWindow?.focus();
      //               iframe.contentWindow?.print();
      //               document.body.removeChild(iframe);
      //             };
      //           }
      //         }
      //       };
       const [showKonten, setShowKonten] = useState(false)
        const [selectedEdit, setselectedEdit] = useState<number>();  
        const handleEditKonten = (id: number) => {
          setselectedEdit(id);
          setShowKonten(true);
          console.log("id", id)
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
    return (
        <div className="overflow-x-hidden  w-full min-h-screen">   
            <div className='bg-white'>
            {showKonten &&
        <div className="w-full max-h-[90vh]">
            <EditPersonal
              getPersonal={getIn}
          id={selectedEdit}
          isVisible={showKonten}
          onClose={() => setShowKonten(false)}
          />
          
        </div>
        }
                {/* <div className="justify-self-center">
                    {showModal && selectedDetailId !== null && (
                    <Detail
                        isVisible={showModal}
                        onClose={()=>setShowModal(false)}
                        id={selectedDetailId}
                    />
                )}
                </div> */}
                    {/* <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        
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
                            <th className="px-4 py-2">Guest FullName</th>
                            <th className="px-4 py-2">Checkin Date</th>
                            <th className="px-4 py-2">Checkout Date</th>
                            <th className="px-4 py-2">Action</th>
                            {/* <th className="px-4 py-2">Guest Bill</th> */}
                            <th className="px-4 py-2">Checkout</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {filteredData && filteredData?.length > 0 ? (
                             filteredData?.map((item: any, i: number) => (      
                                 <tr key={item.id} className={`h-[60px] justify-items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]'}`}>
                                     <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.id}</td>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item?.fullname}</td>
                                    <td className='text-[18px] text-center px-4 py-2 '>{formatTanggal(item.checkin)}</td>
                                     <td className='text-[18px] text-center px-4 py-2'>{formatTanggal(item.checkout)}</td>
                                     <td className="px-4 py-2 text-center mt-2 flex justify-self-center space-x-2">
                                  <Image className="cursor-pointer flex justify-self-center" onClick={() => handlePrint(item.id)} src={print} width={25} height={25} alt="checkin" />   
                                  <Image className="cursor-pointer flex justify-self-center" src={edit} onClick={()=>handleEditKonten(item.id)} width={25} height={25} alt="edit"/>
                                      <Image className="cursor-pointer" src={mail} onClick={() => handleEmailClick(item.id)} width={25} height={25} alt="mail" />   
                                     </td>
                                     {/* <td className="px-4 py-2 text-center justify-self-center">
                                        <Image className="cursor-pointer flex justify-self-center" onClick={()=>handleGuest(item.id)} src={receipt} width={25} height={25} alt="receipt" />
                                     </td> */}
                                     <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>
                                         <button onClick={()=>co(item.id)} className='bg-[#0E7793] px-2 py-1 rounded-md text-white'>Checkout</button>
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
        <div className="bg-[#84D2D89C] px-[2%] py-[3%] rounded-[20px] ms-[3%] flex flex-col space-y-3 w-[70%] min-h-screen">
        {showModal && selectedDetailId !== null && (
                            <Detail
                                isVisible={showModal}
                                onClose={()=>setShowModal(false)}
                                id={selectedDetailId}
                            />
                        )}
            {filteredData.length > 0 ?  (
                filteredData.map((item: any) => (    
                <div key={item.id} className="bg-white grid grid-cols-7 p-[2%] w-full h-[60px] rounded-[6px]">
                            <p className='text-[18px] ms-[1%] col-span-2 line-clamp-1 whitespace-nowrap'>{item.name}</p>
                            <p className='text-[18px] translate-x-[28%]'>{formatTanggal(item.checkin)}</p>
                            <p className='text-[18px] translate-x-[80%]'>{formatTanggal(item.checkout)}</p>
                            <p className='text-[18px] translate-x-[180px] pe-[50%] ms-[3%]'>{item.roomNo}</p>
                        <div className="flex translate-x-[125%]">
                        <Image onClick={() => handleDetail(item.id)} className="cursor-pointer" src={detail} width={25} height={25} alt="detail" />
                            {item.checkinOuts.map((checkout: { id: number }) => (
                            <Link
                                key={checkout.id}
                                href={`/Checkout/Build/${checkout.id}`}
                                className="flex relative translate-x-[80%]"
                            >
                                <Image  className="" src={checkoutIcon2} width={25} height={25} alt="checkin" />
                                </Link>
                            
                            ))}
                           </div>
                    </div>
            ))
        ) : (
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

export default PersonalRegis
