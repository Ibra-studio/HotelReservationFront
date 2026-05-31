// app/clients/page.tsx
import { columsClient } from "@/components/table/columsClient";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { API_BASE_URL } from "@/lib/api";
import {Client} from "@types/Client"

async function getClients() {
   
  try {
    const response = await fetch(
      `${API_BASE_URL}/Clients`,
      {
        headers: {
          "Content-Type": "application/json",
          
        },
        cache: "no-store" 
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const clients = await response.json();
    return clients;

  } catch (error) {
    console.error("Erreur fetch clients :", error);
    return [];
  }
}

export default async function ClientsPage() {
  const clients = await getClients();


  return (
    <div>
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
                  <BreadcrumbLink href="/clients">
                    Clients
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      <div className="flex flex-1 items-center justify-center ">
          <DataTable columns={columsClient} data={clients} search="email"/>
      </div>
    </div>
  );
}