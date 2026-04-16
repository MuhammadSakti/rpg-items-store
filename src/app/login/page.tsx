"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, Eye, EyeOff, Info } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { mockUsers } from "@/data/users";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(username, password);
    if (success) {
      router.push("/profile");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  if (isAuthenticated && currentUser) {
    return (
      <div className="flex min-h-screen flex-col bg-background" data-testid="auth-page">
        <Header />
        <main className="mx-auto w-full max-w-md flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div
            className="rounded-xl border border-border bg-surface p-6 text-center"
            data-testid="authenticated-panel"
          >
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
              data-testid="user-profile-avatar"
              aria-label={`Profile picture for ${currentUser.displayName}`}
            >
              <span className="font-heading text-xl text-primary">
                {currentUser.displayName.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <h1
              className="mb-2 font-heading text-xl tracking-wider text-foreground"
              data-testid="greeting-text"
            >
              Welcome back, {currentUser.displayName}!
            </h1>
            <p className="mb-6 text-sm text-muted">
              You are logged in as <span className="font-semibold text-primary">{currentUser.role}</span>
            </p>
            <button
              type="button"
              data-testid="sign-out-button"
              id="sign-out-btn"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-muted transition-colors duration-200 hover:border-danger hover:text-danger cursor-pointer"
              onClick={logout}
              aria-label="Sign out of account"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log Out
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background" data-testid="auth-page">
      <Header />

      <main className="mx-auto w-full max-w-md flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <h1
          className="mb-6 text-center font-heading text-2xl tracking-wider text-foreground neon-text"
          data-testid="auth-heading"
        >
          SIGN IN
        </h1>

        <form
          onSubmit={handleSubmit}
          data-testid="authentication-form"
          aria-label="Authentication form"
          className="rounded-xl border border-border bg-surface p-6"
        >
          {error && (
            <div
              className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              data-testid="auth-error-message"
              role="status"
            >
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="user-field"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
            >
              Username
            </label>
            <input
              type="text"
              id="user-field"
              name="user"
              data-testid="user-field"
              className="w-full rounded-lg border border-border bg-surface-light px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
              aria-label="Enter username"
              autoComplete="username"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="pass-field"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="pass-field"
                name="pass"
                data-testid="pass-field"
                className="w-full rounded-lg border border-border bg-surface-light px-3 py-2.5 pr-10 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                aria-label="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                data-testid="toggle-pass-visibility"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted transition-colors hover:text-foreground cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Conceal password" : "Reveal password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="submit-login"
            data-testid="submit-login"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light cursor-pointer"
            aria-label="Submit credentials"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign In
          </button>
        </form>

        {/* Test credentials hint */}
        <div
          className="mt-6 rounded-xl border border-border bg-surface p-4"
          data-testid="test-accounts-info"
          aria-label="Demo account credentials"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            Test Credentials
          </div>
          <div className="space-y-2">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg bg-surface-light px-3 py-2 text-xs"
                data-testid={`account-${user.username}`}
              >
                <span className="text-foreground">
                  <span className="font-semibold">{user.username}</span>
                  <span className="text-muted"> / </span>
                  <span className="text-muted">{user.password}</span>
                </span>
                <span className="text-primary">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
