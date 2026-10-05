import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { CONFIG } from "./config";
import { FAQ, FILTERS, MOODS, PROJECTS, SERVICES, STEPS, TESTIMONIALS, img } from "./data";
import type { Category, Project } from "./data";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "Process" },
  { href: "#lab", label: "Colour Lab" },
  { href: "#contact", label: "Contact" },
];

function Mark({ size = 30 }: { size?: number }) {
  const fills = ["#FF5C4D", "#D6FF3F", "#FFF8F0", "#FF5C4D", "#D6FF3F", "#FFF8F0"];
  return (
    <svg width={size} height={size} viewBox="-24 -24 48 48" aria-hidden="true" className="mark">
      {fills.map((f, i) => (
        <path key={i} d="M0 -22 L9 -6 L-9 -6 Z" fill={f} transform={`rotate(${i * 60})`} />
      ))}
      <circle r="4.5" fill="currentColor" />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header({ onMenu }: { onMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="brand" aria-label="KALEIDOS home">
        <Mark />
        <span>KALEIDOS</span>
      </a>
      <nav className="nav" aria-label="Primary">
        {NAV.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="btn btn-lime header-cta">
        Book a Room Read
      </a>
      <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  const tones = ["coral", "lime", "cream", "plum2", "coral"];
  return (
    <div className={`menu ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="menu-top">
        <span className="brand">
          <Mark />
          <span>KALEIDOS</span>
        </span>
        <button className="menu-close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>
      <nav className="menu-bands">
        {NAV.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            onClick={onClose}
            className={`band band-${tones[i]}`}
            style={{ "--i": i } as CSSProperties}
            tabIndex={open ? 0 : -1}
          >
            <small>0{i + 1}</small>
            <span>{n.label}</span>
            <em>↗</em>
          </a>
        ))}
      </nav>
      <div className="menu-foot">
        <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
        <span>{CONFIG.address}</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-left">
        <p className="eyebrow">
          <span className="dot" /> Experimental interiors — Riyadh · Jeddah · Dubai
        </p>
        <h1 className="hero-title">
          Rooms that
          <br />
          refuse to be <span className="hl-coral">beige</span>
          <span className="hl-lime">.</span>
        </h1>
        <p className="hero-lede">
          We're a 9-person studio in JAX District designing colour-led homes, cafés, shops and workplaces. Brave
          where it counts, calm everywhere else — and built to budget.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-coral">
            See the work
          </a>
          <a href="#contact" className="btn btn-ghost">
            Start a project →
          </a>
        </div>
        <dl className="hero-stats">
          <div>
            <dt>112</dt>
            <dd>rooms delivered</dd>
          </div>
          <div>
            <dt>2018</dt>
            <dd>founded in Riyadh</dd>
          </div>
          <div>
            <dt>94%</dt>
            <dd>on-budget handovers</dd>
          </div>
        </dl>
      </div>
      <div className="hero-right">
        <div className="hero-stripe" aria-hidden="true" />
        <figure className="hero-frame">
          <img
            src={img("1567016432779-094069958ea5", 900, 1100)}
            srcSet={`${img("1567016432779-094069958ea5", 600, 740)} 600w, ${img("1567016432779-094069958ea5", 900, 1100)} 900w`}
            sizes="(max-width: 860px) 70vw, 34vw"
            alt="Coral sofa with a pink cushion against a warm wall"
            fetchPriority="high"
          />
          <figcaption>
            <b>Saffron Flat</b> — Al Malqa, 2025
          </figcaption>
        </figure>
        <figure className="hero-mini">
          <img src={img("1615873968403-89e068629265", 420, 420)} alt="Deep teal majlis with gallery wall" />
        </figure>
        <div className="sticker" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs>
              <path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text>
              <textPath href="#circ">COLOUR IS A MATERIAL ✶ COLOUR IS A MATERIAL ✶ </textPath>
            </text>
          </svg>
          <span>✶</span>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const words = ["Colour is a material", "One brave move per room", "Rental-friendly", "Built with local makers", "Curves over corners", "No beige by default"];
  const row = [...words, ...words];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {row.map((w, i) => (
          <span key={i}>
            {w} <i>✶</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function Studio() {
  return (
    <section className="studio section" id="studio">
      <div className="wrap studio-grid">
        <div className="studio-copy" data-reveal>
          <p className="kicker">The studio</p>
          <h2 className="h2">
            Playful on the surface.
            <br />
            <span className="ul-coral">Obsessive</span> underneath.
          </h2>
          <p>
            KALEIDOS was started in 2018 by interior architect <b>Lina Haddad</b> and furniture maker <b>Omar Al-Rashed</b>{" "}
            after one too many grey-and-gold showrooms. Today we're nine people — designers, a site lead, a colour
            specialist and a 3D artist — working out of a converted warehouse in JAX District.
          </p>
          <p>
            We believe colour is structural, not decorative. It can make a 60 m² flat feel generous, guide 34 people
            through an office without a single sign, or sell a coffee at 11pm.
          </p>
          <div className="founders">
            <div>
              <b>Lina Haddad</b>
              <span>Co-founder · Design Director</span>
            </div>
            <div>
              <b>Omar Al-Rashed</b>
              <span>Co-founder · Making & Build</span>
            </div>
          </div>
        </div>
        <div className="studio-visual" data-reveal>
          <div className="studio-img">
            <img src={img("1600210492486-724fe5c67fb0", 700, 820)} alt="Bright living room with gallery wall and plants" loading="lazy" />
          </div>
          <div className="studio-card card-lime">
            <b>6.2 wks</b>
            <span>average concept-to-drawings</span>
          </div>
          <div className="studio-card card-coral">
            <b>31%</b>
            <span>of clients come back for a second space</span>
          </div>
        </div>
      </div>
      <div className="wrap principles">
        {[
          { n: "A", t: "Colour is structural", d: "We pick palettes the way engineers pick steel — for what they do to space, light and mood." },
          { n: "B", t: "One brave move per room", d: "A ceiling, a rail, a pod, a wall. Everything else stays quiet so the move can land." },
          { n: "C", t: "Makers we know by name", d: "17 local workshops — carpentry, upholstery, metal, terrazzo. Fewer middlemen, better craft." },
        ].map((p, i) => (
          <article key={p.n} className={`principle p-${i}`} data-reveal>
            <span className="principle-n">{p.n}</span>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const list = useMemo(() => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter]);
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setProgress(0);
  }, [filter]);

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PROJECTS.length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1));
    return c;
  }, []);

  return (
    <section className="work section" id="work">
      <div className="wrap">
        <div className="work-head" data-reveal>
          <div>
            <p className="kicker kicker-lime">Selected work · 2023–2025</p>
            <h2 className="h2 h2-light">
              Eight rooms,
              <br />
              <span className="hl-lime-text">zero</span> templates.
            </h2>
          </div>
          <p className="work-intro">
            Homes, cafés, shops and studios across Riyadh, Jeddah, AlUla, Khobar and Dubai. Tap a project for the
            story, the palette, and the one move that made it.
          </p>
        </div>
        <div className="filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <sup>{counts[f] ?? 0}</sup>
            </button>
          ))}
        </div>
      </div>
      <div className="wrap work-wrap">
        <div className="work-grid" ref={railRef} onScroll={onScroll}>
          {list.map((p, i) => (
            <button
              key={`${filter}-${p.id}`}
              className={`card card-${p.shape} tone-${p.tone}`}
              style={{ "--d": `${i * 60}ms` } as CSSProperties}
              onClick={() => onOpen(p)}
              aria-label={`Open ${p.title}`}
            >
              <span className="card-media">
                <img src={img(p.photo, 560, p.shape === "tall" ? 700 : 560)} alt={p.title} loading="lazy" />
                <span className="card-tag">{p.category}</span>
                <span className="card-open">View ↗</span>
              </span>
              <span className="card-body">
                <span className="card-meta">
                  {p.city} · {p.year}
                </span>
                <span className="card-title">{p.title}</span>
                <span className="card-hook">{p.hook}</span>
                <span className="card-swatches" aria-hidden="true">
                  {p.palette.map((c) => (
                    <i key={c.hex} style={{ background: c.hex }} />
                  ))}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="rail-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.12, progress)})` }} />
        </div>
        <p className="rail-hint" aria-hidden="true">
          Swipe ⟷ {list.length} project{list.length > 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}

function ProjectSheet({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);
  if (!project) return null;
  const p = project;
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <article className={`sheet tone-${p.tone}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={p.title}>
        <button className="sheet-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="sheet-media">
          <img src={img(p.photo, 900, 700)} alt={p.title} />
        </div>
        <div className="sheet-body">
          <p className="kicker">
            {p.category} · {p.city}
          </p>
          <h3>{p.title}</h3>
          <p className="sheet-hook">{p.hook}</p>
          <dl className="sheet-facts">
            <div>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{p.area}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{p.duration}</dd>
            </div>
          </dl>
          <p>{p.story}</p>
          <div className="sheet-move">
            <span>The brave move</span>
            <p>{p.move}</p>
          </div>
          <div className="sheet-palette">
            {p.palette.map((c) => (
              <div key={c.hex}>
                <i style={{ background: c.hex }} />
                <b>{c.name}</b>
                <small>{c.hex}</small>
              </div>
            ))}
          </div>
          <a href="#contact" className="btn btn-coral" onClick={onClose}>
            I want a room like this →
          </a>
        </div>
      </article>
    </div>
  );
}

function Services() {
  return (
    <section className="services section" id="services">
      <div className="wrap services-grid">
        <div data-reveal>
          <p className="kicker">The room menu</p>
          <h2 className="h2">
            Pick a size.
            <br />
            We'll bring the <span className="ul-lime">nerve</span>.
          </h2>
          <p className="muted">Clear fees, published up front. Every project includes a 30-day Living Test visit after handover.</p>
        </div>
        <ul className="menu-list" data-reveal>
          {SERVICES.map((s) => (
            <li key={s.name}>
              <div className="ml-row">
                <b>{s.name}</b>
                <span className="leader" />
                <strong>{s.price}</strong>
              </div>
              <div className="ml-sub">
                <span>{s.detail}</span>
                <em>{s.time}</em>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const w = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 14 : el.clientWidth;
    setActive(Math.min(STEPS.length - 1, Math.round(el.scrollLeft / w)));
  };
  const go = (i: number) => {
    const el = ref.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (el && child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  };
  return (
    <section className="process section" id="process">
      <div className="wrap">
        <div className="process-head" data-reveal>
          <p className="kicker kicker-plum">How we work</p>
          <h2 className="h2">
            Five steps.
            <br />
            No mystery invoices.
          </h2>
          <p className="muted">A typical single-floor home takes 16 weeks from first visit to keys. You'll always know what's next and what it costs.</p>
        </div>
      </div>
      <ol className="steps" ref={ref} onScroll={onScroll}>
        {STEPS.map((s, i) => (
          <li key={s.n} className={`step step-${i}`} data-reveal style={{ "--d": `${i * 80}ms` } as CSSProperties}>
            <div className="step-top">
              <span className="step-n">{s.n}</span>
              <span className="step-time">{s.time}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="step-out">
              <small>You get</small>
              <span>{s.out}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="step-dots" role="tablist" aria-label="Process steps">
        {STEPS.map((s, i) => (
          <button key={s.n} className={i === active ? "on" : ""} onClick={() => go(i)} aria-label={`Step ${s.n} ${s.title}`}>
            <span>{s.n}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ColourLab() {
  const [mood, setMood] = useState(MOODS[0]);
  const vars = {
    "--wall": mood.wall,
    "--floor": mood.floor,
    "--sofa": mood.sofa,
    "--accent": mood.accent,
    "--rug": mood.rug,
  } as CSSProperties;
  return (
    <section className="lab section" id="lab">
      <div className="wrap lab-grid">
        <div className="lab-copy" data-reveal>
          <p className="kicker kicker-lime">Colour Lab</p>
          <h2 className="h2 h2-light">Try a mood on a room.</h2>
          <p className="lab-text">
            Every project starts with a Colour Collision: three directions, tested on your actual walls. Here's a tiny
            preview of how one room shifts.
          </p>
          <div className="mood-btns" role="radiogroup" aria-label="Choose a mood">
            {MOODS.map((m) => (
              <button
                key={m.id}
                role="radio"
                aria-checked={mood.id === m.id}
                className={`mood-btn ${mood.id === m.id ? "on" : ""}`}
                onClick={() => setMood(m)}
              >
                <span className="mood-sw" style={{ background: `linear-gradient(135deg, ${m.wall} 50%, ${m.sofa} 50%)` }} />
                {m.label}
              </button>
            ))}
          </div>
          <p className="mood-note" key={mood.id}>
            {mood.note}
          </p>
        </div>
        <div className="room" style={vars} data-reveal aria-label={`Room preview in ${mood.label}`} role="img">
          <div className="room-wall">
            <div className="room-arch" />
            <div className="room-art">
              <i />
              <i />
            </div>
            <div className="room-lamp">
              <span />
            </div>
          </div>
          <div className="room-floor">
            <div className="room-rug" />
          </div>
          <div className="room-sofa">
            <span className="cushion" />
            <span className="cushion c2" />
          </div>
          <div className="room-plant">
            <i />
            <i />
            <i />
          </div>
          <div className="room-table" />
          <span className="room-label">{mood.label}</span>
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="voices section">
      <div className="wrap">
        <p className="kicker" data-reveal>
          Client voices
        </p>
        <div className="voice-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className={`voice voice-${t.tone} v-${i}`} data-reveal>
              <span className="quote-mark">“</span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <b>{t.name}</b>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="press" data-reveal>
          <span>As seen in</span>
          <b>Architectural Digest Middle East</b>
          <b>Design Riyadh Week</b>
          <b>Frame</b>
          <b>Dezeen Awards longlist '24</b>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq section">
      <div className="wrap faq-grid">
        <h2 className="h2" data-reveal>
          Fair
          <br />
          questions.
        </h2>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <i>{open === i ? "–" : "+"}</i>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [type, setType] = useState("Home");
  const [budget, setBudget] = useState("SAR 50–150k");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = `Name: ${fd.get("name")}\nCity: ${fd.get("city")}\nSpace: ${type}\nBudget: ${budget}\n\n${fd.get("msg")}`;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Room Read request — ${type}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section className="contact section" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy" data-reveal>
          <p className="kicker kicker-lime">Start a project</p>
          <h2 className="contact-title">
            Got a room
            <br />
            that <span className="hl-coral">bores</span> you?
          </h2>
          <p>
            Tell us about it. We reply within one working day and book a free 20-minute call before any fee. Room Reads
            are booked 2–3 weeks out.
          </p>
          <ul className="contact-lines">
            <li>
              <small>Email</small>
              <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
            </li>
            <li>
              <small>WhatsApp</small>
              <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer">
                {CONFIG.phoneDisplay}
              </a>
            </li>
            <li>
              <small>Studio</small>
              <span>{CONFIG.address}</span>
            </li>
            <li>
              <small>Hours</small>
              <span>{CONFIG.hours}</span>
            </li>
          </ul>
        </div>
        <form className="form" onSubmit={submit} data-reveal>
          <div className="field-row">
            <label>
              <span>Your name</span>
              <input name="name" required placeholder="Reem Al-…" autoComplete="name" />
            </label>
            <label>
              <span>City</span>
              <input name="city" required placeholder="Riyadh" />
            </label>
          </div>
          <fieldset>
            <legend>Space</legend>
            <div className="opts">
              {["Home", "Single room", "Café / F&B", "Retail", "Office"].map((o) => (
                <button type="button" key={o} className={`opt ${type === o ? "on" : ""}`} onClick={() => setType(o)}>
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Budget (design + build)</legend>
            <div className="opts">
              {["Under SAR 50k", "SAR 50–150k", "SAR 150–500k", "SAR 500k+"].map((o) => (
                <button type="button" key={o} className={`opt ${budget === o ? "on" : ""}`} onClick={() => setBudget(o)}>
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            <span>What's wrong with the room?</span>
            <textarea name="msg" rows={4} placeholder="It's a 4×5m living room, north-facing, and everything is grey…" />
          </label>
          <button className="btn btn-lime btn-block" type="submit">
            {sent ? "Opening your email app…" : "Send my room →"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div>
          <p className="footer-tag">Experimental interiors studio · Riyadh · Since 2018</p>
          <nav>
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <a href={CONFIG.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </nav>
        </div>
        <a href="#top" className="to-top">
          Back to top ↑
        </a>
      </div>
      <div className="footer-word" aria-hidden="true">
        KALEIDOS
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} KALEIDOS Interiors. CR placeholder.</span>
        <span>Photos: Unsplash (placeholders for client imagery)</span>
      </div>
    </footer>
  );
}

function StickyCta({ hidden }: { hidden: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const contact = document.getElementById("contact");
      const past = window.scrollY > window.innerHeight * 0.6;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.7 : false;
      setShow(past && !atContact);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <a href="#contact" className={`badge-cta ${show && !hidden ? "show" : ""}`} aria-label="Start a room">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path id="circ2" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
          </defs>
          <text>
            <textPath href="#circ2">START A ROOM ✶ START A ROOM ✶ </textPath>
          </text>
        </svg>
        <span>↗</span>
      </a>
      <div className={`dock ${show && !hidden ? "show" : ""}`}>
        <a href="#contact" className="dock-main">
          <Mark size={22} /> Start a room
        </a>
        <a href={`https://wa.me/${CONFIG.whatsapp}`} className="dock-wa" target="_blank" rel="noreferrer" aria-label="WhatsApp us">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const closeMenu = useCallback(() => setMenu(false), []);
  const closeSheet = useCallback(() => setProject(null), []);
  useReveal();
  return (
    <>
      <Header onMenu={() => setMenu(true)} />
      <Menu open={menu} onClose={closeMenu} />
      <main>
        <Hero />
        <Ticker />
        <Work onOpen={setProject} />
        <Studio />
        <Process />
        <ColourLab />
        <Services />
        <Voices />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta hidden={menu || !!project} />
      <ProjectSheet project={project} onClose={closeSheet} />
    </>
  );
}
