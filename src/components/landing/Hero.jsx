import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-10 pb-12">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="badge badge-outline">Simple • Fast • Clean</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
            Manage your items in one place with{" "}
            <span className="text-primary">ItemHub</span>.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-base-content/70 max-w-xl">
            A lightweight item listing app built with Next.js + Express +
            MongoDB. Browse items publicly and (optionally) add new items with
            secure login.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/items" className="btn btn-primary">
              Browse Items
            </Link>
            <Link href="/login" className="btn btn-outline">
              Login
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-base-content/70">
            <span className="inline-flex items-center gap-2">
              <span className="badge badge-success badge-xs" /> Public item list
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="badge badge-success badge-xs" /> Protected
              add-item
            </span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative">
          <div className="rounded-3xl border border-base-300/40 bg-base-100/70 backdrop-blur shadow-xl p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Featured Item</p>
              <span className="badge badge-primary badge-outline">New</span>
            </div>

            <div className="mt-4 rounded-2xl bg-base-200 p-4">
              <div className="h-40 rounded-xl bg-base-300/40" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 w-2/3 rounded bg-base-300/40" />
              <div className="h-4 w-1/2 rounded bg-base-300/40" />
              <div className="h-10 w-32 rounded-full bg-primary/30" />
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 hidden sm:block">
            <div className="rounded-2xl bg-base-100 shadow border border-base-300/40 px-4 py-3">
              <p className="text-sm font-semibold">Fast Setup</p>
              <p className="text-xs text-base-content/70">
                Deploy-ready structure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
