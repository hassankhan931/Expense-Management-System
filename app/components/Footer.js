// components/Footer.js

"use client";

import Link from "next/link";
import {
  DollarSign,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  Heart,
  Sparkles,
} from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      {/* Enhanced Footer with Glass Morphism */}
      <footer className="relative mt-20 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-2xl border-t border-white/10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

        <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          {/* MODIFIED: Changed grid to stack on mobile (grid-cols-1), use 2 columns on tablet (md:grid-cols-2), and 4 on large screens (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 md:col-span-2 lg:order-1 order-1">
              <Link href="/" className="group flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300 opacity-70"></div>
                  <div className="relative p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    ExpenseTracker
                  </span>
                  <span className="text-xs text-gray-400 font-light -mt-1">
                    Financial Freedom
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Professional financial management platform built with
                cutting-edge technology. Track, analyze, and optimize your
                finances effortlessly.
              </p>

              {/* Developer Signature */}
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 w-full max-w-sm">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">
                    Hassan Khan
                  </p>
                  <p className="text-gray-400 text-xs">Full Stack Developer</p>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div className="lg:order-2 order-2">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                Product
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Dashboard", href: "/" },
                  { name: "Transactions", href: "/transactions" },
                  { name: "Reports & Analytics", href: "/reports" },
                  { name: "API Documentation", href: "/docs" },
                  { name: "Features", href: "/features" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-cyan-400 transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="lg:order-3 order-3">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Support
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Contact Support", href: "/contact" },
                  { name: "FAQ", href: "/faq" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Connect */}
            <div className="lg:order-4 order-4">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Company
              </h3>
              <ul className="space-y-4 mb-8">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Cookie Policy", href: "/cookies" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-purple-400 transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-sm">
                  Connect With Developer
                </h4>
                <div className="flex space-x-4">
                  {[
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/hassan-khan-93ace/",
                      label: "LinkedIn",
                      color: "hover:text-blue-400",
                    },
                    {
                      icon: Github,
                      href: "https://github.com/hassankhan931",
                      label: "GitHub",
                      color: "hover:text-gray-300",
                    },
                    {
                      icon: Mail,
                      href: "mailto:khandaulathassankhan@gmail.com",
                      label: "Email",
                      color: "hover:text-cyan-400",
                    },
                    {
                      icon: ExternalLink,
                      href: "https://hassan-khan-portfolio.netlify.app/",
                      label: "Portfolio",
                      color: "hover:text-purple-400",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`p-3 bg-white/5 rounded-xl border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:border-current/30 group`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 mt-8 border-t border-white/10">
            {/* MODIFIED: Stacks on mobile (flex-col) and spreads out on desktop (lg:flex-row) */}
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              {/* Copyright & Made With Love */}
              <div className="flex items-center space-x-4 text-sm text-gray-400 text-center lg:text-left">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span>&copy; {currentYear} ExpenseTracker</span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="flex items-center space-x-1">
                    <span>Made with</span>
                    <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                    <span>by Hassan Khan</span>
                  </span>
                </div>
              </div>

              {/* Technical Stack */}
              {/* MODIFIED: Uses flex-wrap to prevent overflow on small screens */}
              <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Production Ready</span>
                </span>
                <span>•</span>
                <span>Built with Next.js 15</span>
                <span>•</span>
                <span>Powered by MongoDB</span>
              </div>

              {/* Version */}
              <div className="text-xs text-gray-500">
                v2.1.0 • Secure • Encrypted
              </div>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-400/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">
                Successfully Serving Users Worldwide
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .footer-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
