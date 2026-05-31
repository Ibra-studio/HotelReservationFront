"use client"

import { UserDto } from "@/types/User"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2, UserCheck } from "lucide-react";
import { useCurrentUser } from "@/context/UserContext";
import { deactivateUser, reactivateUser } from "@/app/actions/user";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserActionsCell({ user }: { user: UserDto }) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const isAdmin = currentUser?.role === "Administrateur";
  const [isLoading, setIsLoading] = useState(false);

  const handleDeactivate = async () => {
    if (!confirm("Êtes-vous sûr de vouloir désactiver cet utilisateur ?")) return;
    try {
      setIsLoading(true);
      await deactivateUser(user.id);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur lors de la désactivation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactivate = async () => {
    if (!confirm("Êtes-vous sûr de vouloir réactiver cet utilisateur ?")) return;
    try {
      setIsLoading(true);
      await reactivateUser(user.id);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur lors de la réactivation");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user.estActif ? (
          <DropdownMenuItem
            onSelect={handleDeactivate}
            disabled={isLoading}
            className="text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Désactiver l'utilisateur
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onSelect={handleReactivate}
            disabled={isLoading}
            className="text-green-600"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Réactiver l'utilisateur
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}