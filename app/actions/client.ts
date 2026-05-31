"use server"

import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { ClientFormData } from "@/lib/schemas/client"

// PUT
export async function updateClient(data: ClientFormData): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Clients/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Erreur update: ${response.status}`)
}

// POST
export async function createClient(data: Omit<ClientFormData, "id">): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Erreur create: ${response.status}`)
}

// DELETE
export async function deleteClient(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Clients/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  })
  if (!response.ok) throw new Error(`Erreur delete: ${response.status}`)
}

// GET ALL
export async function getClients() {
  const response = await fetch(`${API_BASE_URL}/Clients`, {
    headers: await getAuthHeaders(),
  })
  if (!response.ok) throw new Error(`Erreur fetch: ${response.status}`)
  return response.json()
}
export async function getClientById(id: string) {
  console.log("Fetching client with ID:", id)
  const response = await fetch(`${API_BASE_URL}/Clients/${id}`, {
    headers: await getAuthHeaders(),
  })
  if (!response.ok) throw new Error(`Erreur fetch: ${response.status}`)
  return response.json()
}