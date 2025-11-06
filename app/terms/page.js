// components/TermsOfService.js
"use client";

import React from "react";
import { BookOpen, AlertTriangle, Lightbulb, Calendar } from "lucide-react";

// Consistent background image from the main app
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1663517768994-a65e6ab3a40a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600";

const TermsOfService = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center text-gray-200"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        backgroundColor: "#0f172a", // Fallback dark color
      }}
    >
      {/* Dark Overlay/Vignette for Contrast */}
      <div className="absolute inset-0 bg-black/70 backdrop-brightness-50"></div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-10 pt-16 pb-20">
        {/* --- Header (Font 1: Impactful Sans-serif) --- */}
        <header className="mb-12 border-b border-indigo-500/50 pb-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight flex items-center mb-2">
            <BookOpen className="w-8 h-8 mr-4 text-indigo-400" />
            Terms of Service
          </h1>
          <p className="text-xl text-cyan-300 font-light">
            Agreement for Using the Expense-Tracker Financial Service.
          </p>
        </header>

        {/* --- Last Updated Date (Font 4: Monospace/Accent) --- */}
        <div className="mb-12 flex items-center text-sm font-mono text-gray-400">
          <Calendar className="w-4 h-4 mr-2 text-red-400" />
          Effective Date: October 15, 2025
        </div>

        {/* --- Policy Sections --- */}
        <section className="space-y-10">
          {/* Section 1: Acceptance */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 tracking-wide flex items-center">
              <Lightbulb className="w-6 h-6 mr-3 text-cyan-400" />
              1. Your Acceptance
            </h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using the **Expense-Tracker** application Service
              you agree to be bound by these **Terms of Service** Terms. These
              Terms affect your legal rights and obligations. If you do not
              agree to be bound by all of these Terms do not access or use the
              Service.
            </p>
          </div>

          {/* Section 2: Account and Use */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-green-400 mb-4 tracking-wide">
              2. User Accounts and Content
            </h2>

            {/* Subsection */}
            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-green-500 pl-3">
              Account Responsibilities
            </h3>
            <p className="text-gray-300 mb-4">
              You are responsible for any activity that occurs through your
              account and you agree you will not sell transfer license or assign
              your account to anyone else. You represent that all information
              you provide or provided to us upon registration is true accurate
              and complete.
            </p>

            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-green-500 pl-3">
              Accuracy of Financial Data
            </h3>
            <p className="text-gray-300 leading-relaxed">
              The Service is a tool for personal record-keeping. You are solely
              responsible for the accuracy of all transaction data entered.
              **Expense-Tracker** is not a licensed financial advisor and
              provides **no financial advice investment advice or tax advice**.
              The projections and summaries displayed are for informational
              purposes only.
            </p>
          </div>

          {/* Section 3: Limitations */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-red-400 mb-4 tracking-wide flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-400" />
              3. Limitation of Liability
            </h2>
            <p className="text-gray-300 mb-4">
              The Service is provided on an **as is and as available basis**. We
              do not warrant that the Service will be uninterrupted error-free
              or completely secure.
            </p>
            <p className="text-gray-300 mb-4">
              **Expense-Tracker** shall not be liable for any damages including
              without limitation direct indirect incidental or consequential
              damages resulting from your use or inability to use the Service
              even if **Expense-Tracker** has been advised of the possibility of
              such damages.
            </p>
          </div>

          {/* Section 4: Termination and Contact */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-400 mb-4 tracking-wide">
              4. Termination and Changes
            </h2>

            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-indigo-500 pl-3">
              Termination
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may terminate or suspend your access to the Service immediately
              without prior notice or liability for any reason including without
              limitation if you breach the Terms. Upon termination your right to
              use the Service will immediately cease.
            </p>

            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-indigo-500 pl-3">
              Governing Law
            </h3>
            <p className="text-gray-300">
              These Terms shall be governed and construed in accordance with the
              laws of **Your Jurisdiction/State** without regard to its conflict
              of law provisions.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
