import FeaturesClient from "./FeaturesClient";

export default function Features() {
  const features = [
    {
      title: "Clean UI",
      desc: "DaisyUI + Tailwind makes it consistent in light/dark mode.",
    },
    {
      title: "Express API",
      desc: "Items come from a separate Express server as JSON.",
    },
    {
      title: "MongoDB Atlas",
      desc: "Store items in a real database for add-item feature.",
    },
    {
      title: "Route Protection",
      desc: "Only logged-in users can access protected pages.",
    },
    {
      title: "Fast Feedback",
      desc: "Toasts + loading spinners for a smooth experience.",
    },
    {
      title: "Responsive",
      desc: "Mobile, tablet, desktop—everything adapts nicely.",
    },
  ];

  return <FeaturesClient features={features} />;
}
