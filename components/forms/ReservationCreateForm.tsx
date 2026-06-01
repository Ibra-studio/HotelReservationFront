"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationCreateSchema, type ReservationCreateData } from "@/lib/schemas/reservation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createReservation, getChambresDisponibles } from "@/app/actions/reservation";
import { useRouter } from "next/navigation";
import { Chambre, TypeChambreLabels } from "@/types/Chambre";

interface ReservationCreateFormProps {
  clientId: string; // on reçoit directement le clientId
}

export function ReservationCreateForm({ clientId }: ReservationCreateFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chambresDisponibles, setChambresDisponibles] = useState<Chambre[]>([]);
  const [chambresLoading, setChambresLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationCreateData>({
    resolver: zodResolver(reservationCreateSchema),
    defaultValues: {
      clientId: clientId, // injecté directement
      chambreId: "",
      nombrePersonnes: 1,
      dateArrivee: new Date().toISOString().split("T")[0],
      dateDepart: "",
      remiseAppliquee: 0,
    },
  });

  const dateArrivee = watch("dateArrivee");
  const dateDepart = watch("dateDepart");
  const chambreId = watch("chambreId");

  useEffect(() => {
    if (dateArrivee && dateDepart && dateDepart > dateArrivee) {
      const fetchChambres = async () => {
        try {
          setChambresLoading(true);
          setValue("chambreId", ""); // reset la chambre si les dates changent
          const data = await getChambresDisponibles(dateArrivee, dateDepart);
          setChambresDisponibles(data);
        } catch (err) {
          setChambresDisponibles([]);
        } finally {
          setChambresLoading(false);
        }
      };
      fetchChambres();
    }
  }, [dateArrivee, dateDepart]);

  const handleFormSubmit = async (data: ReservationCreateData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      await createReservation(data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/clients"); // retour vers /clients
      }, 1500);
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
          ✅ Réservation créée avec succès. Redirection en cours...
        </div>
      )}

      {/* clientId caché */}
      <input {...register("clientId")} type="hidden" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateArrivee" className="block text-sm font-medium mb-1">
            Date d'arrivée *
          </label>
          <Input
            {...register("dateArrivee")}
            id="dateArrivee"
            type="date"
            disabled={isLoading}
          />
          {errors.dateArrivee && (
            <p className="text-red-500 text-sm mt-1">{errors.dateArrivee.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="dateDepart" className="block text-sm font-medium mb-1">
            Date de départ *
          </label>
          <Input
            {...register("dateDepart")}
            id="dateDepart"
            type="date"
            disabled={isLoading}
          />
          {errors.dateDepart && (
            <p className="text-red-500 text-sm mt-1">{errors.dateDepart.message}</p>
          )}
        </div>
      </div>

      {/* Chambre — affichée seulement si les deux dates sont remplies */}
      <div>
        <label htmlFor="chambreId" className="block text-sm font-medium mb-1">
          Chambre *
        </label>
        {!dateArrivee || !dateDepart ? (
          <div className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-400">
            Sélectionnez d'abord les dates
          </div>
        ) : chambresLoading ? (
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500">
            Chargement des chambres disponibles...
          </div>
        ) : chambresDisponibles.length === 0 ? (
          <div className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 text-red-800">
            Aucune chambre disponible pour ces dates
          </div>
        ) : (
          <select
            {...register("chambreId")}
            id="chambreId"
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-primary"
          >
            <option value="">Sélectionnez une chambre</option>
            {chambresDisponibles.map((chambre) => (
              <option key={chambre.id} value={chambre.id}>
                Chambre {chambre.numChambre} - {TypeChambreLabels[chambre.type]} - Étage {chambre.etage}
              </option>
            ))}
          </select>
        )}
        {errors.chambreId && (
          <p className="text-red-500 text-sm mt-1">{errors.chambreId.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombrePersonnes" className="block text-sm font-medium mb-1">
            Nombre de personnes *
          </label>
          <Input
            {...register("nombrePersonnes", { valueAsNumber: true })}
            id="nombrePersonnes"
            type="number"
            min="1"
            max="10"
            disabled={isLoading}
          />
          {errors.nombrePersonnes && (
            <p className="text-red-500 text-sm mt-1">{errors.nombrePersonnes.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="remiseAppliquee" className="block text-sm font-medium mb-1">
            Remise (%)
          </label>
          <Input
            {...register("remiseAppliquee", { valueAsNumber: true })}
            id="remiseAppliquee"
            type="number"
            min="0"
            max="100"
            step="0.01"
            disabled={isLoading}
          />
          {errors.remiseAppliquee && (
            <p className="text-red-500 text-sm mt-1">{errors.remiseAppliquee.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading || success} className="flex-1">
          {isLoading ? "Création en cours..." : "Créer la réservation"}
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