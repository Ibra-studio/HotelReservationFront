"use server"

import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { UpdateUserFormData, ChangePasswordFormData } from "@/lib/schemas/user"
import { User } from "@/types/User"

export async function getUserProfile(): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/User/me`, {
      headers: await getAuthHeaders(),
      cache: "no-store",
    })

    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Erreur fetch user profile:", error)
    return null
  }
}

export async function updateUserProfile(clientId:string,data: UpdateUserFormData): Promise<void> {
  console.log("Updating user profile with data:", clientId, data) // Debug log to check the data being sent
  const response = await fetch(`${API_BASE_URL}/User/${clientId}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      nom: data.nom,
      courriel: data.email, 
    }),
  })

  if (!response.ok) {
    throw new Error(`Erreur update: ${response.status}`)
  }
}

export async function changePassword(id:string,data: ChangePasswordFormData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/User/updatePassword/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      ancienMotDePasse: data.currentPassword,
      nouveauMotDePasse: data.newPassword,
      confirmationMotDePasse: data.confirmPassword
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Erreur lors du changement de mot de passe")
  }
}
