import { useState, useEffect, useRef } from "react";

const CONCRETE = "#8C8C8C";
const RUST = "#C45D3E";
const RUST_DIM = "rgba(196,93,62,0.06)";
const BG = "#0B0B0B";
const BG_SLAB = "#101010";
const TEXT = "#D4D4D4";
const TEXT_DIM = "#5A5A5A";
const BORDER = "rgba(140,140,140,0.1)";
const HEAVY = "'Anton', sans-serif";
const SANS = "'Barlow', sans-serif";
const MONO = "'Fira Code', monospace";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1rem 0",
      background: scrolled ? "rgba(11,11,11,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: HEAVY, fontSize: 22, color: TEXT, letterSpacing: 3 }}>CA1RN</span>
        <a href="#contact" style={{
          fontFamily: SANS, fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
          color: BG, textDecoration: "none", fontWeight: 700, padding: "0.5rem 1.5rem",
          background: RUST, transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.target.style.opacity = "0.85"}
          onMouseLeave={e => e.target.style.opacity = "1"}
        >Contact</a>
      </div>
    </nav>
  );
}

const cx = { maxWidth: 900, margin: "0 auto", padding: "0 2rem" };

function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 250); }, []);
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", ...cx }}>
      <div style={{
        fontFamily: MONO, fontSize: 10, color: RUST, letterSpacing: 4, marginBottom: "2rem",
        opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
      }}>INFRASTRUCTURE & SECURITY</div>
      <h1 style={{
        fontFamily: HEAVY, fontSize: "clamp(4rem, 10vw, 9rem)",
        lineHeight: 0.9, color: TEXT, margin: 0, textTransform: "uppercase",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s ease 0.3s",
      }}>
        THE<br />
        FOUN<span style={{ color: RUST }}>DA</span>TION.
      </h1>
      <div style={{
        height: 4, background: RUST, width: 80, marginTop: "3rem",
        opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.8s",
      }} />
      <p style={{
        fontFamily: SANS, fontSize: 17, lineHeight: 1.8, color: TEXT_DIM,
        marginTop: "1.5rem", maxWidth: 550,
        opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 1s",
      }}>
        If you do not own your infrastructure, you do not control your business.
        CA1RN designs, deploys, and operates the physical and network infrastructure
        that powers everything above it.
      </p>
    </section>
  );
}

function HeavyRule() {
  return <div style={{ ...cx, padding: "0 2rem" }}><div style={{ height: 3, background: BORDER }} /></div>;
}

function ThinRule() {
  return <div style={{ ...cx, padding: "0 2rem" }}><div style={{ height: 1, background: BORDER }} /></div>;
}

function Block({ num, title, children }) {
  return (
    <section style={{ ...cx, padding: "6rem 2rem" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
          <div style={{
            fontFamily: HEAVY, fontSize: "clamp(5rem, 12vw, 10rem)",
            lineHeight: 0.8, color: RUST, opacity: 0.08,
            marginRight: "-0.5rem", marginTop: "-0.5rem",
            userSelect: "none", flexShrink: 0,
          }}>{num}</div>
          <div style={{ flex: 1, paddingTop: "0.5rem" }}>
            <h2 style={{
              fontFamily: HEAVY, fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: TEXT, margin: "0 0 1.5rem", textTransform: "uppercase",
              letterSpacing: 2,
            }}>{title}</h2>
            {children}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Servers() {
  return (
    <Block num="01" title="SERVERS WE RACKED OURSELVES">
      <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.8, color: TEXT_DIM, margin: "0 0 2rem", maxWidth: 560 }}>
        Every server in our facility was commissioned, racked, and configured by
        CA1RN operators. When the AI runs, it runs on hardware we put in place with
        our own hands. No vendor installs. No managed hosting. Ours.
      </p>
      <div style={{
        background: BG_SLAB, border: `1px solid ${BORDER}`, padding: "2rem",
        display: "flex", gap: "3rem",
      }}>
        {[
          { val: "NVIDIA", label: "GPU PLATFORM" },
          { val: "ON-SITE", label: "DEPLOYMENT" },
          { val: "100%", label: "SELF-OPERATED" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: HEAVY, fontSize: 22, color: TEXT }}>{s.val}</div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: TEXT_DIM, letterSpacing: 2, marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </Block>
  );
}

function Networks() {
  return (
    <Block num="02" title="NETWORKS WE DESIGNED AND HARDENED">
      <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.8, color: TEXT_DIM, margin: "0 0 2rem", maxWidth: 560 }}>
        When the platform serves a request, it travels a network we built.
        Topology designed from scratch. Every switch, every VLAN, every firewall
        rule — written, tested, and enforced by our team.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {[
          "Custom network topology",
          "Function-segmented VLANs",
          "Internally authored firewall rules",
          "Zero external network dependency",
        ].map((t, i) => (
          <div key={i} style={{
            padding: "1rem 0", borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", gap: "1.25rem",
          }}>
            <div style={{ width: 20, height: 2, background: RUST, flexShrink: 0 }} />
            <span style={{ fontFamily: SANS, fontSize: 15, color: TEXT_DIM }}>{t}</span>
          </div>
        ))}
      </div>
    </Block>
  );
}

function SecurityBlock() {
  return (
    <Block num="03" title="SECURITY AS A DISCIPLINE">
      <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.8, color: TEXT_DIM, margin: "0 0 2rem", maxWidth: 560 }}>
        Security isn't a product we bought. It's a discipline we enforce.
        When a security policy blocks an unauthorized action, it is a rule
        we wrote and a system we configured. At the hardware level. At the
        network level. At the policy level.
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: BORDER,
      }}>
        {[
          { title: "HARDWARE", items: ["Physical access control", "Hardware authentication", "Tamper detection"] },
          { title: "NETWORK", items: ["Perimeter defense", "Intrusion detection", "Traffic analysis"] },
          { title: "POLICY", items: ["Rule enforcement", "Drift monitoring", "Audit trails"] },
        ].map((col, i) => (
          <div key={i} style={{ background: BG_SLAB, padding: "1.5rem" }}>
            <div style={{
              fontFamily: MONO, fontSize: 9, letterSpacing: 3, color: RUST, marginBottom: "1rem",
            }}>{col.title}</div>
            {col.items.map((item, j) => (
              <div key={j} style={{
                fontFamily: SANS, fontSize: 13, color: TEXT_DIM, padding: "0.4rem 0",
              }}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </Block>
  );
}

function Facility() {
  return (
    <Block num="04" title="BUILT FROM RAW SPACE">
      <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.8, color: TEXT_DIM, margin: "0 0 2rem", maxWidth: 560 }}>
        Commercial-grade HVAC, electrical, plumbing, and networking — from raw space
        to production-ready. Our CEO ran the electrical at the first facility. That's
        the standard. Leadership that builds.
      </p>
      <div style={{ display: "flex", gap: "1px", background: BORDER }}>
        {["HVAC", "ELECTRICAL", "PLUMBING", "NETWORKING"].map((sys, i) => (
          <div key={i} style={{
            flex: 1, background: BG_SLAB, padding: "1.5rem", textAlign: "center",
          }}>
            <div style={{ fontFamily: HEAVY, fontSize: 14, color: TEXT, letterSpacing: 2 }}>{sys}</div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: RUST, marginTop: "0.5rem", letterSpacing: 1 }}>OPERATIONAL</div>
          </div>
        ))}
      </div>
    </Block>
  );
}

function Monolith() {
  return (
    <section style={{ padding: "6rem 0", background: BG_SLAB, borderTop: `3px solid ${BORDER}`, borderBottom: `3px solid ${BORDER}` }}>
      <FadeIn>
        <div style={{ ...cx, textAlign: "center" }}>
          <div style={{
            fontFamily: HEAVY, fontSize: "clamp(1.5rem, 4vw, 3rem)",
            color: TEXT, lineHeight: 1.3, textTransform: "uppercase",
            maxWidth: 700, margin: "0 auto",
          }}>
            "THAT IS A HARDER WAY TO DO IT.{" "}
            <span style={{ color: RUST }}>IT IS ALSO THE ONLY WAY THAT GIVES YOU REAL CONTROL.</span>"
          </div>
          <div style={{
            fontFamily: MONO, fontSize: 10, color: TEXT_DIM, letterSpacing: 3, marginTop: "2rem",
          }}>— CA1RN OPERATING DOCTRINE</div>
        </div>
      </FadeIn>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const inp = (f) => ({
    width: "100%", padding: "1rem", fontFamily: SANS, fontSize: 14,
    background: BG_SLAB, border: `2px solid ${focused === f ? RUST : BORDER}`,
    color: TEXT, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
  });
  return (
    <section id="contact" style={{ ...cx, padding: "6rem 2rem 8rem" }}>
      <FadeIn>
        <div style={{ maxWidth: 500 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 3, color: RUST, marginBottom: "1.5rem" }}>CONTACT</div>
          <h2 style={{ fontFamily: HEAVY, fontSize: 32, color: TEXT, margin: "0 0 0.75rem", textTransform: "uppercase", letterSpacing: 2 }}>
            BREACH THE WALL.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 14, color: TEXT_DIM, lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Infrastructure projects. Security assessments. Real proposals only.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input placeholder="Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
              style={inp("name")} />
            <input placeholder="Email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
              style={inp("email")} />
            <textarea placeholder="State your purpose" rows={5} value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
              style={{ ...inp("message"), resize: "vertical" }} />
            <button style={{
              alignSelf: "flex-start", padding: "0.8rem 2.5rem",
              background: RUST, border: "none", color: "#fff",
              fontFamily: SANS, fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
              fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >Send</button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ ...cx, padding: "2rem", borderTop: `3px solid ${BORDER}`,
      display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontFamily: MONO, fontSize: 11, color: TEXT_DIM }}>© {new Date().getFullYear()} CA1RN LLC</span>
      <span style={{ fontFamily: MONO, fontSize: 9, color: TEXT_DIM, letterSpacing: 2 }}>A NOVE MANI COMPANY</span>
    </footer>
  );
}

export default function CA1RNFortress() {
  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      <Nav />
      <Hero />
      <HeavyRule />
      <Servers />
      <ThinRule />
      <Networks />
      <ThinRule />
      <SecurityBlock />
      <ThinRule />
      <Facility />
      <Monolith />
      <ContactForm />
      <Footer />
    </div>
  );
}
