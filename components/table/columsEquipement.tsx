"use client"

import { ColumnDef } from "@tanstack/react-table";
import {Equipement} from "@types/Equipement"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {  Eye, MoreHorizontal, Trash } from "lucide-react";


export type Equipement = {
  id: string
  nom: string
 
}

export const columsEquipement: ColumnDef<Equipement>[] = [
 
  {
    accessorKey: "nom",
    header: "Capacite d'accueil",
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
                Voir Chambre
                </DropdownMenuItem>
           
            <DropdownMenuSeparator/>
            <DropdownMenuItem variant="destructive">
                <Trash/>
                supprimer Chambre
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
