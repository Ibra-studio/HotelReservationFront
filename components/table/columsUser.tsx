"use client"

import { ColumnDef } from "@tanstack/react-table";
import { UserDto, RoleUserLabels, RoleUser } from "@/types/User"
import { UserActionsCell } from "./UserActionsCell";

export const colusUser: ColumnDef<UserDto>[] = [
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "courriel",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => RoleUserLabels[row.getValue("role") as RoleUser],
  },
  {
    accessorKey: "estActif",
    header: "Statut",
    cell: ({ row }) => {
      const estActif = row.getValue("estActif") as boolean;
      return estActif ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Actif
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Inactif
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActionsCell user={row.original} />,
  },
]
