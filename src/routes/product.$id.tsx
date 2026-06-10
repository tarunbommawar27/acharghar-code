import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Minus, Plus, Star, Truck, Leaf, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import SpiceLevelBadge from "@/components/SpiceLevel";
import { products } from "@/data/products";
import { useCart } from "@/context/cart";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.name} — Achar Ghar` : "Pickle — Achar Ghar" },
        { name: "description", content: p?.description ?? "Homemade Indian pickle." },
        { property: "og:title", content: p?.name ?? "Achar Ghar" },
        { property: "og:description", content: p?.description ?? "" },
        ...(p ? [{ property: "og:image" as const, content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-x py-32 text-center">
        <h1 className="font-serif text-4xl">Pickle not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to shop</Link>
      </div>
    </Layout>
  ),
  component: ProductPage,
});

const sizes = [
  { id: "250g", label: "250 g", mult: 0.7 },
  { id: "500g", label: "500 g", mult: 1 },
  { id: "1kg", label: "1 kg", mult: 1.85 },
];

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState("500g");
  const [qty, setQty] = useState(1);

  const mult = sizes.find((s) => s.id === size)?.mult ?? 1;
  const displayPrice = product.price * mult;
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <section className="container-x pt-10 pb-16">
        <div className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
          <span>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-mustard)]/40 to-primary/20 rotate-2" />
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="relative aspect-square w-full object-cover rounded-[2.5rem] shadow-xl"
            />
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
              {product.category}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">{product.name}</h1>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[var(--color-turmeric)] text-[var(--color-turmeric)]" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">(132 reviews)</span>
              </div>
              <SpiceLevelBadge level={product.spice} />
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8 text-3xl font-serif">${displayPrice.toFixed(2)}</div>

            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">Size</div>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`rounded-full px-4 py-2 text-sm border transition ${
                      size === s.id
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="text-sm font-semibold">Quantity</div>
              <div className="inline-flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 grid place-items-center hover:bg-accent rounded-l-full">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 grid place-items-center hover:bg-accent rounded-r-full">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => { add(product, size, qty); toast.success(`${product.name} added to cart`); }}
                className="btn-primary"
              >
                Add to Cart
              </button>
              <button
                onClick={() => { add(product, size, qty); navigate({ to: "/checkout" }); }}
                className="btn-outline"
              >
                Buy Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free US shipping over $40" },
                { icon: Leaf, label: "No preservatives" },
                { icon: ShieldCheck, label: "Sealed glass jar" },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <I className="h-4 w-4 text-primary" /> {label}
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-5 border-t border-border pt-8">
              <div>
                <h3 className="font-serif text-lg mb-1">Ingredients</h3>
                <p className="text-sm text-muted-foreground">{product.ingredients}</p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Store in a cool, dry place. Refrigerate after opening. Use a dry
                  spoon and keep oil above the pickle for longer shelf life.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Hand-packed and shipped within 2–3 business days across the United States.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Goes best with</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.pairsWith.map((p: string) => (
                    <span key={p} className="rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-20">
        <h2 className="font-serif text-3xl mb-8">You might also love</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Layout>
  );
}
