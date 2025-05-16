/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import PersonalRegis from "@/components/Registration/personalData"
// import GroupRegis from "@/components/Registration/groupData"
import { useState } from "react"
// import PersonalInhouse from "@/components/guestinhouse/personalData"
// import GroupInhouse from "@/components/guestinhouse/groupData"
// import PersonalArrival from "@/components/expecteddeparture/personal"
// import PersonalDeparture from "@/components/expecteddeparture/personal"

import PersonalArrival from "@/components/arrival/personal"
import GroupArrival from "@/components/arrival/groupData"

// import { useRouter } from 'next/navigation';
// import detail from '../../../public/assets/icon/Popup.svg'
// import Detail from '@/components/checkin/detail';
function Page() {
    const [activeRegis, setActiveRegis] = useState('personal')
    return (
        <div className="overflow-x-hidden  w-full min-h-screen">   
                    <div  className='bg-white translate-x-80 pb-[10%]'>
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Expected Arrival     List
                </div>
                <div className="flex space-x-5 ms-[3%] mt-[1%]">
                    <button className={`text-[18px] cursor-pointer ${activeRegis === 'personal' ? 'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('personal')}>
                    Personal
                    </button>
                    <button className={`text-[18px] cursor-pointer ${activeRegis === 'group' ?'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('group')}>
                    Group 
                    </button>
                </div>
                {activeRegis === 'personal' ? <PersonalArrival /> : ''}
                {activeRegis === 'group' ? <GroupArrival /> : ''}
               </div>
      </div>
  )
}

export default Page
