/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import checkoutIcon2 from '../../../public/assets/icon/Hotel Check Out.svg'
// // import { useRouter } from 'next/navigation';
import axios from 'axios';
import searchIcon from '../../../public/assets/icon/Search.svg'
// import Link from 'next/link';
import print from '../../../public/assets/icon/Print.svg'
// import detail from '../../../public/assets/icon/Popup.svg'
// import Detail from '@/components/checkin/detail';
// import receipt from '../../../public/assets/icon/Receipt.svg'
import edit from '../../../public/assets/icon/Pen Squared.svg'
import Swal from 'sweetalert2';
import EditGrup from './editGrup';
import mail from '../../../public/assets/icon/Email Send.svg'
type CheckinData = {
    id: number;
    name: string;
    checkin: string;
    checkout: string;
    roomNo: string;
    checkinOuts: {
        id: number;
    }[];
  }
function GroupRegis() {
    // const router = useRouter();
    // const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any[]>([])
    // const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
    // const handleCheckout = () => {
    //     router.push("/Checkout/Build")
    // }
  useEffect(() => {
          const interval = setInterval(getIn, 1500);
          getIn();
          return () => clearInterval(interval)
      }, []);
    async function getIn() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/group`;
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
  function formatTanggalPrint(isoString:any) {
    if (!isoString) return '';
    return isoString.split('T')[0]; // ambil hanya tanggal
  }
  
    const [search, setSearch] = useState("");
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.checkin.includes(search.toLowerCase()) ||
        item.checkout.includes(search.toLowerCase())
    );
    // const handleDetail = (id: number) => {
    //     setSelectedDetailId(id);
    //     setShowModal(true);
    // };
  //   const formatHarga = (itung: number) => {
  //       return new Intl.NumberFormat("id-ID", {
  //         style: "currency",
  //         currency: "IDR",
  //       }).format(itung);
  // };
  const formatHarga = (itung: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(itung);
};
const handlePrint = (id: number) => {
  const selectedItem = data.find((item) => item.id === id); 
  
  if (selectedItem) {
    document.title = `${selectedItem.id}_Registration_${selectedItem.name}`;
    const printContent = `
      <html>
        <head>
          <title>${document.title}</title>
          <style>
            @media print {
              body {
               font-family: 'Times New Roman', Times, serif;
                        font-size: 16px;
                margin: 20px;
              }
              .form-section {
                margin-bottom: 10px;
              }
              .form-row {
                display: flex;
                margin-bottom: 5px;
              }
              .form-group {
                margin-right: 20px;
              }
              .form-group label {
                display: block;
               
                font-weight: bold;
              }
              input, textarea {
                border: 1px solid #000;
                padding: 8px;
                width: 100%;
                box-sizing: border-box;
              }
              textarea {
                min-height: 70px;
              }
              .radio-group {
                display: flex;
                align-items: center;
              }
              .radio-option {
                display: flex;
                align-items: center;
                margin-right: 15px;
              }
              .room-row {
                display: flex;
                margin-bottom: 10px;
              }
              .room-field {
                margin-right: 15px;
                width: 23%;
              }
              .preference-row {
                display: flex;
                margin-bottom: 10px;
              }
              .preference-field {
                margin-right: 15px;
                width: 30%;
              }
                
              .table-responsive {
                width: 100%;
                overflow-x: auto;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
              }
              
              table th, table td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
              }
              
              table th {
                background-color: #f8f9fa;
                font-weight: bold;
              }
              .flex {
    display: flex;
}
    .justify-between {
    justify-content: space-between;
}
            }
          </style>
        </head>
        <body>
          <div id="print-content">
            <div class="flex justify-between mb-3">
                  <img src="/assets/image/logo.png" alt="Logo" style="width: 80px; height: 80px;"/>
                  <div class="flex flex-col">
                  <h2 class="text-right">Registration Form<br/><span class="text-4xl">MILENIAL HOTEL</span></h2>
                  </div>
                  </div>
            <div class="form-section">
              <div class="form-group">
                <label for="Name of Group">Name of Group</label>
                <input type="text" id="Name of Group" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" name="Full Name" readOnly class="text-xl" value="${selectedItem.name}" readonly />
              </div>
            </div>

            <div class="form-section">
              <div class="form-row" >
                <div class="radio-option">
                  <input type="radio" id="phone" name="ReservationType" value="phone" ${selectedItem.metodeBooking === "phone" ? "checked" : ""} />
                  <label for="phone">Phone Reservation</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="letter" name="ReservationType" value="letter" ${selectedItem.metodeBooking === "letter" ? "checked" : ""} />
                  <label for="letter">Letter Reservation</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="email" name="ReservationType" value="email" ${selectedItem.metodeBooking === "email" ? "checked" : ""} />
                  <label for="email">Email Reservation</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="facsimile" name="ReservationType" value="facsimile" ${selectedItem.metodeBooking === "facsimile" ? "checked" : ""} />
                  <label for="facsimile">Facsimile Reservation</label>
                </div>
              </div>
            </div>

             <div class="form-section">
            
              <div class="form-row">
                <div class="form-group" style="width: 50%;">
                  <label for="Phone">Phone</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="Phone" value="${selectedItem.phone}" />
                </div>
                <div class="form-group" style="width: 50%;">
                  <label for="Email">Email</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="Email" value="${selectedItem.email}" />
                </div>
              </div>
            </div>

            <div class="form-section" style="width: 97%;>
              <h3>Type Of Accommodation</h3>
               <div class="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Room Type</th>
                      <th>Rate</th>
                      <th>Stay</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${selectedItem.roomRs.map((item: any) => `
                      <tr>
                        <td>${item.room}</td>
                        <td>${formatHarga(item.rate)}</td>
                        <td>${item.stay}</td>
                        <td>${formatHarga(item.sub_total)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="form-section">
              <div class="form-row">
                <div class="form-group" style="width: 34%;">
                  <label for="Total">Total (include 21% tax)</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" name="Full Name" readOnly class="text-xl" value="${formatHarga(selectedItem.total)}" id="Total" readonly />
                </div>
                <div class="form-group" style="width: 34%;">
                  <label for="dp">Deposit Received</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;"  name="Full Name" readOnly class="text-xl" value="${formatHarga(selectedItem.down)}" id="dp" />
                </div>
                <div class="form-group" style="width: 34%;">
                  <label for="Remaining">Remaining Payment</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" name="Full Name" readOnly class="text-xl" value="${formatHarga(selectedItem.remaining)}" id="Remaining" readonly />
                </div> 
              </div>
            </div>

            <div class="form-section">
              <div class="form-row">
                <label style="margin-right: 15px;">Billing Instruction Charge To:</label>
                <div class="radio-option">
                  <input type="radio" id="cash" name="paymentIn" value="cash" ${selectedItem.payment === "cash" ? "checked" : ""} />
                  <label for="cash">Cash</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="debit" name="paymentIn" value="debit" ${selectedItem.payment === "debit" ? "checked" : ""} />
                  <label for="debit">Debit</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="transfer" name="paymentIn" value="transfer" ${selectedItem.payment === "transfer" ? "checked" : ""} />
                  <label for="transfer">Transfer</label>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Number of Guest</h3>
              <div class="form-row">
                <div class="form-group" style="width: 50%;">
                  <label for="Adult">Adult</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="Adult" value="${selectedItem.adult}" />
                </div>
                <div class="form-group" style="width: 50%;">
                  <label for="Children">Children</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="Children" value="${selectedItem.children}" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="form-row">
                <div class="form-group" style="width: 50%;">
                  <h3>Arrival</h3>
                  <div class="form-group" style="width: 100%;>
                    <label for="arrival_date">Date</label>
                    <input type="date" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="arrival_date" value="${selectedItem.arrivalRegistrasi[0]?.datee}" />
                  </div>
                  <div class="form-group" style="width: 100%;>
                    <label for="arrival_flight">Flight</label>
                    <input type="text" id="arrival_flight" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.arrivalRegistrasi[0]?.flight}" />
                  </div>
                  <div class="form-group" style="width: 100%;>
                    <label for="arrival_time">Time</label>
                    <input type="time" id="arrival_time" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.arrivalRegistrasi[0]?.time}" />
                  </div>
                </div>
                <div class="form-group" style="width: 50%;">
                  <h3>Departure</h3>
                  <div class="form-group" style="width: 100%;>
                    <label for="departure_date">Date</label>
                    <input type="date" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="departure_date" value="${selectedItem.departureRegistrasi[0]?.datee}" />
                  </div>
                  <div class="form-group" style="width: 100%;>
                    <label for="departure_flight">Flight</label>
                    <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="departure_flight" value="${selectedItem.departureRegistrasi[0]?.flight}" />
                  </div>
                  <div class="form-group" style="width: 100%;>
                    <label for="departure_time">Time</label>
                    <input type="time"  style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="departure_time" value="${selectedItem.departureRegistrasi[0]?.time}" />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="form-row">
                <div class="form-group" style="width: 50%;">
                  <label for="Name of Travel">Name of Travel Agent</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.name_of_travel}" id="Name of Travel" />
                </div>
                <div class="form-group" style="width: 50%;">
                  <label for="Or Company">Or Company</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.orCompany || ''}" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="form-group">
                <label for="Address">Address</label>
                <textarea style="width:100%;height:50px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" id="Address">${selectedItem.address}</textarea>
              </div>
            </div>

            <div class="form-section">
              <div class="form-group">
                <label for="Contact">Contact</label>
                <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.contact}" id="Contact" />
              </div>
            </div>

              <div class="form-group">
                <label>Type of Accomodation</label>

              <div class="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Transfer/Tours</th>
                      <th>Account Instructions</th>
                 
                    </tr>
                  </thead>
                  <tbody>
                    ${selectedItem.makananRs.map((item: any) => `
                      <tr>
                        <td>${item.meal}</td>
                        <td>${item.tours}</td>
                        <td>${item.account}</td>
                       
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="form-section">
              <h3>Remarks</h3>
              <div class="form-group">
                <textarea style="width:100%; height:50px; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;">
                  ${selectedItem?.regis?.map((remarks: { detail: any; }) => remarks.detail).join(', ')}
                </textarea>
              </div>
            </div>

            <div class="form-section">
              <div class="form-row">
                <div class="form-group" style="width: 50%;">
                  <label for="Signature of Clerk">Signature of Clerk Agent</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.clrek}" id="Signature of Clerk" />
                </div>
                <div class="form-group" style="width: 50%;">
                  <label for="Date">Date</label>
                  <input type="date" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${formatTanggalPrint(selectedItem.dateC)}" id="Date" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="form-row">
                <div style="display: flex; align-items: center; width: 60%;">
                  <div class="radio-option">
                    <input type="radio" id="3 Months" name="followup" value="3 Months" ${selectedItem.followup === "3 Months" ? "checked" : ""} />
                    <label for="3 Months">3 Months Follow-Up</label>
                  </div>
                  <div class="radio-option">
                    <input type="radio" id="2 Months" name="followup" value="2 Months" ${selectedItem.followup === "2 Months" ? "checked" : ""} />
                    <label for="2 Months">2 Months Follow-Up</label>
                  </div>
                  <div class="radio-option">
                    <input type="radio" id="1 Months" name="followup" value="1 Months" ${selectedItem.followup === "1 Months" ? "checked" : ""} />
                    <label for="1 Months">1 Months Follow-Up</label>
                  </div>
                </div>
                <div class="form-group" style="width: 40%;">
                  <label for="Romming">Romming List Received</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.romming}" id="Romming" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="form-row">
                <div class="form-group" style="width: 33%;">
                  <label>Rack Slip / Initial Date</label>
                  <div style="display: flex;">
                    <input type="text" value="${selectedItem.rack}" style="width: 30%; border-right: none; border-radius: 4px 0 0 4px;" />
                    <input type="date" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.initialDate}" style="width: 70%; border-radius: 0 4px 4px 0;" />
                  </div>
                </div>
                <div class="form-group" style="width: 33%;">
                  <label for="Charter Date">Charter Date</label>
                  <input type="date" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${formatTanggalPrint(selectedItem.charter)}" id="Charter Date" />
                </div>
                <div class="form-group" style="width: 33%;">
                  <label for="Entered By">Front Desk Agent</label>
                  <input type="text" style="width:100%; padding: 12px; font-size: 1.1rem; border: 1px solid #ccc; border-radius: 4px;" value="${selectedItem.front_desk}" id="Entered By" />
                </div>
              </div>
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
          //  const [service, setService] = useState(0);
  //             const handleGuest = (id: number) => {
  //                 const selectedItem = data.find((item) => item.id === id);
  //                 if (selectedItem) {
  //                   const serfis = selectedItem.total * 10 / 100
  //                   const tax = selectedItem.total * 11 / 100
  //                   // setService(serfis);
  //                   document.title = `${selectedItem.selectedItem.id}_Guest_Bill_${selectedItem.selectedItem.name}`;
  //                   const printContent = `
  //                     <html>
  //                       <head>
  //                         <title>${selectedItem.document.title}</title>
  //                         <style>
  //                           * {
  //                             margin: 0;
  //                             padding: 0;
  //                             box-sizing: border-box;
  //                           }
                
  //                           @media print {
  //                             body {
  //                               font-family: 'Times New Roman', Times, serif;
  //                               font-size: 16px;
  //                               margin: 0;
  //                               padding: 20px;
  //                               line-height: 1.2;
  //                             }
                
  //                             .table {
  //                               width: 100%;
  //                               border-collapse: collapse;
  //                               margin-top: 13%;
  //                               margin-bottom: 13%;
  //                             }
                
  //                             .table th, .table td {
  //                               padding: 8px;
  //                               border: 1px solid #ddd;
  //                             }
                
  //                             .text-center {
  //                               text-align: center;
  //                             }
                
  //                             .text-right {
  //                               text-align: right;
  //                             }
                
  //                             .highlight-row {
  //                               background-color: #f0f8ff;
  //                             }
                
  //                             .header {
  //                               margin-bottom: 20px;
  //                             }
                
  //                             .logo {
  //                               display: inline-block;
  //                               vertical-align: middle;
  //                             }
                
  //                             .table-container {
  //                               margin-top: 20px;
  //                             }
                
  //                             .footer {
  //                               margin-top: 20px;
  //                               text-align: center;
  //                             }
  //                               .justify-between {
  //                                 justify-content: space-between;
  //                             }
  //                                 .flex {
  //                                 display: flex;
  //                             }
  //                           }
  //                         </style>
  //                       </head>
  //                       <body>
  //                       <h2 class="text-center">GUEST BILL</h2>
  //                         <div class="header justify-between flex">
  //                         <div>
  //                         <h2>Milenial Hotel</h2>
  //                         <p>Phone: 08964656627</p>
  //                         <p>Address: Jl. Kolonel Masturi 300</p>
  //                         </div>
  //                         <img class="logo" src="/assets/image/logo.png" alt="Logo" style="width: 80px; height: 80px;" />
  //                         </div>
                          
                          
  //                         <div class="details flex">
  //                           <p style="width: 60%">Guest Name: ${selectedItem.selectedItem?.fullname}</p>
  //                           <div>
  //                           <p>Room:   ${selectedItem.selectedItem?.roomRs?.map((item:any) => item.room).join(',')}</p>
  //                           <p>Arrival: ${selectedItem.formatTanggal(selectedItem?.arrivalGroups[0]?.datee)}</p>
  //                           <p>Departure: ${formatTanggal(selectedItem?.DepartureGroups[0]?.datee)}</p>
  //                           <p>Confirmation No: ${selectedItem?.id}</p>
  //                           <p>Cashier: FO</p>
  //                           <p>Invoice No: ${selectedItem?.id}</p>
  //                           </div>
  //                         </div>
                
  //                         <div class="table-container">
  //                           <table class="table">
  //                             <thead>
  //                               <tr class="text-center">
  //                                 <th>Date</th>
  //                                 <th>Reference</th>
  //                                 <th>Charges</th>
  //                                 <th>Credit</th>
  //                               </tr>
  //                             </thead>
  //                             <tbody>
  //                               <tr class="highlight-row text-center">
  //                                 <td>${formatTanggal(selectedItem?.DepartureGroups[0]?.datee)}</td>
  //                                 <td>Deposit</td>
  //                                 <td></td>
  //                                 <td>${formatHarga(selectedItem?.deposit)}</td>
  //                               </tr>
  //                               <tr class="text-center">
  //                                 <td></td>
  //                                 <td>Government Tax</td>
  //                                 <td>${formatHarga(tax)}</td>
  //                                 <td></td>
  //                               </tr>
                                
  //                               <tr class="text-center">
  //                                 <td></td>
  //                                 <td>Service Charge (10%)</td>
  //                                 <td>${formatHarga(serfis)}</td>
  //                                 <td></td>
  //                               </tr>
  //                               <tr class="text-center">
  //                                 <td colspan="3" style=" font-weight: bold;">Total</td>
  //                                 <td style="" class="text-center">${formatHarga(selectedItem?.total)}</td>
  //                               </tr>
                                
  //                             </tbody>
  //                           </table>
  //                         </div>
                
  //                         <div class="footer" style="width:85%;margin-inline-start: 7%">
  //                           <p>
  //                             This Statement is the only receipt. I agree that I am personally liable for the above-mentioned payment 
  //                             and if the person, company, or association indicated by me as being responsible for the payment fails 
  //                             to pay, I understand that my liability shall be joint with such person, company, or association.
  //                           </p>
  //                           <div style="margin-top: 5%; text-align: left; margin-left: 2%">
  //                             <label for="Signature">Guest Signature:</label>
  //                             <div style="width: 100%; border-bottom: 1px solid #000; height: 60px;"></div>
  //                           </div>
  //                         </div>
  //                       </body>
  //                     </html>
  //                   `;
                
  //                   const iframe = document.createElement("iframe");
  //                   iframe.style.position = "absolute";
  //                   iframe.style.width = "0";
  //                   iframe.style.height = "0";
  //                   iframe.style.border = "none";
  //                   document.body.appendChild(iframe);
                
  //                   const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  //                   if (iframeDoc) {
  //                     iframeDoc.open();
  //                     iframeDoc.write(printContent);
  //                     iframeDoc.close();
                
  //                     iframe.onload = () => {
  //                       iframe.contentWindow?.focus();
  //                       iframe.contentWindow?.print();
  //                       document.body.removeChild(iframe);
  //                     };
  //                   }
  //                 }
  // };
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

    const url = `${process.env.NEXT_PUBLIC_URL}api/coGroup/${id}`;
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
  {showKonten &&
<EditGrup
id={selectedEdit}
isVisible={showKonten}
onClose={() => setShowKonten(false)}
/>

}
                    <div  className='bg-white'>
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
                        Registration Data
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
                            <th className="px-4 py-2">Group Name</th>
                            <th className="px-4 py-2">Arrival Date</th>
                            <th className="px-4 py-2">Departure Date</th>
                            <th className="px-4 py-2">Action</th>
                            {/* <th className="px-4 py-2">Guest Bill</th> */}
                            <th className="px-4 py-2">Checkout</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {filteredData && filteredData.length > 0 ? (
                            filteredData.map((item: any, i: number) => (      
                                 <tr key={item.id} className={`h-[60px] justify-items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]'}`}>
                                     <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.id}</td>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.name}</td>
                                    <td className='text-[18px] text-center px-4 py-2 '>{formatTanggal(item.arrivalRegistrasi && item?.arrivalRegistrasi[0]?.datee)}</td>
                                     <td className='text-[18px] text-center px-4 py-2'>{formatTanggal(item.departureRegistrasi && item?.departureRegistrasi[0]?.datee)}</td>
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

export default GroupRegis
