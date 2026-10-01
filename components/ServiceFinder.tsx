"use client";
import { useState } from "react";
import { accentBg, quoteLink, serviceGroups } from "@/lib/data";

export default function ServiceFinder() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div>
      <div className="grid gap-12 md:grid-cols-2">
        {serviceGroups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <div className={`h-2 w-20 rounded-full ${accentBg[g.accent]}`} />
            <h2 className="mt-4 text-2xl font-extrabold">{g.title}</h2>
            <p className="text-ink/70">{g.need}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li key={i}>
                  <button
                    aria-pressed={picked.includes(i)}
                    onClick={() => toggle(i)}
                    className="rounded-full border border-ink/25 bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink aria-pressed:border-purple aria-pressed:bg-purple aria-pressed:text-white"
                  >
                    {picked.includes(i) ? "✓ " : "+ "}{i}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div role="status" className={`fixed inset-x-4 bottom-20 z-30 mx-auto max-w-xl rounded-2xl border border-ink/10 bg-white p-4 text-ink shadow-2xl shadow-ink/15 transition-all md:bottom-6 ${picked.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <p className="text-sm">{picked.length} selected: {picked.join(", ")}</p>
        <div className="mt-3 flex gap-3">
          <a href={quoteLink(picked)} className="g-action rounded-full px-5 py-2.5 text-sm font-semibold">Get a quote on WhatsApp</a>
          <button onClick={() => setPicked([])} className="text-sm underline underline-offset-4">Clear</button>
        </div>
      </div>
    </div>
  );
}
