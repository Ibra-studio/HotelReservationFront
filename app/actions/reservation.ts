"use server"

import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { ReservationCreateData, ReservationUpdateData } from "@/lib/schemas/reservation"

export async function createReservation(data: ReservationCreateData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur create : ${response.status}`)
  }
}

export async function getChambresDisponibles(dateArrivee: string, dateDepart: string) {
  const response = await fetch(
    `${API_BASE_URL}/Chambre/disponibles?dateArrivee=${dateArrivee}&dateDepart=${dateDepart}`,{
    method: "GET",
    headers: await getAuthHeaders(),
    }
  )
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur réactivation : ${response.status}`)
  }
  return response.json()
}

export async function getReservationById(reservationId: string) {
  const response = await fetch(`${API_BASE_URL}/Reservations/${reservationId}`, {
    method: "GET",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur fetch : ${response.status}`)
  }
  return response.json()
}

export async function checkIn (ReservationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations/${ReservationId}/checkin`, {
    method: "PUT",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur réactivation : ${response.status}`)
  }
}

export async function checkOut (ReservationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations/${ReservationId}/checkout`, {
    method: "PUT",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur réactivation : ${response.status}`)
  }
}
export async function annulerReservation (ReservationId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations/${ReservationId}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur annulation : ${response.status}`)
  }
}

export async function updateReservation(reservationId: string, data: ReservationUpdateData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Reservations/${reservationId}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Erreur mise à jour : ${response.status}`)
  }
}