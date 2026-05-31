
import { columsReservation } from "@/components/table/columsReservation"

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




async function getReservations(clientId:string) {
   
  try {
    const response = await fetch(
      `${API_BASE_URL}/Reservations/client/${clientId}
`,
      {
        headers: await getAuthHeaders(),
        cache: "no-store" 
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const reservations = await response.json();
    return reservations;

  } catch (error) {
    console.error("Erreur fetch reservations :", error);
    return [];
  }
}


export default async function ClientReservationsPage({params}: {params: Promise<{id:string}>}) {
  const { id } = await params;
   const reservations=  await getReservations(id) 
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
                  <BreadcrumbLink href="/reservations">
                    Reservations
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
         <div className="flex flex-1 items-center justify-center ">
                  <DataTable columns={columsReservation} data={reservations} search="statut"/> 
                  {/* //TODO: ajouter nom prenom , et num de chambre dans l'api , dto reservation , et include */}
         </div>
  </>
      
  )
}
