import { z } from "zod";

const baseClientSchema = {
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au least 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  numPieceIdentite: z
    .string()
    .min(6, "Le numéro de pièce d'identité doit contenir au moins 6 caractères")
    .max(20, "Le numéro de pièce d'identité ne peut pas dépasser 20 caractères"),
  numeroTelephone: z
  .string()
  .regex(
    /^\+?[0-9\s().-]{9,20}$/,
    "Le numéro de téléphone est invalide"
  ),
  email: z
    .string()
    .email("L'adresse email est invalide"),
  adresse: z
    .string()
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(100, "L'adresse ne peut pas dépasser 100 caractères"),
  estActif: z.boolean(),
};

export const clientFormSchema = z.object({
  id: z.string().uuid("ID invalide"),
  ...baseClientSchema,
});

export const clientCreateSchema = z.object(baseClientSchema);

export type ClientFormData = z.infer<typeof clientFormSchema>;
export type ClientCreateData = z.infer<typeof clientCreateSchema>;
