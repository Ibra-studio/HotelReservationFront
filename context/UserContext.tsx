"use client"

import { createContext, useContext } from "react"

interface CurrentUser {
  userId: string
  role?: string
    email?: string
    avatar?: string
}

const UserContext = createContext<CurrentUser | null>(null)

export function UserProvider({ user, children }: { user: CurrentUser | null, children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useCurrentUser() {
  return useContext(UserContext)
}