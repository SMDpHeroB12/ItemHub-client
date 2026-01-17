"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsClient({ list }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testi-head",
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
        ".testi-card",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
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
    <section ref={rootRef} className="container mx-auto px-4 pb-12">
      <div className="testi-head">
        <h2 className="text-3xl font-bold">What people say</h2>
        <p className="mt-2 text-base-content/70">
          A few short testimonials to build trust.
        </p>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {list.map((t) => (
          <div
            key={t.name}
            className="testi-card rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-base-content/80 leading-relaxed">
              “{t.text}”
            </p>

            {/* User info */}
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold leading-tight">{t.name}</p>
                <p className="text-xs text-base-content/60">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
