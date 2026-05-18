"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Box, History } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Cara Kerja", href: "/cara-kerja" },
  { label: "Keunggulan", href: "/keunggulan" },
  { label: "Tentang", href: "/tentang" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Box className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="leading-tight">
              <span className="text-base font-bold tracking-tight text-foreground">
                MataMandor AI
              </span>
              <span className="block text-[11px] text-muted-foreground -mt-0.5">
                Visual BoM Estimator
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
              // Note: for hash links on the same page, we'd need more complex logic, 
              // but for now we just match exact pathname.
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-foreground"
                      : "font-medium text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center">
            <Link
              href="/#riwayat"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted transition-all duration-200 shadow-sm"
            >
              <History className="w-4 h-4" />
              Coba Analisis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 bg-white border-t border-border">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-neutral-100 text-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#riwayat"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 mt-2 rounded-full border border-foreground bg-foreground text-white text-sm font-medium hover:bg-transparent hover:text-foreground transition-all duration-200"
          >
            <History className="w-4 h-4" />
            Riwayat Analisis
          </Link>
        </div>
      </div>
    </header>
  );
}
