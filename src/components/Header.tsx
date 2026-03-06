"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, inside: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect) return;

    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    });
  }

  function handleMouseLeave() {
    setMouse((prev) => ({ ...prev, inside: false }));
  }

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/20 bg-white/8 shadow-[0_20px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-3xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(255,255,255,0.03))]" />

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: mouse.inside ? 1 : 0,
            background: `radial-gradient(520px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.22), transparent 38%)`,
          }}
        />

        <div className="relative flex items-center justify-between px-10 py-6 md:px-14 md:py-7">
          <Link
            href="/"
            className="shrink-0 text-2xl font-semibold tracking-[-0.02em] text-white/95 transition hover:text-white md:text-3xl"
          >
            GitHub Workflow
          </Link>

          <nav className="ml-10 flex items-center gap-3 md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-5 py-3 text-lg font-medium text-white/85 transition duration-300 hover:bg-white/12 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_24px_rgba(255,255,255,0.08)] md:px-6 md:py-3.5 md:text-xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}