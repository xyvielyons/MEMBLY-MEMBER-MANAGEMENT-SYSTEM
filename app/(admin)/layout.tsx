import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { assets } from '@/public/assets'
import Image from 'next/image'
const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <div className="w-full h-[50px] bg-white flex items-center px-4 border-b-1 border-gray-200 gap-8">
          <SidebarTrigger className='' />
          <div className="">
            <Image src={assets.logo} alt="logo" width={100} height={100}></Image>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default RootLayout