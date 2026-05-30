
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {DashboardChart} from "@/components/DashboardChart"
import { columsArrivee, ReservationDuJour } from "@/components/table/columsArrivee"
import { DataTable } from "@/components/ui/DataTable"
export default function Page() {

const dataArriveesDuJour: ReservationDuJour[] = [
  {
    id: "1a2b3c4d-0000-0000-0000-000000000001",
    nomClient: "Youssef El Amrani",
    numChambre: "101",
    HeurePrevu: "14:00",
    nombrePersonnes: 2,
    status: "Confirmee",
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000002",
    nomClient: "Sophie Martin",
    numChambre: "205",
    HeurePrevu: "15:30",
    nombrePersonnes: 1,
    status: "EnAttente",
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000003",
    nomClient: "Karim Benali",
    numChambre: "312",
    HeurePrevu: "16:00",
    nombrePersonnes: 3,
    status: "EnCours",
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000004",
    nomClient: "Amina Tazi",
    numChambre: "408",
    HeurePrevu: "18:00",
    nombrePersonnes: 2,
    status: "Confirmee",
  },
]
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
                  <BreadcrumbLink href="/dashboard">
                    dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <Card>
                  <CardHeader>
                    <CardTitle>Chambres disponibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">12</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Arrivées aujourd'hui</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">5</p>
                  </CardContent>
              </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Departs aujourd'hui</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">2</p>
                  </CardContent>
              </Card>
             
            
          </div>
          <DashboardChart/>
          <div className="min-h-screen flex-1  md:min-h-min flex justify-between" >
            <div>
              <p>Arrivée du Jour</p>
            <DataTable columns={columsArrivee} data={dataArriveesDuJour} search="nomClient" />
            </div>
            <div>
               <p>Depart du Jour</p>
            <DataTable columns={columsArrivee} data={dataArriveesDuJour} search="nomClient"/>
            </div>
          </div>
        </div>
  </>
      
  )
}
