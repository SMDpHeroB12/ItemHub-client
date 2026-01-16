export default function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Browse Items",
      desc: "Public page shows items from the API.",
    },
    {
      n: "02",
      title: "Open Details",
      desc: "View full item information on details page.",
    },
    {
      n: "03",
      title: "Add New Item",
      desc: "Login to access protected add-item form.",
    },
  ];

  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="rounded-3xl bg-base-100 border border-base-300/40 p-6 sm:p-10 shadow-sm">
        <h2 className="text-3xl font-bold">How it works</h2>
        <p className="mt-2 text-base-content/70">
          Simple flow—easy to understand, easy to maintain.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-base-200 p-6">
              <p className="text-sm font-semibold text-primary">{s.n}</p>
              <h3 className="mt-2 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
