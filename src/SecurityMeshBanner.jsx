const statusItems = [
  { label: "Segmentation", value: "Enforced" },
  { label: "Policy Control", value: "Authored In-House" },
  { label: "Telemetry", value: "Continuous" },
  { label: "Audit Trail", value: "Retained" },
];

const legendItems = [
  {
    tone: "approved",
    title: "Approved traffic",
    text: "Permitted routes pulse between ingress, policy, compute, and monitoring surfaces.",
  },
  {
    tone: "guarded",
    title: "Policy boundary",
    text: "Every meaningful hop passes through the security and routing layer before it reaches workloads.",
  },
  {
    tone: "blocked",
    title: "Blocked path",
    text: "Improper direct access is shown and denied so the viewer understands the control posture immediately.",
  },
];

export default function SecurityMeshBanner() {
  return (
    <div className="ops-map">
      <div className="ops-map__topline">
        <span>Secure Network Operations Map</span>
        <span>Ingress / Policy / Compute / Storage / Telemetry</span>
      </div>

      <div className="ops-map__visual">
        <svg
          className="ops-map__svg"
          viewBox="0 0 820 430"
          role="img"
          aria-label="Animated secure network operations map showing ingress, firewall policy, compute, storage, telemetry, monitoring, and blocked direct access."
        >
          <defs>
            <linearGradient id="ops-panel-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(103,210,255,0.65)" />
              <stop offset="100%" stopColor="rgba(219,149,84,0.38)" />
            </linearGradient>
            <linearGradient id="ops-approved" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#67d2ff" />
              <stop offset="100%" stopColor="#baf0ff" />
            </linearGradient>
            <linearGradient id="ops-guarded" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#db9554" />
              <stop offset="100%" stopColor="#67d2ff" />
            </linearGradient>
            <filter id="ops-glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect className="ops-map__frame" x="18" y="18" width="784" height="394" rx="24" />
          <rect className="ops-map__panel ops-map__panel--ingress" x="44" y="64" width="162" height="72" rx="18" />
          <rect className="ops-map__panel ops-map__panel--edge" x="258" y="64" width="142" height="72" rx="18" />
          <rect className="ops-map__panel ops-map__panel--policy" x="454" y="52" width="182" height="98" rx="20" />
          <rect className="ops-map__panel ops-map__panel--mgmt" x="672" y="64" width="104" height="72" rx="18" />

          <rect className="ops-map__panel ops-map__panel--compute" x="252" y="192" width="226" height="124" rx="22" />
          <rect className="ops-map__panel ops-map__panel--storage" x="48" y="248" width="160" height="100" rx="20" />
          <rect className="ops-map__panel ops-map__panel--telemetry" x="510" y="204" width="126" height="112" rx="20" />
          <rect className="ops-map__panel ops-map__panel--monitoring" x="670" y="184" width="110" height="78" rx="18" />
          <rect className="ops-map__panel ops-map__panel--vault" x="668" y="292" width="112" height="74" rx="18" />

          <path className="ops-map__route ops-map__route--approved ops-map__route--flow-a" d="M 206 100 L 258 100" />
          <path className="ops-map__route ops-map__route--approved ops-map__route--flow-b" d="M 400 100 L 454 100" />
          <path className="ops-map__route ops-map__route--guarded ops-map__route--flow-c" d="M 545 150 L 545 192 L 365 192" />
          <path className="ops-map__route ops-map__route--approved ops-map__route--flow-d" d="M 636 100 L 672 100" />
          <path className="ops-map__route ops-map__route--approved ops-map__route--flow-a" d="M 478 244 L 510 244" />
          <path className="ops-map__route ops-map__route--approved ops-map__route--flow-b" d="M 636 220 L 670 220" />
          <path className="ops-map__route ops-map__route--approved ops-map__route--flow-c" d="M 636 300 L 668 328" />
          <path className="ops-map__route ops-map__route--approved ops-map__route--flow-d" d="M 252 280 L 208 280 L 208 298" />
          <path className="ops-map__route ops-map__route--guarded ops-map__route--flow-b" d="M 128 248 L 128 174 L 454 174 L 454 101" />
          <path className="ops-map__route ops-map__route--blocked" d="M 206 118 L 286 194" />

          <circle className="ops-map__node ops-map__node--approved" cx="206" cy="118" r="6" />
          <circle className="ops-map__node ops-map__node--approved" cx="258" cy="100" r="6" />
          <circle className="ops-map__node ops-map__node--guarded" cx="545" cy="150" r="6" />
          <circle className="ops-map__node ops-map__node--approved" cx="672" cy="100" r="6" />
          <circle className="ops-map__node ops-map__node--approved" cx="510" cy="244" r="6" />
          <circle className="ops-map__node ops-map__node--approved" cx="670" cy="220" r="6" />
          <circle className="ops-map__node ops-map__node--approved" cx="668" cy="328" r="6" />
          <circle className="ops-map__node ops-map__node--approved" cx="208" cy="298" r="6" />
          <circle className="ops-map__node ops-map__node--guarded" cx="454" cy="101" r="6" />


          <g className="ops-map__blocked-mark">
            <circle cx="246" cy="156" r="13" />
            <path d="M 240 150 L 252 162" />
            <path d="M 252 150 L 240 162" />
          </g>

          <g className="ops-map__zone-text">
            <text x="62" y="90">Public Ingress</text>
            <text x="62" y="110">VPN / Partner Links</text>

            <text x="278" y="90">Edge Gateway</text>
            <text x="278" y="110">Routing +</text>
            <text x="278" y="128">Entry Control</text>

            <text x="476" y="80">Firewall +</text>
            <text x="476" y="100">Policy Layer</text>
            <text x="476" y="122">VLAN Rules</text>
            <text x="476" y="142">Access Enforcement</text>

            <text x="686" y="90">Management</text>
            <text x="686" y="110">Admin VLAN</text>

            <text x="274" y="220">Production Compute Cluster</text>
            <text x="274" y="240">GPU Workloads</text>
            <text x="274" y="258">Private Services</text>
            <text x="274" y="276">Controlled East-West</text>
            <text x="274" y="295">Traffic</text>

            <text x="60" y="282">Storage Array</text>
            <text x="60" y="304">Backups + Replication</text>

            <text x="530" y="238">Telemetry</text>
            <text x="530" y="258">Logs</text>
            <text x="530" y="278">Audit Trails</text>
            <text x="530" y="298">Intrusion Signals</text>

            <text x="682" y="214">Monitoring</text>
            <text x="682" y="234">Operator View</text>

            <text x="680" y="322">Backup Vault</text>
            <text x="680" y="342">Retention Zone</text>
          </g>

          <g className="ops-map__microcopy">
            <text x="210" y="355">Approved routes pulse through policy before workloads.</text>
            <text x="210" y="370">Direct ingress to production is blocked and visible by design.</text>
          </g>
        </svg>
      </div>

      <div className="ops-map__status-grid">
        {statusItems.map((item) => (
          <article key={item.label} className="ops-map__status-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>

      <div className="ops-map__legend">
        {legendItems.map((item) => (
          <article key={item.title} className={`ops-map__legend-item ops-map__legend-item--${item.tone}`}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
