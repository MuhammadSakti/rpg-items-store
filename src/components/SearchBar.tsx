"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div
      className="relative w-full max-w-md"
      data-testid="search-container"
    >
      <label htmlFor="item-search" className="sr-only">
        Search items
      </label>
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        id="item-search"
        name="search"
        data-testid="search-input"
        className="w-full rounded-lg border border-border bg-surface-light py-2.5 pl-10 pr-10 text-sm text-foreground placeholder-muted outline-none transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary"
        placeholder="Search weapons, armor..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label="Search items by name or description"
      />
      {value && (
        <button
          type="button"
          data-testid="search-clear-button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground cursor-pointer"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
