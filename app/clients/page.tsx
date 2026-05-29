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

//   const dataClients: Client[] = [
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000001",
//     nom: "El Amrani",
//     prenom: "Youssef",
//     numPieceIdentite: "AB123456",
//     numeroTelephone: "+212 6 61 23 45 67",
//     email: "youssef.elamrani@gmail.com",
//     adresse: "12 Rue Hassan II, Casablanca",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000002",
//     nom: "Tazi",
//     prenom: "Amina",
//     numPieceIdentite: "CD789012",
//     numeroTelephone: "+212 6 62 34 56 78",
//     email: "amina.tazi@gmail.com",
//     adresse: "45 Avenue Mohammed V, Rabat",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000003",
//     nom: "Benali",
//     prenom: "Karim",
//     numPieceIdentite: "EF345678",
//     numeroTelephone: "+212 6 63 45 67 89",
//     email: "karim.benali@hotmail.com",
//     adresse: "7 Rue Ibn Sina, Fès",
//     estActif: false,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000004",
//     nom: "Martin",
//     prenom: "Sophie",
//     numPieceIdentite: "FR987654",
//     numeroTelephone: "+33 6 12 34 56 78",
//     email: "sophie.martin@outlook.fr",
//     adresse: "23 Rue de la Paix, Paris",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000005",
//     nom: "Alaoui",
//     prenom: "Fatima",
//     numPieceIdentite: "GH567890",
//     numeroTelephone: "+212 6 64 56 78 90",
//     email: "fatima.alaoui@gmail.com",
//     adresse: "3 Boulevard Zerktouni, Marrakech",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000006",
//     nom: "Dupont",
//     prenom: "Jean",
//     numPieceIdentite: "FR112233",
//     numeroTelephone: "+33 6 98 76 54 32",
//     email: "jean.dupont@gmail.com",
//     adresse: "10 Rue Victor Hugo, Lyon",
//     estActif: false,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000007",
//     nom: "Idrissi",
//     prenom: "Omar",
//     numPieceIdentite: "IJ234567",
//     numeroTelephone: "+212 6 65 67 89 01",
//     email: "omar.idrissi@gmail.com",
//     adresse: "18 Rue Allal Ben Abdellah, Meknès",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000008",
//     nom: "García",
//     prenom: "Carlos",
//     numPieceIdentite: "ES445566",
//     numeroTelephone: "+34 6 12 34 56 78",
//     email: "carlos.garcia@gmail.com",
//     adresse: "5 Calle Mayor, Madrid",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000001",
//     nom: "El Amrani",
//     prenom: "Youssef",
//     numPieceIdentite: "AB123456",
//     numeroTelephone: "+212 6 61 23 45 67",
//     email: "youssef.elamrani@gmail.com",
//     adresse: "12 Rue Hassan II, Casablanca",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000002",
//     nom: "Tazi",
//     prenom: "Amina",
//     numPieceIdentite: "CD789012",
//     numeroTelephone: "+212 6 62 34 56 78",
//     email: "amina.tazi@gmail.com",
//     adresse: "45 Avenue Mohammed V, Rabat",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000003",
//     nom: "Benali",
//     prenom: "Karim",
//     numPieceIdentite: "EF345678",
//     numeroTelephone: "+212 6 63 45 67 89",
//     email: "karim.benali@hotmail.com",
//     adresse: "7 Rue Ibn Sina, Fès",
//     estActif: false,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000004",
//     nom: "Martin",
//     prenom: "Sophie",
//     numPieceIdentite: "FR987654",
//     numeroTelephone: "+33 6 12 34 56 78",
//     email: "sophie.martin@outlook.fr",
//     adresse: "23 Rue de la Paix, Paris",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000005",
//     nom: "Alaoui",
//     prenom: "Fatima",
//     numPieceIdentite: "GH567890",
//     numeroTelephone: "+212 6 64 56 78 90",
//     email: "fatima.alaoui@gmail.com",
//     adresse: "3 Boulevard Zerktouni, Marrakech",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000006",
//     nom: "Dupont",
//     prenom: "Jean",
//     numPieceIdentite: "FR112233",
//     numeroTelephone: "+33 6 98 76 54 32",
//     email: "jean.dupont@gmail.com",
//     adresse: "10 Rue Victor Hugo, Lyon",
//     estActif: false,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000007",
//     nom: "Idrissi",
//     prenom: "Omar",
//     numPieceIdentite: "IJ234567",
//     numeroTelephone: "+212 6 65 67 89 01",
//     email: "omar.idrissi@gmail.com",
//     adresse: "18 Rue Allal Ben Abdellah, Meknès",
//     estActif: true,
//   },
//   {
//     id: "1a2b3c4d-0000-0000-0000-000000000008",
//     nom: "García",
//     prenom: "Carlos",
//     numPieceIdentite: "ES445566",
//     numeroTelephone: "+34 6 12 34 56 78",
//     email: "carlos.garcia@gmail.com",
//     adresse: "5 Calle Mayor, Madrid",
//     estActif: true,
//   },
// ]

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
