"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  DollarSign,
  Settings,
  ListChecks,
  PieChart,
} from "lucide-react";

// Updated navigation links
const navLinks = [
  { name: "Dashboard", href: "/", icon: DollarSign },
  { name: "Transactions", href: "/transactions", icon: ListChecks },
  { name: "Reports", href: "/reports", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);

  const updateIndicator = () => {
    if (window.innerWidth >= 1024 && navRef.current) {
      const activeElement = navRef.current.querySelector(
        `[data-path="${pathname}"]`
      );
      if (activeElement) {
        const left = activeElement.offsetLeft;
        const width = activeElement.offsetWidth;
        setActiveIndicator({ left, width });
      } else {
        setActiveIndicator({ left: 0, width: 0 });
      }
    } else {
      setActiveIndicator({ left: 0, width: 0 });
    }
  };

  useEffect(() => {
    updateIndicator();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  const desktopDefaultLinkClass =
    "text-gray-300 hover:text-white transition-colors duration-300 relative z-10 px-4 py-2 rounded-xl flex items-center space-x-2 font-medium hover:text-cyan-300";

  const mobileActiveLinkClass =
    "text-white bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-cyan-400";
  const mobileDefaultLinkClass =
    "text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-950/95 backdrop-blur-2xl shadow-2xl border-b border-white/10"
            : "bg-gray-950/90 backdrop-blur-xl shadow-xl border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                onClick={handleLinkClick}
                className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
              >
                <div className="relative p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                  <DollarSign className="w-6 h-6 text-white" />
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 relative">
              <div
                ref={navRef}
                className="flex space-x-2 p-2 rounded-2xl bg-gray-800/50 relative"
              >
                <div
                  className={`absolute top-0.5 bottom-0.5 rounded-xl bg-gradient-to-r from-blue-500/40 to-purple-500/40 shadow-lg border border-cyan-400/50 transition-all duration-300 ease-in-out transform ${
                    activeIndicator.width === 0 ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    left: activeIndicator.left + 4,
                    width: activeIndicator.width - 8,
                  }}
                />
                {navLinks.map((link) => {
                  const LinkIcon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      data-path={link.href}
                      className={`${desktopDefaultLinkClass} ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

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

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-4">
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

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-gray-950/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`group relative px-4 py-4 rounded-2xl text-base flex items-center space-x-4 ${
                    isActive ? mobileActiveLinkClass : mobileDefaultLinkClass
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl ${
                      isActive
                        ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
                        : "bg-gray-800/50 text-gray-400"
                    }`}
                  >
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  {/* ✅ Fixed: Text now always visible */}
                  <span
                    className={`text-base ${
                      isActive ? "font-semibold text-white" : "text-gray-300"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
}
