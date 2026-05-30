
import { columsReservation } from "@/components/table/columsReservation"
import {Reservation} from "@types/Reservation"
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




async function getReservations() {
   
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
export default function Page() {
  const dataReservations: Reservation[] = [
  {
    id: "res-0000-0000-0000-000000000001",
    clientId: "1a2b3c4d-0000-0000-0000-000000000001",
    chambreId: "ch-0000-0000-0000-000000000101",
    dateArrivee: "2024-06-01",
    dateDepart: "2024-06-05",
    nombrePersonnes: 2,
    heureArriveeEffective: "2024-06-01T14:30:00",
    remiseAppliquee: 10,
    penaliteAnnulation: 0,
    statut: "CheckOutEffectue",
    dateCreation: "2024-05-20T09:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000002",
    clientId: "1a2b3c4d-0000-0000-0000-000000000002",
    chambreId: "ch-0000-0000-0000-000000000205",
    dateArrivee: "2024-06-10",
    dateDepart: "2024-06-12",
    nombrePersonnes: 1,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 0,
    statut: "Confirmee",
    dateCreation: "2024-05-25T11:15:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000003",
    clientId: "1a2b3c4d-0000-0000-0000-000000000003",
    chambreId: "ch-0000-0000-0000-000000000312",
    dateArrivee: "2024-06-15",
    dateDepart: "2024-06-20",
    nombrePersonnes: 3,
    heureArriveeEffective: "2024-06-15T16:00:00",
    remiseAppliquee: 15,
    penaliteAnnulation: 0,
    statut: "CheckInEffectue",
    dateCreation: "2024-06-01T08:30:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000004",
    clientId: "1a2b3c4d-0000-0000-0000-000000000004",
    chambreId: "ch-0000-0000-0000-000000000408",
    dateArrivee: "2024-06-18",
    dateDepart: "2024-06-22",
    nombrePersonnes: 2,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 200,
    statut: "Annulee",
    dateCreation: "2024-06-05T14:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000005",
    clientId: "1a2b3c4d-0000-0000-0000-000000000005",
    chambreId: "ch-0000-0000-0000-000000000110",
    dateArrivee: "2024-06-20",
    dateDepart: "2024-06-25",
    nombrePersonnes: 4,
    heureArriveeEffective: "2024-06-20T15:00:00",
    remiseAppliquee: 20,
    penaliteAnnulation: 0,
    statut: "CheckInEffectue",
    dateCreation: "2024-06-08T10:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000006",
    clientId: "1a2b3c4d-0000-0000-0000-000000000006",
    chambreId: "ch-0000-0000-0000-000000000220",
    dateArrivee: "2024-06-22",
    dateDepart: "2024-06-24",
    nombrePersonnes: 2,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 0,
    statut: "Confirmee",
    dateCreation: "2024-06-10T09:30:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000007",
    clientId: "1a2b3c4d-0000-0000-0000-000000000007",
    chambreId: "ch-0000-0000-0000-000000000305",
    dateArrivee: "2024-06-25",
    dateDepart: "2024-06-30",
    nombrePersonnes: 1,
    heureArriveeEffective: "2024-06-25T13:45:00",
    remiseAppliquee: 5,
    penaliteAnnulation: 0,
    statut: "CheckOutEffectue",
    dateCreation: "2024-06-12T16:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000008",
    clientId: "1a2b3c4d-0000-0000-0000-000000000008",
    chambreId: "ch-0000-0000-0000-000000000415",
    dateArrivee: "2024-07-01",
    dateDepart: "2024-07-05",
    nombrePersonnes: 2,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 150,
    statut: "Annulee",
    dateCreation: "2024-06-15T11:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000009",
    clientId: "1a2b3c4d-0000-0000-0000-000000000001",
    chambreId: "ch-0000-0000-0000-000000000502",
    dateArrivee: "2024-07-10",
    dateDepart: "2024-07-14",
    nombrePersonnes: 3,
    heureArriveeEffective: "2024-07-10T14:00:00",
    remiseAppliquee: 10,
    penaliteAnnulation: 0,
    statut: "CheckInEffectue",
    dateCreation: "2024-06-20T08:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000010",
    clientId: "1a2b3c4d-0000-0000-0000-000000000003",
    chambreId: "ch-0000-0000-0000-000000000118",
    dateArrivee: "2024-07-12",
    dateDepart: "2024-07-15",
    nombrePersonnes: 2,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 0,
    statut: "Confirmee",
    dateCreation: "2024-06-22T13:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000011",
    clientId: "1a2b3c4d-0000-0000-0000-000000000005",
    chambreId: "ch-0000-0000-0000-000000000210",
    dateArrivee: "2024-07-15",
    dateDepart: "2024-07-20",
    nombrePersonnes: 2,
    heureArriveeEffective: "2024-07-15T15:30:00",
    remiseAppliquee: 25,
    penaliteAnnulation: 0,
    statut: "CheckOutEffectue",
    dateCreation: "2024-07-01T10:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000012",
    clientId: "1a2b3c4d-0000-0000-0000-000000000002",
    chambreId: "ch-0000-0000-0000-000000000320",
    dateArrivee: "2024-07-18",
    dateDepart: "2024-07-21",
    nombrePersonnes: 1,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 100,
    statut: "Annulee",
    dateCreation: "2024-07-05T09:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000013",
    clientId: "1a2b3c4d-0000-0000-0000-000000000006",
    chambreId: "ch-0000-0000-0000-000000000405",
    dateArrivee: "2024-07-22",
    dateDepart: "2024-07-28",
    nombrePersonnes: 4,
    heureArriveeEffective: "2024-07-22T16:00:00",
    remiseAppliquee: 30,
    penaliteAnnulation: 0,
    statut: "CheckInEffectue",
    dateCreation: "2024-07-08T14:30:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000014",
    clientId: "1a2b3c4d-0000-0000-0000-000000000007",
    chambreId: "ch-0000-0000-0000-000000000115",
    dateArrivee: "2024-07-25",
    dateDepart: "2024-07-27",
    nombrePersonnes: 2,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 0,
    statut: "Confirmee",
    dateCreation: "2024-07-10T11:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000015",
    clientId: "1a2b3c4d-0000-0000-0000-000000000004",
    chambreId: "ch-0000-0000-0000-000000000230",
    dateArrivee: "2024-08-01",
    dateDepart: "2024-08-07",
    nombrePersonnes: 3,
    heureArriveeEffective: "2024-08-01T14:00:00",
    remiseAppliquee: 15,
    penaliteAnnulation: 0,
    statut: "CheckOutEffectue",
    dateCreation: "2024-07-15T08:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000016",
    clientId: "1a2b3c4d-0000-0000-0000-000000000008",
    chambreId: "ch-0000-0000-0000-000000000310",
    dateArrivee: "2024-08-05",
    dateDepart: "2024-08-10",
    nombrePersonnes: 2,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 0,
    statut: "Confirmee",
    dateCreation: "2024-07-20T10:30:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000017",
    clientId: "1a2b3c4d-0000-0000-0000-000000000001",
    chambreId: "ch-0000-0000-0000-000000000420",
    dateArrivee: "2024-08-10",
    dateDepart: "2024-08-15",
    nombrePersonnes: 2,
    heureArriveeEffective: "2024-08-10T13:00:00",
    remiseAppliquee: 10,
    penaliteAnnulation: 0,
    statut: "CheckInEffectue",
    dateCreation: "2024-07-25T09:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000018",
    clientId: "1a2b3c4d-0000-0000-0000-000000000003",
    chambreId: "ch-0000-0000-0000-000000000508",
    dateArrivee: "2024-08-12",
    dateDepart: "2024-08-14",
    nombrePersonnes: 1,
    heureArriveeEffective: null,
    remiseAppliquee: 0,
    penaliteAnnulation: 250,
    statut: "Annulee",
    dateCreation: "2024-07-28T15:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000019",
    clientId: "1a2b3c4d-0000-0000-0000-000000000005",
    chambreId: "ch-0000-0000-0000-000000000112",
    dateArrivee: "2024-08-18",
    dateDepart: "2024-08-22",
    nombrePersonnes: 2,
    heureArriveeEffective: "2024-08-18T14:30:00",
    remiseAppliquee: 20,
    penaliteAnnulation: 0,
    statut: "CheckOutEffectue",
    dateCreation: "2024-08-01T11:00:00",
    facture: null,
  },
  {
    id: "res-0000-0000-0000-000000000020",
    clientId: "1a2b3c4d-0000-0000-0000-000000000007",
    chambreId: "ch-0000-0000-0000-000000000215",
    dateArrivee: "2024-08-25",
    dateDepart: "2024-08-30",
    nombrePersonnes: 3,
    heureArriveeEffective: null,
    remiseAppliquee: 5,
    penaliteAnnulation: 0,
    statut: "Confirmee",
    dateCreation: "2024-08-05T08:30:00",
    facture: null,
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
                  <BreadcrumbLink href="/reservations">
                    Reservations
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
         <div className="flex flex-1 items-center justify-center ">
                  <DataTable columns={columsReservation} data={dataReservations} search="email"/> 
                  {/* //TODO: ajouter nom prenom , et num de chambre dans l'api , dto reservation , et include */}
         </div>
  </>
      
  )
}
