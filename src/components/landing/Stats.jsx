import StatsClient from "./StatsClient";

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

  return <StatsClient stats={stats} />;
}
