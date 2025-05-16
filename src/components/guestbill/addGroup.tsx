/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Bill = {
  isVisible: boolean;
  onClose: (isClose: boolean) => void;
  id: number | undefined;
};

type getOut = {
  name: string;
    id: number;
    total: number;
    remaining: number;
    down: number;
    createdAt: any;

    roomRs: {
        room: string;

    }[];
    checkin: string;
    checkout: string;
    statusBill: string;
  bills: {
    detail: string;
    price: number;
  }[];
  arrivalRegistrasi: {
    datee: string;
    time: string;
    flight: string
  }[];
  departureRegistrasi: {
    datee: string;
    time: string;
    flight: string
  }[]
}

type Row = { detail: string; price: number; };
const BillGroup: React.FC<Bill> = ({ isVisible, onClose, id }) => {
  if (!isVisible) return null;

  const [data, setData] = useState<getOut>();
  const [total, setTotal] = useState(0);
  const [down, setDown] = useState(0);
  const [roomCharge, setRoomCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [government, setGovernment] = useState(0);
  const [remaiing, setRemaining] = useState(0);

  useEffect(() => {
    if (id !== undefined) {
      getOut();
    }
  }, [id]);

//   const serfisCalculate = total * 10 / 100
//   const taxCalculate = total * 11 / 100
//     const calculateRoom = total * 0.79;
  const getOut = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}api/oneGroup/${id}`;
    try {
        const res = await axios.get<getOut>(url, { withCredentials: true });
        const totals = res.data.total;
        // const deposit = res.data.deposit;
    
        const serviceCharge = totals * 0.10;
        const governmentTax = totals * 0.11;
        const room = totals * 0.79;

      setData(res.data);
      setTotal(res.data.total);
        setDown(res.data.down);
        setRows(res.data.bills)
      setRoomCharge(room);
      setTax(governmentTax);           // make sure your API provides 'tax'
        setGovernment(serviceCharge);
      setRemaining(res.data.remaining)  // make sure your API provides 'gov'
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTanggal = (tanggal: string) => {
    const opsiTanggal: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
};

  const [rows, setRows] = useState<Row[]>([
    { detail: '', price: 0 },
  ]);
  
//   const handleAddRow = () => {
//     setRows([...rows, { detail: '', price: 0 }]);
//   };
  
//   const handleChangeField = (index: number, field: keyof Row, value: string) => {
//     const updated = [...rows];
//     if (field === 'price') {
//       updated[index][field] = parseFloat(value);
//     } else {
//       updated[index][field] = value;
//     }
  
//     setRows(updated);
    //   };
    
    const handleAddRow = () => {
        setRows([
          ...rows,
          {
              detail: "",
              price: 0
          }
        ]);
      };
      const handleChangeField = (e: any, i: number) => {
        const { name, value } = e.target;
        const onChange: any = [...rows];
        onChange[i][name] = value;
        setRows(onChange);
      };
      // const formatDate = (date: string) => {
      //   const [day, month, year] = date.split(" ");
      //   return `${year}-${month}-${day}`;
      // };
        const handleDelete = (i: number) => {
            const deleteRows = [...rows];
            deleteRows.splice(i, 1);
            setRows(deleteRows);
    };
    
            const [displayRates, setDisplayRates] = useState<{[key: number]: string}>({});
             
                const handleChangeFieldRows = (
                  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
                  i: number
              ) => {
                const name = e.target.name as keyof Row;
                const value = e.target.value;
              
                  
                  if (name === "price") {
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
                      const updateRows = [...rows];
                      updateRows[i].price = numberValue;
                      setRows(updateRows);
                      return;
                  }
                  
                  // Untuk field lainnya
                  const updateRows = [...rows];
                  updateRows[i][name] = value;
                  setRows(updateRows);
              };
        
    async function editBill() {
        const urlPost = `${process.env.NEXT_PUBLIC_URL}api/bill`;
        const urlPut = `${process.env.NEXT_PUBLIC_URL}api/editBill`;
      
        try {
          let res;
          if (data?.statusBill === "selesai") {
            res = await axios.put(urlPut, {
              id_registrasi_group: id,
              bill: rows
            }, {
              withCredentials: true
            });
          } else {
            res = await axios.post(urlPost, {
              id_registrasi_group: id,
              bill: rows
            }, {
              withCredentials: true
            });
          }
      
          await getOut();      
            console.log(res.data)
            console.log("berhasil")
        } catch (error) {
            console.log(error)
        }
    }

    const [combinedTotal, setCombinedTotal] = useState(0);
    useEffect(() => {
        const rowTotal = rows.reduce((acc, row) => acc + Number(row.price), 0);
        setCombinedTotal(total + rowTotal);
      }, [rows, total]);
      
      const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
  }; 
  const rowsHtml = rows.map((row, i) => `
  <tr class="text-center">
    <td></td>
    <td>${row.detail || ''}</td>
    <td>${formatHarga(row.price || 0)}</td>
    <td></td>
  </tr>
`).join('');

      const handleGuest = (id: number) => {
                            //   const data = data?.find((item) => item.id === id);
                              if (data) {
                                const serfis = data.total * 10 / 100
                                //   const tax = data.total * 11 / 100
                                  const roomCharge = data.total * 0.79;
                                // setService(serfis);
                                document.title = `${data.id}_Guest_Bill_${data.name}`;
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
                               <p style="width: 60%">Guest Name: ${data?.name}</p>
                               <div>
                               <p>Room:   ${data?.roomRs?.map((item:any) => item.room).join(',')}</p>
                               <p>Arrival: ${formatTanggal(data?.arrivalRegistrasi[0]?.datee)}</p>
                               <p>Departure: ${formatTanggal(data?.departureRegistrasi[0]?.datee)}</p>
                               <p>Confirmation No: ${data?.id}</p>
                               <p>Cashier: FO</p>
                               <p>Invoice No: ${data?.id}</p>
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
                                              <td>${formatTanggal(data?.checkout)}</td>
                                              <td>Room Charges</td>
                                              <td></td>
                                              <td>${formatHarga(roomCharge)}</td>
                                            </tr>
                                            <tr class="highlight-row text-center">
                                              <td>${formatTanggal(data?.checkout)}</td>
                                              <td>Deposit</td>
                                              <td></td>
                                              <td>${formatHarga(down)}</td>
                                            </tr>
                                            <tr class="text-center">
                                              <td></td>
                                              <td>Government Tax (11%)</td>
                                              <td>${formatHarga(tax)}</td>
                                              <td></td>
                                            </tr>
                                            
                                            <tr class="text-center">
                                              <td></td>
                                              <td>Service Charge (10%)</td>
                                              <td>${formatHarga(government)}</td>
                                              <td></td>
                                            </tr>
                                            ${rowsHtml}
                                            <tr class="text-center">
                                              <td colspan="3" style=" font-weight: bold;">Total</td>
                                              <td style="" class="text-center">${formatHarga(combinedTotal)}</td>
                                            </tr>

                                             <tr class="text-center">
                                              <td colspan="3" style=" font-weight: bold;">Remaining</td>
                                              <td style="" class="text-center">${formatHarga(combinedTotal - down)}</td>
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
  
     useEffect(() => {
          const target = document.getElementById("bill-group"); // ganti sesuai layout kamu
          if (!target) return;
        
          if (isVisible) {
            target.style.overflow = "hidden";
          } else {
            target.style.overflow = "auto";
          }
        
          return () => {
            target.style.overflow = "auto";
          };
        }, [isVisible]);
  return (
    <div id="bill-group" className="fixed inset-0 z-50 h-screen flex py-10 bg-[#5A72A0]/50 backdrop-blur-sm">
    <div className="w-[70%] bg-[#84D2D89C] ms-11 max-h-[90vh] px-[3%] py-[3%] border-2 border-[#5A72A0] rounded-md flex flex-col overflow-hidden">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => onClose(true)}
              className="w-[120px] h-[40px] bg-white shadow-md rounded-lg font-semibold text-[#0E7793] border border-[#0B6279] text-[20px]"
            >
              Cancel
            </button>
          </div>
      
          <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-150px)]">
            <table className="table-auto w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-100 text-center text-gray-700">
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Reference</th>
                    <th className="border px-4 py-2">Charges</th>
                <th className="border px-4 py-2">Credit</th>
                <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody className="text-center">
                <tr>
                    <td className="border px-4 py-2">{formatTanggal(data?.createdAt)}</td>
                    <td className="border px-4 py-2">Room Charges</td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2 text-center">
                    {formatHarga(roomCharge)}
                      
                </td>
                <td></td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">{formatTanggal(data?.createdAt)}</td>
                    <td className="border px-4 py-2">Deposit</td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2 text-center">
                     {formatHarga(down)}
                      
                </td>
                <td></td>
                </tr>
                <tr>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2">Government Tax (11%)</td>
                    <td className="border px-4 py-2 text-center">
                    {formatHarga(tax)}
                     
                    </td>
                <td className="border px-4 py-2"></td>
                <td></td>
                </tr>
                <tr>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2">Service Charge (10%)</td>
                    <td className="border px-4 py-2 text-center">
                 {formatHarga(government)}
                      
                    </td>
                <td className="border px-4 py-2"></td>
                <td></td>
                              </tr>
                              {rows.map((row, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">
                {/* <input
                  type="date"
                  className="text-center input input-bordered w-full"
                //   value={row.date}
                //   onChange={(e) => handleChangeField(index, 'date', e.target.value)}
                /> */}
              </td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  className="text-center input input-bordered w-full"
                  name='detail'
                  value={row.detail}
                  onChange={(e) => handleChangeFieldRows(e, i)}
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  name='price'
                  className=" input text-center input-bordered w-full"
                  value={displayRates[i] || (row?.price ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                }).format(row.price) : "")}
                  onChange={(e) => handleChangeFieldRows(e, i)}
                />
              </td>
              <td className="border px-2 py-1">
               
                                      </td>
                                      <td className='px-4'>
                                          
              <button onClick={() => handleDelete(i)} className='cursor-pointer rounded-md font-bold bg-white w-[5%] h-[50px]'>
                    x
                  </button>
                                      </td>
            </tr>
                              ))}
                            
                            <tr className="font-bold bg-gray-100">
  <td colSpan={3} className="border px-4 py-2 text-right">Total</td>
  <td className="border px-4 py-2">
   {formatHarga(combinedTotal)}
  </td>
</tr>

<tr className="font-bold bg-gray-100">
  <td colSpan={3} className="border px-4 py-2 text-right">Remaining</td>
  <td className="border px-4 py-2">
    {formatHarga(combinedTotal - down)}
     
  </td>
</tr>

                </tbody>
            </table>
            </div>

            <div className=" flex justify-end mt-5 space-x-3">
        <button
          onClick={handleAddRow}
          className="bg-[#0E7793] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0B6279]"
        >
          + Add Charge
        </button>
            <button
              onClick={() => handleGuest(data?.id ?? 0)}
              className="bg-[#0E7793] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0B6279]"
            >
              Print
                      </button>
                      <button
              onClick={editBill}
              className="bg-[#0E7793] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0B6279]"
            >
                          {data?.statusBill === "selesai" ? "Edit Bill" : "Add Bill"}
            </button>
      </div>
        </div>
      </div>
  );
};

export default BillGroup;
