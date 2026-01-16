import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedItems from "@/components/landing/FeaturedItems";
import Testimonials from "@/components/landing/Testimonials";
import FaqCta from "@/components/landing/FaqCta";

export default function HomePage() {
  return (
    <div className="bg-base-200 text-base-content ">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <FeaturedItems />
      <Testimonials />
      <FaqCta />
    </div>
  );
}
