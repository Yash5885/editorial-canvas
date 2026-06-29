import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Mercer — Frontend Engineer & Designer" },
      { name: "description", content: "Portfolio of Alex Mercer — frontend engineer focused on interfaces, motion, and editorial craft." },
      { property: "og:title", content: "Alex Mercer — Frontend Engineer & Designer" },
      { property: "og:description", content: "Portfolio of Alex Mercer — frontend engineer focused on interfaces, motion, and editorial craft." },
    ],
  }),
  component: Portfolio,
});

const projects = [
  { name: "Atlas Editor", desc: "A collaborative document editor with realtime cursors and offline-first sync.", stack: ["React", "TypeScript", "CRDT", "Tauri"] },
  { name: "Northwind Bank", desc: "Redesign of a regional bank's web app — accounts, transfers, and statements.", stack: ["Next.js", "Tailwind", "Figma"] },
  { name: "Resonance", desc: "Music discovery interface built around mood, tempo, and the shape of a week.", stack: ["Remix", "WebAudio", "D3"] },
  { name: "Fieldnote", desc: "A tiny journaling app for runners — splits, weather, and the feeling of the road.", stack: ["SwiftUI", "HealthKit"] },
];

const skills = ["TypeScript", "React", "Next.js", "Remix", "TanStack", "Node", "GraphQL", "Tailwind", "CSS", "Motion", "Figma", "Linear", "Vercel", "Postgres"];

const photos = [
  { seed: "varanasi-01", caption: "Varanasi" },
  { seed: "kyoto-rain", caption: "Kyoto, in the rain" },
  { seed: "lisbon-04", caption: "golden hour" },
  { seed: "iceland-22", caption: "still" },
  { seed: "marrakech-09", caption: "Marrakech" },
  { seed: "nyc-05am", caption: "5am, Brooklyn" },
  { seed: "alps-2200", caption: "above the cloud line" },
  { seed: "berlin-mitte", caption: "Berlin" },
  { seed: "hanoi-night", caption: "Hà Nội" },
  { seed: "patagonia-13", caption: "Patagonia" },
  { seed: "porto-doca", caption: "Porto" },
  { seed: "delhi-fog", caption: "winter fog" },
  { seed: "oaxaca-mkt", caption: "Oaxaca" },
  { seed: "tokyo-2am", caption: "Shibuya, late" },
];

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Photography />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Cursor ---------- */
function Cursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, .photo, .project-card")) dot.classList.add("is-hover");
      else dot.classList.remove("is-hover");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
      dot.remove();
    };
  }, []);
  return null;
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#photos", label: "Photos" },
    { href: "#contact", label: "Contact" },
  ];

  const smoothTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 nav-blur nav-border ${scrolled ? "scrolled" : ""}`}>
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1440, padding: "clamp(14px, 2vw, 22px) clamp(20px, 4vw, 56px)" }}>
          <a href="#top" onClick={(e) => smoothTo(e, "#top")} className="text-[15px] font-medium tracking-tight">
            alex<span className="text-[#4f8ef7]">.</span>mercer
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => smoothTo(e, l.href)} className="text-[14px] text-[#b5b5b5] hover:text-white link-underline">
                {l.label}
              </a>
            ))}
          </nav>
          <button
            aria-label="Open menu"
            className="md:hidden flex flex-col gap-[5px] p-3 -mr-3"
            onClick={() => setOpen(true)}
          >
            <span className="block w-6 h-px bg-white" />
            <span className="block w-6 h-px bg-white" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-[#0a0a0a] transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ transform: open ? "translateY(0)" : "translateY(-12px)" }}
      >
        <div className="flex items-center justify-between p-5">
          <span className="text-[15px] font-medium">alex<span className="text-[#4f8ef7]">.</span>mercer</span>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-3 -mr-3 text-2xl">×</button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 mt-[20vh]">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => smoothTo(e, l.href)} className="text-3xl font-medium tracking-tight">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const words = ["Interfaces,", "motion,", "and", "the", "small", "details."];
  return (
    <section id="top" className="relative grid-bg" style={{ minHeight: "100svh" }}>
      {/* faint structural rectangles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-[18%] right-0 h-px bg-[#161616]" />
        <div className="absolute left-0 bottom-[14%] right-0 h-px bg-[#161616]" />
        <div className="absolute top-0 bottom-0 left-[8%] w-px bg-[#161616] hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-px bg-[#161616] hidden md:block" />
      </div>

      <div
        className="relative mx-auto flex flex-col justify-center h-full"
        style={{ maxWidth: 1440, padding: "clamp(96px,12vh,160px) clamp(20px,4vw,56px) clamp(60px,8vh,120px)", minHeight: "100svh" }}
      >
        <div className="flex items-center gap-3 mb-8 text-[12px] tracking-[0.18em] uppercase text-[#6b6b6b]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#4f8ef7]" />
          Available for select work · 2026
        </div>

        <h1
          className="font-medium tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7.5rem)", lineHeight: 0.95 }}
        >
          <span className="block overflow-hidden">
            <span className="word" style={{ animationDelay: "0.05s" }}>Alex&nbsp;</span>
            <span className="word" style={{ animationDelay: "0.18s" }}>Mercer.</span>
          </span>
          <span className="block overflow-hidden mt-2 text-[#6b6b6b]" style={{ fontSize: "clamp(1.4rem, 4.5vw, 3.2rem)" }}>
            {words.map((w, i) => (
              <span key={i} className="word mr-[0.25em]" style={{ animationDelay: `${0.35 + i * 0.07}s` }}>{w}</span>
            ))}
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-[#9a9a9a]" style={{ fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.55 }}>
          Frontend engineer & designer based in Brooklyn. I help product teams ship
          interfaces that feel quiet, fast, and considered — from first sketch to last pixel.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a href="#work" onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-filled w-full sm:w-auto">View work →</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-outline w-full sm:w-auto">Get in touch</a>
        </div>

        <div className="absolute bottom-6 left-0 right-0 mx-auto px-[clamp(20px,4vw,56px)] flex items-end justify-between text-[11px] tracking-[0.18em] uppercase text-[#5a5a5a]">
          <span>BK / NYC · EST</span>
          <span className="hidden sm:inline">scroll ↓</span>
          <span>© 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reveal hook ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- About ---------- */
function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="about"
      ref={ref}
      className="reveal relative border-t border-[#141414]"
      style={{ padding: "clamp(80px,12vh,160px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        <SectionLabel index="01" title="About" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mt-12">
          <div className="md:col-span-7">
            <p className="text-white" style={{ fontSize: "clamp(20px,2.2vw,28px)", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
              I've spent the last nine years building software for small teams that
              care about how things feel. Before that, I studied architecture — which
              is mostly where the obsession with grids, scale, and quiet detail comes from.
            </p>
            <p className="mt-6 text-[#9a9a9a]" style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.65 }}>
              Most recently I led the design engineering practice at a fintech in New York.
              These days I take on a handful of independent engagements a year — usually
              with founders working on tools, editors, or anything that asks something
              real of the interface.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a] mb-5">Toolkit</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => <span key={s} className="pill">{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-5 text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a]">
      <span>{index}</span>
      <span className="h-px flex-1 bg-[#1a1a1a]" />
      <span>{title}</span>
    </div>
  );
}

/* ---------- Work ---------- */
function Work() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="work"
      ref={ref}
      className="reveal relative border-t border-[#141414]"
      style={{ padding: "clamp(80px,12vh,160px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        <SectionLabel index="02" title="Selected Work" />
        <h2 className="mt-10 text-white tracking-[-0.03em] font-medium" style={{ fontSize: "clamp(2rem,5vw,3.6rem)", lineHeight: 1.05 }}>
          A short list, kept short<br/>on purpose.
        </h2>

        <div className="grid sm:grid-cols-2 gap-5 mt-14">
          {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return (
    <a
      href="#"
      className="project-card relative block bg-[#111] border border-[#222] p-7 md:p-9 transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99]"
      style={{ minHeight: 280 }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
        <rect className="trace-rect" x="0.5" y="0.5" width="99" height="99" pathLength="1200" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a]">0{index + 1}</span>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a]">2024 — 25</span>
        </div>
        <h3 className="mt-8 text-white font-medium tracking-[-0.02em]" style={{ fontSize: "clamp(22px,2.4vw,30px)" }}>
          {project.name}
        </h3>
        <p className="mt-3 text-[#9a9a9a]" style={{ fontSize: "15px", lineHeight: 1.55 }}>{project.desc}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
        <div className="mt-auto pt-8 text-[14px] text-[#4f8ef7] flex items-center gap-2">
          <span className="link-underline">View case study</span> →
        </div>
      </div>
    </a>
  );
}

/* ---------- Photography ---------- */
function Photography() {
  const ref = useReveal<HTMLElement>();
  const wrapRef = useRef<HTMLDivElement>(null);
  const all = [...photos, ...photos];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(hover: hover)").matches) return; // desktop uses CSS
    const onTouch = (e: TouchEvent) => {
      const target = (e.target as HTMLElement).closest(".photo") as HTMLElement | null;
      wrap.querySelectorAll(".photo.is-tapped").forEach((n) => n.classList.remove("is-tapped"));
      if (target) {
        target.classList.add("is-tapped");
        wrap.classList.add("has-tap");
      } else {
        wrap.classList.remove("has-tap");
      }
    };
    wrap.addEventListener("touchstart", onTouch, { passive: true });
    return () => wrap.removeEventListener("touchstart", onTouch);
  }, []);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  return (
    <section
      id="photos"
      ref={ref}
      className="reveal relative border-t border-[#141414] overflow-hidden"
      style={{ padding: "clamp(80px,12vh,160px) 0" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "0 clamp(20px,4vw,56px)" }}>
        <SectionLabel index="03" title="Photography" />
        <h2 className="mt-10 text-white tracking-[-0.03em] font-medium" style={{ fontSize: "clamp(2rem,6vw,4.2rem)", lineHeight: 1.02 }}>
          When I'm not coding —
        </h2>
        <p className="mt-4 text-[#6b6b6b]" style={{ fontSize: "clamp(15px,1.6vw,19px)" }}>
          find me somewhere with a camera.
        </p>
      </div>

      <div ref={wrapRef} className="marquee-wrap mt-14" style={{ overflow: "hidden", padding: "30px 0" }}>
        <div className="marquee-track">
          {all.map((p, i) => {
            const max = isMobile ? 1.5 : 3;
            const rot = ((i * 53) % (max * 200)) / 100 - max;
            return (
              <figure
                key={i}
                className="photo"
                style={{
                  width: "clamp(220px, 26vw, 320px)",
                  height: "clamp(290px, 34vw, 420px)",
                  transform: `rotate(${rot}deg)`,
                }}
              >
                <img
                  src={`https://picsum.photos/seed/${p.seed}/640/860`}
                  alt={p.caption}
                  loading="lazy"
                />
                <figcaption className="caption">{p.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-10 text-right text-[12px] italic text-[#5a5a5a]" style={{ maxWidth: 1280, padding: "0 clamp(20px,4vw,56px)", fontFamily: "Gambarino, Georgia, serif" }}>
        All photos shot on film + digital. No filters.
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="contact"
      ref={ref}
      className="reveal relative border-t border-[#141414] grid-bg"
      style={{ padding: "clamp(100px,16vh,200px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 980 }}>
        <SectionLabel index="04" title="Contact" />
        <p className="mt-10 text-[#9a9a9a]" style={{ fontSize: "clamp(16px,1.6vw,19px)" }}>
          Have a project in mind, or just want to say hello?
        </p>
        <a
          href="mailto:hello@alexmercer.studio"
          className="block mt-8 text-white tracking-[-0.03em] font-medium link-underline mx-auto"
          style={{ fontSize: "clamp(2rem, 8vw, 5.5rem)", lineHeight: 1.05, wordBreak: "break-word" }}
        >
          hello@alexmercer.studio
        </a>
        <div className="mt-12 flex justify-center gap-3 flex-wrap">
          {[
            { label: "GitHub", href: "https://github.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "Twitter / X", href: "https://x.com" },
            { label: "Read.cv", href: "https://read.cv" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ minWidth: 120 }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-[#141414] text-center text-[12px] text-[#5a5a5a]" style={{ padding: "28px 20px" }}>
      Alex Mercer · © 2026 · Built with care.
    </footer>
  );
}
