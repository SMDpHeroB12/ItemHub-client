"use client";

import { useRef } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

export default function HowItWorksClient({ steps }) {
  const rootRef = useRef(null);

  useRevealOnScroll(rootRef, {
    selector: ".how-reveal",
    start: "top 80%",
    stagger: 0.1,
  });

  return (
    <section ref={rootRef} className="container mx-auto px-4 py-12">
      <div className="max-w-2xl how-reveal">
        <h2 className="text-3xl font-bold">How it works</h2>
        <p className="mt-2 text-base-content/70">
          A simple flow—built like a real-world app.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {steps.map((s, idx) => (
          <div
            key={s.title}
            className="how-reveal rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="badge badge-primary badge-outline">
              Step {idx + 1}
            </div>
            <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
            <p className="mt-2 text-sm text-base-content/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
