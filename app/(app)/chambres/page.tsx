
import { getChambres } from "@/app/actions/chambre"
import { columsChambre } from "@/components/table/columsChambre"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DataTable } from "@/components/ui/DataTable"
import { Separator } from "@/components/ui/separator"
import {
  
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { API_BASE_URL, getAuthHeaders } from "@/lib/api"


export default async function Page() {
  const chambres = await getChambres();
  return (
    <>
    
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/chambres">
                    Chambres
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
       <div className="flex flex-1 items-center justify-center ">
                 <DataTable columns={columsChambre} data={chambres} search="statut"/>
             </div>
  </>
      
  )
}
