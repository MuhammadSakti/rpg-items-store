"use client";

import { Sword, ShoppingCart, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { currentUser, isAuthenticated } = useAuth();

  return (
    <header
      id="top-bar"
      data-testid="app-header"
      className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
        data-testid="primary-nav"
      >
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          data-testid="brand-link"
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
          data-testid="nav-links-desktop"
        >
          <Link
            href="/"
            className="nav-item text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary cursor-pointer"
            data-testid="link-home"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              href="/inventory"
              className="nav-item text-sm font-medium text-muted transition-colors duration-200 hover:text-primary cursor-pointer"
              data-testid="link-inventory"
            >
              Inventory
            </Link>
          )}
          <Link
            href="/about"
            className="nav-item text-sm font-medium text-muted transition-colors duration-200 hover:text-primary cursor-pointer"
            data-testid="link-about"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3" data-testid="toolbar-actions">
          <Link
            href="/cart"
            id="btn-cart"
            data-testid="btn-shopping-cart"
            className="relative rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-surface-light hover:text-foreground cursor-pointer"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white"
                data-testid="cart-count-badge"
                aria-hidden="true"
              >
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated && currentUser ? (
            <Link
              href="/profile"
              id="btn-profile"
              data-testid="btn-user-profile"
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface-light cursor-pointer"
              aria-label={`Profile: ${currentUser.displayName}`}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/30 text-[10px] font-bold text-primary"
                data-testid="header-user-avatar"
                aria-hidden="true"
              >
                {currentUser.displayName.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="hidden sm:inline" data-testid="header-user-name">{currentUser.displayName}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              id="btn-login"
              data-testid="btn-login-header"
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
              aria-label="Login"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            id="btn-hamburger"
            data-testid="btn-mobile-menu"
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
          data-testid="mobile-drawer"
          role="menu"
        >
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-light cursor-pointer"
            data-testid="mobile-link-home"
            role="menuitem"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              href="/inventory"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-light cursor-pointer"
              data-testid="mobile-link-inventory"
              role="menuitem"
            >
              Inventory
            </Link>
          )}
          <Link
            href="/about"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-light cursor-pointer"
            data-testid="mobile-link-about"
            role="menuitem"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
