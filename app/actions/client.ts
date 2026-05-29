"use server"

import { API_BASE_URL } from "@/lib/api"
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
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error(`Erreur delete: ${response.status}`)
}