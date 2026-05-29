"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientCreateSchema, type ClientCreateData } from "@/lib/schemas/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/app/actions/client";
import { useRouter } from "next/navigation";

export function ClientCreateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientCreateData>({
    resolver: zodResolver(clientCreateSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      numPieceIdentite: "",
      numeroTelephone: "",
      email: "",
      adresse: "",
      estActif: true,
    },
  });

  const handleFormSubmit = async (data: ClientCreateData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      await createClient(data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/clients");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue"
      );
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
          ✅ Client créé avec succès. Redirection en cours...
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium mb-1">
            Nom *
          </label>
          <Input
            {...register("nom")}
            id="nom"
            placeholder="Entrez le nom"
            disabled={isLoading}
          />
          {errors.nom && (
            <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="prenom" className="block text-sm font-medium mb-1">
            Prénom *
          </label>
          <Input
            {...register("prenom")}
            id="prenom"
            placeholder="Entrez le prénom"
            disabled={isLoading}
          />
          {errors.prenom && (
            <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Entrez l'email"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="numeroTelephone" className="block text-sm font-medium mb-1">
          Numéro de téléphone *
        </label>
        <Input
          {...register("numeroTelephone")}
          id="numeroTelephone"
          placeholder="Entrez le numéro de téléphone"
          disabled={isLoading}
        />
        {errors.numeroTelephone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.numeroTelephone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="numPieceIdentite" className="block text-sm font-medium mb-1">
          Numéro de pièce d'identité *
        </label>
        <Input
          {...register("numPieceIdentite")}
          id="numPieceIdentite"
          placeholder="Entrez le numéro de pièce d'identité"
          disabled={isLoading}
        />
        {errors.numPieceIdentite && (
          <p className="text-red-500 text-sm mt-1">
            {errors.numPieceIdentite.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="adresse" className="block text-sm font-medium mb-1">
          Adresse *
        </label>
        <Input
          {...register("adresse")}
          id="adresse"
          placeholder="Entrez l'adresse"
          disabled={isLoading}
        />
        {errors.adresse && (
          <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          {...register("estActif")}
          id="estActif"
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300"
          defaultChecked
        />
        <label htmlFor="estActif" className="text-sm font-medium">
          Client actif
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading || success} className="flex-1 flex justify-center items-center">
          {isLoading ? "Création en cours..." : "Créer le client"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => router.push("/clients")}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
