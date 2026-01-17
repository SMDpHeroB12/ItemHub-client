"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Logo from "../Logo";

export default function HeroClient({ featured }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-badge",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      );

      gsap.fromTo(
        ".hero-title",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.05 },
      );

      gsap.fromTo(
        ".hero-text",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.12 },
      );

      gsap.fromTo(
        ".hero-actions",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 },
      );

      gsap.fromTo(
        ".hero-visual",
        { y: 18, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.12,
        },
      );

      gsap.fromTo(
        ".hero-chip",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.45 },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="container mx-auto px-4 pt-28 pb-12">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="badge shadow hero-badge">Simple • Fast • Clean</p>

          <div className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-400 leading-tight hero-title ">
            Manage your items in one place with{" "}
            <span className="text-base-content">
              Item
              <span className="text-primary">Hub</span>
            </span>
          </div>

          <p className="mt-4 text-base sm:text-lg text-base-content/70 max-w-xl hero-text">
            A lightweight item listing app built with Next.js + Express +
            MongoDB. Browse items publicly and (optionally) add new items with
            secure login.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 hero-actions">
            <Link href="/items" className="btn btn-primary">
              Browse Items
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-base-content/70 hero-actions">
            <span className="inline-flex items-center gap-2">
              <span className="badge badge-success badge-xs" /> Public item list
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="badge badge-success badge-xs" /> Protected
              add-item
            </span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative hero-visual">
          <div className="rounded-3xl border border-base-300/40 bg-base-100/70 backdrop-blur shadow-xl p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Featured Item</p>
              <span className="badge badge-secondary  font-bold rounded-sm">
                Live
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-base-200 p-4">
              {featured?.image ? (
                // image tag for simplicity (no next/image host config headaches)
                <Image
                  width={200}
                  height={200}
                  src={featured.image}
                  alt={featured.name || "Featured Item"}
                  className="h-50 w-full rounded-xl object-contain"
                />
              ) : (
                <div className="h-40 rounded-xl bg-base-300/40" />
              )}
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-lg font-bold">
                {featured?.name || "No featured item yet"}
              </p>
              <p className="text-sm text-base-content/70">
                {featured?.description
                  ? `${featured.description.slice(0, 90)}...`
                  : "Add an item to see it featured here."}
              </p>

              {featured?._id ? (
                <Link
                  href={`/items/${featured._id}`}
                  className="btn btn-sm btn-primary rounded-full"
                >
                  View Details
                </Link>
              ) : (
                <Link
                  href="/add-item"
                  className="btn btn-sm btn-outline rounded-full"
                >
                  Add First Item
                </Link>
              )}
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 hidden sm:block hero-chip ">
            <div className="rounded-2xl border border-secondary border-dashed bg-base-100 shadow  px-4 py-3">
              <p className="text-sm font-semibold">Live From DB</p>
              <p className="text-xs text-base-content/70">
                Latest item preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
