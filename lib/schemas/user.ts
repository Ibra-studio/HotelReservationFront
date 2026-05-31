import { z } from "zod"
import { RoleUser } from "@/types/User"

export const updateUserSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

const baseUserCreateSchema = {
  nom: z
    .string()
    .min(2, "Le nom doit avoir au minimum 2 caractères")
    .max(100, "Le nom doit avoir au maximum 100 caractères"),

  courriel: z
    .string()
    .email("Email invalide")
    .max(255, "L'email doit avoir au maximum 255 caractères"),

  role: z.nativeEnum(RoleUser, {
    error: () => ({ message: "Rôle invalide" }),
  }),
}

export const userCreateSchema = z.object({
  nom: baseUserCreateSchema.nom,
  courriel: baseUserCreateSchema.courriel,
  role: baseUserCreateSchema.role,
  password: z
    .string()
    .min(6, "Le mot de passe doit avoir au minimum 6 caractères")
    .max(100, "Le mot de passe doit avoir au maximum 100 caractères"),
})

export type UpdateUserFormData = z.infer<typeof updateUserSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type UserCreateData = z.infer<typeof userCreateSchema>
