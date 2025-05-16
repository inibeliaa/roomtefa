/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import GroupData from '@/components/reservation/groupData';
import PersonalBill from '@/components/guestbill/personal';
import GroupBill from '@/components/guestbill/group';
// import Calendar from '@/components/reservation/nyba';

function Page() {
    // const router = useRouter();
    // const handleAdd = () => {
    //     router.push("/Reservation/Add")
    // }
    // const handleAddGroup = () => {
    //     router.push("/Reservation/AddGroup")
    // }
    const [activeData, setactiveData] = useState('personal');
    // const handleCheckin = () => {
    //     router.push("/Checkin/Build")
    // }
//     useEffect(() => {
//         getReservasi();
//     }, []);
//     async function getReservasi() {
//         const url = `${process.env.NEXT_PUBLIC_URL}api/getReservasi`;
//         try {
//             const res = await axios.get(url,
//                 {
//                     withCredentials: true
//                 });
//             setData(res.data)
//             console.log(res.data);
//         } catch (error) {
//             console.log(error)
//         }
//     }
    
//   const formatTanggal = (tanggal: string) => {
//     const opsiTanggal: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//     };
//     return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
//     };
//                         const [search, setSearch] = useState("");
//                         const filteredData = data.filter(item => item.name &&
//                             item.name.toLowerCase().includes(search.toLowerCase()) || item.checkin &&
//                             item.checkin.includes(search.toLowerCase()) || item.checkout &&
//                             item.checkout.includes(search.toLowerCase())
//                         );

    return (
        <div className="overflow-x-hidden  w-full min-h-screen">  
                    <div  className='bg-white translate-x-80 pb-[10%]'>
                <div className="flex">
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Guest Bill Data
                    </div>
                    {/* <div className="relative">
                        <div className="space-x-[2%] flex absolute left-[500px] top-[100%] ">
                        <button onClick={handleAdd} className='w-[160px] cursor-pointer shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            + Personal
                        </button>
                        <button onClick={handleAddGroup} className='w-[120px] cursor-pointer shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            + Group
                        </button>
                        </div>
                    </div> */}
                </div>
                <div className="flex space-x-5 ms-[3%] mt-[1%]">
                    <button className={`text-[18px] cursor-pointer ${activeData === 'personal' ? 'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setactiveData('personal')}>
                    Personal
                    </button>
                    <button className={`text-[18px] cursor-pointer ${activeData === 'group' ?'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setactiveData('group')}>
                    Group 
                    </button>
                    {/* <button className={`text-[18px] cursor-pointer ${activeData === 'chart' ?'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setactiveData('chart')}>
                    Reservation Chart 
                    </button> */}
                </div>
                {activeData === 'personal' ? <PersonalBill /> : ''}
                {activeData === 'group' ? <GroupBill /> : ''}
                {/* {activeData === 'chart' ? <Calendar /> : ''} */}
        </div>
      </div>
  )
}

export default Page
