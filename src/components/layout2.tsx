"use client";
import { Josefin_Sans as JosefinSans } from "next/font/google";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";


const josefinSans = JosefinSans({ subsets: ["latin"] });

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
    <div className={josefinSans.className}>
      {!isSidebarDisabled && <Sidebar/>}
      {children}
    </div>
  );
}
