import { Geist, Geist_Mono, Montserrat, Figtree } from "next/font/google"

import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getCurrentUser } from "@/app/actions/auth";

export const metadata = {
  title: "hotelReservation",
};

const figtreeHeading = Figtree({subsets:['latin'],variable:'--font-heading'});

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()
  console.log("Current user in RootLayout:", currentUser)

  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar user={currentUser ?? undefined} />
        <main className="w-full h-full">
          {children}
        </main>
      </TooltipProvider>
    </SidebarProvider>
  )
}
