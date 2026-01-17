"use client";

import Link from "next/link";
import { useRef } from "react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import { useSession } from "next-auth/react";

export default function FaqCtaClient() {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;
  const isLoading = status === "loading";

  const rootRef = useRef(null);

  useRevealOnScroll(rootRef, {
    selector: ".faqcta-reveal",
    start: "top 80%",
    stagger: 0.08,
    y: 14,
    duration: 0.6,
  });

  const faqs = [
    {
      q: "Is login required?",
      a: "No for browsing items. Login is required only for protected actions.",
    },
    {
      q: "Where does data come from?",
      a: "Items are served from an Express API as JSON.",
    },
    {
      q: "Does it support dark mode?",
      a: "Yes. Theme toggle works across all routes.",
    },
  ];

  return (
    <section ref={rootRef} className="container mx-auto px-4 pb-16">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* FAQ Card */}
        <div className="faqcta-reveal rounded-3xl bg-base-100 border border-base-300/40 p-6 sm:p-8 shadow-sm">
          <h2 className="text-3xl font-bold">FAQ</h2>

          <div className="mt-4 space-y-3">
            {faqs.map((f, idx) => (
              <div
                key={f.q}
                className="faqcta-reveal collapse collapse-arrow bg-base-200 border border-base-300/40"
              >
                <input type="radio" name="faq" />
                <div className="collapse-title font-medium">{f.q}</div>
                <div className="collapse-content">
                  <p className="text-sm text-base-content/70">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="faqcta-reveal rounded-3xl bg-primary text-primary-content p-6 sm:p-8 shadow-sm grid place-items-center">
          <div>
            <h3 className="text-3xl font-bold">Ready to explore ItemHub?</h3>
            <p className="mt-2 opacity-90">
              Browse items now, and later login to add new items securely.
            </p>
            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/items"
                className="btn bg-base-100 text-base-content border-0"
              >
                Browse Items
              </Link>

              {!isLoading && !isLoggedIn && (
                <Link
                  href="/login"
                  className="btn btn-outline border-base-100 text-base-100"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
