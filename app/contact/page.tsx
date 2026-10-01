import { business } from "@/lib/data";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Visit or call</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div><h2 className="font-bold">Address</h2><p className="text-ink/75">{business.address}</p></div>
          <div>
            <h2 className="font-bold">Hours</h2>
            {business.hours.map(([d, h]) => <p key={d} className="text-ink/75">{d}: {h}</p>)}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={business.tel} className="g-action rounded-full px-6 py-3 font-semibold">Call {business.phone}</a>
            <a href={business.whatsapp} className="rounded-full border-2 border-ink/80 px-6 py-3 font-semibold">WhatsApp</a>
          </div>
          <a href={business.mapLink} className="inline-block font-semibold underline underline-offset-4">Open in Google Maps</a>
        </div>
        <iframe
          title="Ultra Print on Google Maps"
          src={business.mapEmbed}
          className="h-96 w-full rounded-3xl border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
