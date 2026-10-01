import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Header from "@/components/Header";
import { Logo } from "@/components/Logo";
import { business } from "@/lib/data";
import "./globals.css";

const display = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "Ultra Print – Your vision, our print. Addis Ababa", template: "%s – Ultra Print" },
  description: "Business cards, brochures, posters, books, binding, colour printing and graphic design on Gabon St, Addis Ababa. Open 7 days.",
};

const schema = {
  "@context": "https://schema.org", "@type": "PrintShop", name: business.name, telephone: business.phone,
  address: { "@type": "PostalAddress", streetAddress: "Gabon St", addressLocality: "Addis Ababa", addressCountry: "ET" },
  geo: { "@type": "GeoCoordinates", latitude: 8.9873204, longitude: 38.7630922 },
  openingHours: ["Mo-Sa 08:00-21:00", "Su 10:00-21:00"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-ink focus:p-3 focus:text-paper">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Header />
        <main id="main">{children}</main>
        <footer className="mt-28 border-t border-ink/10 bg-surface pb-24 md:pb-0">
          <div className="g-brand h-1" />
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 text-sm md:grid-cols-3">
            <div>
              <Logo id="ft" className="h-12 w-auto" />
              <p className="mt-4 text-xs uppercase tracking-[.3em] text-ink/60">{business.tagline}</p>
            </div>
            <div className="space-y-1 text-ink/75">
              <p className="mb-2 font-semibold text-ink">Hours</p>
              {business.hours.map(([d, h]) => <p key={d}>{d}: {h}</p>)}
            </div>
            <div className="space-y-1 text-ink/75">
              <p className="mb-2 font-semibold text-ink">Visit or call</p>
              <p>{business.address}</p>
              <a href={business.tel} className="underline underline-offset-4">{business.phone}</a>
            </div>
          </div>
          <div className="border-t border-ink/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink/60 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Ultra Print. All rights reserved.</p>
              <p>
                Developed by{" "}
                <a href="https://supait.et" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4 hover:text-accent">SupaIT Service</a>
              </p>
            </div>
          </div>
        </footer>
        <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-ink/15 bg-paper/95 backdrop-blur md:hidden">
          <a href={business.tel} className="py-4 text-center font-semibold">Call</a>
          <a href={business.whatsapp} className="g-action py-4 text-center font-semibold">WhatsApp</a>
        </div>
      </body>
    </html>
  );
}
