export const business = {
  name: "Ultra Print",
  tagline: "your vision our print",
  phone: "+251 92 039 7525",
  tel: "tel:+251920397525",
  whatsapp: "https://wa.me/251920397525",
  address: "Gabon St, Addis Ababa, Ethiopia",
  mapEmbed: "https://www.google.com/maps?q=8.9873204,38.7630922&z=17&output=embed",
  mapLink: "https://maps.google.com/?cid=14654603498516221571",
  hours: [
    ["Monday – Saturday", "8:00 AM – 9:00 PM"],
    ["Sunday", "10:00 AM – 9:00 PM"],
  ],
};

export type Accent = "cool" | "warm" | "blue" | "purple";
export const accentBg: Record<Accent, string> = { cool: "acc-cool", warm: "acc-warm", blue: "acc-blue", purple: "acc-purple" };

export const serviceGroups: { id: string; need: string; title: string; accent: Accent; items: string[] }[] = [
  { id: "identity", need: "I need to look professional", title: "Business identity", accent: "cool",
    items: ["Business card printing", "Letterhead & business cards", "Business document printing"] },
  { id: "marketing", need: "I need to promote something", title: "Marketing", accent: "warm",
    items: ["Brochure printing", "Flyers & brochures", "Posters", "Calendars"] },
  { id: "documents", need: "I need documents copied or bound", title: "Documents & books", accent: "blue",
    items: ["Copy services", "Binding services", "Books"] },
  { id: "custom", need: "I have an idea", title: "Colour & custom", accent: "purple",
    items: ["Colour printing", "Custom printing", "Graphic design"] },
];

export const quoteLink = (picked: string[]) =>
  `${business.whatsapp}?text=${encodeURIComponent(
    picked.length ? `Hello Ultra Print, I'd like a quote for: ${picked.join(", ")}.` : "Hello Ultra Print, I'd like a quote."
  )}`;

export const stats = [
  ["5.0", "Google rating, 24 reviews"],
  ["7 days", "open every week"],
  ["8 AM – 9 PM", "Monday to Saturday"],
  ["14", "print and design services"],
];

export const process = [
  ["Share your idea or file", "Visit, call, or message us on WhatsApp."],
  ["Confirm the details", "We agree size, paper, quantity and price before printing."],
  ["We print and finish", "Colour printing, cutting and binding as the job needs."],
  ["Collect your order", "Pick it up at our shop on Gabon St."],
];

// Replace `src` with a real photo (files go in /public/work) to swap out the colour tiles.
export const work: { title: string; category: string; accent: Accent; src?: string }[] = [
  { title: "Business cards", category: "Business identity", accent: "cool" },
  { title: "Letterhead set", category: "Business identity", accent: "cool" },
  { title: "Tri-fold brochure", category: "Marketing", accent: "warm" },
  { title: "Event poster", category: "Marketing", accent: "warm" },
  { title: "Wall calendar", category: "Marketing", accent: "warm" },
  { title: "Bound book", category: "Documents & books", accent: "blue" },
  { title: "Report binding", category: "Documents & books", accent: "blue" },
  { title: "Custom print", category: "Colour & custom", accent: "purple" },
  { title: "Brand artwork", category: "Colour & custom", accent: "purple" },
];

export const reviews = [
  "Really happy with the prints great quality and super fast.",
  "They are reliable, professional and excellent in customer handling.",
  "Excellent service. Thank you!!",
];

export const faqs = [
  ["What do you print?", "Business cards, letterheads, brochures, flyers, posters, calendars and books, plus colour, copy and custom printing. We also do binding."],
  ["Can you design my artwork?", "Yes. Graphic design is one of our services. Bring a rough idea or a finished file."],
  ["How do I get a price?", "Pick what you need on the Services page and send it to us on WhatsApp, or call us directly."],
  ["When are you open?", "Monday to Saturday 8:00 AM to 9:00 PM, and Sunday 10:00 AM to 9:00 PM."],
  ["Where are you?", "Gabon St, Addis Ababa. The Contact page has a map."],
];
