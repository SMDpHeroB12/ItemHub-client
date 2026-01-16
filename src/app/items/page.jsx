"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className=" min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <section className="bg-base-100 text-base-content min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl font-bold bg-base-100 text-base-content mb-6">
          Items
        </h1>

        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 bg-base-100 text-base-content ">
            {items.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow border border-gray-200"
              >
                <figure>
                  <Image
                    width={500}
                    height={500}
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-contain"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p className="text-sm text-base-content/70">
                    {item.description.slice(0, 80)}...
                  </p>

                  <p className="font-semibold text-base-content">
                    ${item.price}
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/items/${item._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
