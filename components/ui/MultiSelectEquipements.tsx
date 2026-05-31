"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { getEquipementIcon } from "@/lib/utils";

interface Equipement {
  id: string;
  nom: string;
}

interface MultiSelectEquipementsProps {
  equipements: Equipement[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}

export function MultiSelectEquipements({
  equipements,
  selectedIds,
  onChange,
  disabled,
}: MultiSelectEquipementsProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((e) => e !== id)
      : [...selectedIds, id];
    onChange(updated);
  };

  const remove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedIds.filter((e) => e !== id));
  };

  const selectedEquipements = equipements.filter((e) => selectedIds.includes(e.id));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled}
          className="w-full justify-start h-auto min-h-10 flex-wrap gap-2 font-normal"
        >
          {selectedEquipements.length === 0 ? (
            <span className="text-muted-foreground">Sélectionner des équipements...</span>
          ) : (
            selectedEquipements.map((eq) => {
              const Icon = getEquipementIcon(eq.nom);
              return (
                <Badge key={eq.id} variant="secondary" className="flex items-center gap-1">
                  <Icon className="w-3 h-3" />
                  {eq.nom}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive"
                    onClick={(e) => remove(eq.id, e)}
                  />
                </Badge>
              );
            })
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Rechercher un équipement..." />
          <CommandList>
            <CommandEmpty>Aucun équipement trouvé.</CommandEmpty>
            <CommandGroup>
              {equipements.map((eq) => {
                const Icon = getEquipementIcon(eq.nom);
                const isSelected = selectedIds.includes(eq.id);
                return (
                  <CommandItem
                    key={eq.id}
                    value={eq.nom}
                    onSelect={() => toggle(eq.id)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{eq.nom}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}