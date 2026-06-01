"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Chambre, StatutChambre, StatutChambreLabels, TypeChambre, TypeChambreLabels } from "@types/Chambre"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteChambre } from "@/app/actions/chambre";
import { useCurrentUser } from "@/context/UserContext";

export function ChambreActionsCell({ chambre }: { chambre: Chambre }) {
  const router = useRouter();
  const user = useCurrentUser();
  const isAdmin = user?.role === "Administrateur";

  const handleDeleteChambre = async (chambreId: string) => {
    try {
      await deleteChambre(chambreId);
      router.refresh();
    } catch (err) {
      // Error handled silently
    }
  };

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

        <DropdownMenuItem onSelect={() => router.push(`/chambres/${chambre.id}`)}>
          <Eye />
          Voir Chambre
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => handleDeleteChambre(chambre.id)}
            >
              <Trash />
              Désactiver Chambre
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
