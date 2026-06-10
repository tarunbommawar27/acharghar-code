import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/context/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Achar Ghar" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = subtotal === 0 ? 0 : subtotal > 40 ? 0 : 6.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="container-x py-24 text-center max-w-xl">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-accent text-primary mb-6">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="font-serif text-4xl mb-3">Your pickle jar is waiting to be filled.</h1>
          <p className="text-muted-foreground mb-8">
            Browse our small-batch homemade pickles and add a few jars to begin.
          </p>
          <Link to="/shop" className="btn-primary">Shop Now <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-x py-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Your Cart</h1>
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id + item.size} className="card-soft p-4 sm:p-5 flex gap-4">
                <Link to="/product/$id" params={{ id: item.product.id }} className="shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <Link to="/product/$id" params={{ id: item.product.id }} className="font-serif text-lg hover:text-primary truncate block">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                    </div>
                    <div className="font-serif text-lg shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(item.product.id, item.size, item.quantity - 1)} className="h-8 w-8 grid place-items-center hover:bg-accent rounded-l-full">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => setQty(item.product.id, item.size, item.quantity + 1)} className="h-8 w-8 grid place-items-center hover:bg-accent rounded-r-full">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => remove(item.product.id, item.size)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition">
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="card-soft p-6 self-start sticky top-24 space-y-4">
            <h2 className="font-serif text-2xl">Order Summary</h2>
            <div className="space-y-2 text-sm border-y border-border py-4">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label={`Shipping${shipping === 0 ? " (free)" : ""}`} value={`$${shipping.toFixed(2)}`} />
              <Row label="Estimated tax" value={`$${tax.toFixed(2)}`} />
            </div>
            <div className="flex justify-between font-serif text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/shop" className="block text-center text-sm text-primary hover:underline">
              Continue shopping
            </Link>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-foreground/80">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
