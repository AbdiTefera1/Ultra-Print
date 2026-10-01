import ServiceCatalog from "@/components/ServiceCatalog";

export const metadata = { title: "Services" };

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-14 pb-10">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-accent">Services</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          Everything you need, <span className="text-grad">printed.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/75">Pick the services you need, add a few details, and send it to us on WhatsApp for a quote. No account, no forms.</p>
      </section>
      <ServiceCatalog />
    </div>
  );
}
