"use server"

import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { ChambreFormData, ChambreCreateData } from "@/lib/schemas/chambre"

export async function getChambres() {
   
  try {
    const response = await fetch(
      `${API_BASE_URL}/Chambre`,
      {
        headers: await getAuthHeaders(),
        cache: "no-store" 
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const chambres = await response.json();
    return chambres;

  } catch (error) {
    console.error("Erreur fetch chambres :", error);
    return [];
  }
}
export async function updateChambre(data: ChambreFormData): Promise<void> {
  console.log("Données reçues pour updateChambre:", data)
  const response = await fetch(`${API_BASE_URL}/Chambre/${data.id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      numChambre: data.numChambre,
      type: data.type,
      capaciteAccueil: data.capaciteAccueil,
      description: data.description,
      equipementIds: data.equipementIds,
      statut:data.statut,
    }),
  })
  if (!response.ok) {
  const errorData = await response.json()
  throw new Error(errorData.message || `Erreur update: ${response.status}`)
}
}

export async function createChambre(data: ChambreCreateData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Chambre`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Erreur create: ${response.status}`)
}

export async function deleteChambre(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Chambre/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) throw new Error(`Erreur delete: ${response.status}`)
      }
export async function ajouterEquipement(chambreId: string, equipementId: string): Promise<void> { 
   const response = await fetch(`${API_BASE_URL}/Chambre/${chambreId}/ajouterEquipements/${equipementId}`, {
          method: "POST",
          headers: await getAuthHeaders(),
        })
        if (!response.ok) throw new Error(`Erreur ajouter equipement: ${response.status}`)
      }
export async function retirerEquipement(chambreId: string, equipementId: string): Promise<void> { 
        const response = await fetch(`${API_BASE_URL}/Chambre/${chambreId}/retirerEquipements/${equipementId}`, {
          method: "DELETE",
          headers: await getAuthHeaders(),
        })
        if (!response.ok) throw new Error(`Erreur retirer equipement: ${response.status}`)
      }