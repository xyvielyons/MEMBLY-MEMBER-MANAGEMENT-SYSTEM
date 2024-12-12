import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <div className="w-full h-[50px] bg-white flex items-center px-4 border-b-1 border-gray-200">
          <SidebarTrigger className='' />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default RootLayout