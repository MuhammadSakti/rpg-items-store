"use client";

import { Sword, Shield, Zap, Weight, Star, Coins, ChevronRight } from "lucide-react";
import type { GameItem } from "@/data/items";

interface ItemCardProps {
  item: GameItem;
  onSelect: (item: GameItem) => void;
  onAddToCart: (item: GameItem) => void;
}

const categoryIcons: Record<string, string> = {
  sword: "Sword",
  knife: "Dagger",
  bow: "Bow",
  staff: "Staff",
  shield: "Shield",
  axe: "Axe",
  spear: "Spear",
  hammer: "Hammer",
};

export default function ItemCard({ item, onSelect, onAddToCart }: ItemCardProps) {
  return (
    <article
      id={`item-${item.id}`}
      data-testid={`item-card-${item.id}`}
      data-item-id={item.id}
      data-category={item.category}
      data-rarity={item.rarity}
      className={`group relative rounded-xl border bg-surface p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 cursor-pointer rarity-${item.rarity}-bg`}
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name} - ${item.rarity} ${item.category}, Level ${item.level}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      {/* Rarity badge */}
      <span
        className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rarity-${item.rarity}`}
        data-testid={`rarity-badge-${item.id}`}
      >
        {item.rarity}
      </span>

      {/* Item icon area */}
      <div
        className="mb-3 flex h-20 items-center justify-center rounded-lg bg-surface-light"
        data-testid={`item-icon-${item.id}`}
        aria-hidden="true"
      >
        <span className="font-heading text-2xl text-primary-light">
          {categoryIcons[item.category]}
        </span>
      </div>

      {/* Item name */}
      <h3
        className={`mb-1 font-heading text-sm tracking-wide rarity-${item.rarity}`}
        data-testid={`item-name-${item.id}`}
      >
        {item.name}
      </h3>

      {/* Category + Level */}
      <p
        className="mb-3 text-xs text-muted"
        data-testid={`item-meta-${item.id}`}
      >
        {item.category.charAt(0).toUpperCase() + item.category.slice(1)} &middot; Lvl {item.level}
      </p>

      {/* Stats */}
      <div
        className="mb-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs"
        data-testid={`item-stats-${item.id}`}
      >
        <div className="flex items-center gap-1.5" data-testid={`stat-damage-${item.id}`}>
          <Sword className="h-3 w-3 text-danger" aria-hidden="true" />
          <span className="text-muted">DMG</span>
          <span className="ml-auto font-semibold text-foreground">{item.damage}</span>
        </div>
        <div className="flex items-center gap-1.5" data-testid={`stat-defense-${item.id}`}>
          <Shield className="h-3 w-3 text-secondary" aria-hidden="true" />
          <span className="text-muted">DEF</span>
          <span className="ml-auto font-semibold text-foreground">{item.defense}</span>
        </div>
        <div className="flex items-center gap-1.5" data-testid={`stat-speed-${item.id}`}>
          <Zap className="h-3 w-3 text-gold" aria-hidden="true" />
          <span className="text-muted">SPD</span>
          <span className="ml-auto font-semibold text-foreground">{item.speed}</span>
        </div>
        <div className="flex items-center gap-1.5" data-testid={`stat-weight-${item.id}`}>
          <Weight className="h-3 w-3 text-muted" aria-hidden="true" />
          <span className="text-muted">WGT</span>
          <span className="ml-auto font-semibold text-foreground">{item.weight}</span>
        </div>
      </div>

      {/* Price + Actions */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1" data-testid={`item-price-${item.id}`}>
          <Coins className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          <span className="text-sm font-bold text-gold">
            {item.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted">gold</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-testid={`add-to-cart-${item.id}`}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-primary-light cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            aria-label={`Add ${item.name} to cart`}
          >
            Add
          </button>
          <button
            type="button"
            data-testid={`view-details-${item.id}`}
            className="rounded-lg border border-border p-1.5 text-muted transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            aria-label={`View details for ${item.name}`}
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Effects preview */}
      {item.effects.length > 0 && (
        <div
          className="mt-2 flex flex-wrap gap-1"
          data-testid={`item-effects-${item.id}`}
        >
          {item.effects.slice(0, 2).map((effect, i) => (
            <span
              key={i}
              className="rounded-md bg-surface-light px-1.5 py-0.5 text-[10px] text-secondary"
              data-testid={`effect-tag-${item.id}-${i}`}
            >
              {effect}
            </span>
          ))}
          {item.effects.length > 2 && (
            <span className="rounded-md bg-surface-light px-1.5 py-0.5 text-[10px] text-muted">
              +{item.effects.length - 2} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}
