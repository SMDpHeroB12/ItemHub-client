import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 pt-30">
      <div className="rounded-3xl bg-base-100 border border-base-300/40 p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Item not found</h1>
        <p className="mt-2 text-base-content/70">
          The item you are looking for does not exist or was removed.
        </p>
        <Link href="/items" className="btn btn-primary mt-6">
          Back to Items
        </Link>
      </div>
    </section>
  );
}
