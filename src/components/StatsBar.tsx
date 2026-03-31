"use client";

import { Sword, Shield, Zap, Gem } from "lucide-react";

interface StatsBarProps {
  totalItems: number;
  filteredCount: number;
  legendaryCount: number;
}

export default function StatsBar({ totalItems, filteredCount, legendaryCount }: StatsBarProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3"
      data-testid="stats-bar"
      role="status"
      aria-label="Item statistics"
    >
      <div className="flex items-center gap-2 text-sm" data-testid="stat-total">
        <Sword className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="text-muted">Total:</span>
        <span className="font-bold text-foreground" data-testid="total-count">{totalItems}</span>
      </div>

      <div className="h-4 w-px bg-border" aria-hidden="true" />

      <div className="flex items-center gap-2 text-sm" data-testid="stat-showing">
        <Shield className="h-4 w-4 text-secondary" aria-hidden="true" />
        <span className="text-muted">Showing:</span>
        <span className="font-bold text-foreground" data-testid="showing-count">{filteredCount}</span>
      </div>

      <div className="h-4 w-px bg-border" aria-hidden="true" />

      <div className="flex items-center gap-2 text-sm" data-testid="stat-legendary">
        <Gem className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="text-muted">Legendary:</span>
        <span className="font-bold text-accent" data-testid="legendary-count">{legendaryCount}</span>
      </div>
    </div>
  );
}
