// app/page.js
"use client";

// Import 'Head' if this were a Pages Router project, but since it's App Router/Client Component,
// we just rely on the structure or use a wrapper like <NextSeo /> (not shown for simplicity).
// For the App Router, relying on the 'h1' and 'p' content is the primary client-side SEO.
// We remove the static 'metadata' export as requested.

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { DollarSign } from "lucide-react";
import DashboardContent from "./components/DashboardContent.js"; // Keeping this import for the SignedIn state

const PRODUCTION_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// --- REMOVED SEO Configuration (export const metadata) as requested ---

export default function Home() {
  const AppName = "Expense-Tracker";

  return (
    // Note: The main <html> and <head> tags are managed by the root layout in App Router.
    // The visual H1 and descriptive text are now the main SEO element on this client component.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ====================================================
        | WHEN USER IS SIGNED OUT - SEO Optimized Hero Section |
        ====================================================
      */}
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-gray-950 to-gray-800">
          {/* Main H1: Strong, keyword-rich title for SEO */}
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6 max-w-4xl leading-tight">
            <DollarSign className="inline w-10 h-10 mr-2 -mt-2" />
            Master Your Money: The Ultimate {AppName} for Clarity and Control
          </h1>

          {/* Main description: Keyword-rich and compelling */}
          <p className="text-xl text-gray-300 mb-10 max-w-2xl font-light">
            **{AppName}** provides real-time, stunning visualization of your
            spending. Stop guessing, start **budgeting**, and achieve
            **financial freedom** with our intuitive and powerful **expense
            tracking** tools.
          </p>

          <div className="flex gap-6">
            <SignInButton mode="modal">
              <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xl transition duration-300 transform hover:scale-105 ring-4 ring-indigo-500/50">
                Sign In & Get Started
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-xl transition duration-300 transform hover:scale-105">
                Create Account (Free)
              </button>
            </SignUpButton>
          </div>

          {/* Production Link Placeholder */}
          <div className="mt-12 text-gray-500 text-sm">
            Current canonical URL:{" "}
            <a
              href={PRODUCTION_URL}
              className="text-indigo-400 hover:underline"
              // Add a rel="canonical" link in the <head> of your root layout for better SEO
            >
              {PRODUCTION_URL}
            </a>
          </div>
        </div>
      </SignedOut>

      {/* ===================================================
        | WHEN USER IS SIGNED IN - Render Dashboard Content |
        ===================================================
      */}
      <SignedIn>
        {/* Renders Navbar, Main Content Placeholder, and Footer */}
        {/* We assume DashboardContent handles its own layout, including Navbar and Footer */}
        <DashboardContent />
      </SignedIn>
    </div>
  );
}
