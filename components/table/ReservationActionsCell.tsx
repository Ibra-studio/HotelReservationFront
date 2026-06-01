"use client"

import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { LogIn, LogOut, MoreHorizontal, Printer, Edit } from "lucide-react"
import { Reservation, StatutReservation } from "@types/Reservation"
import { annulerReservation, checkIn, checkOut } from "@/app/actions/reservation"
import { generateFacturePdf } from "@/lib/generateFacturePdf"

export function ReservationActionsCell({ reservation }: { reservation: Reservation }) {
  const router = useRouter()
  const hasFacture = !!reservation.facture
  const canCheckIn = reservation.statut === StatutReservation.Confirmee
  const canCheckOut = reservation.statut === StatutReservation.CheckInEffectue
  const canCancel = reservation.statut === StatutReservation.Confirmee || reservation.statut === StatutReservation.CheckInEffectue
  const canModify = new Date(reservation.dateArrivee) > new Date()

  const handleCheckIn = async () => {
    await checkIn(reservation.id)
    router.refresh()
  }

  const handleCheckOut = async () => {
    await checkOut(reservation.id)
    router.refresh()
  }
  const handleCancel = async () => {
    await annulerReservation(reservation.id)
    router.refresh()
  }

  const handleModify = () => {
    router.push(`/clients/${reservation.clientId}/reservations/${reservation.id}/modifier`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!canModify}
          onClick={handleModify}
          className={!canModify ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <Edit />
          Modifier
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!canCheckIn}
          onClick={handleCheckIn}
          className={!canCheckIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <LogIn />
          Check-in
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={!canCheckOut}
          onClick={handleCheckOut}
          className={!canCheckOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <LogOut />
          Check-out
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!canCancel}
          onClick={handleCancel}
          className={!canCancel ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <LogOut />
            Annuler la réservation
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!hasFacture}
          onClick={() => hasFacture && generateFacturePdf(reservation)}
          className={!hasFacture ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <Printer />
          Imprimer facture
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}