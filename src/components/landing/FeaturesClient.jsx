"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesClient({ features }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".features-head",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".feature-card",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="container mx-auto px-4 py-12">
      <div className="max-w-2xl features-head">
        <h2 className="text-3xl font-bold">Why ItemHub?</h2>
        <p className="mt-2 text-base-content/70">
          Built as a simple job task project, but structured like a real-world
          app.
        </p>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="feature-card rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-base-content/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
