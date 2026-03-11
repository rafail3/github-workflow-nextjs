"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
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
    <header className="fixed top-6 left-1/2 z-50 w-[min(1100px,calc(100%-32px))] -translate-x-1/2">
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-[36px] border border-white/20 bg-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-3xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.20),rgba(255,255,255,0.05))]" />

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: mouse.inside ? 1 : 0,
            background: `radial-gradient(420px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.18), transparent 42%)`,
          }}
        />

        <div className="relative flex items-center justify-between px-10 py-6 md:px-14 md:py-7">
          <Link
            href="/"
            className="shrink-0 text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl"
          >
            GitHub Workflow
          </Link>

          <nav className="ml-10 flex items-center gap-3 md:gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-6 py-3.5 text-lg font-medium transition duration-300 md:px-7 md:py-4 md:text-xl ${
                    isActive
                      ? "bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(255,255,255,0.08)]"
                      : "text-white/85 hover:bg-white/12 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_24px_rgba(255,255,255,0.06)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}