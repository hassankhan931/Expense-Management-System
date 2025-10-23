"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  DollarSign,
  BarChart2,
  Settings,
  ListChecks,
  PieChart,
  Sparkles,
} from "lucide-react";

// Updated navigation links - Removed Goals, renamed Analytics to Reports
const navLinks = [
  { name: "Dashboard", href: "/", icon: DollarSign },
  { name: "Transactions", href: "/transactions", icon: ListChecks },
  { name: "Reports", href: "/reports", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Active link styles
  const activeLinkClass =
    "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-cyan-400";
  const defaultLinkClass =
    "text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300";

  return (
    <>
      {/* Enhanced Navbar with Darker Background */}
      <nav
        className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-gray-950/95 backdrop-blur-2xl shadow-2xl border-b border-white/10"
            : "bg-gray-950/90 backdrop-blur-xl shadow-xl border-b border-white/5"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo/Brand with Added Spacing */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                onClick={handleLinkClick}
                className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
              >
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
            </div>

            {/* Desktop Navigation - Added Gap and Updated Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {" "}
              {/* Increased space-x-8 for more gap */}
              {navLinks.map((link) => {
                const LinkIcon = link.icon;
                const isActive = link.href === "/"; // Replace with actual active path logic

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300
                      flex items-center space-x-3
                      ${isActive ? activeLinkClass : defaultLinkClass}
                      hover:scale-105 hover:shadow-2xl
                    `}
                  >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon with gradient */}
                    <div
                      className={`relative z-10 p-2 rounded-xl ${
                        isActive
                          ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
                          : "bg-gray-800/50 text-gray-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-purple-500/20"
                      } transition-all duration-300`}
                    >
                      <LinkIcon className="w-4 h-4" />
                    </div>

                    <span className="relative z-10">{link.name}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
              {/* Enhanced UserButton */}
              <div className="ml-4 p-1 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-2xl",
                    },
                  }}
                />
              </div>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <div className="flex lg:hidden items-center space-x-4">
              {/* UserButton for mobile */}
              <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-xl",
                    },
                  }}
                />
              </div>

              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-indigo-300 hover:text-white hover:border-cyan-400/50 transition-all duration-300 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="block h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-gray-950/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Mobile Navigation Links - Updated */}
              {navLinks.map((link) => {
                const LinkIcon = link.icon;
                const isActive = link.href === "/"; // Replace with actual active path logic

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`
                      group relative px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-300
                      flex items-center space-x-4
                      ${isActive ? activeLinkClass : defaultLinkClass}
                      hover:scale-105
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`p-2 rounded-xl ${
                        isActive
                          ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
                          : "bg-gray-800/50 text-gray-400 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-purple-500/20"
                      } transition-all duration-300`}
                    >
                      <LinkIcon className="w-5 h-5" />
                    </div>

                    <span>{link.name}</span>

                    {/* Hover arrow */}
                    <Sparkles className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto" />
                  </Link>
                );
              })}

              {/* Mobile Profile Section - Enhanced */}
              <div className="pt-6 mt-4 border-t border-white/10 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm font-medium">
                      Your Account
                    </span>
                    <span className="text-white text-xs font-light">
                      Manage your profile
                    </span>
                  </div>
                  <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-cyan-400/30">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 rounded-xl",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu-enter {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
