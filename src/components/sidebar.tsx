"use client"
import Image from 'next/image'
import React from 'react'
import logo from '../../public/assets/image/logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import reservasiIcon2 from '../../public/assets/icon/Reserve.svg'
import reservasiIcon1 from '../../public/assets/icon/Reserve (1).svg'
import checkinIcon1 from '../../public/assets/icon/Hotel Check In.svg'
import checkinIcon2 from '../../public/assets/icon/Hotel Check In (1).svg'
import checkoutIcon1 from '../../public/assets/icon/Hotel Check Out (1).svg'
import checkoutIcon2 from '../../public/assets/icon/Hotel Check Out.svg'
import roomIcon1 from '../../public/assets/icon/Watch TV.svg'
import roomIcon2 from '../../public/assets/icon/Watch TV (1).svg'
import historyIcon1 from '../../public/assets/icon/Order History.svg'
import historyIcon2 from '../../public/assets/icon/Order History (1).svg'
import accountIcon1 from '../../public/assets/icon/Add User Male.svg'
import accountIcon2 from '../../public/assets/icon/Add User Male (1).svg'
function Sidebar() {
  const pathname = usePathname();
  return (
      <div className='fixed top-0 left-0 z-50'>
          <nav className='bg-gradient-to-b from-[#64C9E3] via-[#0E7793] to-[#0B6279] w-80 h-screen flex flex-col'>
            <Image
            src={logo}
            className="w-[90px] h-[90px] mt-[10%] mx-auto"
            width={150}
            height={150}
            alt="logo"
        />
        <ul className='flex-col space-y-[12%] mx-auto mt-[13%]'>
          <Link href="/Reservation" className={`flex ${pathname === "/Reservation" || pathname === "/Reservation/Add"? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
              <Image
                    src={pathname === "/Reservation" || pathname === "/Reservation/Add"? reservasiIcon2 : reservasiIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="reservation icon"
                  />
            <li className={` text-[22px] font-[580px] ${pathname === "/Reservation" || pathname === "/Reservation/Add" ? 'text-[#0B6279]' : 'text-white'}`}>Reservation</li>
              </Link>
          <Link href="/Checkin" className={`flex ${pathname === "/Checkin" || pathname === "/Checkin/Build" ? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
              <Image
                    src={pathname === "/Checkin" || pathname === "/Checkin/Build" ? checkinIcon2 : checkinIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="checkin icon"
                  />
            <li className={` text-[22px] font-[580px] ${pathname === "/Checkin" || pathname === "/Checkin/Build" ? ' text-[#0B6279]' : 'text-white'}`}>Checkin</li>
          </Link>
          <Link href="/Checkout" className={`flex ${pathname === "/Checkout" || pathname === "/Checkout/Build" ? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
          <Image
                    src={pathname === "/Checkout" || pathname === "/Checkout/Build" ? checkoutIcon2 : checkoutIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="checkout icon"
                  />
            <li className={` text-[22px] font-[580px] ${pathname === "/Checkout" || pathname === "/Checkout/Build" ? ' text-[#0B6279]' : 'text-white'}`}>Checkout</li>
          </Link>
          <Link href="/Room" className={`flex ${pathname === "/Room" || pathname === "/Room/Edit" ? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
              <Image
                    src={pathname === "/Room" || pathname === "/Room/Edit" ? roomIcon2 : roomIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="room icon"
                  />
            <li className={` whitespace-nowrap text-[22px] font-[580px] ${pathname === "/Room" || pathname === "/Room/Edit" ? ' text-[#0B6279]' : 'text-white'}`}>Room Status</li>
          </Link>
          <Link href="/History" className={`flex ${pathname === "/History" ? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
              <Image
                    src={pathname === "/History" ? historyIcon2 : historyIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="room icon"
                  />
            <li className={` text-[22px] font-[580px] ${pathname === "/History" ? ' text-[#0B6279]' : 'text-white'}`}>History</li>
          </Link>
          <Link href="/Account" className={`flex ${pathname === "/Account" ? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
              <Image
                    src={pathname === "/Account" ? accountIcon2 : accountIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="room icon"
                  />
            <li className={` text-[22px] font-[580px] translate-y-1 ${pathname === "/Account" ? ' text-[#0B6279]' : 'text-white'}`}>Add Account</li>
              </Link>
            </ul>
          </nav>
    </div>
  )
}

export default Sidebar