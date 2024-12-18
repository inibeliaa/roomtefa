/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
type popDetail = {
    id: number;
    isVisible: boolean;
    onClose: (isClose: boolean) => void;
}
type Detail = {
    name: string;
    checkin: string;
    checkout: string;
    roomNo: string;
    remarks: {
        id: number;
        detail: string;
        price: number;
    }[];
    checkinOuts: {
        id: number;
        others: {
            detail: string;
            price: number;
        }[];
        wakeUp: string;
        total: number;
        totalRoom: number;
        totalRemarks: number;
        paymentIn: string;
    }[];

}
const formatHarga = (itung: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(itung);
};
const Detail: React.FC<popDetail> = ({ id, isVisible, onClose }) => {
    if (!isVisible) return null;
    const [data, setData] = useState<Detail>();
    useEffect(() => {
        getDetail();
    }, [])
    async function getDetail() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/One/${id}`
        try {
            const res = await axios.get<Detail>(
                url,
                {
                    withCredentials: true
                }
            )
            setData(res.data)
            // setHarga(res.data.harga)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    // const router = useRouter()
    // const handleClose = () => {
    //     onClose(true);
    //     router.replace("/Reservation")
    // }
    const formatTanggal = (tanggal: string) => {
        const opsiTanggal: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
    };
    const formatTanggalWaktu = (tanggal: string) => {
        const date = new Date(tanggal);
        const waktu = date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: undefined,
            hour12: false,
        });
        const waktuFormatted = waktu.replace('.', ':');
        const tanggall = date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
        return `${waktuFormatted} on ${tanggall}`;
    };
  return (
    <div className='fixed inset-0 z-50 flex ps-[25%] items-center '>
              {data && (              
          <div className="w-[30%] pb-[5%] pt-[3%] px-[2%] bg-white rounded-md">
              <h1 className='font-bold text-[20px] text-center'>Detail Checkin Guest</h1>
              <div className="mx-[8%] mt-[3%] space-y-[3%] flex-col">
              <p className="text-sm font-light">Guest Name     :<span>{data.name}</span></p>
              <p className="text-sm font-light">Checkin Date   :<span>{formatTanggal(data.checkin)}</span></p>
              <p className="text-sm font-light">Checkout Date :<span>{formatTanggal(data.checkout)}</span></p>
                      <p className="text-sm font-light">No of Room :<span>{data.roomNo}</span></p>
                      <p className="text-sm font-light whitespace-nowrap">Wake Up Call :<span>{formatTanggalWaktu(data.checkinOuts[0].wakeUp)}</span></p>
                      <p className="text-sm font-light">Remarks:
                          {data.remarks.length > 0 ?  (
                              data.remarks.map((items) => (
                                <span key={items.id} className="block">
                               - {items.detail} : {formatHarga(items.price)}
                                </span>  
                              ))
                          ) : (
                             <p>No Remarks</p>     
                            )}
                                 
                           
              </p>
                <div className="">
                  <div className="pay space-y-2">
                              <p className="text-sm font-light">Payment Method :<span> {data.checkinOuts[0].paymentIn}</span></p>
                              <p className="text-sm font-light">Total Room :<span> {formatHarga(data.checkinOuts[0].totalRoom)}</span></p>
                              <p className="text-sm font-light">Total Remarks :<span> {formatHarga(data.checkinOuts[0].totalRemarks)}</span></p>
                      <p className="text-sm font-light">Total :<span> {formatHarga(data.checkinOuts[0].total)}</span></p>
                  </div>
              </div>
          </div>
              <div className="flex relative mt-[8%] whitespace-nowrap"> 
                  <div className="absolute right-1">
                    <button  onClick={()=> onClose(true)} className='me-[5%] cursor-pointer py-1 px-2 rounded-md top-2 bg-[#84D2D89C]'>
                        Ok
                    </button>
                  </div>  
              </div>
          </div> 
              )}
    </div>
  )
}

export default Detail