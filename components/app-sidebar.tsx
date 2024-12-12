"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import MemblyLogo from "./MemblyLogo"
import { authClient } from "@/auth-client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboard } from 'lucide-react';
import { UserRound } from 'lucide-react';
import SyncLoader from "react-spinners/SyncLoader";
const items = [
  {
    title:"Analytics",
    url:"/dashboard",
    icon:LayoutDashboard
  },
  {
    title:"Members",
    url:"/members",
    icon:UserRound
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session }:any = authClient.useSession();
  if(!session){
    return (
      <div className="w-[200px] h-screen flex items-center justify-center">
        <SyncLoader
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  }
  const MyUser = {
    name: session?.user.name,
    email: session?.user.email,
    avatar: session?.user.image,
    role:session?.user.role
  }
  console.log(MyUser)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <MemblyLogo></MemblyLogo>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={MyUser.name} email={MyUser.email} avatar={MyUser.avatar} type={MyUser.role}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
