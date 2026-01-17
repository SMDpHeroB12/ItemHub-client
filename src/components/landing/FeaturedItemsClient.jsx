"use client";

import Link from "next/link";
import { useRef } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import Image from "next/image";

export default function FeaturedItemsClient({ items }) {
  const rootRef = useRef(null);

  useRevealOnScroll(rootRef, {
    selector: ".feat-reveal",
    start: "top 80%",
    stagger: 0.08,
  });

  return (
    <section ref={rootRef} className="container mx-auto px-4 pb-12">
      <div className="flex items-end justify-between gap-4 feat-reveal">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold">Featured items</h2>
          <p className="mt-2 text-base-content/70">
            Latest items from the database.
          </p>
        </div>

        <Link href="/items" className="btn btn-sm btn-outline feat-reveal">
          View All
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-base-100 border border-base-300/40 p-6 feat-reveal">
          <p className="text-base-content/70">
            No items found. Add your first item to see it featured here.
          </p>
          <Link href="/add-item" className="btn btn-sm btn-primary mt-4">
            Add Item
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="feat-reveal rounded-2xl bg-base-100 border border-base-300/40 overflow-hidden shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-44 bg-base-200">
                {item?.image ? (
                  <Image
                    width={350}
                    height={350}
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full bg-base-300/40" />
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="mt-2 text-sm text-base-content/70">
                  {item.description?.slice(0, 90)}...
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-bold">${item.price}</p>
                  <Link
                    href={`/items/${item._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
