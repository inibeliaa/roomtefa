/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import userIcon from '../../../public/assets/icon/Customer.svg'
import passIcon from '../../../public/assets/icon/Lock.svg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
// import Loading from '../loading/loadingLogin'

function Login() {
  const [show, setShow] = useState(false);
  const handleClickShow = () => {
    setShow(!show);
  };
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter()
  // const [isLoading, setIsLoading] = useState(false);
  async function Login() {
    // setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_URL}api/login`
    try {
      const res = await axios.post(
        url,
        {
          username: username,
          password: password
        },
        { withCredentials: true }
      );
      Swal.fire({
        text: "Login Success",
        icon: "success",
        timer: 1500,
        iconColor: "#0E7793cc",
        color: "#0E7793",
        width: "25%",
        showConfirmButton: false,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);
      const userDataHotel = res.data.user;
      const token = res.data.token;

      if (!userDataHotel || !token) {
         console.error("User data atau token tidak ditemukan!", res.data);
         return;
      }

      if (!userDataHotel.role) {
         console.error("Role tidak ditemukan di userDataHotel!", userDataHotel);
         return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userDataHotel", JSON.stringify(userDataHotel));
      
      const userRole = userDataHotel.role
      if (userRole === "resepsionis") {   
        router.push("/Reservation")
      } else if (userRole === "admin") {
        router.push("/GuestInHouse")
      } else {
        return null;
      }
      console.log(res);
      setUsername("");
      setPassword("");
    } catch (error:any) {
      // setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 2000,
        text: error.response.data.message,
        width: "25%",
        color: "#0E7793",
        iconColor: "#e70008",
        showConfirmButton: false
      });
      setUsername("");
      setPassword("")
      console.log(error)
      // if (!username) {
      //   alert("Wrong username!")
      // } else if (!password){
      //   alert("Wrong password!")
      // } else {
        
      // }
    }
  }
  return (
    <div className='bg-white h-screen flex items-center justify-center'>
      <div className="bg-white w-[70%] h-[90%] flex">
        <div className="justify-center space-y-[5%] flex flex-col items-center bg-white shadow-[2px_6px_10px_1px] shadow-black/40 translate-x-[5%] rounded-lg z-50 w-[48%] mt-[4%] h-[88%] ">
          <h1 className='text-[30px] font-semibold text-[#0b6279]'>Log In</h1>
          <div className='relative'>
            <Image
                src={userIcon}
                alt="user icon"
                width={22}
                height={22}
                className="absolute top-1/2 left-4 -translate-y-1/2"
              />
            <input required type="text" name='username' onChange={(e) => setUsername((e.target as HTMLInputElement).value)} placeholder='Username' className='ps-12 text-black bg-[#DEF1F1]/80 p-4' />
          </div>
          <div className='relative'>
            <Image
                src={passIcon}
                alt="pass icon"
                width={22}
                height={22}
                className="absolute top-1/2 left-4 -translate-y-1/2"
              />
            <input required type={show ? "text" : "password"} name='password'  onChange={(e) => setPassword((e.target as HTMLInputElement).value)} placeholder='Password' className='ps-12 text-black bg-[#DEF1F1]/80 p-4' />
            <p
                className="cursor-pointer text-[#64c9e3] absolute right-4  top-5"
                onClick={handleClickShow}
              >
                {show ? (
                  <FaEye className="w-[22px] h-[22px]" />
                ) : (
                  <FaEyeSlash className="w-[22px] h-[22px]" />
                )}
              </p>
          </div>
          <button onClick={Login} className='cursor-pointer w-[40%] translate-y-[45%] font-medium bg-gradient-to-b from-[#64c9e3] via-[#0e7793] to-[#0b6279] text-white h-[10%] rounded-full bg-gray-300 bg-opacity-45'>
          {/* {isLoading ? "Loading..." : "Masuk"} */} Log In
            </button>
            {/* {isLoading && <Loading />} */}
        </div>
        <div className="flex flex-col -translate-x-[5%] w-[52%] rounded-lg justify-center items-center shadow-[0_2px_10px_1px] shadow-black/40 h-[100%] bg-cover" style={{ backgroundImage: "url('/assets/image/login.png')" }}>
          <h1 className='font-semibold text-white/80 text-[35px] w-[60%]'>Welcome to Milenial Hotel System <span className=''><br />SMKN 1 Cisarua</span></h1> 
        </div>
      </div>
    </div>
  )
}

export default Login
