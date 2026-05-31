"use client"

import { ColumnDef } from "@tanstack/react-table";
import {Chambre, StatutChambre, StatutChambreLabels, TypeChambre, TypeChambreLabels} from "@types/Chambre"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {  Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteChambre } from "@/app/actions/chambre";
import { ChambreActionsCell } from "./ChambreActionsCell";

export const columsChambre: ColumnDef<Chambre>[] = [
  {
    accessorKey: "numChambre",
    header: "Numero de chambre",
     cell: ({ row }) => {
      const chambre = row.original;
      return (
        <Link
          href={`/chambres/${chambre.id}`}
          className=" hover:underline"
        >
          {chambre.numChambre}
        </Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type de chambre",
    cell: ({ row }) => TypeChambreLabels[row.getValue("type") as TypeChambre],
  },
  {
    accessorKey: "etage",
    header: "Etage",
  },
  {
    accessorKey: "capaciteAccueil",
    header: "Capacite d'accueil",
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => StatutChambreLabels[row.getValue("statut") as StatutChambre],
  },
  {
    id: "actions",
     cell: ({ row }) => <ChambreActionsCell chambre={row.original} />,
  },
]
