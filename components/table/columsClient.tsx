"use client"

import { ColumnDef } from "@tanstack/react-table";
import {Client} from "@types/Client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
export const columsClient: ColumnDef<Client>[] = [
  {
    accessorKey: "NumPieceIdentite",
    header: "Numero piece d'identite",
  },
  {
    accessorKey: "Nom",
    header: "Nom Client",
  },
  {
    accessorKey: "Prenom",
    header: "Prenom",
  },
  {
    accessorKey: "NumeroTelephone",
    header: "Numero de telephone",
  },
  {
     accessorKey: "email",         // lowercase pour TanStack
     accessorFn: (row) => row.Email, // pointe vers la vraie propriété
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "EstActif",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
    //   const client = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>Voir client</DropdownMenuItem>
            <DropdownMenuItem>supprimer client</DropdownMenuItem>
            <DropdownMenuItem>Modifier client</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
