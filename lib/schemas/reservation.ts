import { z } from "zod";

const baseReservationSchema = {
  clientId: z
    .string()
    .min(1, "Le client est requis"),

  chambreId: z
    .string()
    .min(1, "La chambre est requise"),

  nombrePersonnes: z
    .number()
    .int("Le nombre de personnes doit être un nombre entier")
    .min(1, "Au moins 1 personne requise")
    .max(10, "Maximum 10 personnes"),

  dateArrivee: z
    .string()
    .min(1, "La date d'arrivée est requise"),

  dateDepart: z
    .string()
    .min(1, "La date de départ est requise"),

  remiseAppliquee: z
    .number()
    .min(0, "La remise ne peut pas être négative")
    .max(100, "La remise ne peut pas dépasser 100%"),
};

export const reservationCreateSchema = z.object({
  clientId: baseReservationSchema.clientId,
  chambreId: baseReservationSchema.chambreId,
  nombrePersonnes: baseReservationSchema.nombrePersonnes,
  dateArrivee: baseReservationSchema.dateArrivee,
  dateDepart: baseReservationSchema.dateDepart,
  remiseAppliquee: baseReservationSchema.remiseAppliquee,
}).refine(
  (data) => new Date(data.dateDepart) > new Date(data.dateArrivee),
  {
    message: "La date de départ doit être après la date d'arrivée",
    path: ["dateDepart"],
  }
);

export type ReservationCreateData = z.infer<typeof reservationCreateSchema>;
