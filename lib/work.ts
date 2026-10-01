import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { serviceGroups, type Accent } from "./data";

export type WorkItem = { id: string; src?: string; title: string; cat: string; label: string; accent: Accent; w: number; h: number };
export type Category = { id: string; label: string; accent: Accent; count: number };

const ROOT = path.join(process.cwd(), "public", "work");
const IMG = /\.(jpe?g|png|webp|avif)$/i;
const known = Object.fromEntries(serviceGroups.map((g) => [g.id, g]));

/** "03-tri-fold_brochure.jpg" -> "Tri fold brochure" */
const pretty = (f: string) => {
  const t = f.replace(IMG, "").replace(/^\d+[-_.\s]*/, "").replace(/[-_]+/g, " ").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : "Print job";
};

async function dims(file: string) {
  try {
    const m = await sharp(file).metadata();
    let w = m.width ?? 1200, h = m.height ?? 900;
    if ((m.orientation ?? 1) >= 5) [w, h] = [h, w]; // phone photos rotated by EXIF
    return { w, h };
  } catch { return { w: 1200, h: 900 }; }
}

const meta = (cat: string) => known[cat] ? { label: known[cat].title, accent: known[cat].accent } : { label: pretty(cat), accent: "purple" as Accent };

/** Reads public/work/<category>/<photo>. Folder = category, filename = title. */
export async function getWork() {
  let entries: fs.Dirent[] = [];
  try { entries = fs.readdirSync(ROOT, { withFileTypes: true }); } catch {}
  const files: { cat: string; rel: string }[] = [];
  for (const e of entries) {
    if (e.isFile() && IMG.test(e.name)) files.push({ cat: "custom", rel: e.name });
    if (e.isDirectory()) for (const f of fs.readdirSync(path.join(ROOT, e.name))) if (IMG.test(f)) files.push({ cat: e.name, rel: `${e.name}/${f}` });
  }
  const order = (c: string) => { const i = serviceGroups.findIndex((g) => g.id === c); return i < 0 ? 99 : i; };
  files.sort((a, b) => order(a.cat) - order(b.cat) || a.rel.localeCompare(b.rel));

  const items: WorkItem[] = await Promise.all(files.map(async ({ cat, rel }) => {
    const { w, h } = await dims(path.join(ROOT, rel));
    return { id: rel, src: `/work/${rel.split("/").map(encodeURIComponent).join("/")}`, title: pretty(path.basename(rel)), cat, ...meta(cat), w, h };
  }));

  const isDemo = items.length === 0;
  if (isDemo) {
    const demo: [string, string, number, number][] = [
      ["identity", "Business cards", 4, 3], ["marketing", "Tri-fold brochure", 3, 4], ["documents", "Bound book", 1, 1],
      ["marketing", "Event poster", 3, 4], ["identity", "Letterhead set", 4, 3], ["custom", "Custom print", 5, 4],
      ["marketing", "Wall calendar", 4, 5], ["documents", "Report binding", 4, 3], ["custom", "Brand artwork", 1, 1],
    ];
    demo.forEach(([cat, title, w, h], i) => items.push({ id: `demo-${i}`, title, cat, w, h, ...meta(cat) }));
  }

  const ids = Array.from(new Set(items.map((i) => i.cat))).sort((a, b) => order(a) - order(b));
  const categories: Category[] = ids.map((id) => ({ id, ...meta(id), count: items.filter((i) => i.cat === id).length }));
  return { items, categories, isDemo };
}
