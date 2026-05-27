// types/reservation.ts

import { Facture } from "./Facture"

export type StatutReservation =
  | "Confirmee"
  | "Annulee"
  | "CheckInEffectue"
  | "CheckOutEffectue"

export type Reservation = {
  id: string
  clientId: string
  chambreId: string
  dateArrivee: string        // DateOnly → string "YYYY-MM-DD"
  dateDepart: string         // DateOnly → string "YYYY-MM-DD"
  nombrePersonnes: number
  heureArriveeEffective: string | null  // DateTime? → ISO string ou null
  remiseAppliquee: number
  penaliteAnnulation: number
  statut: StatutReservation
  dateCreation: string       // DateTime → ISO string
  facture: Facture | null
}