/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image'
import React from 'react'
import logo from '../../public/assets/image/logo.png'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
import logoutIcon1 from '../../public/assets/icon/Denied.svg'
import logoutIcon2 from '../../public/assets/icon/Denied (1).svg'
import Swal from 'sweetalert2'
import axios from 'axios'
function Sidebar() {
  const pathname = usePathname();
  const isCheckin = pathname.startsWith("/Checkin/Build/")
  const isCheckout = pathname.startsWith("/Checkout/Build/")
  const router = useRouter();
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login kembali.");
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}api/logout`,
        {
          withCredentials: true,
        }
      );
      console.log("Logout Response:", response.data);
      localStorage.removeItem("token");
      localStorage.removeItem("username"); 
    } catch (error: any) {
      console.error("Logout error:", error.response.data.message);
    }
  };
  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      showCancelButton: true,
      icon: "question",
      confirmButtonText: "Yes",
      iconColor: "#0E7793cc",
      color: "#0E7793",
      width: "35%",
      confirmButtonColor: "#0E7793"
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire({
          title: "Log Out Success!",
          icon: "success",
          iconColor: "#0E7793cc",
          color: "#0E7793",
          timer: 2000
        })
        router.replace('/')
      } else if (result.isDenied) {
        Swal.fire({
          title: "Please Try Again!",
          icon: "warning",
          color: "#0E7793",
          iconColor: "#e70008",
          timer: 2000
        })
      }
    });
  }
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
        <ul className='flex-col space-y-[10%] mx-auto mt-[13%]'>
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
          <Link href="/Checkin" className={`flex ${pathname === "/Checkin" || pathname === "/Checkin/Build" || isCheckin ? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
              <Image
                    src={pathname === "/Checkin" || pathname === "/Checkin/Build" || isCheckin? checkinIcon2 : checkinIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="checkin icon"
                  />
            <li className={` text-[22px] font-[580px] ${pathname === "/Checkin" || pathname === "/Checkin/Build" || isCheckin ? ' text-[#0B6279]' : 'text-white'}`}>Regristation</li>
          </Link>
          <Link href="/Checkout" className={`flex ${pathname === "/Checkout" || pathname === "/Checkout/Build" || isCheckout? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
          <Image
                    src={pathname === "/Checkout" || pathname === "/Checkout/Build" || isCheckout ? checkoutIcon2 : checkoutIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="checkout icon"
                  />
            <li className={` text-[22px] font-[580px] ${pathname === "/Checkout" || pathname === "/Checkout/Build" || isCheckout ? ' text-[#0B6279]' : 'text-white'}`}>Checkout</li>
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
          <div className={`cursor-pointer flex ${pathname === "/logout" ? 'bg-white w-[270px] pt-[7px] rounded-[10px] ps-[8%] h-[45px] text-[#0B6279]' : 'ps-[8%] '}`}>
              <Image
                    src={pathname === "/logout" ? logoutIcon2 : logoutIcon1}
                    className="w-8 h-8 me-5"
                    width={30}
                    height={30}
                    alt="room icon"
                  />
            <li onClick={logout} className={` text-[22px] font-[580px] translate-y-1 ${pathname === "/logout" ? ' text-[#0B6279]' : 'text-white'}`}>Logout</li>
              </div>
            </ul>
          </nav>
    </div>
  )
}

export default Sidebar