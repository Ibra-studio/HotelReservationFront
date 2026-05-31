"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Reservation, StatutReservation, statutReservationLabels } from "@types/Reservation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogIn, LogOut, MoreHorizontal, Printer } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { generateFacturePdf } from "@/lib/generateFacturePdf";
import { checkIn, checkOut } from "@/app/actions/reservation";
import { ReservationActionsCell } from "./ReservationActionsCell";

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
    cell: ({ row }) => <ReservationActionsCell reservation={row.original} />,
  },
]