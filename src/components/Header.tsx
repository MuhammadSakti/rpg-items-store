"use client";

import { Sword, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header({ cartCount }: { cartCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="main-header"
      data-testid="header"
      className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
        data-testid="main-nav"
      >
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          data-testid="logo-link"
          aria-label="RPG Items Finder - Home"
        >
          <Sword className="h-7 w-7 text-primary" aria-hidden="true" />
          <span className="font-heading text-xl tracking-wider text-foreground">
            RPG ITEMS FINDER
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          className="hidden items-center gap-6 md:flex"
          data-testid="desktop-nav"
        >
          <Link
            href="/"
            className="nav-link text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary cursor-pointer"
            data-testid="nav-home"
          >
            Home
          </Link>
          <Link
            href="/inventory"
            className="nav-link text-sm font-medium text-muted transition-colors duration-200 hover:text-primary cursor-pointer"
            data-testid="nav-inventory"
          >
            Inventory
          </Link>
          <Link
            href="/about"
            className="nav-link text-sm font-medium text-muted transition-colors duration-200 hover:text-primary cursor-pointer"
            data-testid="nav-about"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3" data-testid="header-actions">
          <button
            type="button"
            id="cart-button"
            data-testid="cart-button"
            className="relative rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-surface-light hover:text-foreground cursor-pointer"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white"
                data-testid="cart-badge"
                aria-hidden="true"
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            id="profile-button"
            data-testid="profile-button"
            className="rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-surface-light hover:text-foreground cursor-pointer"
            aria-label="User profile"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            id="mobile-menu-toggle"
            data-testid="mobile-menu-toggle"
            className="rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-surface-light hover:text-foreground md:hidden cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t border-border bg-surface px-4 py-3 md:hidden"
          data-testid="mobile-menu"
          role="menu"
        >
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-light cursor-pointer"
            data-testid="mobile-nav-home"
            role="menuitem"
          >
            Home
          </Link>
          <Link
            href="/inventory"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-light cursor-pointer"
            data-testid="mobile-nav-inventory"
            role="menuitem"
          >
            Inventory
          </Link>
          <Link
            href="/about"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-light cursor-pointer"
            data-testid="mobile-nav-about"
            role="menuitem"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
