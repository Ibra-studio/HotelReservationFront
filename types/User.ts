export enum RoleUser {
  Administrateur = 1,
  Receptionniste = 0,
}

export const RoleUserLabels: Record<RoleUser, string> = {
  [RoleUser.Administrateur]: "Administrateur",
  [RoleUser.Receptionniste]: "Réceptionniste",
};

export type User = {
  userId: string;
  nom: string;
  courriel: string;
  estActif: boolean;
  role: RoleUser;
};

export interface UserDto {
  id: string;
  nom: string;
  courriel: string;
  estActif: boolean;
  role: RoleUser;
}

export interface CreateUserDto {
  nom: string;
  courriel: string;
  role: RoleUser;
  password: string;
}

export interface UpdateUserDto {
  nom: string;
  courriel: string;
}
