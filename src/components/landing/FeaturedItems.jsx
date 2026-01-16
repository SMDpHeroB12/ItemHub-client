import Link from "next/link";

export default function FeaturedItems() {
  const demo = [
    { name: "Resistance Bands", price: 14.5 },
    { name: "Yoga Mat", price: 19.99 },
    { name: "Dumbbell Set", price: 79.99 },
  ];

  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Featured items</h2>
          <p className="mt-2 text-base-content/70">
            A quick preview—full list is available on the items page.
          </p>
        </div>
        <Link href="/items" className="btn btn-outline btn-sm">
          View All
        </Link>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demo.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm"
          >
            <div className="h-36 rounded-xl bg-base-200" />
            <h3 className="mt-4 font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm text-base-content/70">
              Short description for preview. Real data loads from the API.
            </p>
            <p className="mt-3 font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
