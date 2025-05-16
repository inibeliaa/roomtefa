/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function AddAcc() {
    const url = `${process.env.NEXT_PUBLIC_URL}api/register`;
    try {
      const res = await axios.post(
        url,
        {
          username: username,
          password: password,
          email: email,
          no_hp: phone,
          role: "resepsionis",
        },
        { withCredentials: true }
      );

      Swal.fire({
        text: "Success Add Account",
        icon: "success",
        timer: 2000,
        iconColor: "#0E7793cc",
        color: "#0E7793",
        width: "25%",
        showConfirmButton: false,
        customClass: {
          container: "alert"
        }
      });
      console.log(res);
      setUsername("");
      setPassword("");
      setPhone("");
      setEmail("");
    } catch (error:any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        width: "25%",
        color: "#0E7793",
        iconColor: "#e70008",
        customClass: {
          container:"alert"
        },
        showConfirmButton: false
      });
    }
  }

  return (
    <div className="overflow-x-hidden w-full min-h-screen">
      <div className="bg-white translate-x-80 pb-[10%]">
        <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
          Add Account
        </div>
        <div className="flex ms-[10%] mt-[3%]">
          <div className="bg-gradient-to-b from-[#0E7793] via-[#0E7793] to-[#84D2D89C]  space-y-[4%] px-[3%] shadow-[3px_2px_10px_2px_#0B6279] pt-[2%] flex-col justify-center rounded-md w-[60%] pb-[8%]">
            <h1 className="text-white text-[25px] text-center font-semibold">
              Resepsionis Account
            </h1>
            <div className="flex space-x-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-[50%] h-[50px] ps-[2%] rounded-lg"
                placeholder="Username"
                name="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[50%] h-[50px] ps-[2%] rounded-lg"
                placeholder="Password"
                name="Password"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[50%] h-[50px] ps-[2%] rounded-lg"
                placeholder="Email"
                name="Email"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-[50%] h-[50px] ps-[2%] rounded-lg"
                placeholder="Phone"
                name="Phone"
              />
            </div>
            <div className="relative">
              <button
                onClick={AddAcc}
                className="absolute cursor-pointer right-3 bg-white border-1 rounded-md text-[#0E7793] border-[#0E7793] w-[20%] h-[50px]"
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
