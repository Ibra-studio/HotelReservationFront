"use client"

import { ColumnDef } from "@tanstack/react-table";
import {Reservation} from "@types/Reservation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {  Eye, MoreHorizontal, Trash } from "lucide-react";


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
    accessorKey: "nombrePersonnes",
    header: "Nombre de personne",
  },
  {
    accessorKey: "heureArriveeEffective",
    header: "Heure d'arrivée effective",
  },
  {
    accessorKey: "statut",
    header: "Statut",
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
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Eye/>
                Voir reservation
                </DropdownMenuItem>
           
            <DropdownMenuSeparator/>
            <DropdownMenuItem variant="destructive">
                <Trash/>
                supprimer reservation
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
