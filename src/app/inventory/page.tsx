"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { items } from "@/data/items";
import Header from "@/components/Header";
import { Sword, Shield, Zap, Weight, Coins, Trash2, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function InventoryPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [inventory, setInventory] = useState(
    items.slice(0, 6).map((item) => ({ ...item, equipped: false }))
  );

  const toggleEquip = (id: string) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, equipped: !item.equipped } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-background" data-testid="inventory-page">
        <Header />
        <main className="mx-auto w-full max-w-md flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div
            className="rounded-xl border border-border bg-surface py-16 text-center"
            data-testid="inventory-login-required"
          >
            <Lock className="mx-auto mb-4 h-12 w-12 text-muted" aria-hidden="true" />
            <h1 className="mb-2 font-heading text-xl tracking-wider text-foreground">
              LOGIN REQUIRED
            </h1>
            <p className="mb-6 text-sm text-muted">
              You need to log in to access your inventory.
            </p>
            <button
              type="button"
              data-testid="btn-go-to-login"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light cursor-pointer"
              onClick={() => router.push("/login")}
              aria-label="Go to login page"
            >
              Go to Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background" data-testid="inventory-page">
      <Header />

      <main
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 lg:px-8"
        data-testid="inventory-content"
      >
        <h1
          className="mb-6 font-heading text-2xl tracking-wider text-foreground neon-text"
          data-testid="inventory-title"
        >
          YOUR INVENTORY
        </h1>

        {inventory.length === 0 ? (
          <div className="py-20 text-center" data-testid="inventory-empty">
            <p className="text-muted">Your inventory is empty.</p>
          </div>
        ) : (
          <div className="space-y-3" data-testid="inventory-list" role="list">
            {inventory.map((item) => (
              <div
                key={item.id}
                data-testid={`inventory-item-${item.id}`}
                data-item-id={item.id}
                data-equipped={item.equipped}
                className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                  item.equipped
                    ? "border-primary bg-primary/5"
                    : "border-border bg-surface"
                }`}
                role="listitem"
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    item.equipped ? "bg-primary/20" : "bg-surface-light"
                  }`}
                  aria-hidden="true"
                >
                  <span className={`font-heading text-sm rarity-${item.rarity}`}>
                    {item.category.slice(0, 3).toUpperCase()}
                  </span>
                </div>

                {/* Name + Meta */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate font-heading text-sm tracking-wide rarity-${item.rarity}`}
                    data-testid={`inventory-item-name-${item.id}`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted">
                    Lvl {item.level} &middot;{" "}
                    <span className={`rarity-${item.rarity}`}>{item.rarity}</span>
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden gap-4 text-xs sm:flex" data-testid={`inventory-stats-${item.id}`}>
                  <span className="flex items-center gap-1">
                    <Sword className="h-3 w-3 text-danger" aria-hidden="true" />
                    {item.damage}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-secondary" aria-hidden="true" />
                    {item.defense}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-gold" aria-hidden="true" />
                    {item.speed}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-testid={`equip-button-${item.id}`}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                      item.equipped
                        ? "bg-primary text-white"
                        : "border border-border text-muted hover:border-primary hover:text-primary"
                    }`}
                    onClick={() => toggleEquip(item.id)}
                    aria-label={item.equipped ? `Unequip ${item.name}` : `Equip ${item.name}`}
                    aria-pressed={item.equipped}
                  >
                    {item.equipped ? "Equipped" : "Equip"}
                  </button>
                  <button
                    type="button"
                    data-testid={`remove-button-${item.id}`}
                    className="rounded-lg border border-border p-1.5 text-muted transition-colors duration-200 hover:border-danger hover:text-danger cursor-pointer"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from inventory`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inventory summary */}
        <div
          className="mt-6 rounded-xl border border-border bg-surface p-4"
          data-testid="inventory-summary"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Inventory Summary
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div data-testid="summary-total-items">
              <span className="block text-xs text-muted">Total Items</span>
              <span className="text-lg font-bold text-foreground">{inventory.length}</span>
            </div>
            <div data-testid="summary-equipped">
              <span className="block text-xs text-muted">Equipped</span>
              <span className="text-lg font-bold text-primary">
                {inventory.filter((i) => i.equipped).length}
              </span>
            </div>
            <div data-testid="summary-total-damage">
              <span className="block text-xs text-muted">Total Damage</span>
              <span className="text-lg font-bold text-danger">
                {inventory.filter((i) => i.equipped).reduce((s, i) => s + i.damage, 0)}
              </span>
            </div>
            <div data-testid="summary-total-defense">
              <span className="block text-xs text-muted">Total Defense</span>
              <span className="text-lg font-bold text-secondary">
                {inventory.filter((i) => i.equipped).reduce((s, i) => s + i.defense, 0)}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
