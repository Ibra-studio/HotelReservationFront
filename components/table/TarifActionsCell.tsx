"use client"

import { TarifDto } from "@/types/Tarif"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/context/UserContext";

export function TarifActionsCell({ tarif }: { tarif: TarifDto }) {
  const router = useRouter();
  const user = useCurrentUser();
  const isAdmin = user?.role === "Administrateur";

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

        {isAdmin && (
          <>
            <DropdownMenuItem onSelect={() => router.push(`/tarifs/${tarif.id}`)}>
              <Eye />
              Modifier le tarif
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
