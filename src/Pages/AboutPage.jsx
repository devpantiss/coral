import { HiOutlineEye, HiOutlineFlag, HiOutlineScale } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const principles = [
  { icon: HiOutlineFlag, title: "Built to deliver", text: "We combine owner-level accountability with the execution discipline required to move complex projects forward." },
  { icon: HiOutlineScale, title: "Integrity in action", text: "Clear governance, transparent reporting and responsible decisions guide every partnership and operation." },
  { icon: HiOutlineEye, title: "Long-view thinking", text: "We plan for the full asset life—from first studies through progressive rehabilitation and closure." },
];

function AboutPage() {
  return <InnerPage eyebrow="Company" title="Operators by discipline." accent="Partners by design." intro="Coral brings development, operations and market connectivity together under one accountable MDO platform." image="/coral/impact-safety-team.jpg" imageAlt="Coral mine operations team reviewing field data">
    <section className="coral-page-intro coral-shell"><div><p className="coral-eyebrow"><span /> Who we are</p><h2>Mining capability built around accountability.</h2></div><div><p className="coral-page-lead">We work alongside resource owners to turn mineral potential into safe, productive and resilient operations.</p><p>Our integrated teams connect technical planning, project development, production systems, workforce capability and mineral logistics. That continuity creates clearer decisions, fewer handoffs and stronger performance across the mine lifecycle.</p></div></section>
    <section className="coral-page-dark"><div className="coral-shell coral-page-split"><div><p className="coral-eyebrow coral-eyebrow--light"><span /> Our purpose</p><h2>Develop resources that move regions forward.</h2></div><div className="coral-page-quote">“Reliable production and responsible development are not competing goals. The best operating systems deliver both.”</div></div></section>
    <section className="coral-page-section coral-shell"><div className="coral-page-heading"><p className="coral-eyebrow"><span /> How we work</p><h2>Principles that travel<br />to every site.</h2></div><div className="coral-page-card-grid">{principles.map((item) => { const Icon = item.icon; return <article key={item.title}><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></section>
  </InnerPage>;
}

export default AboutPage;
