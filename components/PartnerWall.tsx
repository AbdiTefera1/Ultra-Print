import type { Partner } from "@/lib/partners";

const groups = [
  ["current", "Working with today"],
  ["past", "Have worked with"],
] as const;

export default function PartnerWall({ partners }: { partners: Partner[] }) {
  const preview = partners.length === 0;
  if (preview && process.env.NODE_ENV !== "development") return null; // nothing to show on the live site yet

  return (
    <section aria-labelledby="partners-h" className="mx-auto mt-24 max-w-6xl px-5">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-accent">Our partners</p>
        <h2 id="partners-h" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Businesses that trust Ultra Print.</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">The companies we print for today, and those we’ve worked with along the way.</p>
      </div>

      {preview ? (
        <>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="grid h-24 place-items-center rounded-2xl border border-dashed border-ink/30 text-sm text-ink/50">Partner logo</li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm text-ink/60">
            Preview only. Add logos to <code>public/partners/current</code> or <code>public/partners/past</code> and refresh.
          </p>
        </>
      ) : (
        groups.map(([status, label]) => {
          const items = partners.filter((p) => p.status === status);
          if (!items.length) return null;
          return (
            <div key={status} className="mt-10">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
                <i aria-hidden className={`h-2.5 w-2.5 rounded-full ${status === "current" ? "g-cool motion-safe:animate-pulse" : "bg-ink/30"}`} />
                {label}
              </p>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {items.map((p) => (
                  <li key={`${status}-${p.name}`} className="group grid h-24 place-items-center rounded-2xl border border-ink/10 bg-white p-4 transition hover:shadow-lg hover:shadow-ink/10">
                    {p.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.src} alt={p.name} loading="lazy" className="max-h-12 w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0" />
                    ) : (
                      <span className="text-center font-bold text-ink/70 transition group-hover:text-ink">{p.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </section>
  );
}
