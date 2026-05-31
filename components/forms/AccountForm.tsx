"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateUserProfile } from "@/app/actions/user"
import { UpdateUserFormData, updateUserSchema } from "@/lib/schemas/user"
import { User } from "@/types/User"

interface AccountFormProps {
  user: User
  onSuccess?: () => void
}

export function AccountForm({ user, onSuccess }: AccountFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      nom: user.nom || "",
      email: user.email || "",
    },
  })

  async function onSubmit(data: UpdateUserFormData) {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(false)
      await updateUserProfile(user.userId, data)
      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-primary">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          ✅ Vos informations ont été mises à jour avec succès.
        </div>
      )}

     
        <div className="w-full">
          <label htmlFor="nom" className="block text-sm font-medium mb-1">Nom</label>
          <Input
            {...register("nom")}
            id="nom"
            placeholder="Votre nom"
            disabled={isLoading}
          />
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
        </div>
   

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="your.email@example.com"
          disabled={isLoading}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Mise à jour..." : "Enregistrer les modifications"}
      </Button>
    </form>
  )
}