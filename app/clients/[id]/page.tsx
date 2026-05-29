// app/clients/[id]/page.tsx
import { ClientForm } from "@/components/forms/ClientForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Client } from "@types/Client";
import { API_BASE_URL } from "@/lib/api";

interface ClientDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function getClientById(id: string): Promise<Client | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/Clients/${id}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
    return await response.json()

  } catch (error) {
    console.error("Erreur fetch client by id :", error)
    return null
  }
}


export default async function ClientDetailsPage({
  params,
}: ClientDetailsPageProps) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
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
                  <BreadcrumbLink href="/clients">Clients</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Client non trouvé
            </h1>
            <p className="text-gray-600">
              Le client avec l'ID {id} n'existe pas.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
                <BreadcrumbLink href="/clients">Clients</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:flex" />
              <BreadcrumbItem>
                {client.nom} {client.prenom}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Modifier les informations</h2>
            <ClientForm client={client} />
          </div>
        </div>
      </div>
    </div>
  );
}
