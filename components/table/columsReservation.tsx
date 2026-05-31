"use client"

import { ColumnDef } from "@tanstack/react-table";
import {Reservation, StatutReservation, statutReservationLabels} from "@types/Reservation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {  Eye, MoreHorizontal, Printer, Trash } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { generateFacturePdf } from "@/lib/generateFacturePdf";


export const columsReservation: ColumnDef<Reservation>[] = [
  {
    accessorKey: "dateArrivee",
    header: "Date d'arrivée",
  },
  {
    accessorKey: "dateDepart",
    header: "Date de depart",
  },
  {
    accessorKey: "penaliteAnnulation",
    header: "Pénalité d'annulation",
  },
  {
    accessorKey: "remiseAppliquee",
    header: "Remise appliquée",
  },
  {
    accessorKey: "nombrePersonnes",
    header: "Nombre de personne",
  },
  {
    accessorKey: "heureArriveeEffective",
    header: "Heure d'arrivée effective",
     cell: ({ row }) => formatDateTime(row.getValue("heureArriveeEffective")),
  },
  {
    accessorKey: "statut",
    header: "Statut",
     cell: ({ row }) => statutReservationLabels[row.getValue("statut") as StatutReservation],
  },
  {
  id: "actions",
  cell: ({ row }) => {
    const reservation = row.original
    const hasFacture = !!reservation.facture

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
  },
},

]
