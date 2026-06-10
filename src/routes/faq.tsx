import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Layout from "@/components/Layout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Achar Ghar" },
      { name: "description", content: "Answers to common questions about Achar Ghar homemade Indian pickles — ingredients, shipping, storage and more." },
    ],
  }),
  component: FAQ,
});

const faqs = [
  { q: "Are the pickles homemade?", a: "Yes. Every jar is made by hand in small batches in our dedicated kitchen, using traditional family recipes." },
  { q: "Do you use preservatives?", a: "No artificial preservatives. We rely on salt, spice, oil and time — the same way achar has been made in Indian homes for generations." },
  { q: "How long do the pickles last?", a: "Unopened, our pickles stay fresh for 8–12 months. After opening, refrigerate and use within 2–3 months for best flavor." },
  { q: "Do you ship across the United States?", a: "Yes — we ship to all 50 states. Orders over $40 ship free; most orders arrive in 3–5 business days." },
  { q: "Are the pickles vegetarian?", a: "All Achar Ghar pickles are 100% vegetarian and plant-based." },
  { q: "How spicy are the pickles?", a: "Each product is marked from Mild to Extra Hot. We balance heat with traditional spice layering — never one-note chili." },
  { q: "How should I store the pickle after opening?", a: "Refrigerate after opening, use a clean dry spoon, and make sure the oil sits above the pickle to keep it fresh." },
  { q: "Can I order in bulk?", a: "Yes — we offer custom and wholesale orders for events, weddings, and small businesses. Reach us via the contact page." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">FAQ</div>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">Good questions, honest answers.</h1>
        <p className="mt-5 text-muted-foreground text-lg">
          Everything you might want to know before opening your first jar.
        </p>
      </section>

      <section className="container-x max-w-3xl pb-12">
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card-soft overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6 hover:bg-accent/30 transition"
                >
                  <span className="font-serif text-lg md:text-xl">{f.q}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-x pb-20 max-w-3xl">
        <div className="card-soft p-8 text-center">
          <h3 className="font-serif text-2xl mb-2">Still have a question?</h3>
          <p className="text-muted-foreground mb-5">We're happy to help — usually within a day.</p>
          <Link to="/contact" className="btn-primary">Contact us</Link>
        </div>
      </section>
    </Layout>
  );
}
