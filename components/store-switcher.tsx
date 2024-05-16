"use client"

import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-model";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, Store as StoreIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

type StoreSwitcherProps = {
  items: Store[];
};

export default function StoreSwitcher({ items = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.findLast((item) => item.value === params.storeId);

  const [selectedStore, setSelectedStore] = useState(currentStore?.value || '');

  const onStoreSelect = (store: { value: string; label: string }) => {
    setSelectedStore(store.value);
    router.push(`/${store.value}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={selectedStore!== ''}
          aria-label="Select a Store"
          className={cn("w-[200px] justify-between text-lg")}
        >
          <StoreIcon className="mr-2 h-5 w-5" />
          {currentStore?.label}
          <ChevronsUpDown className="pl-auto h-4 w-5 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="w-[200px]">
          <DropdownMenuLabel>Stores</DropdownMenuLabel>
          {formattedItems.map((store) => (
            <DropdownMenuItem
              key={store.value}
              onSelect={() => onStoreSelect(store)}
              className={cn("text-sm")}
            >
              <StoreIcon className="mr-2 h-4 w-4" />
              {store.label}
              {selectedStore === store.value && (
                <Check className="ml-auto h-5 w-5" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => storeModal.onOpen()}
            className={cn("text-md")}
          >
            New Store
            <PlusCircleIcon className="ml-auto h-5 w-5"/>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
