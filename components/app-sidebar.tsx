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
    return <h1>Loading....</h1>
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
