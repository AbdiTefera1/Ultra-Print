"use client";
import { useState } from "react";
import { accentBg, work } from "@/lib/data";

const cats = ["All", ...Array.from(new Set(work.map((w) => w.category)))];

export default function WorkGrid() {
  const [cat, setCat] = useState("All");
  const shown = work.filter((w) => cat === "All" || w.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {cats.map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}
            className="rounded-full border border-ink/25 bg-surface px-4 py-2.5 text-sm font-medium aria-pressed:border-purple aria-pressed:bg-purple aria-pressed:text-white">{c}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w) => (
          <figure key={w.title}>
            {w.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={w.src} alt={w.title} className="aspect-[4/3] w-full rounded-3xl object-cover" />
            ) : (
              <div className={`flex aspect-[4/3] items-end rounded-3xl p-4 ${accentBg[w.accent]}`}><span className="rounded-full bg-paper px-4 py-1.5 text-sm font-bold text-ink">{w.title}</span></div>
            )}
            <figcaption className="mt-2 text-sm text-ink/70">{w.title} · {w.category}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
