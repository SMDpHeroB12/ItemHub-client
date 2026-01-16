import Link from "next/link";

export default function FaqCta() {
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
    <section className="container mx-auto px-4 pb-16">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-base-100 border border-base-300/40 p-6 sm:p-8 shadow-sm">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title font-medium">{f.q}</div>
                <div className="collapse-content">
                  <p className="text-sm text-base-content/70">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-primary text-primary-content p-6 sm:p-8 shadow-sm">
          <h3 className="text-3xl font-bold">Ready to explore ItemHub?</h3>
          <p className="mt-2 opacity-90">
            Browse items now, and later login to add new items securely.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/items"
              className="btn bg-base-100 text-base-content border-0"
            >
              Browse Items
            </Link>
            <Link
              href="/login"
              className="btn btn-outline border-base-100 text-base-100"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
