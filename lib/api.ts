
import { cookies } from "next/headers"
export const API_BASE_URL = "http://localhost:5241/api"

export async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `bearer ${token}` }),
  }
}