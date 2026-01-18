export default function Loading() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 pt-30">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-base-300/40 rounded" />
          <div className="h-4 w-40 bg-base-300/40 rounded" />
        </div>
        <div className="h-10 w-32 bg-base-300/40 rounded" />
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="h-[360px] rounded-3xl bg-base-300/30" />
        <div className="rounded-3xl bg-base-100 border border-base-300/40 shadow-sm p-6 space-y-3">
          <div className="h-6 w-40 bg-base-300/40 rounded" />
          <div className="h-10 w-28 bg-base-300/40 rounded" />
          <div className="h-4 w-full bg-base-300/40 rounded" />
          <div className="h-4 w-5/6 bg-base-300/40 rounded" />
          <div className="h-4 w-4/6 bg-base-300/40 rounded" />
        </div>
      </div>
    </section>
  );
}
