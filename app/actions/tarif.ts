"use server"

import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { TarifCreateData, TarifUpdateData } from "@/lib/schemas/tarif"
import { TarifDto } from "@/types/Tarif"

export async function getTarifs(): Promise<TarifDto[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/Tarifs`,
      {
        headers: await getAuthHeaders(),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const tarifs = await response.json();
    return tarifs;

  } catch (error) {
    console.error("Erreur fetch tarifs :", error);
    return [];
  }
}

export async function getTarifById(id: string): Promise<TarifDto | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/Tarifs/${id}`, {
      headers: await getAuthHeaders(),
      cache: "no-store",
    })

    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
    return await response.json()

  } catch (error) {
    console.error("Erreur fetch tarif by id :", error)
    return null
  }
}

export async function createTarif(data: TarifCreateData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Tarifs`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur création : ${response.status}`)
  }
}

export async function updateTarif(id: string, data: TarifUpdateData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Tarifs/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur mise à jour : ${response.status}`)
  }
}
