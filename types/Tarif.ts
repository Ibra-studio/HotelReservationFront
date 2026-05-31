import { TypeChambre } from "./Chambre";

export enum Season {
  HauteS = 1,
  BasseS = 2,
  PeriodeS = 3,
}

export const SeasonLabels: Record<Season, string> = {
  [Season.HauteS]: "Haute Saison",
  [Season.BasseS]: "Basse Saison",
  [Season.PeriodeS]: "Periode Speciale",
};

export interface TarifDto {
  id: string;
  typeChambre: TypeChambre;
  saison: Season;
  prixParNuit: number;
}

export interface CreateTarifDto {
  typeChambre: TypeChambre;
  saison: Season;
  prixParNuit: number;
}

export interface UpdateTarifDto {
  prixParNuit: number;
}
