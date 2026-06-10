import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/context/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Achar Ghar" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);
  const shipping = subtotal > 40 ? 0 : 6.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  if (done) {
    return (
      <Layout>
        <section className="container-x py-24 max-w-xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--color-leaf)]/15 text-[var(--color-leaf)] mb-6 animate-fade-up">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="font-serif text-4xl mb-3">Order placed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you. Your jars are being prepared and packed fresh.
            A confirmation has been sent to your email.
          </p>
          <Link to="/shop" className="btn-primary">Continue shopping <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <section className="container-x py-24 text-center max-w-xl">
          <h1 className="font-serif text-4xl mb-3">Nothing to check out</h1>
          <p className="text-muted-foreground mb-8">Add a few pickles to your cart first.</p>
          <Link to="/shop" className="btn-primary">Browse Pickles</Link>
        </section>
      </Layout>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    clear();
    window.scrollTo({ top: 0 });
  };

  return (
    <Layout>
      <section className="container-x py-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Checkout</h1>
        <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-10">
            <Section title="Contact information">
              <Field label="Email" type="email" placeholder="you@email.com" required />
              <Field label="Phone" type="tel" placeholder="+1 555 000 0000" required />
            </Section>

            <Section title="Shipping address">
              <Grid>
                <Field label="First name" required />
                <Field label="Last name" required />
              </Grid>
              <Field label="Address" placeholder="Street address" required />
              <Grid>
                <Field label="City" required />
                <Field label="State" required />
                <Field label="ZIP" required />
              </Grid>
            </Section>

            <Section title="Payment">
              <Field label="Card number" placeholder="1234 5678 9012 3456" required />
              <Grid>
                <Field label="Expiry" placeholder="MM / YY" required />
                <Field label="CVC" placeholder="123" required />
              </Grid>
              <p className="text-xs text-muted-foreground">
                This is a demo checkout — no real payment is processed.
              </p>
            </Section>
          </div>

          <aside className="card-soft p-6 self-start lg:sticky lg:top-24 space-y-4">
            <h2 className="font-serif text-2xl">Order</h2>
            <ul className="space-y-3 border-b border-border pb-4">
              {items.map((i) => (
                <li key={i.product.id + i.size} className="flex gap-3 items-center text-sm">
                  <img src={i.product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{i.product.name}</div>
                    <div className="text-xs text-muted-foreground">{i.size} · ×{i.quantity}</div>
                  </div>
                  <div className="font-semibold">${(i.product.price * i.quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm pb-4 border-b border-border">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label={`Shipping${shipping === 0 ? " (free)" : ""}`} value={`$${shipping.toFixed(2)}`} />
              <Row label="Tax" value={`$${tax.toFixed(2)}`} />
            </div>
            <div className="flex justify-between font-serif text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button type="submit" className="btn-primary w-full">Place Order</button>
          </aside>
        </form>
      </section>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-soft p-6 md:p-8 space-y-4">
      <h2 className="font-serif text-2xl">{title}</h2>
      {children}
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}
function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-foreground/70">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
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
