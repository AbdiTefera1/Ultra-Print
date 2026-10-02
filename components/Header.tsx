"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  ["Services", "/services", "Everything we print and design"],
  ["Work", "/gallery", "Examples of finished jobs"],
  ["Contact", "/contact", "Hours, map and WhatsApp"],
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""; // stop the page scrolling behind the mobile menu
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Ultra Print home"><Logo id="hd" className="h-10 w-auto" /></Link>
        <nav aria-label="Main" className="hidden items-center gap-1 text-sm font-medium md:flex">
          {nav.map(([l, h]) => (
            <Link key={h} href={h} aria-current={path === h ? "page" : undefined} className="rounded-full px-4 py-2.5 hover:bg-ink/5 aria-[current=page]:bg-ink/10">{l}</Link>
          ))}
          <Link href="/services" className="g-action ml-2 rounded-full px-5 py-2.5 font-semibold shadow-lg shadow-purple/20">Get a quote</Link>
        </nav>
        <button className="rounded-full border border-ink/25 px-5 py-3 text-sm font-medium md:hidden" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
      {open && (
      <nav id="menu" aria-label="Mobile" className="fixed inset-x-0 top-[65px] bottom-0 z-[35] overflow-y-auto bg-paper px-5 py-6 md:hidden">
        {nav.map(([l, h, d]) => (
          <Link key={h} href={h} className="block border-b border-ink/10 py-5">
            <span className="text-3xl font-bold">{l}</span>
            <span className="mt-1 block text-ink/70">{d}</span>
          </Link>
        ))}
      </nav>
    )}
    </>
  );
}
