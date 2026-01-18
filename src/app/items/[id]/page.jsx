import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getItem(id) {
  try {
    const baseUrl =
      process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${baseUrl}/api/items/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) return null;
    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params; // ✅ unwrap params promise
  const item = await getItem(id);

  return {
    title: item?.name ? `ItemHub | ${item.name}` : "ItemHub | Item Details",
  };
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params; // ✅ unwrap params promise
  const item = await getItem(id);

  if (!item) notFound();

  return (
    <section className="max-w-6xl mx-auto px-4 pb-10 pt-30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Item details from database
          </p>
        </div>

        <Link href="/items" className="btn btn-sm btn-outline">
          ← Back to Items
        </Link>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-base-100 border border-base-300/40 shadow-sm overflow-hidden">
          {item.image ? (
            <Image
              width={500}
              height={500}
              src={item.image}
              alt={item.name}
              className="w-full h-90 object-contain"
            />
          ) : (
            <div className="w-full h-90 bg-base-200" />
          )}
        </div>

        <div className="rounded-3xl bg-base-100 border border-base-300/40 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <span className="badge badge-primary badge-outline">Details</span>
            <p className="text-2xl font-extrabold">${item.price}</p>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
              {item.description || "No description provided."}
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-base-content/60">Item ID</p>
              <p className="font-medium break-all">{item._id}</p>
            </div>

            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-base-content/60">Status</p>
              <p className="font-medium">Available</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/items" className="btn btn-outline">
              Browse More
            </Link>
            <Link href="/add-item" className="btn btn-primary">
              Add Item
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
