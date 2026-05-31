"use client"

import { ColumnDef } from "@tanstack/react-table";
import { TarifDto, Season, SeasonLabels } from "@/types/Tarif"
import { TypeChambre, TypeChambreLabels } from "@/types/Chambre"
import { TarifActionsCell } from "./TarifActionsCell";

export const columsTarif: ColumnDef<TarifDto>[] = [
  {
    accessorKey: "typeChambre",
    header: "Type de chambre",
    cell: ({ row }) => TypeChambreLabels[row.getValue("typeChambre") as TypeChambre],
    filterFn: (row, columnId, filterValue) => {
    const label = TypeChambreLabels[row.getValue(columnId) as TypeChambre]
    return label.toLowerCase().includes((filterValue as string).toLowerCase())
  },
  },
  {
    accessorKey: "saison",
    header: "Saison",
    cell: ({ row }) => SeasonLabels[row.getValue("saison") as Season],
  },
  {
    accessorKey: "prixParNuit",
    header: "Prix par nuit",
    cell: ({ row }) => {
      const prix = row.getValue("prixParNuit") as number;
      return `${prix.toFixed(2)} €`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TarifActionsCell tarif={row.original} />,
  },
]
