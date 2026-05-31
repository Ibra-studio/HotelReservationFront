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

export enum TypeChambre {
  Simple = 0,
  Double = 1,
  Suite = 2,
}

export enum StatutChambre {
  Disponible = 0,
  Occupée = 1,
  EnMaintenance = 2,
  Desactivee = 3,
}
export const TypeChambreLabels: Record<TypeChambre, string> = {
  [TypeChambre.Simple]: "Simple",
  [TypeChambre.Double]: "Double",
  [TypeChambre.Suite]: "Suite",
}

export const StatutChambreLabels: Record<StatutChambre, string> = {
  [StatutChambre.Disponible]: "Disponible",
  [StatutChambre.Occupée]: "Occupée",
  [StatutChambre.EnMaintenance]: "En maintenance",
  [StatutChambre.Desactivee]: "Désactivée",
}