"use server"

import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { UpdateUserFormData, ChangePasswordFormData, UserCreateData } from "@/lib/schemas/user"
import { User, UserDto } from "@/types/User"

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

export async function getUsers(): Promise<UserDto[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/User`,
      {
        headers: await getAuthHeaders(),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const users = await response.json();
    return users;

  } catch (error) {
    console.error("Erreur fetch users :", error);
    return [];
  }
}

export async function createUser(data: UserCreateData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/User`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur création : ${response.status}`)
  }
}

export async function deactivateUser(id: string): Promise<void> {
 
  const response = await fetch(`${API_BASE_URL}/User/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur désactivation : ${response.status}`)
  }
}
export async function reactivateUser(id: string): Promise<void> {
 
  const response = await fetch(`${API_BASE_URL}/User/${id}/reactiver`, {
    method: "PUT",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur réactivation : ${response.status}`)
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
