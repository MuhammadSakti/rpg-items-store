"use client";

import { useState, useMemo, useCallback } from "react";
import { items as allItems, type GameItem, type ItemCategory, type Rarity } from "@/data/items";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import ItemGrid from "@/components/ItemGrid";
import ItemDetailModal from "@/components/ItemDetailModal";
import StatsBar from "@/components/StatsBar";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ItemCategory[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<Rarity[]>([]);
  const [minLevel, setMinLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const { addToCart } = useCart();

  const filteredItems = useMemo(() => {
    let result = allItems.filter((item) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        if (
          !item.name.toLowerCase().includes(q) &&
          !item.description.toLowerCase().includes(q) &&
          !item.category.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
        return false;
      }
      // Rarity
      if (selectedRarities.length > 0 && !selectedRarities.includes(item.rarity)) {
        return false;
      }
      // Level
      if (minLevel > 0 && item.level < minLevel) return false;
      if (maxLevel > 0 && item.level > maxLevel) return false;
      return true;
    });

    // Sort
    const [field, direction] = sortBy.split("-");
    result.sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "damage":
          comparison = a.damage - b.damage;
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "level":
          comparison = a.level - b.level;
          break;
        default:
          comparison = 0;
      }
      return direction === "desc" ? -comparison : comparison;
    });

    return result;
  }, [search, selectedCategories, selectedRarities, minLevel, maxLevel, sortBy]);

  const legendaryCount = useMemo(
    () => filteredItems.filter((i) => i.rarity === "legendary").length,
    [filteredItems]
  );

  const handleAddToCart = useCallback((item: GameItem, quantity = 1) => {
    addToCart(item, quantity);
    setToast({ visible: true, message: `${item.name} added to cart!` });
  }, [addToCart]);

  const handleCloseToast = useCallback(() => {
    setToast({ visible: false, message: "" });
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col bg-background"
      data-testid="app-container"
    >
      <Header />

      <main
        id="main-content"
        data-testid="main-content"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8"
        role="main"
      >
        {/* Hero section */}
        <section
          className="mb-6 text-center"
          data-testid="hero-section"
          aria-label="Welcome"
        >
          <h1
            className="mb-2 font-heading text-3xl tracking-wider text-foreground neon-text sm:text-4xl"
            data-testid="page-title"
          >
            RPG ITEMS FINDER
          </h1>
          <p
            className="text-sm text-muted sm:text-base"
            data-testid="page-subtitle"
          >
            Discover legendary weapons and gear for your adventure
          </p>
        </section>

        {/* Search */}
        <div className="mb-6 flex justify-center" data-testid="search-section">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsBar
            totalItems={allItems.length}
            filteredCount={filteredItems.length}
            legendaryCount={legendaryCount}
          />
        </div>

        {/* Content: Filters + Grid */}
        <div className="flex flex-col gap-6 lg:flex-row" data-testid="content-layout">
          <FilterPanel
            selectedCategories={selectedCategories}
            selectedRarities={selectedRarities}
            onCategoryChange={setSelectedCategories}
            onRarityChange={setSelectedRarities}
            minLevel={minLevel}
            maxLevel={maxLevel}
            onMinLevelChange={setMinLevel}
            onMaxLevelChange={setMaxLevel}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="flex-1" data-testid="items-section">
            <ItemGrid
              items={filteredItems}
              onSelectItem={setSelectedItem}
              onAddToCart={(item) => handleAddToCart(item)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        id="main-footer"
        data-testid="footer"
        className="border-t border-border bg-surface px-4 py-6 text-center"
        role="contentinfo"
      >
        <p className="text-xs text-muted" data-testid="footer-text">
          RPG Items Finder &middot; Mock Project for Automation Testing
        </p>
        <p className="mt-1 text-xs text-muted" data-testid="footer-version">
          Version 1.0.0
        </p>
      </footer>

      {/* Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={handleCloseToast}
      />
    </div>
  );
}
