// app/clients/page.tsx
import { ClientTable } from "@/components/table/ClientTable";
import { columsClient } from "@/components/table/columsClient";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {Client} from "@types/Client"

// async function getClients() {
   
//   try {
//     const response = await fetch(
//       `http://localhost:5241/api/Chambre`,
//       {
//         headers: {
//           "Content-Type": "application/json",
          
//         },
//         cache: "no-store" 
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Erreur HTTP : ${response.status}`);
//     }

//     const clients = await response.json();
//     return clients;

//   } catch (error) {
//     console.error("Erreur fetch clients :", error);
//     return [];
//   }
// }

export default async function ClientsPage() {
  // const clients = await getClients();

  const dataClients: Client[] = [
  {
    id: "1a2b3c4d-0000-0000-0000-000000000001",
    Nom: "El Amrani",
    Prenom: "Youssef",
    NumPieceIdentite: "AB123456",
    NumeroTelephone: "+212 6 61 23 45 67",
    Email: "youssef.elamrani@gmail.com",
    Adresse: "12 Rue Hassan II, Casablanca",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000002",
    Nom: "Tazi",
    Prenom: "Amina",
    NumPieceIdentite: "CD789012",
    NumeroTelephone: "+212 6 62 34 56 78",
    Email: "amina.tazi@gmail.com",
    Adresse: "45 Avenue Mohammed V, Rabat",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000003",
    Nom: "Benali",
    Prenom: "Karim",
    NumPieceIdentite: "EF345678",
    NumeroTelephone: "+212 6 63 45 67 89",
    Email: "karim.benali@hotmail.com",
    Adresse: "7 Rue Ibn Sina, Fès",
    EstActif: false,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000004",
    Nom: "Martin",
    Prenom: "Sophie",
    NumPieceIdentite: "FR987654",
    NumeroTelephone: "+33 6 12 34 56 78",
    Email: "sophie.martin@outlook.fr",
    Adresse: "23 Rue de la Paix, Paris",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000005",
    Nom: "Alaoui",
    Prenom: "Fatima",
    NumPieceIdentite: "GH567890",
    NumeroTelephone: "+212 6 64 56 78 90",
    Email: "fatima.alaoui@gmail.com",
    Adresse: "3 Boulevard Zerktouni, Marrakech",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000006",
    Nom: "Dupont",
    Prenom: "Jean",
    NumPieceIdentite: "FR112233",
    NumeroTelephone: "+33 6 98 76 54 32",
    Email: "jean.dupont@gmail.com",
    Adresse: "10 Rue Victor Hugo, Lyon",
    EstActif: false,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000007",
    Nom: "Idrissi",
    Prenom: "Omar",
    NumPieceIdentite: "IJ234567",
    NumeroTelephone: "+212 6 65 67 89 01",
    Email: "omar.idrissi@gmail.com",
    Adresse: "18 Rue Allal Ben Abdellah, Meknès",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000008",
    Nom: "García",
    Prenom: "Carlos",
    NumPieceIdentite: "ES445566",
    NumeroTelephone: "+34 6 12 34 56 78",
    Email: "carlos.garcia@gmail.com",
    Adresse: "5 Calle Mayor, Madrid",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000001",
    Nom: "El Amrani",
    Prenom: "Youssef",
    NumPieceIdentite: "AB123456",
    NumeroTelephone: "+212 6 61 23 45 67",
    Email: "youssef.elamrani@gmail.com",
    Adresse: "12 Rue Hassan II, Casablanca",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000002",
    Nom: "Tazi",
    Prenom: "Amina",
    NumPieceIdentite: "CD789012",
    NumeroTelephone: "+212 6 62 34 56 78",
    Email: "amina.tazi@gmail.com",
    Adresse: "45 Avenue Mohammed V, Rabat",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000003",
    Nom: "Benali",
    Prenom: "Karim",
    NumPieceIdentite: "EF345678",
    NumeroTelephone: "+212 6 63 45 67 89",
    Email: "karim.benali@hotmail.com",
    Adresse: "7 Rue Ibn Sina, Fès",
    EstActif: false,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000004",
    Nom: "Martin",
    Prenom: "Sophie",
    NumPieceIdentite: "FR987654",
    NumeroTelephone: "+33 6 12 34 56 78",
    Email: "sophie.martin@outlook.fr",
    Adresse: "23 Rue de la Paix, Paris",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000005",
    Nom: "Alaoui",
    Prenom: "Fatima",
    NumPieceIdentite: "GH567890",
    NumeroTelephone: "+212 6 64 56 78 90",
    Email: "fatima.alaoui@gmail.com",
    Adresse: "3 Boulevard Zerktouni, Marrakech",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000006",
    Nom: "Dupont",
    Prenom: "Jean",
    NumPieceIdentite: "FR112233",
    NumeroTelephone: "+33 6 98 76 54 32",
    Email: "jean.dupont@gmail.com",
    Adresse: "10 Rue Victor Hugo, Lyon",
    EstActif: false,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000007",
    Nom: "Idrissi",
    Prenom: "Omar",
    NumPieceIdentite: "IJ234567",
    NumeroTelephone: "+212 6 65 67 89 01",
    Email: "omar.idrissi@gmail.com",
    Adresse: "18 Rue Allal Ben Abdellah, Meknès",
    EstActif: true,
  },
  {
    id: "1a2b3c4d-0000-0000-0000-000000000008",
    Nom: "García",
    Prenom: "Carlos",
    NumPieceIdentite: "ES445566",
    NumeroTelephone: "+34 6 12 34 56 78",
    Email: "carlos.garcia@gmail.com",
    Adresse: "5 Calle Mayor, Madrid",
    EstActif: true,
  },
]

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
                  <BreadcrumbLink href="#">
                    Clients
                  </BreadcrumbLink>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      <div className="flex flex-1 items-center justify-center ">
          <DataTable columns={columsClient} data={dataClients} search="email"/>
        </div>
    </div>
  );
}
