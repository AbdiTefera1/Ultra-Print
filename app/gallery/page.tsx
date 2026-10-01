import WorkGrid from "@/components/WorkGrid";

export const metadata = { title: "Work" };

export default function Work() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">Work</h1>
      <p className="mt-4 mb-10 max-w-xl text-ink/75">The kinds of jobs we produce.</p>
      <WorkGrid />
    </div>
  );
}
