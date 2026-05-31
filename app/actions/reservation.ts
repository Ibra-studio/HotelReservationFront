"use server"

import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { ReservationCreateData } from "@/lib/schemas/reservation"

export async function createReservation(data: ReservationCreateData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Erreur create: ${response.status}`)
}

export async function getChambresDisponibles(dateArrivee: string, dateDepart: string) {
  const response = await fetch(
    `${API_BASE_URL}/Chambre/disponibles?dateArrivee=${dateArrivee}&dateDepart=${dateDepart}`,{
    method: "GET",
    headers: await getAuthHeaders(),
    }
  )
  if (!response.ok) throw new Error(`Erreur fetch: ${response.status}`)
  return response.json()
}

export async function checkIn (ReservationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations/${ReservationId}/checkin`, {
    method: "PUT",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) throw new Error(`Erreur check-in: ${response.status}`)
}

export async function checkOut (ReservationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations/${ReservationId}/checkout`, {
    method: "PUT",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) throw new Error(`Erreur check-out: ${response.status}`)
}
export async function annulerReservation (ReservationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations/${ReservationId}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) throw new Error(`Erreur annulation: ${response.status}`)
}