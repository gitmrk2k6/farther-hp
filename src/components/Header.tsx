"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/lecture", label: "講演会" },
  { href: "/events", label: "コンサート情報" },
  { href: "/music", label: "CD" },
  { href: "/youtube", label: "YouTube" },
  { href: "/gallery", label: "写真" },
  { href: "/blog", label: "ブログ" },
  { href: "/profile", label: "プロフィール" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-primary tracking-wider"
          >
            Tatsuya Konishi
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-foreground/70 hover:text-primary transition-colors duration-200 py-2 px-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="メニュー"
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-primary/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/70 hover:text-primary transition-colors py-2 border-b border-primary/5 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
