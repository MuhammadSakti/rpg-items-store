"use client";

import Header from "@/components/Header";
import { Sword, Shield, Zap, Users, Mail } from "lucide-react";
import { useState } from "react";

export default function AboutPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background" data-testid="about-page">
      <Header />

      <main
        className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 lg:px-8"
        data-testid="about-content"
      >
        <h1
          className="mb-6 font-heading text-2xl tracking-wider text-foreground neon-text"
          data-testid="about-title"
        >
          ABOUT THIS PROJECT
        </h1>

        {/* Description */}
        <section
          className="mb-8 rounded-xl border border-border bg-surface p-6"
          data-testid="about-description"
        >
          <h2 className="mb-3 font-heading text-lg tracking-wider text-foreground">
            Mock Project for Automation
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-muted">
            This RPG Items Finder is a mock web application built specifically for testing
            automation frameworks. It provides a rich set of interactive UI elements with
            diverse locator strategies including IDs, data-testid attributes, ARIA labels,
            CSS classes, and semantic HTML structure.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            The project serves as a test target for the AutoHeal Playwright Locator library,
            which uses AI to self-heal broken element selectors during automated testing.
          </p>
        </section>

        {/* Features */}
        <section
          className="mb-8"
          data-testid="features-section"
          aria-label="Key features"
        >
          <h2 className="mb-4 font-heading text-lg tracking-wider text-foreground">
            KEY FEATURES
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Sword,
                title: "Item Catalog",
                desc: "24 RPG items across 8 categories with detailed stats and effects.",
                testId: "feature-catalog",
              },
              {
                icon: Shield,
                title: "Filter & Search",
                desc: "Multi-criteria filtering by category, rarity, and level range.",
                testId: "feature-filter",
              },
              {
                icon: Zap,
                title: "Interactive UI",
                desc: "Modals, toasts, cart system, equip/unequip, and quantity controls.",
                testId: "feature-interactive",
              },
              {
                icon: Users,
                title: "Accessibility",
                desc: "ARIA labels, keyboard navigation, semantic HTML, and focus management.",
                testId: "feature-a11y",
              },
            ].map((feature) => (
              <div
                key={feature.testId}
                className="rounded-xl border border-border bg-surface p-4"
                data-testid={feature.testId}
              >
                <feature.icon className="mb-2 h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mb-1 font-heading text-sm tracking-wider text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form - for form automation testing */}
        <section
          className="mb-8 rounded-xl border border-border bg-surface p-6"
          data-testid="contact-section"
        >
          <h2 className="mb-4 font-heading text-lg tracking-wider text-foreground">
            CONTACT US
          </h2>

          {submitted ? (
            <div
              className="rounded-lg border border-success/30 bg-success/10 p-4 text-center"
              data-testid="contact-success"
              role="alert"
            >
              <p className="text-sm font-medium text-success" data-testid="success-message">
                Thank you for your message! We will get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              aria-label="Contact form"
            >
              <div className="mb-4">
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  Name <span className="text-danger" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  data-testid="contact-name-input"
                  className="w-full rounded-lg border border-border bg-surface-light px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  Email <span className="text-danger" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  data-testid="contact-email-input"
                  className="w-full rounded-lg border border-border bg-surface-light px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  Message <span className="text-danger" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  data-testid="contact-message-input"
                  className="w-full rounded-lg border border-border bg-surface-light px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your message..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                id="submit-contact"
                data-testid="contact-submit-button"
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light cursor-pointer sm:w-auto sm:px-8"
              >
                Send Message
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
