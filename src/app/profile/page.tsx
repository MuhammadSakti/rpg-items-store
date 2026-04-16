"use client";

import { useRouter } from "next/navigation";
import { LogOut, Shield, Star, Users, Calendar, ScrollText } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex min-h-screen flex-col bg-background" data-testid="profile-page">
        <Header />
        <main className="mx-auto w-full max-w-md flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div
            className="rounded-xl border border-border bg-surface p-6 text-center"
            data-testid="profile-not-logged-in"
          >
            <p className="mb-4 text-sm text-muted">Please log in to view your profile.</p>
            <button
              type="button"
              data-testid="btn-go-to-login"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-light cursor-pointer"
              onClick={() => router.push("/login")}
              aria-label="Go to login page"
            >
              Go to Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  const initials = currentUser.displayName
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background" data-testid="profile-page">
      <Header />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <h1
          className="mb-6 font-heading text-2xl tracking-wider text-foreground neon-text"
          data-testid="profile-title"
        >
          ADVENTURER PROFILE
        </h1>

        {/* User card */}
        <div
          className="rounded-xl border border-border bg-surface p-6"
          data-testid="user-card"
        >
          {/* Header section */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/20"
              data-testid="header-user-avatar"
              aria-label={`Avatar for ${currentUser.displayName}`}
            >
              <span className="font-heading text-xl text-primary">{initials}</span>
            </div>
            <div>
              <h2
                className="font-heading text-xl tracking-wider text-foreground"
                data-testid="profile-display-name"
              >
                {currentUser.displayName}
              </h2>
              <p className="text-sm text-muted">@{currentUser.username}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div
            className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
            data-testid="profile-stats"
          >
            <div className="rounded-lg bg-surface-light p-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                Role
              </div>
              <span
                className="text-sm font-bold text-primary"
                data-testid="profile-role"
              >
                {currentUser.role}
              </span>
            </div>
            <div className="rounded-lg bg-surface-light p-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                Level
              </div>
              <span
                className="text-sm font-bold text-gold"
                data-testid="profile-level"
              >
                {currentUser.level}
              </span>
            </div>
            <div className="rounded-lg bg-surface-light p-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Guild
              </div>
              <span
                className="text-sm font-bold text-secondary"
                data-testid="profile-guild"
              >
                {currentUser.guild}
              </span>
            </div>
            <div className="rounded-lg bg-surface-light p-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Joined
              </div>
              <span
                className="text-sm font-bold text-foreground"
                data-testid="profile-join-date"
              >
                {new Date(currentUser.joinDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6" data-testid="profile-bio-section">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
              <ScrollText className="h-3.5 w-3.5" aria-hidden="true" />
              Bio
            </div>
            <p
              className="text-sm leading-relaxed text-muted"
              data-testid="profile-bio"
            >
              {currentUser.bio}
            </p>
          </div>

          {/* Logout button */}
          <button
            type="button"
            id="btn-logout"
            data-testid="btn-logout"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-muted transition-colors duration-200 hover:border-danger hover:text-danger cursor-pointer"
            onClick={handleLogout}
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log Out
          </button>
        </div>
      </main>
    </div>
  );
}
