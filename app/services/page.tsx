import ServiceFinder from "@/components/ServiceFinder";

export const metadata = { title: "Services" };

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Services</h1>
      <p className="mt-4 mb-12 max-w-xl text-ink/75">Select everything you need and send it to us on WhatsApp for a quote. We also design artwork if you don’t have a file.</p>
      <ServiceFinder />
    </div>
  );
}
