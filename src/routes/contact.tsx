import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Achar Ghar" },
      { name: "description", content: "Get in touch with Achar Ghar — questions, custom orders, or wholesale enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <Layout>
      <section className="container-x py-16 md:py-20 max-w-3xl text-center">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">Contact</div>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">We'd love to hear from you.</h1>
        <p className="mt-5 text-muted-foreground text-lg">
          Questions about our pickles, custom orders, or bulk shipping —
          drop us a note. We reply within one business day.
        </p>
      </section>

      <section className="container-x grid lg:grid-cols-[1fr_360px] gap-10 pb-20">
        <form onSubmit={onSubmit} className="card-soft p-6 md:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" required />
            <Field label="Email" type="email" required />
          </div>
          <Field label="Subject" required />
          <label className="block">
            <span className="text-xs font-semibold text-foreground/70">Message</span>
            <textarea
              required
              rows={6}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </label>
          <button disabled={sending} className="btn-primary">
            {sending ? "Sending..." : <>Send Message <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="card-soft p-6 space-y-4">
            <Info icon={Mail} title="Email" value="hello@acharghar.com" />
            <Info icon={Phone} title="Phone" value="+1 (555) 010-2233" />
            <Info icon={MapPin} title="Available" value="Across the United States" />
          </div>
          <div className="card-soft p-6">
            <h3 className="font-serif text-lg mb-2">Have a quick question?</h3>
            <p className="text-sm text-muted-foreground mb-4">Most answers live in our FAQ.</p>
            <Link to="/faq" className="btn-outline w-full">Visit FAQ</Link>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

function Info({ icon: Icon, title, value }: { icon: typeof Mail; title: string; value: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
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
