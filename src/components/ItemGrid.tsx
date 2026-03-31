"use client";

import { Package } from "lucide-react";
import type { GameItem } from "@/data/items";
import ItemCard from "./ItemCard";

interface ItemGridProps {
  items: GameItem[];
  onSelectItem: (item: GameItem) => void;
  onAddToCart: (item: GameItem) => void;
}

export default function ItemGrid({ items, onSelectItem, onAddToCart }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        data-testid="empty-state"
        role="status"
      >
        <Package className="mb-4 h-12 w-12 text-muted" aria-hidden="true" />
        <h3
          className="mb-2 font-heading text-lg tracking-wider text-foreground"
          data-testid="empty-state-title"
        >
          No Items Found
        </h3>
        <p className="max-w-sm text-sm text-muted" data-testid="empty-state-description">
          Try adjusting your search or filter criteria to find what you are looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      data-testid="items-grid"
      role="list"
      aria-label="Game items list"
    >
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <ItemCard
            item={item}
            onSelect={onSelectItem}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
}
