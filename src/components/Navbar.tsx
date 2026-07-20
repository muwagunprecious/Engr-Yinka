"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home",       href: "#home" },
  { name: "Radar",      href: "#radar" },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects" },
  { name: "Leadership", href: "#leadership" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between rounded-full px-6 transition-all duration-400 ease-in-out w-[90%] max-w-2xl",
        isScrolled
          ? "py-2 glass backdrop-blur-xl bg-black/40 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          : "py-4 bg-transparent border-transparent"
      )}
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Link href="#home" className="flex items-center gap-3 relative z-10 group">
        <div className="relative flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Engr. Yinka Logo"
            className="h-12 md:h-16 w-auto filter invert brightness-200 contrast-200 mix-blend-screen object-contain transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-6 relative z-10">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      
      {/* Mobile menu could be added here later */}
    </motion.header>
  );
}
