"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chambreCreateSchema, type ChambreCreateData } from "@/lib/schemas/chambre";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createChambre } from "@/app/actions/chambre";
import { useRouter } from "next/navigation";
import { TypeChambre } from "@/types/Chambre";
import { MultiSelectEquipements } from "../ui/MultiSelectEquipements";
import { Equipement } from "@/types/Equipement";

interface ChambreCreateFormProps {
  equipements: Equipement[];
}

export function ChambreCreateForm({equipements}: ChambreCreateFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ChambreCreateData>({
    resolver: zodResolver(chambreCreateSchema),
    defaultValues: {
      numChambre: "",
      type: TypeChambre.Simple,
      etage: 0,
      capaciteAccueil: 1,
      description: "",
      equipementIds: [],
    },
  });
   const selectedIds = watch("equipementIds");
  const handleFormSubmit = async (data: ChambreCreateData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      await createChambre(data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/chambres");
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
          ✅ Chambre créée avec succès. Redirection en cours...
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="numChambre" className="block text-sm font-medium mb-1">
            Numéro de chambre *
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
            Type de chambre *
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
            Étage *
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
            Capacité d'accueil *
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
      {/* Section équipements */}
            
              <div>
               <label className="block text-sm font-medium mb-2">Équipements</label>
               <MultiSelectEquipements
                      equipements={equipements}
                      selectedIds= {selectedIds ?? []}
                      onChange={(ids) => setValue("equipementIds", ids)}
                      disabled={isLoading}
                />
                  {errors.equipementIds && (
                      <p className="text-red-500 text-sm mt-1">{errors.equipementIds.message}</p>
                  )}
              </div>
      
        <Button type="submit" disabled={isLoading || success} className="w-full ">
          {isLoading ? "Création en cours..." : "Créer la chambre"}
        </Button>
        
     
    </form>
  );
}
