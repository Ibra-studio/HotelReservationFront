import { StatutChambre, TypeChambre } from "@/types/Chambre";
import { z } from "zod";

const baseChambreSchema = {
  numChambre: z
    .string()
    .min(1, "Le numéro de chambre est requis")
    .max(10, "Le numéro de chambre ne peut pas dépasser 10 caractères"),

  type: z.nativeEnum(TypeChambre, {
    error: () => ({ message: "Type de chambre invalide" }),
  }),

  etage: z
    .number()
    .int("L'étage doit être un nombre entier")
    .min(0, "L'étage doit être au moins 0")
    .max(99, "L'étage ne peut pas dépasser 99"),

  capaciteAccueil: z
    .number()
    .int("La capacité doit être un nombre entier")
    .min(1, "La capacité doit être au moins 1")
    .max(5, "La capacité ne peut pas dépasser 10"),

  description: z.string().optional(),

  statut: z.nativeEnum(StatutChambre, {
    error: () => ({ message: "Statut invalide" }),
  }),
}
export const chambreFormSchema = z.object({
  id: z.string().uuid("ID invalide"),
  ...baseChambreSchema,
   equipementIds: z.array(z.string().uuid()).min(0).default([]),
});

export const chambreCreateSchema = z.object({
  numChambre: baseChambreSchema.numChambre,
  type: baseChambreSchema.type,
  etage: baseChambreSchema.etage,
  capaciteAccueil: baseChambreSchema.capaciteAccueil,
  description: baseChambreSchema.description,
  equipementIds: z.array(z.string()).default([]),
});

export type ChambreFormData = z.infer<typeof chambreFormSchema>;
export type ChambreCreateData = z.infer<typeof chambreCreateSchema>;
