# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a **mock web application** — not a real product. It exists solely as a test target for the [autoheal-pw-locator-java](../autoheal-pw-locator-java) library, which uses AI to self-heal broken Playwright/Selenium selectors. The companion test project is [pw-cucumber-java-auto-heal](../pw-cucumber-java-auto-heal).

Changes to this app directly affect automation test suites. When modifying elements, be aware that `data-testid`, `id`, `name`, `aria-label`, and `role` attributes are used as locators by external test projects.

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build (verifies no TS/compile errors)
npm run lint     # ESLint
npm start        # Serve production build
```

## Architecture

Next.js 16 App Router + TypeScript + Tailwind CSS 4. All pages are client-side rendered (`"use client"`). No backend/API routes.

### Data Layer

`src/data/items.ts` — Single source of truth for all game items. Contains 24 RPG items with typed interfaces (`GameItem`, `ItemCategory`, `Rarity`). All filtering, sorting, and display logic derives from this array. No database or API calls.

### Pages

- `/` (`src/app/page.tsx`) — Main catalog. Owns all state: search, filters, sort, cart, selected item, toast. Composes all components.
- `/inventory` (`src/app/inventory/page.tsx`) — Self-contained inventory with equip/unequip/remove actions and summary stats. Uses first 6 items from data as initial state.
- `/about` (`src/app/about/page.tsx`) — Static info + contact form with submit/success state toggle.

### Component Pattern

All components are in `src/components/`. They are stateless presentation components that receive data and callbacks via props, except:
- `Header` — manages mobile menu open/close state
- `ItemDetailModal` — manages quantity state and `<dialog>` ref
- `Toast` — manages auto-dismiss timer

### Automation Locator Strategy

Every interactive element has multiple locator attributes for test diversity:
- `data-testid` — primary locator (e.g., `data-testid="item-card-excalibur"`)
- `id` — on key elements (e.g., `id="item-search"`, `id="sort-select"`)
- `data-*` attributes — `data-item-id`, `data-category`, `data-rarity`, `data-equipped`
- `name` — on form inputs
- `aria-label` — on all interactive elements
- `role` — semantic roles on lists, menu items, alerts

When adding new elements, always include `data-testid` and `aria-label` at minimum.

### Styling

Dark RPG theme defined via CSS custom properties in `globals.css`. Rarity tiers (common/uncommon/rare/epic/legendary) have dedicated color classes (`.rarity-common`, `.rarity-legendary-bg`). Fonts: Russo One (headings) + Chakra Petch (body) loaded via Google Fonts CSS import.

@AGENTS.md
