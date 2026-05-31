"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chambreFormSchema, type ChambreFormData } from "@/lib/schemas/chambre";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateChambre } from "@/app/actions/chambre";
import { TypeChambre, StatutChambre,  Chambre } from "@/types/Chambre";
import { getEquipementIcon } from "@/lib/utils";
import { MultiSelectEquipements } from "../ui/MultiSelectEquipements";
import { Equipement } from "@types/Equipement";

interface ChambreFormProps {
  chambre: Chambre;
   equipements: Equipement[];
  isLoading?: boolean;
}

export function ChambreForm({ chambre, equipements, isLoading = false }: ChambreFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch, 
    setValue,   
    formState: { errors },
  } = useForm<ChambreFormData>({
    resolver: zodResolver(chambreFormSchema),
    defaultValues: {
      id: chambre.id,
      numChambre: chambre.numChambre,
      type: chambre.type,           // ex: TypeChambre.Simple = 0
      etage: chambre.etage,
      capaciteAccueil: chambre.capaciteAccueil,
      equipementIds: chambre.equipements?.map(e => e.id) ?? [],
      description: chambre.description || "",
      statut: chambre.statut,       // ex: StatutChambre.Disponible = 0
    },
  });
 const selectedIds = watch("equipementIds");
  const handleFormSubmit = async (data: ChambreFormData) => {
    try {
      setError(null);
      setSuccess(false);
      await updateChambre(data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
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
          ✅ Chambre mise à jour avec succès.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="numChambre" className="block text-sm font-medium mb-1">
            Numéro de chambre
          </label>
          <Input
            {...register("numChambre")}
            id="numChambre"
            placeholder="Ex: 101"
            disabled={isLoading}
          />
          {errors.numChambre && (
            <p className="text-red-500 text-sm mt-1">{errors.numChambre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-1">
            Type de chambre
          </label>
          <select
            {...register("type", { valueAsNumber: true })}
            id="type"
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-primary"
          >
            <option value={TypeChambre.Simple}>Simple</option>
            <option value={TypeChambre.Double}>Double</option>
            <option value={TypeChambre.Suite}>Suite</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="etage" className="block text-sm font-medium mb-1">
            Étage
          </label>
          <Input
            {...register("etage", { valueAsNumber: true })}
            id="etage"
            type="number"
            placeholder="0"
            disabled={isLoading}
          />
          {errors.etage && (
            <p className="text-red-500 text-sm mt-1">{errors.etage.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="capaciteAccueil" className="block text-sm font-medium mb-1">
            Capacité d'accueil
          </label>
          <Input
            {...register("capaciteAccueil", { valueAsNumber: true })}
            id="capaciteAccueil"
            type="number"
            placeholder="1"
            disabled={isLoading}
          />
          {errors.capaciteAccueil && (
            <p className="text-red-500 text-sm mt-1">{errors.capaciteAccueil.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          placeholder="Description de la chambre"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="statut" className="block text-sm font-medium mb-1">
          Statut
        </label>
        <select
          {...register("statut", { valueAsNumber: true })}
          id="statut"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-primary"
        >
          <option value={StatutChambre.Disponible}>Disponible</option>
          <option value={StatutChambre.Occupée}>Occupée</option>
          <option value={StatutChambre.EnMaintenance}>En maintenance</option>
          <option value={StatutChambre.Desactivee}>Désactivée</option>
        </select>
        {errors.statut && (
          <p className="text-red-500 text-sm mt-1">{errors.statut.message}</p>
        )}
      </div>

      {/* Section équipements */}
      
        <div>
         <label className="block text-sm font-medium mb-2">Équipements</label>
         <MultiSelectEquipements
                equipements={equipements}
                selectedIds={selectedIds ?? []}
                onChange={(ids) => setValue("equipementIds", ids)}
                disabled={isLoading}
          />
            {errors.equipementIds && (
                <p className="text-red-500 text-sm mt-1">{errors.equipementIds.message}</p>
            )}
        </div>
      

      <input {...register("id")} type="hidden" />

      <Button type="submit" disabled={isLoading} className="w-full flex justify-center items-center">
        {isLoading ? "Mise à jour en cours..." : "Mettre à jour la chambre"}
      </Button>
    </form>
  );
}