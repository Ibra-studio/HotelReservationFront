import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

export async function getEquipements() {
   
  try {
    const response = await fetch(
      `${API_BASE_URL}/Equipements`,
      {
        headers: await getAuthHeaders(),
        cache: "no-store" 
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const equipements = await response.json();
    return equipements;

  } catch (error) {
    return [];
  }
}
