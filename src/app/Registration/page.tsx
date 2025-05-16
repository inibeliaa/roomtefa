/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import PersonalRegis from "@/components/regristation/personalData"
import GroupRegis from "@/components/regristation/groupData"
import { useState } from "react"
import { useRouter } from "next/navigation"

// import { useRouter } from 'next/navigation';
// import detail from '../../../public/assets/icon/Popup.svg'
// import Detail from '@/components/checkin/detail';
function Page() {
    const [activeRegis, setActiveRegis] = useState('personal')

    const router = useRouter()
    const handleAdd = () => {
        router.push("/Registration/Build/null")
    }
    const handleAddGroup = () => {
        router.push("/Registration/BuildGroup/null")
    }
    return (
        <div className="overflow-x-hidden  w-full min-h-screen">   
                    <div  className='bg-white translate-x-80 pb-[10%]'>
                    <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Registration Data
                </div>
                <div className="relative w-[70%]">
                        <div className="space-x-[2%] flex absolute right-0 top-[100%] ">
                        <button onClick={handleAdd} className='w-[160px] cursor-pointer shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            + Personal
                        </button>
                        <button onClick={handleAddGroup} className='w-[120px] cursor-pointer shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'>
                            + Group
                        </button>
                        </div>
                    </div>
                <div className="flex space-x-5 ms-[3%] mt-[1%]">
                    <button className={`text-[18px] cursor-pointer ${activeRegis === 'personal' ? 'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('personal')}>
                    Personal
                    </button>
                    <button className={`text-[18px] cursor-pointer ${activeRegis === 'group' ?'text-white font-[580] rounded-sm px-[8px] py-[2px] bg-[#64C9E3]' : ''}`} onClick={() => setActiveRegis('group')}>
                    Group 
                    </button>
                </div>
                {activeRegis === 'personal' ? <PersonalRegis /> : ''}
                {activeRegis === 'group' ? <GroupRegis /> : ''}
               </div>
      </div>
  )
}

export default Page
