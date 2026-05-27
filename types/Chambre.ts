// types/chambre.ts
import { Equipement } from "./Equipement"

export type Chambre = {
  id: string
  numChambre: string
  type: TypeChambre
  etage: number
  capaciteAccueil: number
  description: string | null
  statut: StatutChambre
  equipements: Equipement[]
}

export type CreateChambre = {
  numChambre: string
  type: TypeChambre
  etage: number
  capaciteAccueil: number
  description?: string
  equipementIds: string[]
}

export type UpdateChambre = {
  numChambre: string
  type: TypeChambre
  etage: number
  capaciteAccueil: number
  description?: string
  statut: StatutChambre
}

export type TypeChambre = 
  | "Simple"
  | "Double"
  | "Suite"


export enum StatutChambre {
  Disponible = 1,
  Occupee = 2,
  EnMaintenance = 3,
  Desactivee = 4
}
