export default function Testimonials() {
  const list = [
    {
      name: "Recruiter",
      role: "Frontend",
      text: "Clean layout, good structure, easy to navigate.",
    },
    {
      name: "Mentor",
      role: "Full Stack",
      text: "Nice separation of client/server with real API usage.",
    },
    {
      name: "User",
      role: "Visitor",
      text: "Fast and simple. Dark mode works great.",
    },
  ];

  return (
    <section className="container mx-auto px-4 pb-12">
      <h2 className="text-3xl font-bold">What people say</h2>
      <p className="mt-2 text-base-content/70">
        A few short testimonials to build trust.
      </p>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {list.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl bg-base-100 border border-base-300/40 p-6 shadow-sm"
          >
            <p className="text-sm text-base-content/80">“{t.text}”</p>
            <div className="mt-4">
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-base-content/60">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
