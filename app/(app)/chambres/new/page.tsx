// app/chambres/new/page.tsx
import { getEquipements } from "@/app/actions/equipement";
import { ChambreCreateForm } from "@/components/forms/ChambreCreateForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function NewChambrePage() {
      const equipements= await getEquipements();
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
              <BreadcrumbItem>Nouvelle chambre</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Créer une nouvelle chambre</h1>
            <p className="mt-2">
              Remplissez le formulaire ci-dessous pour ajouter une nouvelle chambre.
            </p>
          </div>

          <div className="bg-secondary rounded-lg shadow p-6">
            <ChambreCreateForm  equipements={equipements}/>
          </div>
        </div>
      </div>
    </div>
  );
}
