import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineArrowTrendingUp,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from "react-icons/hi2";

const outcomes = [
  {
    number: "01",
    icon: HiOutlineShieldCheck,
    title: "Safer every shift",
    text: "Leading indicators, field assurance and visible leadership keep risk controls active where work happens.",
    measure: "Safety observations · Critical controls",
  },
  {
    number: "02",
    icon: HiOutlineGlobeAsiaAustralia,
    title: "Restore as we operate",
    text: "Progressive rehabilitation, water management and biodiversity planning begin during the life of the mine.",
    measure: "Land restored · Water recycled",
  },
  {
    number: "03",
    icon: HiOutlineUsers,
    title: "Value that stays local",
    text: "Skills, procurement and long-term partnerships help mining create durable opportunity close to operations.",
    measure: "Local employment · Community investment",
  },
  {
    number: "04",
    icon: HiOutlineArrowTrendingUp,
    title: "More from every movement",
    text: "Connected planning reduces rehandling, idle time and avoidable energy use from pit through port.",
    measure: "Cycle efficiency · Emissions intensity",
  },
];

const dashboardRows = [
  { label: "Production", value: "88%", width: "88%" },
  { label: "HSE controls", value: "96%", width: "96%" },
  { label: "Fleet availability", value: "82%", width: "82%" },
  { label: "Rehabilitation", value: "74%", width: "74%" },
];

function Impact() {
  return (
    <section className="coral-impact" id="impact">
      <div className="coral-shell">
        <div className="coral-impact__heading">
          <div>
            <p className="coral-eyebrow coral-eyebrow--light"><span /> Our impact</p>
            <h2>Measured beyond<br /><em>output.</em></h2>
          </div>
          <p>
            High-performing mines create value on more than one balance sheet. We track the operational, environmental and social outcomes that make progress durable.
          </p>
        </div>

        <div className="coral-impact-snapshot" aria-label="Impact framework">
          <div><strong>04</strong><span>Outcome pillars</span><small>One connected framework</small></div>
          <div><strong>Every shift</strong><span>Safety cadence</span><small>Controls kept visible</small></div>
          <div><strong>Life of mine</strong><span>Rehabilitation horizon</span><small>Designed from day one</small></div>
          <div><strong>Pit → Port</strong><span>System view</span><small>Performance end to end</small></div>
        </div>

        <div className="coral-impact__bento">
          <article className="coral-impact-feature coral-impact-feature--people">
            <img src="/coral/impact-safety-team.jpg" alt="Indian mine operations team reviewing field data at a safe observation point" loading="lazy" />
            <div className="coral-impact-feature__shade" />
            <div className="coral-impact-feature__content">
              <span>People &amp; safety</span>
              <h3>Every person home safe.<br />Every single day.</h3>
              <p>Safe production starts with informed teams, engineered controls and the confidence to stop and correct.</p>
            </div>
            <div className="coral-impact-feature__signal"><i /> Field assurance active</div>
            <div className="coral-impact-feature__index">01 / 04</div>
          </article>

          <div className="coral-impact__outcomes">
            {outcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <article className="coral-outcome" key={outcome.number}>
                  <div className="coral-outcome__top"><span>{outcome.number}</span><Icon /></div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.text}</p>
                  <small>{outcome.measure}</small>
                </article>
              );
            })}
          </div>

          <article className="coral-restoration-card">
            <img src="/coral/impact-land-restoration.jpg" alt="Progressive mine land rehabilitation with native planting and a water-retention pond" loading="lazy" />
            <div className="coral-restoration-card__content">
              <p className="coral-eyebrow coral-eyebrow--light"><span /> Progressive rehabilitation</p>
              <h3>Plan the next landscape<br />before the first cut.</h3>
              <p>Closure thinking informs landform design, water systems and rehabilitation from the start—not only at the end of mine life.</p>
            </div>
          </article>

          <article className="coral-impact-dashboard">
            <div className="coral-impact-dashboard__copy">
              <span className="coral-impact-dashboard__status"><i /> Operational intelligence</span>
              <h3>See performance.<br />Act earlier.</h3>
              <p>A connected dashboard brings production, HSE, fleet, environment and logistics into one decision view.</p>
              <Link className="coral-impact-dashboard__button" to="/dashboard">View Advanced Dashboard <HiArrowRight /></Link>
            </div>
            <div className="coral-dashboard-preview" aria-label="Illustrative operations dashboard preview">
              <div className="coral-dashboard-preview__header"><span>Coral command view</span><small>Live overview</small></div>
              <div className="coral-dashboard-preview__metric"><small>Operating pulse</small><strong>On plan</strong><span>Integrated shift performance</span></div>
              <div className="coral-dashboard-preview__trend" aria-hidden="true">
                <svg viewBox="0 0 260 72" preserveAspectRatio="none">
                  <defs><linearGradient id="impactTrendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ef6a52" stopOpacity=".32" /><stop offset="1" stopColor="#ef6a52" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0 60 C30 57 42 42 67 46 S101 61 126 40 S162 25 188 31 S225 17 260 12 L260 72 L0 72 Z" fill="url(#impactTrendFill)" />
                  <path d="M0 60 C30 57 42 42 67 46 S101 61 126 40 S162 25 188 31 S225 17 260 12" fill="none" stroke="#ff8a72" strokeWidth="2" />
                </svg>
                <span>Shift start</span><span>Current</span>
              </div>
              <div className="coral-dashboard-preview__rows">
                {dashboardRows.map((row) => (
                  <div className="coral-dashboard-row" key={row.label}>
                    <div><span>{row.label}</span><strong>{row.value}</strong></div>
                    <i><b style={{ width: row.width }} /></i>
                  </div>
                ))}
              </div>
              <div className="coral-dashboard-preview__footer"><span>Mine</span><span>Fleet</span><span>ESG</span><span>Port</span></div>
            </div>
          </article>
        </div>

        <div className="coral-impact__footer">
          <p className="coral-impact__note">Illustrative dashboard indicators shown. Verified project metrics can be connected to the live dashboard.</p>
          <Link to="/sustainability">Explore our sustainability approach <HiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

export default Impact;
