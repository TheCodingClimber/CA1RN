import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./App.css";

const SecurityMeshBanner = lazy(() => import("./SecurityMeshBanner"));

const navItems = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

const heroBadges = [
  "Private Infrastructure",
  "Hardened Networks",
  "Security Reviews",
  "Facility Build-Outs",
];

const signalCards = [
  {
    value: "End-to-end",
    label: "Facility, network, compute, and policy treated as one system",
  },
  {
    value: "Operator-led",
    label: "Built and maintained by people accountable for the outcome",
  },
  {
    value: "Security-first",
    label: "Controls designed into the environment instead of layered on late",
  },
  {
    value: "High-trust",
    label: "Best suited for teams that cannot afford infrastructure ambiguity",
  },
];

const proofPoints = [
  {
    label: "Physical",
    text: "Server hardware commissioned, racked, and maintained by CA1RN operators.",
  },
  {
    label: "Network",
    text: "Topology, VLANs, and firewall policy authored in-house for the environments we protect.",
  },
  {
    label: "Policy",
    text: "Security controls designed to hold from facilities to workflows, not just dashboards.",
  },
];

const outcomeCards = [
  {
    title: "Own the foundation",
    text: "Reduce vendor dependency with infrastructure designed around direct control, not inherited assumptions.",
  },
  {
    title: "Build for scrutiny",
    text: "Create environments that can stand up to serious internal review, operational pressure, and external questioning.",
  },
  {
    title: "Move with confidence",
    text: "Plan migrations, hardening work, and new environments with clearer risk boundaries and stronger execution discipline.",
  },
];

const serverStats = [
  { value: "On-site", label: "Deployment ownership" },
  { value: "NVIDIA", label: "GPU platform experience" },
  { value: "In-house", label: "Operations model" },
];

const networkFeatures = [
  "Custom network topology and segmentation",
  "Function-specific VLAN design",
  "Internally authored firewall and policy layers",
  "Infrastructure built to limit unnecessary external dependency",
];

const securityColumns = [
  {
    title: "Hardware",
    items: ["Physical access control", "Hardware authentication", "Tamper awareness"],
  },
  {
    title: "Network",
    items: ["Perimeter defense", "Intrusion visibility", "Traffic analysis"],
  },
  {
    title: "Policy",
    items: ["Rule enforcement", "Drift monitoring", "Audit readiness"],
  },
];

const facilitySystems = ["HVAC", "Electrical", "Plumbing", "Networking"];

const serviceTracks = [
  {
    title: "Facility and infrastructure build-outs",
    text: "Plan and stand up the physical and logical systems behind high-trust environments.",
  },
  {
    title: "Network hardening and segmentation",
    text: "Restructure networks around clear trust boundaries, performance needs, and operational control.",
  },
  {
    title: "Migration and modernization planning",
    text: "Move from inherited or brittle environments into infrastructure your team can actually own.",
  },
  {
    title: "Security posture reviews",
    text: "Assess where controls, process, and infrastructure design are not yet aligned.",
  },
];

const engagementSteps = [
  {
    step: "01",
    title: "Discovery",
    text: "We map business risk, technical constraints, and what the environment must be able to withstand.",
  },
  {
    step: "02",
    title: "Architecture",
    text: "We shape an operating model across facility, network, compute, and security rather than treating them as separate handoffs.",
  },
  {
    step: "03",
    title: "Execution",
    text: "We help build, harden, migrate, or review the environment with direct accountability at every layer.",
  },
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

function buildInquirySummary(form) {
  return [
    "CA1RN Project Inquiry",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Company: ${form.company || "Not provided"}`,
    "",
    "Project brief:",
    form.message,
  ].join("\n");
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in${visible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-nav__inner">
        <a className="brand" href="#top" aria-label="CA1RN home">
          <span className="brand__mark" aria-hidden="true" />
          <span>CA1RN</span>
        </a>

        <div className="site-nav__links" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} className="site-nav__link" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="button button--primary nav-cta" href="#contact">
          Request Access
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="top" className="hero section container">
      <div className={`hero-copy${visible ? " is-visible" : ""}`}>
        <p className="eyebrow">Digital Infrastructure and Security</p>
        <div className="hero-kicker">Independent operators for critical environments</div>
        <h1 className="hero-title">
          CONTROL THE
          <br />
          LAYER BENEATH
          <br />
          THE SOFTWARE.
        </h1>
        <p className="hero-lede">
          CA1RN designs, deploys, and operates the infrastructure, hardened
          networks, and security-first environments behind serious systems. When
          trust, uptime, and control matter, we work at the layer most teams
          cannot afford to get wrong.
        </p>

        <div className="hero-actions">
          <a className="button button--primary" href="#contact">
            Start a Consultation
          </a>
          <a className="button button--ghost" href="#approach">
            View the Operating Model
          </a>
        </div>

        <div className="hero-badges" aria-label="Primary engagement types">
          {heroBadges.map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <FadeIn delay={0.18} className="hero-console hero-console--banner">
        <div className="hero-console__frame">
          <div className="hero-console__topline">
            <span>Operations Surface</span>
            <span>Secure network map</span>
          </div>
          <Suspense fallback={<BannerFallback />}>
            <SecurityMeshBanner />
          </Suspense>
        </div>
      </FadeIn>
    </section>
  );
}

function BannerFallback() {
  return (
    <div className="mesh-banner mesh-banner--loading" aria-hidden="true">
      <div className="mesh-banner__hud">
        <span>Operations Surface</span>
        <span>Loading secure map</span>
      </div>
      <div className="mesh-banner__placeholder">
        <div className="mesh-banner__pulse" />
      </div>
      <div className="mesh-banner__footer">
        <div>
          <strong>Segmented zones</strong>
          <p>Named infrastructure areas load into a controlled operations view.</p>
        </div>
        <div>
          <strong>Traffic state</strong>
          <p>Approved and blocked routes appear once the live network panel is ready.</p>
        </div>
      </div>
    </div>
  );
}

function SignalStrip() {
  return (
    <section className="container signal-strip">
      <FadeIn className="signal-strip__grid">
        {signalCards.map((card) => (
          <article key={card.value} className="signal-card">
            <div className="signal-card__value">{card.value}</div>
            <p>{card.label}</p>
          </article>
        ))}
      </FadeIn>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

function HeavyRule() {
  return (
    <div className="container">
      <div className="rule rule--heavy" />
    </div>
  );
}

function ThinRule() {
  return (
    <div className="container">
      <div className="rule" />
    </div>
  );
}

function Outcomes() {
  return (
    <section id="capabilities" className="section container">
      <FadeIn>
        <SectionHeading
          eyebrow="Why CA1RN"
          title="Infrastructure work designed for teams that need more than hosting."
          copy="We help organizations move from indirect dependency toward stronger ownership, clearer risk boundaries, and infrastructure decisions they can defend with confidence."
        />

        <div className="value-grid">
          {outcomeCards.map((card, index) => (
            <article key={card.title} className="value-card">
              <div className="value-card__index">0{index + 1}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Block({ num, title, children }) {
  return (
    <section className="section container block">
      <FadeIn>
        <div className="block__layout">
          <div className="block__number" aria-hidden="true">
            {num}
          </div>
          <div className="block__content">
            <h2 className="section-title">{title}</h2>
            {children}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Servers() {
  return (
    <Block num="01" title="Operator-Built Compute and Infrastructure">
      <p className="section-copy">
        Every server in our facility was commissioned, racked, and configured by
        CA1RN operators. When workloads run, they run on hardware we placed,
        wired, and brought online ourselves. That matters when clients need real
        ownership, not a reseller relationship.
      </p>

      <div className="stat-grid">
        {serverStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <div className="stat-card__value">{stat.value}</div>
            <div className="stat-card__label">{stat.label}</div>
          </article>
        ))}
      </div>
    </Block>
  );
}

function Networks() {
  return (
    <Block num="02" title="Networks Designed Around Control">
      <p className="section-copy">
        When the platform serves a request, it moves through a network built for
        that purpose. Topology designed from scratch. Segmentation chosen with
        intent. Firewall and policy layers written, tested, and maintained by
        the same team responsible for the outcome.
      </p>

      <div className="feature-panel">
        <div className="feature-list">
          {networkFeatures.map((feature) => (
            <div key={feature} className="feature-row">
              <div className="feature-row__bar" aria-hidden="true" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="proof-stack">
          {proofPoints.map((point) => (
            <article key={point.label} className="proof-card">
              <div className="proof-card__label">{point.label}</div>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Block>
  );
}

function SecurityBlock() {
  return (
    <Block num="03" title="Security as an Operating Discipline">
      <p className="section-copy">
        Security is treated here as a discipline enforced across the hardware
        layer, the network layer, and the policy layer so teams can make better
        decisions under pressure and stand behind the environments they ship.
      </p>

      <div className="security-grid">
        {securityColumns.map((column) => (
          <article key={column.title} className="security-card">
            <div className="security-card__title">{column.title}</div>
            <div className="security-card__items">
              {column.items.map((item) => (
                <div key={item} className="security-card__item">
                  {item}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Block>
  );
}

function Facility() {
  return (
    <Block num="04" title="Built From Raw Space to Production Readiness">
      <p className="section-copy">
        Commercial-grade HVAC, electrical, plumbing, and networking from raw
        space to production-ready. The result is a company that understands how
        facility work, network posture, and operational control reinforce each
        other in the real world.
      </p>

      <div className="systems-grid">
        {facilitySystems.map((system) => (
          <article key={system} className="system-card">
            <div className="system-card__title">{system}</div>
            <div className="system-card__status">Operational Domain</div>
          </article>
        ))}
      </div>
    </Block>
  );
}

function Services() {
  return (
    <section className="section container">
      <FadeIn>
        <SectionHeading
          eyebrow="Engagement Areas"
          title="Clear ways we help organizations strengthen the environment underneath the product."
          copy="CA1RN is best aligned with infrastructure-sensitive work where direct control, stronger segmentation, and security-first execution materially change the business risk."
        />

        <div className="service-grid">
          {serviceTracks.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="section container">
      <FadeIn>
        <SectionHeading
          eyebrow="Operating Model"
          title="A direct path from infrastructure risk to a governed execution plan."
          copy="We do the work in a sequence that helps clients understand what matters first, where decisions compound, and how the environment should actually be operated once it is live."
        />

        <div className="process-grid">
          {engagementSteps.map((step) => (
            <article key={step.step} className="process-card">
              <div className="process-card__step">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Monolith() {
  return (
    <section className="doctrine">
      <FadeIn>
        <div className="container doctrine__inner">
          <p className="doctrine__quote">
            Control is earned below the surface.
            <span> That is where we work.</span>
          </p>
          <p className="doctrine__source">CA1RN operating doctrine</p>
        </div>
      </FadeIn>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ tone: "idle", text: "" });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        tone: "error",
        text: "Please add your name, email, and a short project brief.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const subject = encodeURIComponent(`CA1RN project inquiry from ${form.name}`);
    const body = encodeURIComponent(buildInquirySummary(form));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;

    setStatus({
      tone: "success",
      text: "Your default email app should open with a prefilled inquiry draft.",
    });
  };

  const handleCopy = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) {
        setStatus({
          tone: "error",
          text: "Clipboard access is unavailable in this browser. Try the email draft button instead.",
        });
        return;
      }

      await navigator.clipboard.writeText(buildInquirySummary(form));
      setStatus({
        tone: "success",
        text: "Project brief copied to the clipboard. You can paste it into email or chat.",
      });
    } catch {
      setStatus({
        tone: "error",
        text: "Clipboard access failed in this browser. Try the email draft button instead.",
      });
    }
  };

  return (
    <section id="contact" className="section container contact">
      <FadeIn>
        <div className="contact__grid">
          <div className="contact__intro">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title contact__title">
              Start with the environment that matters most.
            </h2>
            <p className="section-copy contact__copy">
              Share a short brief and the page will prepare an email draft or
              copy your inquiry so you can send it through your preferred
              channel.
            </p>
            <div className="contact-note">
              Strong fits include infrastructure build-outs, migration planning,
              network hardening, security reviews, and environments where the
              business needs more direct control over the stack.
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Name</span>
              <input
                autoComplete="name"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={updateField}
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                autoComplete="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={updateField}
              />
            </label>

            <label className="field">
              <span>Company</span>
              <input
                autoComplete="organization"
                name="company"
                placeholder="Company or team"
                value={form.company}
                onChange={updateField}
              />
            </label>

            <label className="field">
              <span>Project brief</span>
              <textarea
                name="message"
                rows={6}
                placeholder="Tell us what you need built, hardened, reviewed, or migrated."
                value={form.message}
                onChange={updateField}
              />
            </label>

            <div className="contact-form__actions">
              <button className="button button--primary" type="submit">
                Open Email Draft
              </button>
              <button
                className="button button--secondary"
                type="button"
                onClick={handleCopy}
              >
                Copy Brief
              </button>
            </div>

            <p className={`contact-status contact-status--${status.tone}`} aria-live="polite">
              {status.text ||
                "Your details stay in the browser until you choose how to send them."}
            </p>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>&copy; {new Date().getFullYear()} CA1RN LLC</span>
        <span>Private infrastructure. Hardened networks. Security-first execution.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-shell__mesh" aria-hidden="true" />
      <div className="app-shell__glow app-shell__glow--left" aria-hidden="true" />
      <div className="app-shell__glow app-shell__glow--right" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <SignalStrip />
        <HeavyRule />
        <Outcomes />
        <ThinRule />
        <Servers />
        <ThinRule />
        <Networks />
        <ThinRule />
        <SecurityBlock />
        <ThinRule />
        <Facility />
        <ThinRule />
        <Services />
        <ThinRule />
        <Approach />
        <Monolith />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
