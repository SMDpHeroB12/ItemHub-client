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

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-2xl">
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
            className="rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm"
          >
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-base-content/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
