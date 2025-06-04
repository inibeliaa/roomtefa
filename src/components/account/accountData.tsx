/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import searchIcon from '../../../public/assets/icon/Search.svg'
import Swal from 'sweetalert2';
type Accountt = {
    data: {
        id: number,
        userId: number,
        name: string,
        email: string,
        no_hp: string,
        username: string
    }[]
  }
function AccountData() {
    const [data, setData] = useState<Accountt>()
    useEffect(() => {
        getAcc();
    }, []);
    async function getAcc() {
        const url = `${process.env.NEXT_PUBLIC_URL}api/users/resepsionis`;
        try {
            const res = await axios.get<Accountt>(url,
                {
                    withCredentials: true
                });
            setData(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    const [search, setSearch] = useState("");
    const filteredData = data?.data.filter(item =>
        (item.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.no_hp?.toLowerCase() || "").includes(search.toLowerCase())
      );
      
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    async function handleEdit(id: number) {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}api/users/${id}`, {
                email: email,
                username: username,
                no_hp: phone
            }, {
                withCredentials: true
            },)
            getAcc();
            console.log(res)
            console.log("data berhasil di update")
        } catch (error) {
            console.log(error)
        }
    }
    const editAcc = (id:number) => {
        Swal.fire({
          title: "Are you sure you want edit this data account?",
          showCancelButton: true,
          icon: "question",
          confirmButtonText: "Yes",
          iconColor: "#0E7793cc",
          color: "#0E7793",
          width: "35%",
          confirmButtonColor: "#0E7793"
        }).then((result) => {
          if (result.isConfirmed) {
            handleEdit(id);
            Swal.fire({
              title: "Account deleted!",
              icon: "success",
              iconColor: "#0E7793cc",
                color: "#0E7793",
              confirmButtonColor: "#0E7793",
              timer: 2000
            })
            
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
    const [editRowId, setEditRowId] = useState<number | null>(null);

    async function handleDelete(id: number) {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}api/users/${id}`, { withCredentials: true });
            console.log(res)
            getAcc();
        } catch (error) {
           console.log(error) 
        }
    }

      const deleteAcc = (id:number) => {
        Swal.fire({
          title: "Are you sure you want delete this account?",
          showCancelButton: true,
          icon: "question",
          confirmButtonText: "Yes",
          iconColor: "#0E7793cc",
          color: "#0E7793",
          width: "35%",
          confirmButtonColor: "#0E7793"
        }).then((result) => {
          if (result.isConfirmed) {
            handleDelete(id);
            Swal.fire({
              title: "Account deleted!",
              icon: "success",
              iconColor: "#0E7793cc",
                color: "#0E7793",
              confirmButtonColor: "#0E7793",
              timer: 2000
            })
            
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
        <div className=" overflow-x-hidden min-h-screen">   
                    <div  className='bg-white pb-[10%]'>
                    {/* <div className="text-[23px] font-semibold bg-gradient-to-b from-[#4CCBD3] to-[#0E7793] z-0 ms-[2%] mt-6 inline-block text-transparent bg-clip-text">
                        Guest in House Data
                </div> */}
                 <div className="relative">
                                <Image
                                src={searchIcon}
                                alt="pass icon"
                                width={22}
                                height={22}
                                className="absolute top-1/2 left-[4%]"
                              />
                                <input name="search" onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='ms-[3%] ps-[4%] w-[25%] mt-[2%] px-[1%] shadow-md h-[40px] rounded-lg font-semibold text-[#0E7793] border border-1 text-[20px] border-[#0B6279]'/>
                                </div>
                <div className="ms-12 w-full">
                    <table className=" w-9/12 table-auto mt-6">
                        <thead>
                            <tr className="bg-[#0E7793] h-[70px] text-white">
                                <th className="px-4 py-2">No</th>
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                        {filteredData && filteredData?.length > 0 ? (
                                filteredData.map((item: any, i: number) => (   
                                    <tr key={item.id} className={`h-[60px] justify-items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#84D2D89C]'}`}>
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>{item.id}</td>
                                  
                                    <td className='text-[18px] text-center px-4 py-2 whitespace-nowrap'>
                                      {editRowId === item.id ? (
                                        <input
                                          type="text"
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                                          className="text-center border rounded px-2 py-1 w-full"
                                        />
                                      ) : (
                                        item.username
                                      )}
                                    </td>
                                  
                                    <td className='text-[18px] text-center px-4 py-2'>
                                      {editRowId === item.id ? (
                                        <input
                                          type="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="text-center border rounded px-2 py-1 w-full"
                                        />
                                      ) : (
                                        item.email
                                      )}
                                    </td>
                                  
                                    <td className='text-[18px] text-center px-4 py-2'>
                                      {editRowId === item.id ? (
                                        <input
                                          type="text"
                                          value={phone}
                                          onChange={(e) => setPhone(e.target.value)}
                                          className="text-center border rounded px-2 py-1 w-full"
                                        />
                                      ) : (
                                        item.no_hp
                                      )}
                                    </td>
                                  
                                    <td className='text-[18px] items-center justify-center px-4 py-2 flex space-x-3'>
                                    {editRowId === item.id ? (
  <button
    onClick={() => {
      editAcc(item.id);
      setEditRowId(null);
      getAcc() // keluar dari mode edit
    }}
    className="bg-[#0E7793] text-white px-3 py-1 rounded"
  >
    Save
  </button>
) : (
  <button
    onClick={() => {
      setEditRowId(item.id);
      setUsername(item.username);
      setEmail(item.email);
      setPhone(item.no_hp);
    }}
    className="bg-[#0E7793] text-white px-3 py-1 rounded"
  >
    Edit
  </button>
)}

                                  
                                      <button  onClick={()=>deleteAcc(item.id)} className="bg-[#0E7793] text-white px-3 py-1 rounded">Hapus</button>
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
                </div>
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

export default AccountData
