"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [reservedDates, setReservedDates] = useState<
    { dates: string[] }[]
  >([]);

  // useEffect(() => {
  //   const roomReservations = [
  //     {
  //       room: "101",
  //       dates: ["2024-12-01", "2024-12-05", "2024-12-10"],
  //     },
  //     {
  //       room: "102",
  //       dates: ["2024-12-05", "2024-12-06", "2024-12-20"],
  //     },
  //     {
  //       room: "103",
  //       dates: ["2024-12-15", "2024-12-25"],
  //     },
  //     {
  //       room: "104",
  //       dates: ["2024-12-15", "2024-12-25"],
  //     },
  //     {
  //       room: "105",
  //       dates: ["2024-12-15", "2024-12-25"],
  //     },
  //     {
  //       room: "106",
  //       dates: ["2024-12-15", "2024-12-25"],
  //     },
  //   ];
  //   setReservedDates(roomReservations);
  // }, [currentMonth, currentYear]);
  useEffect(() => {
    
    ChartRoom();
  }, [currentMonth, currentYear]);
 
  async function ChartRoom() {
    const url = `${process.env.NEXT_PUBLIC_URL}api/getRoom`
    try {
      const res = await axios.get(
        url,
        {
          withCredentials: true
        }
      )
      setReservedDates(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  // async function ChartDate() {
  //   const url = `${process.env.NEXT_PUBLIC_URL}api/getReservasi`
  //   try {
  //     const res = await axios.get(
  //       url,
  //       {
  //         withCredentials: true
  //       }
  //     )
  //     setReservedDates(res.data)
  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };


  const renderTable = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);

    return reservedDates.map((reservation, id) => (
      <tr key={id} className="border">
        <td className="p-1 w-[5%] text-center border text-sm">101</td>
        {Array.from({ length: totalDays }, (_, day) => {
          const dateKey = `${currentYear}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${(day + 1).toString().padStart(2, "0")}`;
          const isReserved = reservation.dates.includes(dateKey);
          return (
            <td
              key={dateKey}
              className={`p-1 w-[12px] h-[12px] text-center border text-xs ${
                isReserved ? "bg-[#6dcbe2]" : "bg-white"
              }`}
            >
            </td>
          );
        })}
      </tr>
    ));
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="p-4 ms-[5%] mt-[2%]">
      <div className="flex ms-[25%] space-x-[5%] mb-4">
        <button
          className="px-2 py-1 bg-[#0B6279] text-white rounded hover:bg-gray-400"
          onClick={goToPreviousMonth}
        >
          &lt;
        </button>
        <h1 className="text-sm translate-y-2 font-bold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h1>
        <button
          className="px-2 py-1 bg-[#0B6279] text-white rounded hover:bg-gray-400"
          onClick={goToNextMonth}
        >
          &gt;
        </button>
      </div>
      <table className="table-auto border-collapse border w-[70%] text-xs">
        <thead>
          <tr className="border border-[#64C9E3] bg-[#1e99bb]">
            <th className="p-1 text-center  w-[100px] text-xs border">Room</th>
            {Array.from({ length: daysInMonth(currentYear, currentMonth) }, (_, i) => (
              <th key={i} className="p-1 w-[20px] h-[20px] text-center border text-xs">
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
