// types/facture.ts

export type StatutPaiement =
  | "EnAttente"
  | "Paye"
  | "Rembourse"
  | "Echoue"

export type LigneFacture = {
  id: string
  description: string
  montant: number
  quantite: number
  prixUnitaire: number
}

export type Facture= {
  id: string
  reservationId: string
  dateEmission: string        // DateTime → ISO string
  montantTotal: number
  montantNuitee: number
  montantRemise: number
  montantPenalitee: number
  montantServices: number
  statut: StatutPaiement
  lignesFacture: LigneFacture[]
}