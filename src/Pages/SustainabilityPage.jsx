import { HiOutlineCloud, HiOutlineShieldCheck, HiOutlineUsers, HiOutlineScale } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const pillars = [
  { icon: HiOutlineShieldCheck, title: "Safe work", text: "Critical-risk controls, visible leadership and learning systems built into daily operations." },
  { icon: HiOutlineCloud, title: "Environmental care", text: "Water, land, biodiversity and emissions managed through lifecycle planning and field assurance." },
  { icon: HiOutlineUsers, title: "Shared value", text: "Local skills, procurement and community partnerships designed for durable regional benefit." },
  { icon: HiOutlineScale, title: "Responsible governance", text: "Clear standards, transparent performance and accountable decision-making across the value chain." },
];

function SustainabilityPage() {
  return <InnerPage eyebrow="Sustainability" title="Responsible from" accent="the first cut." intro="Environmental and social performance designed into the operating model—not managed around it." image="/coral/impact-land-restoration.jpg" imageAlt="Progressively rehabilitated mine landscape">
    <section className="coral-page-intro coral-shell"><div><p className="coral-eyebrow"><span /> Our commitment</p><h2>Performance that extends beyond production.</h2></div><div><p className="coral-page-lead">A mine earns trust through what it protects, restores and leaves behind.</p><p>We translate that responsibility into clear operating controls, measurable outcomes and transparent engagement throughout the asset lifecycle.</p></div></section>
    <section className="coral-page-section coral-shell"><div className="coral-page-card-grid coral-page-card-grid--four">{pillars.map((pillar) => { const Icon = pillar.icon; return <article key={pillar.title}><Icon /><h3>{pillar.title}</h3><p>{pillar.text}</p></article>; })}</div></section>
    <section className="coral-sustainability-feature"><img src="/coral/impact-land-restoration.jpg" alt="Mine rehabilitation and water stewardship" loading="lazy" /><div><p className="coral-eyebrow coral-eyebrow--light"><span /> Progressive rehabilitation</p><h2>Restore while the mine is still operating.</h2><p>Closure landforms, drainage, soil systems and native planting are more effective when rehabilitation advances alongside production.</p></div></section>
  </InnerPage>;
}

export default SustainabilityPage;
