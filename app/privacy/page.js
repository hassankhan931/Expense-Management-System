// components/PrivacyPolicy.js
"use client";

import React from "react";
import { Lock, Shield, Mail, Calendar } from "lucide-react";

// Consistent background image from the main app
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1736843638421-9c3770d28c91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687";

/**
 * 💡 FONT STRATEGY:
 * 1. Primary Headings (H1, H2): Bold, impactful, slightly modern (e.g., a strong sans-serif).
 * 2. Secondary Headings (H3): Clean, slightly differentiated (e.g., a different weight of the primary font).
 * 3. Body Text (P): Highly readable, classic (e.g., a simple, clean sans-serif).
 * 4. Accent/Meta (Dates, small notes): Monospace or stylized font for distinction.
 *
 * NOTE: For simplicity in a single file component, we rely on Tailwind's default font stack
 * and use utility classes (font-serif, font-mono) combined with weight classes
 * (font-extrabold, font-light) to simulate 3-4 distinct font 'types'.
 */

const PrivacyPolicy = () => {
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
            <Lock className="w-8 h-8 mr-4 text-cyan-400" />
            Privacy Policy
          </h1>
          <p className="text-xl text-indigo-300 font-light">
            Your Trust is Our Priority.
          </p>
        </header>

        {/* --- Last Updated Date (Font 4: Monospace/Accent) --- */}
        <div className="mb-12 flex items-center text-sm font-mono text-gray-400">
          <Calendar className="w-4 h-4 mr-2 text-red-400" />
          Last Updated: October 15, 2025
        </div>

        {/* --- Policy Sections --- */}
        <section className="space-y-10">
          {/* Section 1: Introduction (Font 3: Readable Body Text) */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 tracking-wide flex items-center">
              <Shield className="w-6 h-6 mr-3 text-cyan-400" />
              1. Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              This Privacy Policy explains how <b>Expense-Tracker</b> we , us or
              our collects, uses, and discloses information about you when you
              use our web application the Service. We are committed to
              protecting your privacy and handling your data transparently. By
              using the Service, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </div>

          {/* Section 2: Data We Collect */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-green-400 mb-4 tracking-wide">
              2. Information We Collect
            </h2>

            {/* Subsection (Font 2: Differentiated Headings) */}
            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-green-500 pl-3">
              Personal Information (Clerk Integration)
            </h3>
            <p className="text-gray-300 mb-4">
              We use **Clerk** for authentication, which provides us with basic
              user information necessary for account management:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li className="font-medium text-indigo-300">
                User ID:{" "}
                <span className="font-light text-gray-300">
                  A unique identifier provided by Clerk.
                </span>
              </li>
              <li className="font-medium text-indigo-300">
                Email Address:{" "}
                <span className="font-light text-gray-300">
                  Used for communication and login.
                </span>
              </li>
              <li className="font-medium text-indigo-300">
                Name/Profile Info:{" "}
                <span className="font-light text-gray-300">
                  Optional, based on your Clerk profile setup.
                </span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-green-500 pl-3">
              Financial Transaction Data
            </h3>
            <p className="text-gray-300 leading-relaxed">
              When you use the Service, you provide the following financial
              data, which is securely stored and exclusively tied to your unique
              User ID:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>Transaction Type (Income/Expense)</li>
              <li>Amount</li>
              <li>Description and Category</li>
              <li>Date of Transaction</li>
            </ul>
          </div>

          {/* Section 3: How We Use Your Data */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-red-400 mb-4 tracking-wide">
              3. Use of Your Information
            </h2>
            <p className="text-gray-300 mb-4">
              We use the collected information solely for the purpose of
              providing, maintaining, and improving the Service:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4 text-gray-300">
              <li className="font-medium">
                <span className="text-red-300 font-semibold">
                  Service Functionality:
                </span>{" "}
                To display your personal transaction history and calculate your
                financial metrics (Net Balance, Total Income/Expense).
              </li>
              <li className="font-medium">
                <span className="text-red-300 font-semibold">Security:</span> To
                authenticate your access and prevent unauthorized usage of your
                data.
              </li>
              <li className="font-medium">
                <span className="text-red-300 font-semibold">Support:</span> To
                respond to your inquiries or support requests.
              </li>
            </ul>
          </div>

          {/* Section 4: Data Security and Contact */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-400 mb-4 tracking-wide">
              4. Data Security & Contact
            </h2>

            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-indigo-500 pl-3">
              Security
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The security of your data is paramount. We store your financial
              data on **MongoDB** and secure access using <b>Clerk</b>
              authentication system**. While we strive to use commercially
              acceptable means to protect your data, no method of transmission
              over the Internet is 100% secure.
            </p>

            <h3 className="text-xl font-semibold text-white mt-5 mb-2 border-l-2 border-indigo-500 pl-3 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </h3>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              <strong className="text-indigo-300 font-mono text-lg tracking-wider">
                <a href="https://hassan-khan-portfolio.netlify.app/">Website</a>
              </strong>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
