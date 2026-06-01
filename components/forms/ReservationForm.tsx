"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationUpdateSchema, type ReservationUpdateData } from "@/lib/schemas/reservation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChambresDisponibles, updateReservation } from "@/app/actions/reservation";
import { useRouter } from "next/navigation";
import { Chambre, TypeChambreLabels } from "@/types/Chambre";
import { Reservation } from "@/types/Reservation";

interface ReservationFormProps {
  reservation: Reservation;
  currentChambre: Chambre;
}

export function ReservationForm({ reservation, currentChambre }: ReservationFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialise avec la chambre actuelle directement
  const [chambresDisponibles, setChambresDisponibles] = useState<Chambre[]>([currentChambre]);
  const [chambresLoading, setChambresLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReservationUpdateData>({
    resolver: zodResolver(reservationUpdateSchema),
    defaultValues: {
      chambreId: reservation.chambreId,
      nombrePersonnes: reservation.nombrePersonnes,
      dateArrivee: reservation.dateArrivee,
      dateDepart: reservation.dateDepart,
      remiseAppliquee: reservation.remiseAppliquee,
    },
  });

  const dateArrivee = watch("dateArrivee");
  const dateDepart = watch("dateDepart");

  useEffect(() => {
    if (dateArrivee && dateDepart && dateDepart > dateArrivee) {
      const fetchChambres = async () => {
        try {
          setChambresLoading(true);
          const data = await getChambresDisponibles(dateArrivee, dateDepart);

          // Inclut la chambre actuelle si elle n'est pas dans la liste des disponibles
          const chambreActuelleIncluse = data.some((c: Chambre) => c.id === reservation.chambreId);
          if (!chambreActuelleIncluse) {
            setChambresDisponibles([currentChambre, ...data]);
          } else {
            setChambresDisponibles(data);
          }
        } catch (err) {
          setChambresDisponibles([currentChambre]);
        } finally {
          setChambresLoading(false);
        }
      };
      fetchChambres();
    }
  }, [dateArrivee, dateDepart]);

  const handleFormSubmit = async (data: ReservationUpdateData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      await updateReservation(reservation.id, data);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/clients/${reservation.clientId}/reservations`);
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
          ✅ Réservation modifiée avec succès. Redirection en cours...
        </div>
      )}

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

      <div>
        <label htmlFor="chambreId" className="block text-sm font-medium mb-1">
          Chambre *
        </label>
        {chambresLoading ? (
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500">
            Chargement des chambres disponibles...
          </div>
        ) : (
          <select
            {...register("chambreId")}
            id="chambreId"
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-primary"
          >
            {chambresDisponibles.map((chambre) => (
              <option key={chambre.id} value={chambre.id}>
                Chambre {chambre.numChambre} - {TypeChambreLabels[chambre.type]} - Étage {chambre.etage}
                {chambre.id === reservation.chambreId ? " (actuelle)" : ""}
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
          {isLoading ? "Mise à jour en cours..." : "Mettre à jour la réservation"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => router.push(`/clients/${reservation.clientId}/reservations`)}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}