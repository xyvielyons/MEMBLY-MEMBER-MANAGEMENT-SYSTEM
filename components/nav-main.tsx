"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const router = useRouter()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management Tools</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item:any)=>(
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                    <button onClick={()=>router.push(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
