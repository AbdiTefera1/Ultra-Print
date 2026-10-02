"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./Logo";
import { accentBg } from "@/lib/data";
import type { Category, WorkItem } from "@/lib/work";

export default function WorkGallery({ items, categories }: { items: WorkItem[]; categories: Category[] }) {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const shown = items.filter((i) => cat === "all" || i.cat === cat);
  const viewable = shown.filter((i) => i.src);
  const cur = open !== null ? viewable[open] : null;
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + viewable.length) % viewable.length));

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const pills = [{ id: "all", label: "All", count: items.length }, ...categories];

  return (
    <div>
      <div className="sticky top-[65px] z-30 -mx-5 border-b border-ink/10 bg-paper/90 px-5 py-3 backdrop-blur-xl">
        <div role="group" aria-label="Filter by category" className="flex gap-2 overflow-x-auto pb-1">
          {pills.map((c) => (
            <button key={c.id} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}
              className="shrink-0 rounded-full border border-ink/20 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink aria-pressed:border-purple aria-pressed:bg-purple aria-pressed:text-white">
              {c.label} <span className="opacity-60">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {shown.map((it) => {
          const vi = viewable.indexOf(it);
          return (
            <li key={it.id} className="mb-8 break-inside-avoid">
              <figure className="group">
                {it.src ? (
                  <button onClick={() => setOpen(vi)} aria-label={`View ${it.title} larger`}
                    className="relative block w-full overflow-hidden rounded-2xl bg-surface ring-1 ring-ink/10 transition-shadow group-hover:shadow-xl group-hover:shadow-ink/10">
                    <Image src={it.src} alt={`${it.title}, ${it.label}`} width={it.w} height={it.h}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                    <span aria-hidden className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-ink opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">⤢</span>
                  </button>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-ink/10" style={{ aspectRatio: `${it.w} / ${it.h}` }} aria-hidden>
                    <div className={`absolute inset-0 opacity-15 ${accentBg[it.accent]}`} />
                    <Mark id={`ph${it.id}`} role="presentation" className="absolute inset-0 m-auto h-1/4 w-auto opacity-40" />
                  </div>
                )}
                <figcaption className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-semibold">{it.title}</span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-ink/60"><i className={`h-2 w-2 rounded-full ${accentBg[it.accent]}`} />{it.label}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <dialog ref={dialog} onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        aria-label="Work viewer"
        className="m-auto max-h-[94vh] w-[min(1100px,94vw)] overflow-hidden rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-white/70 backdrop:backdrop-blur-md">
        {cur?.src && (
          <>
            <div className="grid place-items-center bg-surface p-4">
              <Image src={cur.src} alt={`${cur.title}, ${cur.label}`} width={cur.w} height={cur.h} sizes="90vw" className="h-auto max-h-[68vh] w-auto max-w-full rounded-xl object-contain" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="font-bold">{cur.title}</p>
                <p className="text-sm text-ink/60">{cur.label} · {(open ?? 0) + 1} of {viewable.length}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => step(-1)} aria-label="Previous" className="h-11 w-11 rounded-full border border-ink/20 hover:border-ink">←</button>
                <button onClick={() => step(1)} aria-label="Next" className="h-11 w-11 rounded-full border border-ink/20 hover:border-ink">→</button>
                <button onClick={() => dialog.current?.close()} className="g-action h-11 rounded-full px-5 font-semibold">Close</button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
