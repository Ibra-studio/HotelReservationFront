"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutList, UsersRound, Calendar, BedDouble, HandCoins, TreePalm } from "lucide-react"
import { useCurrentUser } from "@/context/UserContext"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutList
        />
      ),
      isActive: true,
      roles:["Administrateur", "Receptionniste"]
    },
    {
      title: "Clients",
      url: "/clients",
      icon: (
        <UsersRound
        />
      ),
      items: [
       
        {
          title: "Nouveau client",
          url: "/clients/new",
        }
      ],
       roles:["Administrateur", "Receptionniste"]
    },
    {
      title: "Chambres",
      url: "/chambres",
      icon: (
        <BedDouble
        />
      ),
      items: [
        {
          title: "Nouvelle chambre",
          url: "/chambres/new",
        },
      ],
       roles:["Administrateur"]
    },
    {
      title: "Tarifs",
      url: "/tarifs",
      icon: (
        <HandCoins
        />
      ),
       items: [
        {
          title: "Nouveau tarif",
          url: "/tarifs/new",
        },
      ],
       roles:["Administrateur"]
    },
  
    {
      title: "Utilisateurs",
      url: "/users",
      icon: (
        <HandCoins
        />
      ),
       items: [
        {
          title: "Nouvel utilisateur",
          url: "/users/new",
        },
      ],
       roles:["Administrateur"]
    },
  
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  
  const user = useCurrentUser()
  const role = user?.role ?? ""

  const filteredItems = data.navMain.filter(item => item.roles.includes(role))


  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TreePalm className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Palmier</span>
                  <span className="truncate text-xs">Hotel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredItems} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
