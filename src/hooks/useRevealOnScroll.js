"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useRevealOnScroll(rootRef, options = {}) {
  useEffect(() => {
    if (!rootRef?.current) return;

    const {
      selector = ".reveal",
      start = "top 80%",
      stagger = 0.08,
      y = 14,
      duration = 0.6,
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power2.out",
          stagger,
          scrollTrigger: {
            trigger: rootRef.current,
            start,
            // ✅ play each time it enters the viewport
            toggleActions: "play none none reset",
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef, options]);
}
