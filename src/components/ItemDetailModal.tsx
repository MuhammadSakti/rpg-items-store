"use client";

import { X, Sword, Shield, Zap, Weight, Coins, Star, Plus, Minus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { GameItem } from "@/data/items";

interface ItemDetailModalProps {
  item: GameItem | null;
  onClose: () => void;
  onAddToCart: (item: GameItem, quantity: number) => void;
}

export default function ItemDetailModal({ item, onClose, onAddToCart }: ItemDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (item) {
      setQuantity(1);
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const statBars = [
    { label: "Damage", value: item.damage, max: 130, icon: Sword, color: "bg-danger" },
    { label: "Defense", value: item.defense, max: 80, icon: Shield, color: "bg-secondary" },
    { label: "Speed", value: item.speed, max: 10, icon: Zap, color: "bg-gold" },
  ];

  return (
    <dialog
      ref={dialogRef}
      id="item-detail-modal"
      data-testid="item-detail-modal"
      className="fixed inset-0 z-50 m-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-0 text-foreground backdrop:bg-black/60"
      aria-label={`Item details: ${item.name}`}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="p-6" data-testid="modal-content">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2
              id="modal-title"
              data-testid="modal-item-name"
              className={`font-heading text-xl tracking-wider rarity-${item.rarity}`}
            >
              {item.name}
            </h2>
            <p
              className="mt-1 text-sm text-muted"
              data-testid="modal-item-category"
            >
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)} &middot;{" "}
              <span
                className={`font-semibold rarity-${item.rarity}`}
                data-testid="modal-item-rarity"
              >
                {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
              </span>
            </p>
          </div>
          <button
            type="button"
            data-testid="modal-close-button"
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-light hover:text-foreground cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Item visual */}
        <div
          className={`mb-5 flex h-32 items-center justify-center rounded-xl rarity-${item.rarity}-bg`}
          data-testid="modal-item-visual"
          aria-hidden="true"
        >
          <span className="font-heading text-4xl text-primary-light">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
        </div>

        {/* Description */}
        <p
          className="mb-5 text-sm leading-relaxed text-muted"
          data-testid="modal-item-description"
        >
          {item.description}
        </p>

        {/* Level + Weight */}
        <div className="mb-5 flex gap-4" data-testid="modal-item-info">
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 text-gold" aria-hidden="true" />
            <span className="text-muted">Level</span>
            <span className="font-bold text-foreground" data-testid="modal-item-level">{item.level}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Weight className="h-4 w-4 text-muted" aria-hidden="true" />
            <span className="text-muted">Weight</span>
            <span className="font-bold text-foreground" data-testid="modal-item-weight">{item.weight} kg</span>
          </div>
        </div>

        {/* Stat bars */}
        <div className="mb-5 space-y-3" data-testid="modal-stat-bars">
          {statBars.map((stat) => (
            <div key={stat.label} data-testid={`modal-stat-${stat.label.toLowerCase()}`}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted">
                  <stat.icon className="h-3 w-3" aria-hidden="true" />
                  {stat.label}
                </span>
                <span className="font-semibold text-foreground">{stat.value}</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-surface-light"
                role="progressbar"
                aria-valuenow={stat.value}
                aria-valuemin={0}
                aria-valuemax={stat.max}
                aria-label={`${stat.label}: ${stat.value} out of ${stat.max}`}
              >
                <div
                  className={`h-full rounded-full ${stat.color} transition-all duration-500`}
                  style={{ width: `${(stat.value / stat.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Effects */}
        {item.effects.length > 0 && (
          <div className="mb-5" data-testid="modal-effects-section">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Special Effects
            </h3>
            <ul className="space-y-1.5" data-testid="modal-effects-list">
              {item.effects.map((effect, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-secondary"
                  data-testid={`modal-effect-${i}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                  {effect}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Purchase section */}
        <div
          className="rounded-xl border border-border bg-surface-light p-4"
          data-testid="modal-purchase-section"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5" data-testid="modal-item-price">
              <Coins className="h-4 w-4 text-gold" aria-hidden="true" />
              <span className="text-lg font-bold text-gold">
                {item.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted">gold</span>
            </div>

            <div className="flex items-center gap-2" data-testid="quantity-selector">
              <button
                type="button"
                data-testid="quantity-decrease"
                className="rounded-md border border-border p-1 text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40 cursor-pointer"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span
                className="min-w-[2rem] text-center text-sm font-bold text-foreground"
                data-testid="quantity-value"
                aria-label={`Quantity: ${quantity}`}
              >
                {quantity}
              </span>
              <button
                type="button"
                data-testid="quantity-increase"
                className="rounded-md border border-border p-1 text-muted transition-colors hover:border-primary hover:text-primary cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-muted">Total</span>
            <span
              className="font-bold text-gold"
              data-testid="modal-total-price"
            >
              {(item.price * quantity).toLocaleString()} gold
            </span>
          </div>

          <button
            type="button"
            id="add-to-cart-modal"
            data-testid="modal-add-to-cart"
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light cursor-pointer"
            onClick={() => {
              onAddToCart(item, quantity);
              onClose();
            }}
            aria-label={`Add ${quantity} ${item.name} to cart for ${(item.price * quantity).toLocaleString()} gold`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </dialog>
  );
}
