import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const { count, bump } = useCart();
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (bump === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 700);
    return () => clearTimeout(t);
  }, [bump]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_oklab,var(--color-background)_85%,transparent)] border-b border-border">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg shrink-0">
            अ
          </span>
          <span className="font-serif text-xl tracking-tight">Achar Ghar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
              className="text-foreground/75 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span
                className={`absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold ${
                  pulse ? "animate-ping-soft" : ""
                }`}
              >
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-accent"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-foreground/80 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
