import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { categories, products, spiceLevels, type SpiceLevel } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Homemade Indian Pickles — Achar Ghar" },
      { name: "description", content: "Browse small-batch homemade Indian pickles by region, spice level, and flavor. Mango, lemon, garlic, gongura and more." },
      { property: "og:title", content: "Shop — Achar Ghar" },
      { property: "og:description", content: "Browse small-batch homemade Indian pickles." },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "price-asc" | "price-desc" | "name";

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [spices, setSpices] = useState<SpiceLevel[]>([]);
  const [maxPrice, setMaxPrice] = useState(15);
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let r = products.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())
    );
    if (cat !== "All") r = r.filter((p) => p.category === cat);
    if (spices.length) r = r.filter((p) => spices.includes(p.spice));
    r = r.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price-asc": r = [...r].sort((a, b) => a.price - b.price); break;
      case "price-desc": r = [...r].sort((a, b) => b.price - a.price); break;
      case "name": r = [...r].sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return r;
  }, [q, cat, spices, maxPrice, sort]);

  const toggleSpice = (s: SpiceLevel) =>
    setSpices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <Layout>
      <section className="container-x pt-12 pb-6">
        <SectionHeader
          eyebrow="Our pickles"
          title="The Pickle Pantry"
          subtitle="Eight handcrafted jars, each one a different mood, region, or memory."
        />
      </section>

      <section className="container-x grid lg:grid-cols-[260px_1fr] gap-10 pb-20">
        {/* Filters */}
        <aside className="space-y-8 lg:sticky lg:top-24 self-start">
          <div>
            <label className="text-xs font-semibold tracking-[0.18em] uppercase text-foreground/60">Search</label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find a pickle..."
                className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-foreground/60 mb-3">Category</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition ${
                    cat === c
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card border-border hover:border-foreground/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-foreground/60 mb-3">Spice level</div>
            <div className="flex flex-col gap-2">
              {spiceLevels.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={spices.includes(s)}
                    onChange={() => toggleSpice(s)}
                    className="accent-[var(--color-primary)] h-4 w-4"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-foreground/60 mb-2">
              Max price: <span className="text-foreground">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={5}
              max={15}
              step={0.5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground">{list.length} pickle{list.length === 1 ? "" : "s"}</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          {list.length === 0 ? (
            <div className="card-soft p-12 text-center">
              <p className="font-serif text-2xl mb-2">No pickles match those filters</p>
              <p className="text-sm text-muted-foreground">Try widening your search.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
