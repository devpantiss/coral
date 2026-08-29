import { Link } from "react-router-dom";
import { HiArrowRight, HiArrowUpRight, HiChevronDown, HiMapPin, HiOutlineArrowPath, HiOutlineGlobeAsiaAustralia, HiOutlineShieldCheck } from "react-icons/hi2";
import Impact from "../components/Homepage/Impact";
import WhatWeDoSlider from "../components/Homepage/WhatWeDoSlider";
import EcoMineTourism from "../components/Homepage/EcoMineTourism";
import OperationalAreasMap from "../components/Homepage/OperationalAreasMap";
import ImpactPrelude from "../components/Homepage/ImpactPrelude";
import PublicHeader from "../components/common/PublicSite/PublicHeader";
import PublicFooter from "../components/common/PublicSite/PublicFooter";

const operatingSteps = [
  ["Discover", "Resource evaluation & modelling"], ["Develop", "Planning & mine infrastructure"], ["Operate", "Safe, efficient production"], ["Move", "Integrated multimodal logistics"], ["Deliver", "Reliable port-to-customer supply"],
];

const commitments = [
  { icon: HiOutlineShieldCheck, title: "Safety by design", text: "Risk controls are engineered into every plan, shift and movement—not added as an afterthought." },
  { icon: HiOutlineArrowPath, title: "Progressive reclamation", text: "Land and water stewardship begin alongside operations, supporting responsible closure outcomes." },
  { icon: HiOutlineGlobeAsiaAustralia, title: "Shared local value", text: "Local employment, resilient supply chains and transparent community engagement shape how we grow." },
];

function Hero() {
  return <section className="coral-hero" id="top"><video className="coral-hero__image" autoPlay loop muted playsInline poster="/coral/coral-mine-hero.png" aria-label="Open-cast mining operation"><source src="/hero_bg.mp4" type="video/mp4" /></video><div className="coral-hero__shade" /><PublicHeader overlay /><div className="coral-shell coral-hero__content"><p className="coral-eyebrow coral-eyebrow--light"><span /> Mine Developer &amp; Operator</p><h1>Building mines.<br /><em>Moving progress.</em></h1><p className="coral-hero__lede">We develop and operate mineral assets—and connect them to markets through integrated logistics and shipping.</p><div className="coral-hero__actions"><Link className="coral-button coral-button--primary" to="/capabilities">Explore our capabilities <HiArrowRight /></Link><Link className="coral-button coral-button--dashboard" to="/dashboard">View Dashboard <HiArrowUpRight /></Link><Link className="coral-button coral-button--ghost" to="/about">Discover Coral</Link></div></div><a className="coral-scroll" href="#what-we-do"><span>Scroll to explore</span><HiChevronDown /></a><div className="coral-hero__rail" aria-hidden="true"><span>DEVELOP</span><i /><span>OPERATE</span><i /><span>DELIVER</span></div></section>;
}

function HomePage() {
  return <main className="coral-site"><Hero />
    <WhatWeDoSlider />
    <section className="coral-proof" aria-label="Our operating principles"><div className="coral-shell coral-proof__grid"><div><strong>360°</strong><span>Integrated capability</span></div><div><strong>24/7</strong><span>Operational discipline</span></div><div><strong>Pit → Port</strong><span>Connected delivery</span></div><div><strong>Zero compromise</strong><span>On safety &amp; integrity</span></div></div></section>
    <EcoMineTourism />
    <OperationalAreasMap />
    <ImpactPrelude />
    <Impact />
    <section className="coral-model" id="model"><div className="coral-model__image-wrap"><img src="/coral/coral-port-logistics.png" alt="Covered conveyor and bulk carrier at a mineral port" loading="lazy" /><div className="coral-model__badge"><HiMapPin /><span>Mine to market<br /><strong>One connected system</strong></span></div></div><div className="coral-model__content"><p className="coral-eyebrow coral-eyebrow--light"><span /> Our operating model</p><h2>Connected from<br />resource to customer.</h2><p>Fewer handoffs. Better visibility. Stronger outcomes. Our integrated model connects technical mine planning with production, evacuation and port delivery.</p><ol>{operatingSteps.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><small>{text}</small></div></li>)}</ol></div></section>
    <section className="coral-responsibility" id="responsibility"><div className="coral-shell"><div className="coral-section-head coral-section-head--center"><div><p className="coral-eyebrow"><span /> Responsible by design</p><h2>Performance that<br />outlives the mine.</h2></div><p>For us, responsible mining is an operating discipline—measured in safer workplaces, resilient ecosystems and stronger communities.</p></div><div className="coral-commitment-grid">{commitments.map((item) => { const Icon = item.icon; return <article key={item.title}><Icon /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></div></section>
    <section className="coral-cta" id="contact"><div className="coral-shell coral-cta__inner"><div><p className="coral-eyebrow coral-eyebrow--light"><span /> Build with Coral</p><h2>Let’s move your<br />project forward.</h2></div><div><p>From early-stage mine development to operating partnerships and mineral logistics, we’re ready to start the conversation.</p><Link className="coral-button coral-button--light" to="/contact">Start a conversation <HiArrowUpRight /></Link></div></div></section>
    <PublicFooter />
  </main>;
}

export default HomePage;
