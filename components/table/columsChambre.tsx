"use client"

import { ColumnDef } from "@tanstack/react-table";
import {Chambre, StatutChambre, StatutChambreLabels, TypeChambre, TypeChambreLabels} from "@types/Chambre"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {  Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteChambre } from "@/app/actions/chambre";

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
    cell: ({ row }) => {
      const chambre = row.original;
            const router = useRouter();
      
            const handleViewChambre = (chambreId: string) => { 
              router.push(`/chambres/${chambreId}`);
            };
      
            const  handledeleteChambre =async (chambreId: string) => {
               
             try {
              await deleteChambre(chambreId)
             } catch (err) {
               console.log(err instanceof Error ? err.message : "Une erreur est survenue")
             }
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
            <DropdownMenuItem onSelect={() => handleViewChambre(chambre.id)}>
                <Eye/>
                Voir Chambre
                </DropdownMenuItem>
           
            <DropdownMenuSeparator/>
            <DropdownMenuItem variant="destructive" onSelect={()=> handledeleteChambre(chambre.id)}>
                <Trash/>
                Desactiver Chambre
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
