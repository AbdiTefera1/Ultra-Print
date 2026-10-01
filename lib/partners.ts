import fs from "node:fs";
import path from "node:path";
import { partnerNames } from "./data";

export type Partner = { name: string; src?: string; status: "current" | "past" };

const ROOT = path.join(process.cwd(), "public", "partners");
const IMG = /\.(svg|png|jpe?g|webp|avif)$/i;

/** "02-acme-corp.svg" -> "Acme Corp"; names that already contain capitals are kept as written. */
const nice = (f: string) => {
  const t = f.replace(IMG, "").replace(/^\d+[-_.\s]*/, "").replace(/[-_]+/g, " ").trim();
  return /[A-Z]/.test(t) ? t : t.replace(/\b\w/g, (c) => c.toUpperCase());
};
const list = (dir: string) => { try { return fs.readdirSync(dir).filter((f) => IMG.test(f)).sort(); } catch { return []; } };

export function getPartners(): Partner[] {
  const out: Partner[] = [];
  for (const f of list(ROOT)) out.push({ name: nice(f), src: `/partners/${encodeURIComponent(f)}`, status: "current" });
  for (const status of ["current", "past"] as const)
    for (const f of list(path.join(ROOT, status))) out.push({ name: nice(f), src: `/partners/${status}/${encodeURIComponent(f)}`, status });
  return [...out, ...partnerNames];
}
