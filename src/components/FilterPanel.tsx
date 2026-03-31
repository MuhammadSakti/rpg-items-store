"use client";

import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, RARITIES, type ItemCategory, type Rarity } from "@/data/items";

interface FilterPanelProps {
  selectedCategories: ItemCategory[];
  selectedRarities: Rarity[];
  onCategoryChange: (categories: ItemCategory[]) => void;
  onRarityChange: (rarities: Rarity[]) => void;
  minLevel: number;
  maxLevel: number;
  onMinLevelChange: (level: number) => void;
  onMaxLevelChange: (level: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterPanel({
  selectedCategories,
  selectedRarities,
  onCategoryChange,
  onRarityChange,
  minLevel,
  maxLevel,
  onMinLevelChange,
  onMaxLevelChange,
  sortBy,
  onSortChange,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const toggleCategory = (cat: ItemCategory) => {
    if (selectedCategories.includes(cat)) {
      onCategoryChange(selectedCategories.filter((c) => c !== cat));
    } else {
      onCategoryChange([...selectedCategories, cat]);
    }
  };

  const toggleRarity = (rar: Rarity) => {
    if (selectedRarities.includes(rar)) {
      onRarityChange(selectedRarities.filter((r) => r !== rar));
    } else {
      onRarityChange([...selectedRarities, rar]);
    }
  };

  return (
    <aside
      id="filter-panel"
      data-testid="filter-panel"
      className="w-full rounded-xl border border-border bg-surface p-4 lg:w-64"
      aria-label="Item filters"
    >
      <button
        type="button"
        data-testid="filter-toggle"
        className="flex w-full items-center justify-between text-left cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="filter-content"
      >
        <span className="flex items-center gap-2 font-heading text-sm tracking-wider text-foreground">
          <Filter className="h-4 w-4 text-primary" aria-hidden="true" />
          FILTERS
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted" aria-hidden="true" />
        )}
      </button>

      {expanded && (
        <div id="filter-content" className="mt-4 space-y-5" data-testid="filter-content">
          {/* Sort */}
          <div data-testid="sort-section">
            <label
              htmlFor="sort-select"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted"
            >
              Sort By
            </label>
            <select
              id="sort-select"
              name="sortBy"
              data-testid="sort-select"
              className="w-full rounded-lg border border-border bg-surface-light px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary cursor-pointer"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort items by"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="damage-desc">Damage (High-Low)</option>
              <option value="damage-asc">Damage (Low-High)</option>
              <option value="price-desc">Price (High-Low)</option>
              <option value="price-asc">Price (Low-High)</option>
              <option value="level-asc">Level (Low-High)</option>
              <option value="level-desc">Level (High-Low)</option>
            </select>
          </div>

          {/* Category filter */}
          <fieldset data-testid="category-filter">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Category
            </legend>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.value}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-surface-light"
                  data-testid={`category-option-${cat.value}`}
                >
                  <input
                    type="checkbox"
                    name={`category-${cat.value}`}
                    data-testid={`category-checkbox-${cat.value}`}
                    className="h-4 w-4 rounded border-border bg-surface-light text-primary accent-primary cursor-pointer"
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => toggleCategory(cat.value)}
                    aria-label={`Filter by ${cat.label}`}
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Rarity filter */}
          <fieldset data-testid="rarity-filter">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Rarity
            </legend>
            <div className="space-y-1.5">
              {RARITIES.map((rar) => (
                <label
                  key={rar.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-light rarity-${rar.value}`}
                  data-testid={`rarity-option-${rar.value}`}
                >
                  <input
                    type="checkbox"
                    name={`rarity-${rar.value}`}
                    data-testid={`rarity-checkbox-${rar.value}`}
                    className="h-4 w-4 rounded border-border bg-surface-light accent-primary cursor-pointer"
                    checked={selectedRarities.includes(rar.value)}
                    onChange={() => toggleRarity(rar.value)}
                    aria-label={`Filter by ${rar.label} rarity`}
                  />
                  <span>{rar.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Level range */}
          <div data-testid="level-filter">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
              Level Range
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="min-level" className="sr-only">Minimum level</label>
              <input
                type="number"
                id="min-level"
                name="minLevel"
                data-testid="min-level-input"
                className="w-full rounded-lg border border-border bg-surface-light px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Min"
                min={1}
                max={50}
                value={minLevel || ""}
                onChange={(e) => onMinLevelChange(Number(e.target.value))}
                aria-label="Minimum level"
              />
              <span className="text-muted" aria-hidden="true">-</span>
              <label htmlFor="max-level" className="sr-only">Maximum level</label>
              <input
                type="number"
                id="max-level"
                name="maxLevel"
                data-testid="max-level-input"
                className="w-full rounded-lg border border-border bg-surface-light px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Max"
                min={1}
                max={50}
                value={maxLevel || ""}
                onChange={(e) => onMaxLevelChange(Number(e.target.value))}
                aria-label="Maximum level"
              />
            </div>
          </div>

          {/* Reset filters */}
          <button
            type="button"
            id="reset-filters"
            data-testid="reset-filters-button"
            className="w-full rounded-lg border border-border bg-surface-light px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-danger hover:text-danger cursor-pointer"
            onClick={() => {
              onCategoryChange([]);
              onRarityChange([]);
              onMinLevelChange(0);
              onMaxLevelChange(0);
              onSortChange("name-asc");
            }}
            aria-label="Reset all filters"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </aside>
  );
}
