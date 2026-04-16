"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Coins, Check } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    setCheckoutDone(true);
    clearCart();
  };

  if (checkoutDone) {
    return (
      <div className="flex min-h-screen flex-col bg-background" data-testid="cart-page">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div
            className="rounded-xl border border-success/30 bg-success/10 p-8 text-center"
            data-testid="checkout-success"
            role="alert"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <Check className="h-8 w-8 text-success" aria-hidden="true" />
            </div>
            <h2
              className="mb-2 font-heading text-xl tracking-wider text-foreground"
              data-testid="checkout-success-title"
            >
              ORDER PLACED!
            </h2>
            <p className="mb-6 text-sm text-muted">
              Your items have been sent to the blacksmith for preparation.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light"
              data-testid="btn-continue-shopping"
              aria-label="Continue shopping"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background" data-testid="cart-page">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <h1
            className="mb-6 font-heading text-2xl tracking-wider text-foreground neon-text"
            data-testid="cart-title"
          >
            YOUR CART
          </h1>
          <div
            className="rounded-xl border border-border bg-surface py-16 text-center"
            data-testid="cart-empty-state"
          >
            <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted" aria-hidden="true" />
            <p className="mb-4 text-sm text-muted">Your cart is empty.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light"
              data-testid="btn-browse-items"
              aria-label="Browse items"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Browse Items
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background" data-testid="cart-page">
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <h1
          className="mb-6 font-heading text-2xl tracking-wider text-foreground neon-text"
          data-testid="cart-title"
        >
          YOUR CART
        </h1>

        {/* Cart items list */}
        <div
          className="mb-6 space-y-3"
          data-testid="cart-items-list"
          role="list"
          aria-label="Cart items"
        >
          {cartItems.map(({ item, quantity }) => (
            <div
              key={item.id}
              data-testid={`cart-item-${item.id}`}
              data-item-id={item.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4"
              role="listitem"
            >
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg rarity-${item.rarity}-bg`}
                aria-hidden="true"
              >
                <span className={`font-heading text-xs rarity-${item.rarity}`}>
                  {item.category.slice(0, 3).toUpperCase()}
                </span>
              </div>

              {/* Name + info */}
              <div className="min-w-0 flex-1">
                <h3
                  className={`truncate font-heading text-sm tracking-wide rarity-${item.rarity}`}
                  data-testid={`cart-item-name-${item.id}`}
                >
                  {item.name}
                </h3>
                <p className="text-xs text-muted">
                  <span className={`rarity-${item.rarity}`}>{item.rarity}</span>
                  {" · "}
                  <span className="text-gold">{item.price.toLocaleString()} gold each</span>
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2" data-testid={`cart-qty-controls-${item.id}`}>
                <button
                  type="button"
                  data-testid={`btn-decrease-qty-${item.id}`}
                  className="rounded-md border border-border p-1 text-muted transition-colors hover:border-primary hover:text-primary disabled:opacity-40 cursor-pointer"
                  onClick={() => updateQuantity(item.id, quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span
                  className="min-w-[2rem] text-center text-sm font-bold text-foreground"
                  data-testid={`cart-item-qty-${item.id}`}
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  data-testid={`btn-increase-qty-${item.id}`}
                  className="rounded-md border border-border p-1 text-muted transition-colors hover:border-primary hover:text-primary cursor-pointer"
                  onClick={() => updateQuantity(item.id, quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="hidden text-right sm:block" data-testid={`cart-item-subtotal-${item.id}`}>
                <span className="text-sm font-bold text-gold">
                  {(item.price * quantity).toLocaleString()}
                </span>
                <span className="block text-xs text-muted">gold</span>
              </div>

              {/* Remove */}
              <button
                type="button"
                data-testid={`btn-remove-${item.id}`}
                className="rounded-lg border border-border p-1.5 text-muted transition-colors duration-200 hover:border-danger hover:text-danger cursor-pointer"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart summary */}
        <div
          className="rounded-xl border border-border bg-surface p-6"
          data-testid="cart-summary"
        >
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
            Order Summary
          </h2>

          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted">Items</span>
            <span className="font-semibold text-foreground" data-testid="cart-item-count">
              {cartCount}
            </span>
          </div>

          <div className="mb-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm font-semibold text-foreground">Total</span>
            <span className="flex items-center gap-1.5" data-testid="cart-total">
              <Coins className="h-4 w-4 text-gold" aria-hidden="true" />
              <span className="text-lg font-bold text-gold">
                {cartTotal.toLocaleString()}
              </span>
              <span className="text-sm text-muted">gold</span>
            </span>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              data-testid="btn-clear-cart"
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-muted transition-colors duration-200 hover:border-danger hover:text-danger cursor-pointer"
              onClick={clearCart}
              aria-label="Clear cart"
            >
              Clear Cart
            </button>
            <button
              type="button"
              data-testid="btn-checkout"
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light cursor-pointer"
              onClick={handleCheckout}
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
