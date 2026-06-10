import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useCart } from "@/context/cart";
import SpiceLevelBadge from "./SpiceLevel";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="card-soft lift-on-hover overflow-hidden flex flex-col group">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block aspect-square overflow-hidden bg-[color-mix(in_oklab,var(--color-mustard)_20%,var(--color-background))]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="font-serif text-lg leading-tight hover:text-primary transition-colors"
            >
              {product.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">{product.category} · 500g</p>
          </div>
          <span className="font-serif text-lg shrink-0">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <SpiceLevelBadge level={product.spice} />
          <button
            onClick={() => {
              add(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3.5 py-2 text-xs font-semibold hover:bg-primary transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
