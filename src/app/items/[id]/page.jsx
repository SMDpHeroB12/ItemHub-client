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

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = await getItem(id);

  return {
    title: item?.name ? `ItemHub | ${item.name}` : "ItemHub | Item Details",
  };
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) notFound();

  const gallery = Array.isArray(item.images) ? item.images : [];

  return (
    <section className="max-w-6xl mx-auto px-4 pb-10 pt-30">
      {/* Header */}
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
        {/* LEFT: Main image + Gallery */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-base-100 border border-base-300/40 shadow-sm overflow-hidden">
            {item.image ? (
              <Image
                width={900}
                height={900}
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-contain"
                unoptimized
                priority
              />
            ) : (
              <div className="w-full h-96 bg-base-200" />
            )}
          </div>

          {/* Gallery */}
          <div className="rounded-3xl bg-base-100 border border-base-300/40 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Gallery</p>
              <span className="text-xs text-base-content/60">
                {gallery.length} image{gallery.length === 1 ? "" : "s"}
              </span>
            </div>

            {gallery.length === 0 ? (
              <p className="mt-3 text-sm text-base-content/70">
                No extra images found.
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {gallery.map((url, idx) => (
                  <div
                    key={`${url}-${idx}`}
                    className="rounded-2xl border border-base-300/40 bg-base-200/30 overflow-hidden"
                    title={`Image ${idx + 1}`}
                  >
                    <Image
                      width={300}
                      height={300}
                      src={url}
                      alt={`${item.name} ${idx + 1}`}
                      className="w-full h-20 object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: All details */}
        <div className="rounded-3xl bg-base-100 border border-base-300/40 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <span className="badge badge-primary badge-outline">Details</span>
            <p className="text-2xl font-extrabold">${item.price}</p>
          </div>

          {/* Category / Subcategory */}
          <div className="mt-4 flex flex-wrap gap-2">
            {item.category ? (
              <span className="badge badge-outline">{item.category}</span>
            ) : (
              <span className="badge badge-ghost">No category</span>
            )}

            {item.subCategory ? (
              <span className="badge badge-outline">{item.subCategory}</span>
            ) : null}
          </div>

          {/* Description */}
          <div className="mt-5">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
              {item.description || "No description provided."}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <p className="font-semibold">Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(item.tags) && item.tags.length > 0 ? (
                item.tags.map((t) => (
                  <span key={t} className="badge badge-outline">
                    {t}
                  </span>
                ))
              ) : (
                <p className="text-sm text-base-content/70">No tags</p>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-base-content/60">Item ID</p>
              <p className="font-medium break-all">{item._id}</p>
            </div>

            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-base-content/60">Created At</p>
              <p className="font-medium">{formatDate(item.createdAt)}</p>
            </div>

            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-base-content/60">Status</p>
              <p className="font-medium">Available</p>
            </div>

            <div className="rounded-2xl bg-base-200/60 p-4">
              <p className="text-base-content/60">Main Image</p>
              <p className="font-medium">{item.image ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Actions */}
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
