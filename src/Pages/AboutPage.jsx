import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCheck,
  HiOutlineBuildingOffice2,
  HiOutlineChartBarSquare,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineLightBulb,
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const operatingChain = [
  ["Discover", "Resource evaluation, geology and feasibility"],
  ["Develop", "Approvals, planning and mine infrastructure"],
  ["Operate", "Production, HEMM and performance systems"],
  ["Move", "Processing, dispatch and multimodal logistics"],
  ["Restore", "Progressive rehabilitation and closure"],
];

const principles = [
  { icon: HiOutlineWrenchScrewdriver, title: "Execution discipline", text: "Detailed plans become controlled field execution through clear standards, ownership and shift-level performance management." },
  { icon: HiOutlineShieldCheck, title: "Safety by design", text: "Critical-risk controls, competent people and visible leadership are built into how every activity is planned and performed." },
  { icon: HiOutlineScale, title: "Integrity in action", text: "Transparent reporting, responsible decisions and respect for commitments guide every stakeholder relationship." },
  { icon: HiOutlineLightBulb, title: "Continuous improvement", text: "Data, frontline insight and engineering discipline help us improve productivity without compromising people or place." },
];

const stakeholders = [
  { icon: HiOutlineBuildingOffice2, title: "Resource owners", text: "Clearer accountability, fewer interfaces and an operating system aligned to asset objectives." },
  { icon: HiOutlineUsers, title: "Our people", text: "Role-ready training, safe workplaces, meaningful responsibility and pathways to grow." },
  { icon: HiOutlineGlobeAsiaAustralia, title: "Communities & environment", text: "Local participation, transparent engagement and lifecycle stewardship of land and water." },
  { icon: HiOutlineChartBarSquare, title: "Customers & partners", text: "Predictable quality, visible material flow and dependable mine-to-market delivery." },
];

function AboutPage() {
  return <InnerPage eyebrow="About Coral" title="Built to develop." accent="Ready to operate." intro="Coral is an integrated Mine Developer and Operator connecting technical mine development, production systems, equipment, people and mineral logistics." image="/coral/impact-safety-team.jpg" imageAlt="Mining professionals reviewing field operations">
    <section className="coral-page-intro coral-shell coral-about-intro"><div><p className="coral-eyebrow"><span /> Who we are</p><h2>Owner-level thinking.<br />Operator-level discipline.</h2></div><div><p className="coral-page-lead">We help turn mineral potential into safe, productive and responsibly managed mining operations.</p><p>As an MDO partner, Coral brings the capabilities required across the asset lifecycle into one coordinated delivery model. Technical planning stays connected to field execution, equipment performance, workforce capability, material movement and closure outcomes.</p></div></section>

    <section className="coral-about-snapshot" aria-label="Coral operating model overview"><div className="coral-shell"><article><strong>360°</strong><span>Lifecycle capability</span><small>Development to closure</small></article><article><strong>24/7</strong><span>Operating discipline</span><small>Shift-level control</small></article><article><strong>Pit → Port</strong><span>Connected delivery</span><small>Mine to customer</small></article><article><strong>One team</strong><span>Clear accountability</span><small>Fewer handoffs</small></article></div></section>

    <section className="coral-about-mdo"><div className="coral-about-mdo__media"><img src="/coral/coral-mine-hero.png" alt="Open-cast mining operation" loading="lazy" /><span aria-hidden="true" /><div><small>Our role</small><strong>Mine Developer<br />&amp; Operator</strong></div></div><div className="coral-about-mdo__content"><p className="coral-eyebrow coral-eyebrow--light"><span /> The MDO model</p><h2>One system from resource to customer.</h2><p>An effective MDO does more than execute a mining plan. It coordinates the technical, operational, commercial and stakeholder systems that determine whether the plan succeeds.</p><ol>{operatingChain.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><small>{text}</small></div><HiCheck aria-hidden="true" /></li>)}</ol><Link to="/capabilities">Explore our capabilities <HiArrowRight aria-hidden="true" /></Link></div></section>

    <section className="coral-about-purpose"><div className="coral-shell"><header><p className="coral-eyebrow"><span /> Purpose & direction</p><h2>Performance with<br />a longer horizon.</h2></header><div className="coral-about-purpose__grid"><article><span>01 / Purpose</span><h3>Develop resources that move regions forward.</h3><p>Build mining operations that create dependable mineral supply, skilled employment, resilient local value chains and responsible land outcomes.</p></article><article><span>02 / Ambition</span><h3>Set a higher standard for integrated mine delivery.</h3><p>Be the partner resource owners trust to connect production performance with safety, transparency and lifecycle responsibility.</p></article></div></div></section>

    <section className="coral-page-section coral-shell coral-about-principles"><div className="coral-page-heading"><p className="coral-eyebrow"><span /> How we work</p><h2>Principles that travel<br />to every site.</h2></div><div className="coral-page-card-grid coral-page-card-grid--four">{principles.map((item) => { const Icon = item.icon; return <article key={item.title}><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></section>

    <section className="coral-about-responsibility"><div className="coral-shell"><div className="coral-about-responsibility__copy"><p className="coral-eyebrow coral-eyebrow--light"><span /> Responsible by design</p><h2>Value shared across the operating system.</h2><p>Our decisions affect more than production. We consider the people, communities, customers and natural systems connected to every mine.</p><Link to="/sustainability">Our sustainability approach <HiArrowRight aria-hidden="true" /></Link></div><div className="coral-about-responsibility__grid">{stakeholders.map((item) => { const Icon = item.icon; return <article key={item.title}><Icon aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>; })}</div></div></section>

    <section className="coral-about-cta"><div className="coral-shell"><div><span>Build with Coral</span><h2>A mine needs more than a contractor. It needs an operating partner.</h2></div><Link to="/contact">Start a conversation <HiArrowRight aria-hidden="true" /></Link></div></section>
  </InnerPage>;
}

export default AboutPage;
