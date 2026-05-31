"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { API_BASE_URL, getAuthHeaders } from "@/lib/api"
import { LoginFormData } from "@/lib/schemas/auth"

export async function login(data: LoginFormData) {
  const response = await fetch(`${API_BASE_URL}/User/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

 // log le status et le body brut
  const responseText = await response.text()
  console.log("Status:", response.status)
  console.log("Body brut:", responseText)

  if (!response.ok) {
    throw new Error("Email ou mot de passe incorrect")
  }
 // ← parse depuis responseText, pas response.json()
  const responseData = JSON.parse(responseText)
  console.log("Response data:", responseData)

  const token = responseData.token ?? responseData.Token ?? responseData.accessToken
  console.log("Token extrait:", token)

  if (!token) {
    throw new Error("Token non trouvé dans la réponse")
  }

  const cookieStore = await cookies()
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  })

  redirect("/dashboard")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/login")
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("token")?.value ?? null
}


export async function getCurrentUser() {
  const token = await getToken()
  if (!token) return null

  const response = await fetch(`${API_BASE_URL}/User/me`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  })

  if (!response.ok) return null
  return response.json() // { userId, nom, role }
}