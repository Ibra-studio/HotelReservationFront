
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

export default function Page() {
  const dataChambres: Chambre[] = [
  {
    id: "ch-0000-0000-0000-000000000101",
    numChambre: "101",
    type: "Simple",
    etage: 1,
    capaciteAccueil: 1,
    description: "Chambre simple avec vue sur jardin",
    statut: "Disponible",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000102",
    numChambre: "102",
    type: "Double",
    etage: 1,
    capaciteAccueil: 2,
    description: "Chambre double avec balcon",
    statut: "Occupee",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
      { id: "eq-003", nom: "Télévision" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000103",
    numChambre: "103",
    type: "Simple",
    etage: 1,
    capaciteAccueil: 1,
    description: null,
    statut: "EnMaintenance",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000201",
    numChambre: "201",
    type: "Double",
    etage: 2,
    capaciteAccueil: 2,
    description: "Chambre double vue sur piscine",
    statut: "Disponible",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
      { id: "eq-003", nom: "Télévision" },
      { id: "eq-004", nom: "Minibar" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000202",
    numChambre: "202",
    type: "Suite",
    etage: 2,
    capaciteAccueil: 4,
    description: "Suite luxueuse avec jacuzzi et terrasse",
    statut: "Disponible",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
      { id: "eq-003", nom: "Télévision" },
      { id: "eq-004", nom: "Minibar" },
      { id: "eq-005", nom: "Jacuzzi" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000203",
    numChambre: "203",
    type: "Simple",
    etage: 2,
    capaciteAccueil: 1,
    description: null,
    statut: "Occupee",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000204",
    numChambre: "204",
    type: "Double",
    etage: 2,
    capaciteAccueil: 3,
    description: "Chambre double avec lit supplémentaire",
    statut: "Disponible",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-003", nom: "Télévision" },
      { id: "eq-004", nom: "Minibar" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000301",
    numChambre: "301",
    type: "Suite",
    etage: 3,
    capaciteAccueil: 4,
    description: "Suite avec salon séparé et vue panoramique",
    statut: "Occupee",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
      { id: "eq-003", nom: "Télévision" },
      { id: "eq-004", nom: "Minibar" },
      { id: "eq-006", nom: "Coffre-fort" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000302",
    numChambre: "302",
    type: "Simple",
    etage: 3,
    capaciteAccueil: 1,
    description: null,
    statut: "Desactivee",
    equipements: [],
  },
  {
    id: "ch-0000-0000-0000-000000000303",
    numChambre: "303",
    type: "Double",
    etage: 3,
    capaciteAccueil: 2,
    description: "Chambre double cosy avec cheminée",
    statut: "Disponible",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
      { id: "eq-003", nom: "Télévision" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000304",
    numChambre: "304",
    type: "Double",
    etage: 3,
    capaciteAccueil: 2,
    description: null,
    statut: "EnMaintenance",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000401",
    numChambre: "401",
    type: "Suite",
    etage: 4,
    capaciteAccueil: 6,
    description: "Suite présidentielle avec terrasse privée et cuisine",
    statut: "Disponible",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
      { id: "eq-003", nom: "Télévision" },
      { id: "eq-004", nom: "Minibar" },
      { id: "eq-005", nom: "Jacuzzi" },
      { id: "eq-006", nom: "Coffre-fort" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000402",
    numChambre: "402",
    type: "Simple",
    etage: 4,
    capaciteAccueil: 1,
    description: "Chambre simple avec vue sur mer",
    statut: "Occupee",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-002", nom: "Climatisation" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000403",
    numChambre: "403",
    type: "Double",
    etage: 4,
    capaciteAccueil: 2,
    description: null,
    statut: "Disponible",
    equipements: [
      { id: "eq-001", nom: "WiFi" },
      { id: "eq-003", nom: "Télévision" },
    ],
  },
  {
    id: "ch-0000-0000-0000-000000000404",
    numChambre: "404",
    type: "Suite",
    etage: 4,
    capaciteAccueil: 4,
    description: "Suite avec salle de réunion intégrée",
    statut: "Desactivee",
    equipements: [],
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
                  <BreadcrumbLink href="/chambres">
                    Chambres
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
       <div className="flex flex-1 items-center justify-center ">
                 <DataTable columns={columsChambre} data={dataChambres} search="statut"/>
             </div>
  </>
      
  )
}
