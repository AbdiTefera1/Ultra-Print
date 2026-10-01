# Ultra Print website
Next.js (App Router) + TypeScript + Tailwind v4.

    npm install
    npm run dev

## Adding work photos (no code needed)
Drop images into `public/work/<category>/`:

    public/work/identity/     business cards, letterheads
    public/work/marketing/    brochures, flyers, posters, calendars
    public/work/documents/    books, binding, copies
    public/work/custom/       everything else

- The **filename becomes the title**: `02-tri-fold-brochure.jpg` -> "Tri fold brochure". A number prefix controls the order.
- JPG, PNG, WebP and AVIF work. Phone photos are fine; they are resized automatically.
- Restart `npm run dev` (or rebuild) after adding files. Until real photos exist, branded sample tiles are shown.
- Other site content (services, hours, reviews, FAQ) lives in `lib/data.ts`.

## Partner logos (home page "Businesses that trust Ultra Print")
Drop logo files in:

    public/partners/current/   companies you are working with now
    public/partners/past/      companies you have worked with before

- The **filename is the company name**: `acme-corp.svg` -> "Acme Corp". Keep capitals if the name has them (`ABC-Bank.png` stays "ABC Bank"). A number prefix controls the order.
- SVG, PNG, JPG, WebP and AVIF work. Transparent PNG/SVG logos look best.
- No logo file? Add `{ name, status }` to `partnerNames` in `lib/data.ts` and it shows as a text name.
- With no partners the section is hidden on the live site (in `npm run dev` you see an empty-slot preview).
