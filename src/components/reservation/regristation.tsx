/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
type Printt = {
    id: number
    isVisible: boolean;
    onClose: (isClose: boolean) => void;
}
type PrintData = {
    name: string;
    checkin: string;
    checkout: string;
    roomNo: string;
    checkinOuts: {
        id: number;
        others: {
            id: number;
            detail: string;
            price: number;
        }[];
        totalCharge: number;
        paymentOut: string;
    }[]
}
const Print: React.FC<Printt> = ({ id, isVisible, onClose }) => {
    if (!isVisible) return null;
    useEffect(() => {
        getCo();
    }, [id])
    const [data, setData] = useState<PrintData>();
    async function getCo() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/One/${id}`
        try {
            const res = await axios.get<PrintData>(
                url,
                {
                    withCredentials: true
                }
            )
            setData(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePrint = () => {
        const printContent = document.querySelector('#print-popup-content .popup-body')?.innerHTML;
        
        if (printContent) {
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
                iframeDoc.open();
                iframeDoc.write(`
                    <html>
                        <head>
                            <title>Print</title>
                            <style>
                              body {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    margin: 0;
                                    font-family: Arial, sans-serif;
                                    padding: 5px;
                                    line-height: 1.4;
                                    font-size: 16px;
                                    font-family: 'Courier New', Courier, monospace;
                                }
                                .content {
                                    max-width: 70%;
                                    padding: 0;
                                    margin: 0;
                                }
                                .text-lg {
                                    font-size: 1.125rem;
                                    margin-bottom: 8px;
                                }
                                .hr {
                                 border-top: 1px solid #000;
                                }
                                .pay {
                                transform: translateX(48%);
                                white-space: nowrap;
                                overflow: hidden; 
                                text-overflow: ellipsis;
                                }
                                .text-center{
                                text-align: center;
                                margin-top: 10%
                                }
                            </style>
                        </head>
                        <body>
                            <div class="content">
                            <h1>HOTEL SMKN 1 CISARUA</h1>
                            <hr/>
                                ${printContent}
                                <hr/>
                                <p class="text-center">Thank You For Coming</p>
                            </div>
                        </body>
                    </html>
                `);
                iframeDoc.close();

                iframe.onload = () => {
                    iframe.contentWindow?.focus();
                    iframe.contentWindow?.print();
                    document.body.removeChild(iframe);
                };
            }
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
    const formatHarga = (itung: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(itung);
    };
  return (
      <div className='fixed inset-0 z-50 flex ps-[25%] items-center '>
                  {data && (        
          <div  id="print-popup-content" className="popup-content w-[35%] pb-[5%] bg-white rounded-xl">
              <div className="flex-col space-y-[5%] ps-[2%] py-[10%]">
                      <p className='text-lg font-bold justify-self-center'> Checkout Data Customer</p>
                      <div className="mx-[8%] popup-body space-y-[3%] flex-col">
                          <p className="text-sm font-light">Guest Name     :<span>{data.name}</span></p>
                          <p className="text-sm font-light">Checkin Date   :<span>{formatTanggal(data.checkin)}</span></p>
                          <p className="text-sm font-light">Checkout Date :<span>{formatTanggal(data.checkout)}</span></p>
                          <p className="text-sm font-light">No of Room :<span>{data.roomNo}</span></p>
                          <p className="text-sm font-light">Other Charge:  </p>
                              {/* {data.checkinOuts && data.checkinOuts.length > 0 ? (
        data.checkinOuts.map((checkout, index) => (
            checkout.others && checkout.others.length > 0 ? (
                checkout.others.map((item: any, idx: number) => (
                    <span key={idx} className="block">
                        {item.detail} : {item.price}
                    </span>
                ))
            ) : (
                <span key={index} className="block">No additional charges</span>
            )
        ))
    ) : (
        <span>No checkinOuts data</span>
    )} */}
                              {data.checkinOuts[0] && data.checkinOuts[0].others.length > 0 ? (
                                  data.checkinOuts[0].others.map((items) => (
                                      <p  className="text-sm font-light" key={items.id}>
                                          - {items.detail} : {formatHarga(items.price)}
                                      </p>
                                  ))
                              ) : (
                                  <p>No Remarks</p>
                              )}

                          <div className="popup-body hr">
                              <div className="pay space-y-2">
                                  <p className="text-sm font-light">Payment Method :<span> {data.checkinOuts[0].paymentOut}</span></p>
                                  <p className="text-sm font-light">Total :<span> {formatHarga(data.checkinOuts[0].totalCharge)}</span></p>
                              </div>
                          </div>
                      </div>
                  </div><div className="relative pt-[5%]">
                          <div className="absolute right-8 bottom-0  whitespace-nowrap">
                              <button onClick={() => onClose(true)} className='bg-[#84D2D89C] cursor-pointer me-[8%] px-2 py-1 rounded-md'>
                                  Close
                              </button>
                              <button onClick={handlePrint} className='bg-[#84D2D89C] cursor-pointer px-2 py-1 rounded-lg'>
                                  Print
                              </button>
                          </div>
                      </div>
          </div>
                          )}
    </div>
  )
}

export default Print