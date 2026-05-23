"use client"

import { ColumnDef } from "@tanstack/react-table"
import { StatutReservation } from "@types/Reservation"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReservationDuJour= {
  id: string
  nomClient: string
  numChambre:string
  HeurePrevu: string
  nombrePersonnes:number
  status:  StatutReservation
}

export const columsArrivee: ColumnDef<ReservationDuJour>[] = [
  {
    accessorKey: "nomClient",
    header: "Nom Client",
  },
  {
    accessorKey: "numChambre",
    header: "Chambre",
  },
  {
    accessorKey: "HeurePrevu",
    header: "Heure prevue",
  },
  {
    accessorKey: "nombrePersonnes",
    header: "nombre de Personne",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]