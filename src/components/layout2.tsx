"use client";
import { Josefin_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";


const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const disableSidebar = "/";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSidebarDisabled =
    disableSidebar.includes(pathname) 
  return (
    <div className="antialiased" style={{ fontFamily: `${josefinSans}` }}>
      {!isSidebarDisabled && <Sidebar/>}
      {children}
    </div>
  );
}
