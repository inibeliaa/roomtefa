"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [reservedDates, setReservedDates] = useState<{
    room: string;
    dates: string[];
  }[]>([]);

  // Memformat tanggal menjadi array dengan format YYYY-MM-DD
  const formatTanggals = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Log untuk memeriksa format tanggal yang diterima
    console.log('Start date:', startDate, 'End date:', endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid dates:", startDate, endDate);
      return [];
    }

    const dateArray = [];
    while (start <= end) {
      // Format tanggal hanya dengan bagian YYYY-MM-DD (tanpa waktu)
      dateArray.push(start.toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }

    return dateArray;
  };

  // Mendapatkan data tanggal dari API
  useEffect(() => {
    getDataTanggal();
  }, []);
  
  const getDataTanggal = async () => {
    const rooms = [
      "101 Superior Room Double",
      "102 Superior Room Double",
      "103 Superior Room Double",
      "104 Superior Room Double",
      "105 Superior Room Double",
      "201 Superior Room Double",
      "202 Superior Room Double",
      "203 Superior Room Double",
      "301 Superior Room Double",
      "302 Superior Room Double",
      "303 Superior Room Double",
    ];

    try {
      const responses = await Promise.all(
        rooms.map((room) =>
          axios.get(`${process.env.NEXT_PUBLIC_URL}api/filter?room=${room}`, {
            withCredentials: true,
          })
        )
      );

      // Log untuk memeriksa data yang diterima dari API
      responses.forEach((res, i) => {
        console.log(`Data untuk room ${rooms[i]}:,`, res.data);
      });

      const formattedData = responses.map((res, i) => {
        const roomData = res.data;

        // Cek apakah roomF dan roomG memiliki data yang sesuai
        console.log(`Room data for room ${rooms[i]}:`, roomData);

        const datesF =
          roomData.roomF?.checkin && roomData.roomF?.checkout
            ? formatTanggals(roomData.roomF.checkin, roomData.roomF.checkout)
            : [];
        const datesG =
          roomData.roomG?.arrival && roomData.roomG?.departure
            ? formatTanggals(roomData.roomG.arrival, roomData.roomG.departure)
            : [];

        return {
          room: rooms[i],
          dates: [...datesF, ...datesG],
        };
      });

      setReservedDates(formattedData);
    } catch (error) {
      console.error("Error fetching room reservations:", error);
    }
  };

  const daysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();

  const table = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);

    // Log reservedDates untuk memastikan data diterima dengan benar
    console.log('Reserved Dates:', reservedDates);

    return reservedDates.map((reservation, id) => (
      <tr key={id} className="border">
        <td className="p-1 w-[5%] text-center border text-sm">
          {reservation.room}
        </td>
        {Array.from({ length: totalDays }, (_, day) => {
  const dateKey = `${currentYear}-${(currentMonth + 1)
    .toString()
    .padStart(2, "0")}-${(day + 1).toString().padStart(2, "0")}`;
  const isReserved = reservation.dates.includes(dateKey); // Periksa apakah tanggal dicocokkan

  // Log untuk melihat tanggal yang dicocokkan
  console.log(
    `Checking reservation for Date ${dateKey} in room ${reservation.room}:`,
    isReserved
  );

  return (
    <td
      key={dateKey}
      className={`p-1 w-[12px] h-[12px] text-center border text-xs ${
        isReserved ? "bg-[#6dcbe2]" : "bg-white"
      }`}
    ></td>
  );
})}

      </tr>
    ));
  };

  const prev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const next = () => {
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
          onClick={prev}
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
          onClick={next}
        >
          &gt;
        </button>
      </div>
      <table className="table-auto border-collapse border w-[70%] text-xs">
        <thead>
          <tr className="border border-[#64C9E3] bg-[#1e99bb]">
            <th className="p-1 text-center  w-[100px] text-xs border">Room</th>
            {Array.from(
              { length: daysInMonth(currentYear, currentMonth) },
              (_, i) => (
                <th
                  key={i}
                  className="p-1 w-[20px] h-[20px] text-center border text-xs"
                >
                  {i + 1}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>{table()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;