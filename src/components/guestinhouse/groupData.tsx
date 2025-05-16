/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// type CheckinData = {
//     id: number,
//     userId: number,
//     name: string,
//     email: string,
//     phone: string,
//     checkin:string,
//     checkout: string,
//     stay: number,
//     bookedBy: string,
//     room:string,
//     preferency: string,
//     adult: string,
//     children: string,
//     rate: number,
//     total: number,
//     down: number,
//     remaining: number,
//     payment: string,
//     createdAt: string,
//     updatedAt:string,
//     registrasis: 
//       {
//         id: number,
//         userIn: string,
//         userOut: string,
//         id_reservasi: number,
//         fullname:string,
//         title: string,
//         address: string,
//         postal: string,
//         id_number:string,
//         itype: string,
//         email: string,
//         phone: string,
//         subtotal: number,
//         deposit: number,
//         total: number,
//         paymentmethod: string,
//         cardNo: number,
//         cvv: string,
//         exp: string,
//         front_desk: string,
//         formStatus: string,
//         createdAt: string,
//         updatedAt: string
//         remarks: {
//             detail: string;
//         }[]
//       }[]
//   }
function GroupInhouse() {
    // const router = useRouter();
    const [data, setData] = useState<any[]>([])
    // const handleCheckout = () => {
    //     router.push("/Checkout/Build")
    // }
    useEffect(() => {
        getIn();
    }, []);
    async function getIn() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/group`;
        try {
            const res = await axios.get<any[]>(url,
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
        (item.arrivalRegistrasi[0]?.datee?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.departureRegistrasi[0]?.datee?.toLowerCase() || "").includes(search.toLowerCase())
      );
      
    
    return (
        <div className="overflow-x-hidden  w-full min-h-screen">   
                    <div  className='bg-white pb-[10%]'>
                    {/* <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Guest in House Data
                </div> */}
                <div className="flex mt-[2%] ms-[3%]">
                <p className='text-[20px] font-semibold translate-y-1'>Date: </p>
                <input name="search" onChange={(e) => setSearch(e.target.value)} type="date" placeholder='Search' className='ms-[1%] px-[1%] shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'/>
                </div>
                <table className="w-[70%] table-auto mt-6 ml-[4%]">
                    <thead>
                        <tr className="bg-[#0E7793] h-[70px] text-white">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Group Name</th>
                            <th className="px-4 py-2">Arrival Date</th>
                            <th className="px-4 py-2">Departure Date</th>
                            <th className="px-4 py-2 w-[35%]">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {filteredData.length > 0 ? (
                            filteredData.map((item: any, i: number) => (   
                                 <tr key={item.id} className={`h-[60px] justify-items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]'}`}>
                                     <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.id}</td>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.name}</td>
                                    <td className='text-[18px] text-center px-4 py-2 '>{formatTanggal(item?.arrivalRegistrasi[0]?.datee)}</td>
                                     <td className='text-[18px] text-center px-4 py-2'>{formatTanggal(item?.departureRegistrasi[0]?.datee)}</td>
                                    <td className="px-4 py-2 text-center">
  {item.regis && item.regis?.map((remarks: any) => remarks.detail || '').join(',')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center ps-[35%] py-6 text-xl text-[#0E7793] opacity-50">
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

export default GroupInhouse
