"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tarifCreateSchema, tarifUpdateSchema, type TarifCreateData, type TarifUpdateData } from "@/lib/schemas/tarif";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTarif, updateTarif } from "@/app/actions/tarif";
import { useRouter } from "next/navigation";
import { Season, SeasonLabels, TarifDto } from "@/types/Tarif";
import { TypeChambre, TypeChambreLabels } from "@/types/Chambre";

interface TarifFormProps {
  tarif?: TarifDto;
}

export function TarifForm({ tarif }: TarifFormProps) {
  const router = useRouter();
  const isEditMode = !!tarif;
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = isEditMode ? tarifUpdateSchema : tarifCreateSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TarifCreateData | TarifUpdateData>({
    resolver: zodResolver(schema),
    defaultValues: isEditMode ? {
      prixParNuit: tarif.prixParNuit,  // seulement le prix en mode edit
    } : {
      typeChambre: TypeChambre.Simple,
      saison: Season.HauteS,
      prixParNuit: 0,
    },
  });

  const handleFormSubmit = async (data: TarifCreateData | TarifUpdateData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      if (isEditMode) {
        await updateTarif(tarif.id, data as TarifUpdateData);
      } else {
        await createTarif(data as TarifCreateData);
      }

      setSuccess(true);
      setTimeout(() => router.push("/tarifs"), 1500);
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
          ✅ Tarif {isEditMode ? "modifié" : "créé"} avec succès. Redirection en cours...
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="typeChambre" className="block text-sm font-medium mb-1">
            Type de chambre *
          </label>
          <select
            // pas de register en mode edit — champ purement visuel
            {...(!isEditMode && register("typeChambre" as keyof TarifCreateData, { valueAsNumber: true }))}
            id="typeChambre"
            disabled={isLoading || isEditMode}
            defaultValue={isEditMode ? tarif.typeChambre : TypeChambre.Simple}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-primary disabled:opacity-60 disabled:cursor-not-allowed "
          >
            {Object.entries(TypeChambreLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          {!isEditMode && (errors as any).typeChambre && (
            <p className="text-red-500 text-sm mt-1">{(errors as any).typeChambre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="saison" className="block text-sm font-medium mb-1">
            Saison *
          </label>
          <select
            {...(!isEditMode && register("saison" as keyof TarifCreateData, { valueAsNumber: true }))}
            id="saison"
            disabled={isLoading || isEditMode}
            defaultValue={isEditMode ? tarif.saison : Season.HauteS}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-primary disabled:opacity-60 disabled:cursor-not-allowed "
          >
            {Object.entries(SeasonLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          {!isEditMode && (errors as any).saison && (
            <p className="text-red-500 text-sm mt-1">{(errors as any).saison.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="prixParNuit" className="block text-sm font-medium mb-1">
          Prix par nuit (€) *
        </label>
        <Input
          {...register("prixParNuit", { valueAsNumber: true })}
          id="prixParNuit"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          disabled={isLoading}
        />
        {errors.prixParNuit && (
          <p className="text-red-500 text-sm mt-1">{errors.prixParNuit.message}</p>
        )}
      </div>

    {isEditMode && (
  <p className="text-sm text-gray-500">
    ℹ️ Le type de chambre et la saison sont en lecture seule. Seul le prix peut être modifié. Pour changer le tarif d'un autre type ou d'une autre saison, accédez au tarif correspondant depuis la liste,ou Créez un nouveau tarif.
  </p>
)}

      <Button type="submit" disabled={isLoading || success} className="w-full">
        {isLoading
          ? (isEditMode ? "Mise à jour en cours..." : "Création en cours...")
          : (isEditMode ? "Mettre à jour le tarif" : "Créer le tarif")}
      </Button>
    </form>
  );
}