import FeaturedItemsClient from "./FeaturedItemsClient";

async function getFeaturedItems() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    const items = await res.json();
    if (!Array.isArray(items)) return [];
    // last 3 items as featured
    return items.slice(-3).reverse();
  } catch {
    return [];
  }
}

export default async function FeaturedItems() {
  const items = await getFeaturedItems();
  return <FeaturedItemsClient items={items} />;
}
