import HeroClient from "./HeroClient";

async function getFeaturedItem() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const items = await res.json();

    if (!Array.isArray(items) || items.length === 0) return null;

    // simple: newest = last
    return items[items.length - 1];
  } catch {
    return null;
  }
}

export default async function Hero() {
  const featured = await getFeaturedItem();
  return <HeroClient featured={featured} />;
}
