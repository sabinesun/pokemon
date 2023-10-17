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
import { type Dispatch, type SetStateAction, useState } from "react";
import * as React from "react";

const pokemonType = [
  { label: "all", value: "all" },
  { label: "bug", value: "bug" },
  { label: "dark", value: "dark" },
  { label: "dragon", value: "dragon" },
  { label: "electric", value: "electric" },
  { label: "fairy", value: "fairy" },
  { label: "fighting", value: "fighting" },
  { label: "fire", value: "fire" },
  { label: "flying", value: "flying" },
  { label: "ghost", value: "ghost" },
  { label: "grass", value: "grass" },
  { label: "ground", value: "ground" },
  { label: "ice", value: "ice" },
  { label: "normal", value: "normal" },
  { label: "poison", value: "poison" },
  { label: "psychic", value: "psychic" },
  { label: "rock", value: "rock" },
  { label: "steel", value: "steel" },
  { label: "water", value: "water" },
];

export type PokemonType = {
  label: string;
  value: string;
};

export type ComboboxProps = {
  readonly selectedType: PokemonType | null;
  readonly setSelectedType: Dispatch<SetStateAction<PokemonType | null>>;
};

export const ComboboxPopover = ({
  selectedType,
  setSelectedType,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-4 flex items-center space-x-4 py-1">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button className="h-8 w-[125px] justify-center ">
            {selectedType ? <>{selectedType.label}</> : <> Filter Type </>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[150px] p-0" side="bottom">
          <Command>
            <CommandInput placeholder="Filter type..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {pokemonType.map((type) => (
                  <CommandItem
                    key={type.value}
                    onSelect={(value) => {
                      setSelectedType(
                        pokemonType.find(
                          (priority) => priority.value === value,
                        ) || null,
                      );
                      setOpen(false);
                    }}
                  >
                    {type.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
