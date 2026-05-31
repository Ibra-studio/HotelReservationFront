import { TypeChambre } from "@/types/Chambre";
import { Season } from "@/types/Tarif";
import { z } from "zod";

const baseTarifSchema = {
  typeChambre: z.nativeEnum(TypeChambre, {
    error: () => ({ message: "Type de chambre invalide" }),
  }),

  saison: z.nativeEnum(Season, {
    error: () => ({ message: "Saison invalide" }),
  }),

  prixParNuit: z
    .number()
    .positive("Le prix doit être positif")
    .max(999999.99, "Le prix est trop élevé"),
};

export const tarifFormSchema = z.object({
  id: z.string().uuid("ID invalide"),
  ...baseTarifSchema,
});

export const tarifCreateSchema = z.object({
  typeChambre: baseTarifSchema.typeChambre,
  saison: baseTarifSchema.saison,
  prixParNuit: baseTarifSchema.prixParNuit,
});

export const tarifUpdateSchema = z.object({
  prixParNuit: baseTarifSchema.prixParNuit,
});

export type TarifFormData = z.infer<typeof tarifFormSchema>;
export type TarifCreateData = z.infer<typeof tarifCreateSchema>;
export type TarifUpdateData = z.infer<typeof tarifUpdateSchema>;
