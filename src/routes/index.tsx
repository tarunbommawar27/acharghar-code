import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Flame,
  HandHeart,
  Wheat,
  Package,
  Star,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImg from "@/assets/hero.jpg";
import mangoImg from "@/assets/mango.jpg";
import chundaImg from "@/assets/chunda.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Achar Ghar — Homemade Indian Pickles, Crafted with Tradition" },
      { name: "description", content: "Small-batch homemade Indian pickles. Family recipes, regional flavors, real spices. Shipped fresh across the United States." },
      { property: "og:title", content: "Achar Ghar — Homemade Indian Pickles" },
      { property: "og:description", content: "Small-batch homemade Indian pickles. Family recipes, regional flavors, real spices." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

const featured = ["mango", "lemon", "garlic", "mixed"];

const whyUs = [
  { icon: HandHeart, title: "Homemade in small batches", text: "Hand-stirred and slow-cured in family-sized batches — never mass produced." },
  { icon: Sparkles, title: "Traditional family recipes", text: "Generations-old recipes from real Indian kitchens, preserved without shortcuts." },
  { icon: Leaf, title: "No artificial preservatives", text: "Only salt, spice, oil, and time — the way achar has always been made." },
  { icon: Flame, title: "Fresh spices & cold-pressed oils", text: "We toast, grind and temper our own masalas using cold-pressed mustard oil." },
  { icon: Package, title: "Packed with care", text: "Sealed in glass jars and shipped fresh, so the flavor reaches you intact." },
  { icon: Wheat, title: "Plant-based & vegetarian", text: "Every jar is 100% vegetarian and uses simple, real ingredients." },
];

const regions = [
  { name: "Andhra", desc: "Fiery, oil-rich pickles built around chili, sesame and gongura.", color: "from-[oklch(0.5_0.18_28)] to-[oklch(0.35_0.12_28)]" },
  { name: "Gujarati", desc: "Sweet, tangy, sun-cooked preserves like chunda and chhundo.", color: "from-[oklch(0.78_0.15_75)] to-[oklch(0.6_0.16_60)]" },
  { name: "Punjabi", desc: "Bold mustard-oil pickles with whole spices and slow curing.", color: "from-[oklch(0.55_0.13_45)] to-[oklch(0.38_0.1_35)]" },
  { name: "Maharashtrian", desc: "Homestyle achars layered with garlic, fenugreek and groundnut oil.", color: "from-[oklch(0.6_0.15_55)] to-[oklch(0.42_0.13_40)]" },
];

const steps = [
  { n: "01", title: "Choose your pickle", text: "Browse regional flavors and pick your favorite." },
  { n: "02", title: "Add to cart", text: "Mix and match jars to build your collection." },
  { n: "03", title: "We prepare & pack fresh", text: "Hand-jarred after your order, sealed with care." },
  { n: "04", title: "Enjoy at home", text: "Open a jar of homemade Indian flavor." },
];

const testimonials = [
  { name: "Priya S.", text: "Tastes exactly like my grandmother's homemade achar. I almost cried at the first bite." },
  { name: "Arjun M.", text: "The mango pickle is perfectly spicy and full of flavor — I keep ordering more." },
  { name: "Neha R.", text: "Fresh, authentic, and beautifully packed. The kind of pickle you can't find in stores." },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-[var(--color-mustard)]/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />

        <div className="container-x relative grid lg:grid-cols-2 gap-10 lg:gap-16 py-16 md:py-24 lg:py-28 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground/70 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Small-batch · Sun-kissed · Homemade
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Homemade Indian Pickles,
              <span className="block italic text-primary"> Made with Love.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Small-batch Indian pickles prepared using traditional family recipes,
              sun-kissed spices, and authentic regional flavors — jarred fresh and
              delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">
                Shop Pickles <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="btn-outline">Explore Our Story</Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--color-turmeric)] text-[var(--color-turmeric)]" />
                  ))}
                </div>
                <span className="font-semibold text-foreground">4.9</span>
                <span>· 2,400+ jars shipped</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-mustard)]/60 to-primary/30 rotate-3" />
              <img
                src={heroImg}
                alt="Jar of homemade Indian mango pickle with whole spices"
                width={1600}
                height={1200}
                className="relative rounded-[2.5rem] object-cover w-full h-full shadow-2xl"
              />
              <div className="hidden md:flex absolute -left-6 top-12 card-soft px-4 py-3 gap-3 items-center animate-float">
                <img src={mangoImg} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <div className="text-xs text-muted-foreground">Bestseller</div>
                  <div className="text-sm font-semibold">Mango Pickle</div>
                </div>
              </div>
              <div className="hidden md:flex absolute -right-6 bottom-10 card-soft px-4 py-3 gap-3 items-center animate-float [animation-delay:1.5s]">
                <img src={chundaImg} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <div className="text-xs text-muted-foreground">Customer pick</div>
                  <div className="text-sm font-semibold">Sweet Mango Chunda</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-x py-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <SectionHeader
            eyebrow="Bestsellers"
            title="Customer Favorites"
            subtitle="Hand-picked jars our customers reorder again and again."
          />
          <Link to="/shop" className="text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
            View all pickles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => featured.includes(p.id))
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-[color-mix(in_oklab,var(--color-primary)_5%,var(--color-background))] py-20">
        <div className="container-x">
          <SectionHeader
            center
            eyebrow="Why Achar Ghar"
            title="The taste of a real Indian kitchen"
            subtitle="Six promises we keep in every single jar."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-soft p-6 lift-on-hover">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="container-x py-20">
        <SectionHeader
          eyebrow="Regional Flavors"
          title="A journey through India, jar by jar"
          subtitle="Every region of India has its own way of making achar. We bring you the best of each."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((r) => (
            <div
              key={r.name}
              className={`relative aspect-[4/5] rounded-3xl overflow-hidden p-6 flex flex-col justify-end text-white bg-gradient-to-br ${r.color} lift-on-hover`}
            >
              <div className="absolute inset-0 pattern-bg opacity-20" />
              <div className="relative">
                <div className="text-xs font-semibold tracking-[0.2em] uppercase opacity-80 mb-2">
                  Region
                </div>
                <h3 className="font-serif text-2xl mb-2">{r.name}</h3>
                <p className="text-sm opacity-90 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x py-20">
        <SectionHeader
          center
          eyebrow="How it works"
          title="From our kitchen to yours"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-serif text-5xl text-primary/30 mb-2">{s.n}</div>
              <h3 className="font-serif text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--color-foreground)] text-background py-20">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-mustard)] mb-3">
              Loved by home cooks
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              "Tastes just like home."
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl border border-white/10 p-7 bg-white/[0.03] backdrop-blur">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--color-mustard)] text-[var(--color-mustard)]" />
                  ))}
                </div>
                <p className="font-serif text-lg leading-relaxed italic">"{t.text}"</p>
                <div className="mt-5 text-sm opacity-70">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="container-x py-20">
        <div className="card-soft p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Our story
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Every jar carries the taste of Indian homes.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              At Achar Ghar, every jar is slow-made, spice-rich, and prepared with
              care using recipes passed down through generations. We believe pickle
              isn't a condiment — it's a memory.
            </p>
            <Link to="/about" className="btn-primary mt-7">
              Read Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={mangoImg} alt="" className="rounded-2xl aspect-square object-cover" />
            <img src={chundaImg} alt="" className="rounded-2xl aspect-square object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-x pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.32_0.13_28)] text-primary-foreground p-10 md:p-14">
          <div className="absolute inset-0 pattern-bg opacity-20" />
          <div className="relative max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl">Get seasonal pickle launches & stories</h2>
            <p className="mt-3 opacity-90">
              Recipes, regional features, and early access to limited batches.
              No spam — just good food.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 rounded-full px-5 py-3 text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-mustard)]"
              />
              <button className="rounded-full bg-[var(--color-mustard)] text-foreground px-6 py-3 font-semibold hover:brightness-95 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
