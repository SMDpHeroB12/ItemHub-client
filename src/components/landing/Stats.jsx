async function getItemCount() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items/count`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return typeof data?.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}

export default async function Stats() {
  const count = await getItemCount();

  const stats = [
    { label: "Public Items", value: count === null ? "—" : `${count}+` },
    { label: "Avg. Load Time", value: "<1s" },
    { label: "Protected Actions", value: "Auth" },
    { label: "Tech Stack", value: "Next + Express" },
  ];

  return (
    <section className="container mx-auto px-4 pb-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-base-100 border border-base-300/40 p-5 shadow-sm"
          >
            <p className="text-sm text-base-content/70">{s.label}</p>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
