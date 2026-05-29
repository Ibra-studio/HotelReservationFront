"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import {Client} from "@types/Client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, Eye, MoreHorizontal, Trash } from "lucide-react";
import { deleteClient } from "@/app/actions/client";

export const columsClient: ColumnDef<Client>[] = [
  {
    accessorKey: "numPieceIdentite",
    header: "Numero piece d'identite",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <Link
          href={`/clients/${client.id}`}
          className=" hover:underline"
        >
          {client.numPieceIdentite}
        </Link>
      );
    },
  },
  {
    accessorKey: "nom",
    header: "Nom Client",
  },
  {
    accessorKey: "prenom",
    header: "Prenom",
  },
  {
    accessorKey: "numeroTelephone",
    header: "Numero de telephone",
  },
  {
     accessorKey: "email", 
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
      const client = row.original;
      const router = useRouter();

      const handleViewClient = (clientId: string) => { 
        router.push(`/clients/${clientId}`);
      };

      const  handledeleteClient =async (clientId: string) => {
         
       try {
        await deleteClient(clientId)
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
          <DropdownMenuContent align="end" className="w-45">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleViewClient(client.id)}>
              <Eye />
              Voir client
            </DropdownMenuItem>
           
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={()=> handledeleteClient(client.id)}>
              <Trash />
              Supprimer client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
