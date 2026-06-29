import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Aman — Full-Stack Developer & Front-End Specialist" },
      { name: "description", content: "Portfolio of Yash Aman — full-stack developer based in India, building scalable web applications with React, Node, and MongoDB." },
      { property: "og:title", content: "Yash Aman — Full-Stack Developer & Front-End Specialist" },
      { property: "og:description", content: "Portfolio of Yash Aman — full-stack developer based in India, building scalable web applications with React, Node, and MongoDB." },
    ],
  }),
  component: Portfolio,
});

const projects = [
  {
    name: "Scalable Job Portal",
    desc: "A full-stack job portal with JWT-based authentication and role-based access control for Admin, Recruiter, and User roles. Features job search, filtering, pagination, resume uploads, and protected REST APIs with optimized MongoDB schemas.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
  },
  {
    name: "Event Booking Platform",
    desc: "A full-stack event booking system with real-time seat selection, concurrency control, and temporary seat locking with auto-expiry to prevent double booking. Built with transaction-safe operations and role-based booking workflows.",
    stack: ["React.js", "Node.js", "MongoDB", "Concurrency Control", "REST API"],
  },
  {
    name: "Smart Budget Manager",
    desc: "A full-stack financial management app for tracking monthly income, categorizing expenses, and monitoring real-time budget utilization. Includes daily spending limit recommendations and interactive dashboard visualizations.",
    stack: ["React.js", "Node.js", "MongoDB", "JWT", "Data Visualization"],
  },
];

const skills = [
  "React.js", "Node.js", "Express", "MongoDB", "JavaScript", "REST APIs",
  "JWT Auth", "HTML", "CSS", "Git", "GitHub", "Python", "Adobe Lightroom",
];

const photoCaptions = [
  "golden hour", "still", "wandering", "light & shadow",
  "found", "quiet", "between frames", "street",
];

const photos = Array.from({ length: 14 }, (_, i) => ({
  seed: `ya-frame-${i + 1}`,
  caption: photoCaptions[i % photoCaptions.length],
}));

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Photography />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Scroll progress bar ---------- */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden />;
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
    { href: "#experience", label: "Experience" },
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
            yash<span className="text-[#4f8ef7]">.</span>aman
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

      <div
        className={`md:hidden fixed inset-0 z-[60] bg-[#0a0a0a] transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ transform: open ? "translateY(0)" : "translateY(-12px)" }}
      >
        <div className="flex items-center justify-between p-5">
          <span className="text-[15px] font-medium">yash<span className="text-[#4f8ef7]">.</span>aman</span>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-3 -mr-3 text-2xl">×</button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 mt-[18vh]">
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
  const words = ["Full-Stack", "Developer", "&", "Front-End", "Specialist", "—", "India."];
  return (
    <section id="top" className="relative grid-bg" style={{ minHeight: "100svh" }}>
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
          <span className="inline-block w-2 h-2 rounded-full bg-[#4f8ef7] pulse-dot" />
          Open to opportunities · 2026
        </div>

        <h1
          className="font-medium tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7.5rem)", lineHeight: 0.95 }}
        >
          <span className="block overflow-hidden">
            <span className="word" style={{ animationDelay: "0.05s" }}>Yash&nbsp;</span>
            <span className="word" style={{ animationDelay: "0.18s" }}>Aman.</span>
          </span>
          <span className="block overflow-hidden mt-2 text-[#6b6b6b]" style={{ fontSize: "clamp(1.2rem, 3.8vw, 2.6rem)" }}>
            {words.map((w, i) => (
              <span key={i} className="word mr-[0.25em]" style={{ animationDelay: `${0.35 + i * 0.06}s` }}>{w}</span>
            ))}
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-[#9a9a9a]" style={{ fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.55 }}>
          Turning ideas into reality, one line of code at a time.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a href="#work" onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-filled w-full sm:w-auto">View Work →</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-outline w-full sm:w-auto">Get in Touch</a>
        </div>

        <div className="absolute bottom-6 left-0 right-0 mx-auto px-[clamp(20px,4vw,56px)] flex items-end justify-between text-[11px] tracking-[0.18em] uppercase text-[#5a5a5a]">
          <span>VIT Bhopal · IND</span>
          <span className="hidden sm:inline scroll-hint">scroll ↓</span>
          <span>© 2025</span>
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

/* Stagger children reveal hook */
function useStagger<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-stagger]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((n, i) => {
            setTimeout(() => n.classList.add("in"), i * 90);
          });
          io.disconnect();
        }
      }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- About ---------- */
function About() {
  const ref = useReveal<HTMLElement>();
  const skillsRef = useStagger<HTMLDivElement>();
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
              I'm a third-year Computer Science student at VIT Bhopal University,
              specializing in full-stack development. I've spent the past year building
              scalable web applications — from e-commerce UIs to job portals with
              real-time features.
            </p>
            <p className="mt-6 text-[#9a9a9a]" style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.65 }}>
              I'm also a member of the iOS Club at VIT Bhopal, and when I'm not coding,
              I'm behind a camera — chasing the kind of light that makes a quiet street
              feel like a scene.
            </p>
          </div>
          <div className="md:col-span-5" ref={skillsRef}>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a] mb-5">Toolkit</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} data-stagger className="pill pill-reveal">{s}</span>
              ))}
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
      <span className="h-px flex-1 bg-[#1a1a1a] section-line" />
      <span>{title}</span>
    </div>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  const ref = useReveal<HTMLElement>();
  const listRef = useStagger<HTMLUListElement>();
  const bullets = [
    "Built responsive web applications with React.js, Node.js, and Express, optimizing performance.",
    "Integrated payment gateways and geolocation APIs, enabling secure transactions and location-based features.",
    "Managed MongoDB databases, improving query performance and data security.",
    "Optimized full-stack performance, reducing load times and enhancing scalability.",
  ];
  return (
    <section
      id="experience"
      ref={ref}
      className="reveal relative border-t border-[#141414]"
      style={{ padding: "clamp(80px,12vh,160px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        <SectionLabel index="02" title="Experience" />
        <h2 className="mt-10 text-white tracking-[-0.03em] font-medium" style={{ fontSize: "clamp(2rem,5vw,3.6rem)", lineHeight: 1.05 }}>
          One year in,<br />still learning every week.
        </h2>

        <article className="exp-card relative mt-14 bg-[#0e0e0e] border border-[#1f1f1f] p-7 md:p-12">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a]">Jan 2025 — June 2025</div>
              <div className="mt-2 text-[#9a9a9a] text-[13px]">Remote Internship</div>
              <h3 className="mt-6 text-white font-medium tracking-[-0.02em]" style={{ fontSize: "clamp(22px,2.4vw,30px)" }}>
                Full-Stack Developer Intern
              </h3>
              <div className="mt-1 text-[#4f8ef7] text-[15px]">Fashgo</div>
            </div>
            <ul ref={listRef} className="md:col-span-8 space-y-4">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  data-stagger
                  className="bullet-reveal flex gap-4 text-[#cfcfcf]"
                  style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.6 }}
                >
                  <span className="mt-[10px] h-px w-6 bg-[#4f8ef7] flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function Work() {
  const ref = useReveal<HTMLElement>();
  const gridRef = useStagger<HTMLDivElement>();
  return (
    <section
      id="work"
      ref={ref}
      className="reveal relative border-t border-[#141414]"
      style={{ padding: "clamp(80px,12vh,160px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        <SectionLabel index="03" title="Selected Work" />
        <h2 className="mt-10 text-white tracking-[-0.03em] font-medium" style={{ fontSize: "clamp(2rem,5vw,3.6rem)", lineHeight: 1.05 }}>
          Three projects<br />I'd happily defend.
        </h2>

        <div ref={gridRef} className="grid sm:grid-cols-2 gap-5 mt-14">
          {projects.map((p, i) => (
            <div key={p.name} data-stagger className="card-reveal">
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return (
    <a
      href="#"
      className="project-card relative block bg-[#111] border border-[#222] p-7 md:p-9 transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99] h-full"
      style={{ minHeight: 320 }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
        <rect className="trace-rect" x="0.5" y="0.5" width="99" height="99" pathLength={1200} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a]">0{index + 1}</span>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a]">2025</span>
        </div>
        <h3 className="mt-8 text-white font-medium tracking-[-0.02em]" style={{ fontSize: "clamp(22px,2.4vw,30px)" }}>
          {project.name}
        </h3>
        <p className="mt-3 text-[#9a9a9a]" style={{ fontSize: "15px", lineHeight: 1.55 }}>{project.desc}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
        <div className="mt-auto pt-8 text-[14px] text-[#4f8ef7] flex items-center gap-2">
          <span className="link-underline">View project</span> →
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
    if (window.matchMedia("(hover: hover)").matches) return;
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
        <SectionLabel index="04" title="Photography" />
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
        Captured & edited with Adobe Lightroom. No filters, just light.
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
        <SectionLabel index="05" title="Contact" />
        <h2 className="mt-10 text-white tracking-[-0.03em] font-medium" style={{ fontSize: "clamp(2.4rem,7vw,4.6rem)", lineHeight: 1.05 }}>
          Say hello.
        </h2>
        <p className="mt-5 text-[#9a9a9a]" style={{ fontSize: "clamp(16px,1.6vw,19px)" }}>
          Open to opportunities, collabs, or just a good conversation.
        </p>
        <a
          href="mailto:yashaman5885@gmail.com"
          className="block mt-10 text-white tracking-[-0.03em] font-medium link-underline mx-auto"
          style={{ fontSize: "clamp(1.5rem, 6.5vw, 4.4rem)", lineHeight: 1.05, wordBreak: "break-word" }}
        >
          yashaman5885@gmail.com
        </a>
        <div className="mt-12 flex justify-center gap-3 flex-wrap">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/yashaman/" },
            { label: "GitHub", href: "https://github.com/yash5885" },
            { label: "Instagram", href: "https://www.instagram.com/yash_aman_/" },
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
      Yash Aman © 2025 — Built with care.
    </footer>
  );
}
