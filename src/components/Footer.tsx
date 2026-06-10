import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[color-mix(in_oklab,var(--color-primary)_6%,var(--color-background))]">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-serif">
              अ
            </span>
            <span className="font-serif text-xl">Achar Ghar</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Homemade Indian pickles, crafted with tradition. Small-batch, slow-made, spice-rich.
          </p>
          <div className="flex gap-2 pt-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary">All Pickles</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Classic</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Spicy</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Sweet</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">Our Story</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Get in touch</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@acharghar.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 010-2233</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Shipping across the US</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Achar Ghar. Made with love.</span>
          <span>Homemade Indian Pickles, Crafted with Tradition</span>
        </div>
      </div>
    </footer>
  );
}
