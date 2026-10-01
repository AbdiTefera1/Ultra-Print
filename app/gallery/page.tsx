import Link from "next/link";
import WorkGallery from "@/components/WorkGallery";
import { business } from "@/lib/data";
import { getWork } from "@/lib/work";

export const metadata = { title: "Our work" };

export default async function Work() {
  const { items, categories, isDemo } = await getWork();
  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-14 pb-10">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-accent">Our work</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          See what we <span className="text-grad">print.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/75">Business cards, brochures, books and posters. Browse by category and tap any piece to see it larger.</p>
        {isDemo && process.env.NODE_ENV === "development" && (
          <p className="mt-6 rounded-2xl border border-dashed border-ink/30 p-4 text-sm text-ink/70">
            Showing sample tiles. Add photos to <code>public/work/identity</code>, <code>marketing</code>, <code>documents</code> or <code>custom</code> and refresh.
          </p>
        )}
      </section>

      <WorkGallery items={items} categories={categories} />

      <section className="relative mt-16 overflow-hidden rounded-[2rem] border border-ink/10 bg-surface px-8 py-14 sm:px-14">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-magenta/15 blur-3xl" aria-hidden />
        <div className="absolute -bottom-16 left-0 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" aria-hidden />
        <div className="relative">
          <h2 className="max-w-lg text-3xl font-extrabold tracking-tight sm:text-4xl">Want something like this?</h2>
          <p className="mt-3 max-w-md text-ink/75">Tell us what you need and we’ll come back with a price.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/services" className="g-action rounded-full px-6 py-3 font-semibold shadow-lg shadow-purple/20">Get a quote</Link>
            <a href={business.whatsapp} className="rounded-full border-2 border-ink/80 px-6 py-3 font-semibold hover:bg-ink hover:text-paper">WhatsApp us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
