import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/equipementIcons.tsx
import {
  Wifi, Wind, Tv, Coffee, Bath, Lock, Car, Dumbbell,
  Utensils, Phone, Shirt, Baby, Flame, Snowflake, Volume2,
  type LucideIcon,
  Sunset
} from "lucide-react"

export const equipementIconMap: Record<string, LucideIcon> = {
  // WiFi
  "wifi": Wifi,
  "wi-fi": Wifi,
  "internet": Wifi,

  // Climatisation
  "climatisation": Wind,
  "clim": Wind,
  "ventilation": Wind,

  // Télévision
  "télévision": Tv,
  "television": Tv,
  "tv": Tv,

  // Minibar
  "minibar": Coffee,
  "mini-bar": Coffee,

  // Jacuzzi / Baignoire
  "jacuzzi": Bath,
  "baignoire": Bath,
  "bain": Bath,
  
  //balcon
  "balcon": Sunset,
  "terrasse": Sunset,


  // Coffre-fort
  "coffre-fort": Lock,
  "coffre": Lock,
  "safe": Lock,

  // Téléphone
  "téléphone": Phone,
  "telephone": Phone,

  // Sèche-linge
  "sèche-linge": Shirt,
  "machine à laver": Shirt,

  // Lit bébé
  "lit bébé": Baby,
  "berceau": Baby,

  // Cheminée
  "cheminée": Flame,
  "cheminee": Flame,

  // Réfrigérateur
  "réfrigérateur": Snowflake,
  "frigo": Snowflake,

  // Sono
  "sono": Volume2,
  "hifi": Volume2,
}

export function getEquipementIcon(nom: string): LucideIcon {
  const key = nom.toLowerCase().trim()
  return equipementIconMap[key] ?? Utensils // icône par défaut
}

export function formatDateTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}