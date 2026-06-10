import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import heroImg from "@/assets/hero.jpg";
import mango from "@/assets/mango.jpg";
import chunda from "@/assets/chunda.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Achar Ghar" },
      { name: "description", content: "Achar Ghar brings homemade Indian pickle flavors to every table — slow-made, spice-rich, prepared with care." },
      { property: "og:title", content: "Our Story — Achar Ghar" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: About,
});

const blocks = [
  { title: "Our Ingredients", text: "We source raw mangoes, lemons, fresh garlic and seasonal vegetables from trusted growers. Spices are toasted and ground in-house — never pre-mixed." },
  { title: "Our Process", text: "Hand-cut, salt-cured, sun-rested, and slow-finished in cold-pressed mustard or sesame oil. The same way it's done in Indian homes." },
  { title: "Why Homemade Matters", text: "Mass-made achar loses the soul of the recipe. We keep batches small so every jar tastes layered, alive, and unmistakably homemade." },
  { title: "Meet the Kitchen", text: "A small team of home cooks, led by mothers and grandmothers, working out of a dedicated kitchen built around tradition and care." },
];

export default function About() {
  return (
    <Layout>
      <section className="container-x py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">Our Story</div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">
            A jar of home, anywhere you are.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Achar Ghar began with a simple idea — to bring homemade Indian pickle
            flavors to every table. Inspired by family kitchens, regional recipes,
            and traditional slow-made methods, we prepare each jar in small batches,
            with care.
          </p>
          <Link to="/shop" className="btn-primary mt-8">Shop our pickles <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative">
          <img src={heroImg} alt="" className="rounded-[2rem] w-full aspect-[5/4] object-cover" />
        </div>
      </section>

      <section className="container-x py-12 grid md:grid-cols-2 gap-6">
        {blocks.map((b) => (
          <div key={b.title} className="card-soft p-8 lift-on-hover">
            <h3 className="font-serif text-2xl mb-3">{b.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{b.text}</p>
          </div>
        ))}
      </section>

      <section className="container-x py-20">
        <SectionHeader center eyebrow="Made by hand" title="Three things we will never compromise" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Real ingredients", d: "Whole spices, real oils, fresh produce. Nothing artificial." },
            { n: "02", t: "Small batches", d: "We cook in family quantities so flavor stays honest." },
            { n: "03", t: "Traditional methods", d: "Sun rests, hand stirring, slow tempering — every time." },
          ].map((x) => (
            <div key={x.n} className="card-soft p-8">
              <div className="font-serif text-4xl text-primary/40 mb-3">{x.n}</div>
              <h3 className="font-serif text-xl mb-2">{x.t}</h3>
              <p className="text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="card-soft p-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={mango} alt="" className="rounded-2xl aspect-square object-cover" />
            <img src={chunda} alt="" className="rounded-2xl aspect-square object-cover mt-8" />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Built for Indian homes everywhere.</h2>
            <p className="mt-4 text-muted-foreground">
              Whether you grew up with achar on the table or you're meeting it for
              the first time, we hope every jar reminds you of a kitchen full of love.
            </p>
            <Link to="/shop" className="btn-outline mt-6">Browse pickles</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
