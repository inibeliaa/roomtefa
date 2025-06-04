/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import AccountData from '@/components/account/accountData';
import AddAccount from '@/components/account/addAcount';
import { useState } from 'react';

function Page() {
   
//   const formatTanggal = (tanggal: string) => {
//     const opsiTanggal: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//     };
//     return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
//     };
  
    const [active, setActiveRegis] = useState('akun')
    return (
      <div className="overflow-x-hidden  w-full min-h-screen">     
                <div className='bg-white translate-x-80 pb-[10%]'>
                    <div className="flex">
                        <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                            Account Data
                    </div>
                </div>
                <div className="flex space-x-5 ms-[3%] mt-[1%]">
                    <button className={`text-[18px] cursor-pointer ${active === 'akun' ? 'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('akun')}>
                    Account
                    </button>
                    <button className={`text-[18px] cursor-pointer ${active === 'tambah' ?'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('tambah')}>
                    Add Account 
                    </button>
                </div>
                {active === 'akun' ? <AccountData /> : ''}
                {active === 'tambah' ? <AddAccount /> : ''}
                    </div>
      </div>
  )
}

export default Page
