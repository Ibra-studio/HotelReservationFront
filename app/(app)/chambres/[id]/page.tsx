// app/chambres/[id]/page.tsx
import { ChambreForm } from "@/components/forms/ChambreForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Chambre } from "@types/Chambre";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api";
import { getEquipements } from "@/app/actions/equipement";

interface ChambreDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function getChambreById(id: string): Promise<Chambre | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/Chambre/${id}`, {
      headers: await getAuthHeaders(),
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
    return await response.json()

  } catch (error) {
    return null
  }
}


export default async function ChambreDetailsPage({
  params,
}: ChambreDetailsPageProps) {
  const { id } = await params;
  const chambre = await getChambreById(id);
  const equipements = await getEquipements();

  if (!chambre) {
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
                  <BreadcrumbLink href="/chambres">Chambres</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              Chambre non trouvée
            </h1>
            <p >
              La chambre avec l'ID {id} n'existe pas.
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
                <BreadcrumbLink href="/chambres">Chambres</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:flex" />
              <BreadcrumbItem>
                Chambre {chambre.numChambre}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Modifier les informations</h2>
            <ChambreForm chambre={chambre} equipements={equipements} />
          </div>
        </div>
      </div>
    </div>
  );
}
