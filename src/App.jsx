import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative mx-auto w-full max-w-7xl px-4 md:px-8 ${className}`}>
    {children}
  </section>
);

const PhoneMock = ({ className = "w-[220px]" }) => (
  <svg viewBox="0 0 320 660" className={className} role="img" aria-label="App mockup">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#0aa1b0" />
        <stop offset="100%" stopColor="#096676" />
      </linearGradient>
    </defs>
    <rect x="25" y="8" rx="42" ry="42" width="270" height="644" fill="#0f172a" />
    <rect x="30" y="52" rx="32" ry="32" width="260" height="560" fill="url(#g)" opacity="0.15" />
    <circle cx="160" cy="34" r="6" fill="#1f2937" />
    <rect x="60" y="90" width="200" height="46" rx="12" fill="#ecfeff" />
    <rect x="60" y="150" width="200" height="160" rx="16" fill="#cffafe" />
    <rect x="60" y="324" width="90" height="90" rx="16" fill="#f0fdf4" />
    <rect x="170" y="324" width="90" height="90" rx="16" fill="#fef9c3" />
    <rect x="60" y="430" width="200" height="36" rx="10" fill="#ecfeff" />
    <rect x="60" y="472" width="200" height="36" rx="10" fill="#ecfeff" />
    <rect x="120" y="610" width="80" height="16" rx="8" fill="#475569" />
  </svg>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-[--mint] px-3 py-1 text-xs font-medium text-[--brand] shadow-sm">
    {children}
  </span>
);

const features = [
  {
    title: "Smart Business Bank Account",
    desc:
      "A secure, spend-friendly account with instant categorisation and real-time balance tracking that actually makes sense.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M3 10h18M5 10V8l7-5 7 5v2M5 10v9h14v-9" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
  {
    title: "Gorgeous Invoices",
    desc:
      "Create branded invoices in seconds, track status, send reminders, and get paid faster with embedded payment links.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M7 3h10a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
  {
    title: "AI‑Powered Categories",
    desc:
      "Let AI tidy your income and expense patterns automatically. Smarter insights, less admin, cleaner books.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
  {
    title: "Utilities Management",
    desc:
      "Pay electricity, internet, airtime and data bills right from Sumstack — track receipts and usage from one dashboard.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M12 2l4 8h-6l4 12-10-14h6z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
  {
    title: "Easy Vendor Payments",
    desc:
      "Settle suppliers without the hassle. Schedule transfers, track histories, and keep everyone happy.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M3 7h18M6 3h12M4 11h16M4 15h10M4 19h8" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
  {
    title: "Insights That Matter",
    desc:
      "Know how your business is doing with digestible reports that actually help you decide and act.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M4 20h16M6 16v-6M12 16V8m6 8v-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
];

const faqs = [
  {
    q: "Who is Sumstack perfect for?",
    a:
      "Owners and teams at African SMEs, freelancers, and startups who want automated bookkeeping, easier payments, and stress‑free finance ops.",
  },
  {
    q: "When can I get my hands on it?",
    a:
      "We're rolling out in waves. Join the waitlist today and you'll be among the first to access beta features as we open regions.",
  },
  {
    q: "What’s it going to cost me?",
    a:
      "There will be a Free plan to get started, plus Growth and Elite tiers for power features like multi‑user controls, advanced analytics, and priority support.",
  },
  {
    q: "How safe is my money and data?",
    a:
      "Bank‑grade encryption, strict role‑based access, and privacy by design. We never sell your data, period.",
  },
  {
    q: "Can I connect my existing bank accounts?",
    a:
      "Yes. We’re integrating major Nigerian banks and popular African payment providers to sync transactions automatically.",
  },
  {
    q: "What if I need help along the way?",
    a:
      "Our Help Center, tutorials, and 24/7 chat support have you covered. You’ll also get onboarding for your first month.",
  },
];

function useScrollSpy(ids, offset = 100) {
  const [active, setActive] = React.useState("");
  React.useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

export default function App() {
  const [openFAQ, setOpenFAQ] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [demoOpen, setDemoOpen] = React.useState(false);
  const sections = ["home", "features", "how-it-works", "made-with-love", "faq", "waitlist", "footer"];
  const active = useScrollSpy(sections, 150);

  return (
    <div className="min-h-screen scroll-smooth bg-[#f7fbfc] text-slate-900 [--brand:#096676] [--brand-2:#0aa1b0] [--mint:#e9fbf9] [--sky:#eef7f8] [--ink:#0b2a2e]">
      <header className="sticky top-0 z-50 w-full border-b border-teal-100 bg-white/90 backdrop-blur">
        <section className="relative mx-auto w-full max-w-7xl px-4 md:px-8 flex items-center justify-between py-3">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="inline-block h-6 w-6 rounded-full bg-[--brand]" />
            <span className="text-lg tracking-tight">sumstack</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              { id: "features", label: "Features" },
              { id: "how-it-works", label: "How it works" },
              {
                id: "support",
                label: "Support",
                dropdown: [
                  { href: "#about", label: "About" },
                  { href: "#help", label: "Help Center" },
                  { href: "#tutorials", label: "Tutorials" },
                  { href: "#contact", label: "Contact Us" },
                ],
              },
              { id: "pricing", label: "Pricing", href: "#waitlist" },
            ].map((item) => (
              <div className="relative" key={item.id}>
                <a
                  href={item.href || `#${item.id}`}
                  onMouseEnter={() => item.dropdown && setMenuOpen(item.id)}
                  onMouseLeave={() => item.dropdown && setMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-[--brand] ${
                    active === item.id ? "text-[--brand]" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </a>
                {item.dropdown && (
                  <AnimatePresence>
                    {menuOpen === item.id && (
                      <motion.div
                        onMouseEnter={() => setMenuOpen(item.id)}
                        onMouseLeave={() => setMenuOpen(false)}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute left-0 top-8 w-48 rounded-xl border border-teal-100 bg-white p-2 shadow-xl"
                      >
                        {item.dropdown.map((d) => (
                          <a key={d.label} href={d.href} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            {d.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <a
            href="#waitlist"
            className="hidden rounded-xl bg-gradient-to-r from-[--brand-2] to-[--brand] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 md:inline-block"
          >
            Join Waitlist
          </a>

          <button
            className="inline-flex items-center rounded-xl border border-teal-100 p-2 md:hidden"
            onClick={() => setMenuOpen((v) => (v ? false : "mobile"))}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </section>

        <AnimatePresence>
          {menuOpen === "mobile" && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden">
              <section className="relative mx-auto w-full max-w-7xl px-4 md:px-8 flex flex-col gap-2 pb-4">
                {[
                  { href: "#features", label: "Features" },
                  { href: "#how-it-works", label: "How it works" },
                  { href: "#waitlist", label: "Pricing" },
                  { href: "#faq", label: "FAQ" },
                ].map((l) => (
                  <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100">
                    {l.label}
                  </a>
                ))}
                <a href="#waitlist" className="mt-2 rounded-xl bg-gradient-to-r from-[--brand-2] to-[--brand] px-4 py-2 text-center text-sm font-semibold text-white">
                  Join Waitlist
                </a>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_0%_0%,rgba(9,102,118,0.10),transparent_60%),radial-gradient(35%_35%_at_100%_100%,rgba(10,161,176,0.10),transparent_60%)]"/>
        <section className="relative mx-auto w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-2 md:py-16">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <motion.div variants={fadeUp}>
              <Pill>
                <span className="h-2 w-2 rounded-full bg-[--brand]" />
                Launching soon — be among the first!
              </Pill>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-4 text-4xl font-extrabold tracking-tight text-[--ink] sm:text-5xl">
              Say goodbye to spreadsheets. <span className="text-[--brand]">Hello Sumstack!</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-[#50707a]">
              Sumstack is the all‑in‑one financial operations app built for African small businesses. Smart wallet, automated bookkeeping, AI‑powered insights — all the clarity you need, right in your pocket.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#waitlist" className="rounded-xl bg-gradient-to-r from-[--brand-2] to-[--brand] px-5 py-3 text-sm font-semibold text-white shadow hover:opacity-90">
                Join Waitlist
              </a>
              <button onClick={() => setDemoOpen(true)} className="rounded-xl border border-teal-200 bg-[--mint] px-5 py-3 text-sm font-semibold text-[--brand] hover:bg-white">
                ▶ Watch Demo
              </button>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-4 text-xs text-slate-500">
              <span>Join over <strong>10,000+</strong> businesses already using Sumstack.</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[--brand-2]/25 to-transparent blur-2xl" />
              <PhoneMock className="w-[260px] md:w-[300px]" />
              <div className="absolute -right-6 -top-6 hidden rounded-xl bg-white/90 p-3 text-xs shadow ring-1 ring-teal-100 md:block">
                <div className="font-semibold text-slate-700">Good morning 👋</div>
                <div className="text-slate-500">NGN 2,847,500</div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <AnimatePresence>
        {demoOpen && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="relative h-full w-full">
                <iframe
                  title="Sumstack demo"
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button onClick={() => setDemoOpen(false)} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow">
                  <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="features" className="relative mx-auto w-full max-w-7xl px-4 md:px-8 py-12 md:py-16">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-2xl font-bold md:text-3xl">
          Everything you need to run your business, <span className="text-[--brand]">beautifully simple</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto mt-3 max-w-2xl text-center text-[#50707a]">
          We’ve packed the tools African business owners actually need into one gorgeous app. Say hello to stress‑free finances.
        </motion.p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex h-full flex-col rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[--brand]/10 text-[--brand]">{f.icon}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[#50707a]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
          <span>No credit card required</span>
          <span>•</span>
          <span>Free to try</span>
          <span>•</span>
          <span>Setup in 5 minutes</span>
        </div>
      </section>

      <section id="how-it-works" className="relative mx-auto w-full max-w-7xl px-4 md:px-8 py-12 md:py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Get started in <span className="text-[--brand]">3 simple steps</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Sign Up in Minutes",
              desc: "Create your Sumstack account, set your business profile, and invite teammates. No paperwork required.",
            },
            {
              title: "Connect Your Business",
              desc: "Link your bank/payment accounts and start managing invoices, bills, vendors and spending patterns automatically.",
            },
            {
              title: "Watch Your Business Grow",
              desc: "Get real‑time insights, automated reports, and peace‑of‑mind knowing your books are handled.",
            },
          ].map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
              <div className="mb-3 text-sm font-semibold text-[--brand]">Step {i + 1}</div>
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-[#50707a]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(9,102,118,0.06),transparent_60%)]" />
        <section id="made-with-love" className="relative mx-auto w-full max-w-7xl px-4 md:px-8 py-12 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">
            Made with love for <span className="text-[--brand]">Nigerian entrepreneurs</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[--brand]"/>What we’re about — making world‑class finance tools accessible to every Nigerian business owner, no matter how big or small.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[--brand]"/>Why it matters — small businesses are the heartbeat of Nigeria. When you succeed, we all win. Together.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[--brand]"/>Our vibe — simple tools that actually work for real Nigerian businesses. Not fluff, no confusion — just results.</li>
              <li className="rounded-xl border border-teal-200 bg-white p-4 text-[#50707a] shadow-sm">“Every edge feature in Sumstack is designed with you in mind: local, practical, and powerful — just how it should be.” — The Sumstack Team</li>
            </ul>

            <div className="col-span-full rounded-2xl bg-[--brand] p-5 text-white shadow-sm">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div><div className="text-xs opacity-80">Linked dailies</div><div className="text-2xl font-semibold">10k+</div></div>
                <div><div className="text-xs opacity-80">Already flowing</div><div className="text-2xl font-semibold">N2M+</div></div>
                <div><div className="text-xs opacity-80">Happy businesses</div><div className="text-2xl font-semibold">90%</div></div>
                <div><div className="text-xs opacity-80">Always working</div><div className="text-2xl font-semibold">99%</div></div>
              </div>
              <div className="mt-3 text-xs opacity-90">Proudly Nigerian • Built in Lagos, made for Africa</div>
            </div>
          </div>
        </section>
      </div>

      <section id="faq" className="relative mx-auto w-full max-w-7xl px-4 md:px-8 py-12 md:py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Questions? We’ve got <span className="text-[--brand]">answers!</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#50707a]">
          Everything you’re probably wondering about Sumstack. Still curious? Hit us up — we love to chat!
        </p>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-teal-100 rounded-2xl border border-teal-100 bg-white">
          {faqs.map((f, i) => (
            <div key={i} className="px-4">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={openFAQ === i}
              >
                <span className="font-medium">{f.q}</span>
                <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform ${openFAQ === i ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {openFAQ === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-4 text-sm text-[#50707a]">
                    {f.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm">
          Still got questions? <a href="mailto:support@sumstack.co" className="font-semibold text-[--brand] underline">Let’s chat</a>.
        </div>
      </section>

      <section id="waitlist" className="relative mx-auto w-full max-w-7xl px-4 md:px-8 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-teal-100 bg-[#f9fefe] p-6 shadow-xl">
          <div className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[--brand]/10 text-[--brand]">⬤</span>
            <div>
              <h3 className="text-xl font-bold">Ready to make your life a whole lot easier?</h3>
              <p className="mt-1 text-sm text-[#50707a]">Join thousands of African business owners who are already on the list. Trust us, you’ll want to be first in line for this one.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href="https://sumstack.lovable.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[--brand-2] to-[--brand] px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90">
              Join Waitlist
            </a>
            <a href="#pricing-details" className="rounded-xl border border-teal-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">See Plans</a>
          </div>
          <div id="pricing-details" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[{t:"3 Months", s:"Free on Growth plan"},{t:"5 min", s:"Setup time to live"},{t:"24/7", s:"We’ve got your back"}].map((b)=> (
              <div key={b.t} className="rounded-2xl border border-teal-100 bg-[--sky] p-4 text-center">
                <div className="text-lg font-semibold">{b.t}</div>
                <div className="text-xs text-[#50707a]">{b.s}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[10px] text-slate-500">No spam, ever. We prioritise unsubscribe anytime with one click.</p>
        </div>
      </section>

      <footer id="footer" className="border-t border-teal-100 bg-white py-10">
        <section className="relative mx-auto w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="inline-block h-6 w-6 rounded-full bg-[--brand]" />
              <span className="text-lg tracking-tight">sumstack</span>
            </div>
            <p className="mt-3 text-sm text-[#50707a]">Automate your business finance with Africa’s most intuitive financial management app. Built for entrepreneurs, by entrepreneurs.</p>
            <div className="mt-4 flex items-center gap-3 text-slate-500">
              <a href="#" aria-label="Twitter" className="hover:text-[--brand]"><svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M22 5.8c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2.1-.8.5-1.6.8-2.5 1-1.6-1.8-4.8-.7-4.8 2 0 .3 0 .6.1.9-3.6-.2-6.7-1.9-8.8-4.6-.4.6-.6 1.2-.6 2 0 1.3.7 2.4 1.7 3-.6 0-1.2-.2-1.7-.5 0 1.9 1.4 3.5 3.2 3.9-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.7 3.8 2.8-1.4 1.1-3.1 1.7-4.9 1.7-.3 0-.6 0-.9-.1 1.8 1.2 3.9 1.9 6.1 1.9 7.3 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.4-1.2 1.9-2z" fill="currentColor"/></svg></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[--brand]"><svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M4 3a2 2 0 100 4 2 2 0 000-4zM3 8h2.9v13H3zM9 8h2.8v1.8h.1c.4-.8 1.4-1.8 3-1.8 3.2 0 3.8 2.1 3.8 4.8V21H15v-5.4c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21H9V8z" fill="currentColor"/></svg></a>
              <a href="#" aria-label="Instagram" className="hover:text-[--brand]"><svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 4a6 6 0 100 12 6 6 0 000-12zm7-.5a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor"/></svg></a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-[#50707a]">
              <li><a className="hover:text-[--brand]" href="#features">Features</a></li>
              <li><a className="hover:text-[--brand]" href="#waitlist">Pricing</a></li>
              <li><a className="hover:text-[--brand]" href="#how-it-works">How it works</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Support</div>
            <ul className="mt-3 space-y-2 text-sm text-[#50707a]">
              <li id="about"><a className="hover:text-[--brand]" href="#about">About</a></li>
              <li id="help"><a className="hover:text-[--brand]" href="#faq">Help Center</a></li>
              <li id="tutorials"><a className="hover:text-[--brand]" href="#faq">Tutorials</a></li>
              <li id="contact"><a className="hover:text-[--brand]" href="mailto:support@sumstack.co">Contact Us</a></li>
              <li><a className="hover:text-[--brand]" href="#privacy">Privacy</a></li>
            </ul>
          </div>

          <div className="text-sm text-slate-500">
            <div className="font-semibold text-slate-700">Nigeria • Africa</div>
            <div className="mt-2">Email us: <a className="font-medium text-[--brand]" href="mailto:support@sumstack.co">support@sumstack.co</a></div>
            <div className="mt-6 text-xs">© {new Date().getFullYear()} Sumstack. All rights reserved.</div>
          </div>
        </section>
      </footer>
    </div>
  );
}
