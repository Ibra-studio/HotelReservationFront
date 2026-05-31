// types/reservation.ts

import { Facture } from "./Facture"

export enum StatutReservation {
  Confirmee = 0,
  Annulee = 1,
  CheckInEffectue = 2,
  CheckOutEffectue = 3
}
export const statutReservationLabels: Record<StatutReservation, string> = {
  [StatutReservation.Confirmee]: "Confirmée",
  [StatutReservation.Annulee]: "Annulée",
  [StatutReservation.CheckInEffectue]: "Check-in effectué",
  [StatutReservation.CheckOutEffectue]: "Check-out effectué"
}
export type IdReservation={
  id:string
}
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