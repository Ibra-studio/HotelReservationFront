"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCreateSchema, type UserCreateData } from "@/lib/schemas/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import { RoleUser, RoleUserLabels } from "@/types/User";

export function UserForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateData>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      nom: "",
      courriel: "",
      role: RoleUser.Receptionniste,
      password: "",
    },
  });

  const handleFormSubmit = async (data: UserCreateData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      await createUser(data);

      setSuccess(true);
      setTimeout(() => router.push("/users"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 text-primary">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          ✅ Utilisateur créé avec succès. Redirection en cours...
        </div>
      )}

      <div>
        <label htmlFor="nom" className="block text-sm font-medium mb-1">
          Nom *
        </label>
        <Input
          {...register("nom")}
          id="nom"
          type="text"
          placeholder="Jean Dupont"
          disabled={isLoading}
        />
        {errors.nom && (
          <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="courriel" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <Input
          {...register("courriel")}
          id="courriel"
          type="email"
          placeholder="jean@example.com"
          disabled={isLoading}
        />
        {errors.courriel && (
          <p className="text-red-500 text-sm mt-1">{errors.courriel.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-1">
          Rôle *
        </label>
        <select
          {...register("role", { valueAsNumber: true })}
          id="role"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {Object.entries(RoleUserLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Mot de passe *
        </label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading || success} className="w-full">
        {isLoading ? "Création en cours..." : "Créer l'utilisateur"}
      </Button>
    </form>
  );
}
