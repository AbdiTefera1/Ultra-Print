import Link from "next/link";
import { Mark } from "@/components/Logo";
import PartnerWall from "@/components/PartnerWall";
import { getPartners } from "@/lib/partners";
import { accentBg, business, faqs, process, reviews, serviceGroups, stats } from "@/lib/data";

export default function Home() {
  const partners = getPartners();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-14 pb-20 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="rise text-sm font-semibold uppercase tracking-[.25em] text-accent">Printing shop · Gabon St, Addis Ababa</p>
            <h1 className="rise mt-5 text-6xl font-extrabold leading-[.95] tracking-tight sm:text-8xl" style={{ "--d": ".1s" } as React.CSSProperties}>
              Your vision.<br /><span className="text-grad">Our print.</span>
            </h1>
            <p className="rise mt-7 max-w-lg text-lg text-ink/75" style={{ "--d": ".25s" } as React.CSSProperties}>
              Business cards, brochures, books and posters, designed and printed with sharp colour and a quick turnaround. Open seven days a week.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--d": ".4s" } as React.CSSProperties}>
              <Link href="/services" className="g-action rounded-full px-7 py-4 font-semibold shadow-lg shadow-purple/20">Choose what you need</Link>
              <a href={business.tel} className="rounded-full border-2 border-ink/80 px-7 py-4 font-semibold hover:bg-ink hover:text-paper">Call {business.phone}</a>
            </div>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-md" aria-hidden>
            <div className="absolute -left-6 top-0 h-60 w-60 rounded-full bg-cyan/50 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-magenta/40 blur-3xl" />
            <div className="float absolute left-0 top-10 w-64 -rotate-6 rounded-3xl border border-ink/10 bg-white p-6 shadow-xl shadow-ink/10">
              <Mark id="hero" className="h-16 w-auto text-ink" />
              <p className="mt-8 text-xs uppercase tracking-[.3em] text-ink/60">your vision our print</p>
              <p className="text-lg font-bold">Ultra Print</p>
            </div>
            <div className="float absolute bottom-10 right-0 w-60 rotate-6 rounded-3xl border border-ink/10 bg-white p-6 shadow-xl shadow-ink/10" style={{ animationDelay: "-3s" }}>
              <div className="g-brand mb-4 h-1.5 w-16 rounded-full" />
              <p className="text-xl font-bold leading-snug">Cards. Brochures.<br />Books. Posters.</p>
              <p className="mt-6 text-xs text-ink/60">Colour printing · Binding · Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section aria-label="At a glance" className="mx-auto max-w-6xl px-5">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10 md:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l} className="bg-surface p-6"><dt className="text-3xl font-extrabold">{v}</dt><dd className="mt-1 text-sm text-ink/70">{l}</dd></div>
          ))}
        </dl>
      </section>

      <PartnerWall partners={partners} />

      {/* SERVICES */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <h2 className="max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">Start with what you need.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceGroups.map((g) => (
            <Link key={g.id} href={`/services#${g.id}`} className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
              <div className={`absolute inset-x-0 top-0 h-1.5 ${accentBg[g.accent]}`} />
              <p className="text-2xl font-bold">“{g.need}”</p>
              <p className="mt-1 text-sm font-semibold text-accent">{g.title}</p>
              <ul className="mt-5 flex flex-wrap gap-2 text-sm text-ink/80">
                {g.items.map((i) => <li key={i} className="rounded-full bg-ink/5 px-3 py-1">{i}</li>)}
              </ul>
              <span className="mt-6 inline-block text-sm font-semibold transition group-hover:translate-x-1">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">From idea to your hands.</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {process.map(([t, d], i) => (
            <li key={t}>
              <div className="g-brand h-1 rounded-full" />
              <p className="mt-4 text-sm font-semibold text-accent">0{i + 1}</p>
              <h3 className="mt-1 text-lg font-bold">{t}</h3>
              <p className="mt-1 text-sm text-ink/70">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Rated 5.0 by customers.</h2>
          <p role="img" aria-label="5 out of 5 stars" className="text-2xl tracking-widest text-magenta">★★★★★</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => <blockquote key={r} className="rounded-3xl border border-ink/10 bg-white p-7 text-lg leading-snug">“{r}”</blockquote>)}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-28 max-w-3xl px-5">
        <h2 className="text-4xl font-extrabold tracking-tight">Good to know.</h2>
        <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
          {faqs.map(([q, a]) => (
            <details key={q} className="py-5">
              <summary className="flex items-center justify-between gap-4 text-lg font-semibold">{q}<span aria-hidden className="plus text-2xl text-accent transition-transform">+</span></summary>
              <p className="mt-3 text-ink/75">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-surface px-8 py-16 sm:px-14">
          <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-cyan/25 blur-3xl" aria-hidden />
          <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-magenta/20 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="max-w-xl text-4xl font-extrabold tracking-tight sm:text-6xl">Have a job in mind?</h2>
            <p className="mt-4 max-w-md text-ink/75">Tell us what you need and we’ll come back with a price.</p>
            <Link href="/services" className="mt-8 g-action inline-block rounded-full px-7 py-4 font-semibold shadow-xl shadow-purple/25">Get a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
