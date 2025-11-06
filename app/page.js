// app/page.js
"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { DollarSign } from "lucide-react";
import DashboardContent from "./components/DashboardContent.js";

export default function Home() {
  const AppName = "Expense-Tracker";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* WHEN USER IS SIGNED OUT - Hero Section */}
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-gray-950 to-gray-800">
          {/* Main H1: Responsive and keyword-rich title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6 max-w-4xl leading-tight">
            <DollarSign className="inline w-8 h-8 md:w-10 md:h-10 mr-2 -mt-2" />
            Master Your Money: The Ultimate {AppName} for Clarity and Control
          </h1>

          {/* Main description: Keyword-rich and compelling */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light">
            <b>{AppName} </b>provides real-time, stunning visualization of your
            spending. Stop guessing, start <b>budgeting</b>, and achieve
            <b>financial freedom</b> with our intuitive and powerful{" "}
            <b>expense tracking</b> tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-sm sm:max-w-none">
            <SignInButton mode="modal">
              <button className="flex-1 px-8 py-3 sm:px-10 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xl transition duration-300 transform hover:scale-[1.02] ring-4 ring-indigo-500/50">
                Sign In & Get Started
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="flex-1 px-8 py-3 sm:px-10 sm:py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-xl transition duration-300 transform hover:scale-[1.02]">
                Create Account (Free)
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>

      {/* WHEN USER IS SIGNED IN - Render Dashboard Content */}
      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </div>
  );
}
