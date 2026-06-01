import { ReservationForm } from "@/components/forms/ReservationForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api";
import { Reservation } from "@/types/Reservation";
import { Chambre } from "@/types/Chambre";
import { getReservationById } from "@/app/actions/reservation";
import { notFound } from "next/navigation";

interface ReservationDetailsPageProps {
  params: Promise<{ id: string; reservationId: string }>;
}

async function getChambreById(chambreId: string): Promise<Chambre | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/Chambre/${chambreId}`, {
      headers: await getAuthHeaders(),
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
    return await response.json()

  } catch (error) {
    console.error("Erreur fetch chambre by id :", error)
    return null
  }
}

export default async function ReservationModifierPage({
  params,
}: ReservationDetailsPageProps) {
  const { id, reservationId } = await params;

  const reservation = await getReservationById(reservationId);

  if (!reservation) {
    return notFound();
  }

  const chambre = await getChambreById(reservation.chambreId);

  if (!chambre) {
    return notFound();
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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/clients/${id}`}>Client</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:flex" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/clients/${id}/reservations`}>Réservations</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:flex" />
              <BreadcrumbItem>
                Modifier la réservation
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Modifier la réservation</h2>
            <ReservationForm reservation={reservation} currentChambre={chambre} />
          </div>
        </div>
      </div>
    </div>
  );
}
