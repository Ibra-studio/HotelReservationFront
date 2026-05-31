"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { changePassword } from "@/app/actions/user"
import { ChangePasswordFormData, changePasswordSchema } from "@/lib/schemas/user"

export function ChangePasswordForm({ userId }: { userId: string | undefined } ) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ChangePasswordFormData) {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(false)
      await changePassword(userId, data)
      setSuccess(true)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-primary w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          ✅ Votre mot de passe a été changé avec succès.
        </div>
      )}

      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
          Mot de passe actuel
        </label>
        <Input
          {...register("currentPassword")}
          id="currentPassword"
          type="password"
          placeholder="Entrez votre mot de passe actuel"
          disabled={isLoading}
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
          Nouveau mot de passe
        </label>
        <Input
          {...register("newPassword")}
          id="newPassword"
          type="password"
          placeholder="Entrez votre nouveau mot de passe"
          disabled={isLoading}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirmer le mot de passe
        </label>
        <Input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          placeholder="Confirmez votre nouveau mot de passe"
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Changement en cours..." : "Changer le mot de passe"}
      </Button>
    </form>
  )
}