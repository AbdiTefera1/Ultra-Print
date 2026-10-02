"use client";
import { useEffect, useState } from "react";
import { accentBg, business, groupBlurb, quoteLink, serviceGroups, serviceInfo } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  identity: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h6M7 14h4" /></>,
  marketing: <><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" /><path d="M15 9a4 4 0 0 1 0 6M18 7a7 7 0 0 1 0 10" /></>,
  documents: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 21V5M9 7h6" /></>,
  custom: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
};
const Svg = ({ children, className = "h-6 w-6", w = 1.7 }: { children: React.ReactNode; className?: string; w?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>{children}</svg>
);

export default function ServiceCatalog() {
  const [picked, setPicked] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [active, setActive] = useState(serviceGroups[0].id);
  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    serviceGroups.forEach((g) => { const el = document.getElementById(g.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <div className="sticky top-[65px] z-30 -mx-5 border-b border-ink/10 bg-paper/90 px-5 py-3 backdrop-blur-xl">
        <nav aria-label="Service categories" className="flex gap-2 overflow-x-auto pb-1">
          {serviceGroups.map((g) => (
            <a key={g.id} href={`#${g.id}`} aria-current={active === g.id ? "true" : undefined}
              className="shrink-0 rounded-full border border-ink/20 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink aria-[current=true]:border-purple aria-[current=true]:bg-purple aria-[current=true]:text-white">
              {g.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-16">
          {serviceGroups.map((g, n) => (
            <section key={g.id} id={g.id} className="scroll-mt-40">
              <div className="flex items-start gap-4">
                <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl">
                  <div className={`absolute inset-0 opacity-20 ${accentBg[g.accent]}`} />
                  <Svg className="relative h-7 w-7">{icons[g.id]}</Svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent">0{n + 1} · “{g.need}”</p>
                  <h2 className="text-3xl font-extrabold tracking-tight">{g.title}</h2>
                  <p className="mt-1 text-ink/70">{groupBlurb[g.id]}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {g.items.map((name) => {
                  const on = picked.includes(name);
                  return (
                    <li key={name}>
                      <button aria-pressed={on} onClick={() => toggle(name)}
                        className="flex h-full w-full items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10 aria-pressed:border-purple aria-pressed:bg-purple/5 aria-pressed:ring-1 aria-pressed:ring-purple">
                        <span>
                          <span className="block font-semibold">{name}</span>
                          <span className="mt-1 block text-sm text-ink/70">{serviceInfo[name]}</span>
                        </span>
                        <span aria-hidden className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${on ? "border-purple bg-purple text-white" : "border-ink/25"}`}>
                          <Svg className="h-4 w-4" w={2.6}>{on ? <path d="M5 12l5 5L20 7" /> : <path d="M12 5v14M5 12h14" />}</Svg>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <div className="rounded-3xl border border-ink/10 bg-surface p-8">
            <h2 className="text-2xl font-extrabold tracking-tight">Not sure what you need?</h2>
            <p className="mt-2 max-w-md text-ink/75">Describe your idea and we’ll suggest the right option.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={quoteLink([])} className="g-action rounded-full px-6 py-3 font-semibold">Message us</a>
              <a href={business.tel} className="rounded-full border-2 border-ink/80 px-6 py-3 font-semibold hover:bg-ink hover:text-paper">Call {business.phone}</a>
            </div>
          </div>
        </div>

        <aside id="quote" aria-label="Your quote" className="scroll-mt-40 lg:sticky lg:top-40 lg:self-start">
          <div className="rounded-3xl border border-ink/10 bg-surface p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-extrabold">Your quote</h2>
              <span className="text-sm text-ink/60">{picked.length} selected</span>
            </div>
            {picked.length === 0 ? (
              <p className="mt-4 text-sm text-ink/70">Choose the services you need and we’ll build your message here.</p>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-2">
                {picked.map((p) => (
                  <li key={p}>
                    <button onClick={() => toggle(p)} aria-label={`Remove ${p}`} className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5 text-sm ring-1 ring-ink/15 hover:ring-ink">
                      {p} <span aria-hidden className="text-ink/50">×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <label htmlFor="notes" className="mt-5 block text-sm font-semibold">Details <span className="font-normal text-ink/60">(optional)</span></label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Size, quantity, deadline…"
              className="mt-2 w-full resize-none rounded-2xl border border-ink/15 bg-white p-3 text-sm outline-none focus:border-purple" />
            <a href={quoteLink(picked, notes)} className="g-action mt-4 block rounded-full py-3.5 text-center font-semibold shadow-lg shadow-purple/20">Send on WhatsApp</a>
            <a href={business.tel} className="mt-1 block py-2.5 text-center text-sm font-medium underline underline-offset-4">or call {business.phone}</a>
          </div>
        </aside>
      </div>

      <a href="#quote" className={`g-action fixed bottom-[68px] right-4 z-30 rounded-full px-5 py-3 font-semibold shadow-xl shadow-purple/30 transition lg:hidden ${picked.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
        Review quote ({picked.length})
      </a>
    </div>
  );
}
