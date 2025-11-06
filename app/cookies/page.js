// components/CookiePolicy.js
"use client";

import React from "react";
import { Cookie, Info } from "lucide-react";

// Use the consistent blue background URL for continuity
const BACKGROUND_IMAGE_URL =
  "https://media.istockphoto.com/id/182191709/photo/textured-background.jpg?s=612x612&w=0&k=20&c=T-D6XfxBSd1gDNKpAIhdefIpIxm-gd_qUtX0G8l3XcY=";

export default function CookiePolicy() {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        backgroundColor: "#0f172a",
      }}
    >
      {/* Dark Overlay/Vignette for Contrast, same as other pages */}
      <div className="absolute inset-0 bg-black/70 backdrop-brightness-50"></div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <header className="mb-8 pt-8 text-center">
          <Cookie className="w-12 h-12 mx-auto mb-3 text-indigo-400" />
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="text-gray-400 mt-2">Last Updated: October 15, 2025</p>
        </header>

        {/* --- Policy Container with Consistent UI --- */}
        {/* Same transparent, blurred UI as the services page */}
        <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-10 rounded-xl shadow-2xl border border-white/10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-indigo-400 mb-3 flex items-center">
              <Info className="w-6 h-6 mr-2" /> What Are Cookies?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Cookies are small pieces of data stored on your device (computer,
              tablet, or mobile phone) when you visit a website. They are widely
              used to make websites work, or work more efficiently, as well as
              to provide information to the owners of the site.
            </p>
          </section>

          <hr className="border-white/10" />

          <section>
            <h2 className="text-2xl font-bold text-indigo-400 mb-3">
              How We Use Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="space-y-3 list-disc list-inside text-gray-400 pl-4">
              <li>
                <strong className="text-white">
                  Strictly Necessary Cookies:
                </strong>{" "}
                These are essential for the website to perform its basic
                functions. They are required for tasks like user authentication
                (logging in) and protecting against security risks.
              </li>
              <li>
                <strong className="text-white">Functionality Cookies:</strong>{" "}
                These cookies allow us to remember your preferences (like your
                choice of dark/light mode or currency) and customize your
                experience.
              </li>
              <li>
                <strong className="text-white">
                  Performance and Analytics Cookies:
                </strong>{" "}
                These help us understand how visitors interact with our website,
                tracking data such as pages visited and error messages. This
                allows us to improve the performance of our site.
              </li>
            </ul>
          </section>

          <hr className="border-white/10" />

          <section>
            <h2 className="text-2xl font-bold text-indigo-400 mb-3">
              Third-Party Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We use third-party services that may also set their own cookies on
              your device. These are typically used for analytics purposes
              (e.g., Google Analytics) to help us measure traffic and understand
              user behavior. We have no control over these third-party cookies.
            </p>
          </section>

          <hr className="border-white/10" />

          <section>
            <h2 className="text-2xl font-bold text-indigo-400 mb-3">
              Your Choices Regarding Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the ability to accept or decline cookies. Most web
              browsers automatically accept cookies, but you can usually modify
              your browser setting to decline cookies if you prefer.
            </p>
            <ul className="space-y-3 list-disc list-inside text-gray-400 pl-4">
              <li>
                Note that disabling necessary cookies may **impact the
                functionality** and your experience of this dashboard,
                especially features requiring login.
              </li>
              <li>
                For more detailed control, check the help documentation for your
                specific browser (Chrome, Firefox, Edge, Safari, etc.).
              </li>
            </ul>
          </section>

          <hr className="border-white/10" />

          <section>
            <h2 className="text-2xl font-bold text-indigo-400 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Cookie Policy, you may
              contact Me at{" "}
              <a
                href="https://hassan-khan-portfolio.netlify.app/"
                target="_blank"
                className="font-bold hover:text-yellow-500 transition-all"
              >
                My Website
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
