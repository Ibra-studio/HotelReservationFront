import { Geist, Geist_Mono, Montserrat, Figtree } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "hotelReservation",
};

const figtreeHeading = Figtree({subsets:['latin'],variable:'--font-heading'});

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", montserrat.variable, figtreeHeading.variable)}
    >
      <body className="flex items-start justify-between">
        <ThemeProvider>
        <SidebarProvider>
          <TooltipProvider>
          <AppSidebar/>
          <main className="w-full h-full">
          {children}
          </main>
          </TooltipProvider>
          
        </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
