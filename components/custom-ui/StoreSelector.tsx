"use client";

import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  PlusCircleIcon,
  Store as StoreIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useStoreModel } from "@/hooks/use-store-model";

export function StoreSelector({ items }: { items: Store[] }) {
  const params = useParams();
  const router = useRouter();
  const storeModel = useStoreModel();

  const [open, setOpen] = useState(false);

  const currentStore = items.find(({ id }) => id === params.storeId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <StoreIcon className="mr-2 h-4 w-4 " />
          {currentStore?.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found</CommandEmpty>
          <CommandGroup>
            {items?.map(({ name, id }) => (
              <CommandItem
                key={id}
                value={name}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/${id}`);
                }}
              >
                {name}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentStore?.id === id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              className="space-x-2"
              onSelect={() => {
                storeModel.onOpen();
                setOpen(false);
              }}
            >
              <PlusCircleIcon />
              <p>Create Store</p>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
