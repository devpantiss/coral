import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiArrowDown, HiArrowUpRight, HiOutlineMap, HiOutlineBolt, HiOutlineTruck, HiOutlineCog6Tooth, HiOutlineCube, HiOutlineBuildingOffice2, HiOutlineGlobeAsiaAustralia, HiOutlineShieldCheck, HiOutlineUsers, HiOutlineScale, HiOutlineCheckCircle } from "react-icons/hi2";
import PublicHeader from "../components/common/PublicSite/PublicHeader";
import PublicFooter from "../components/common/PublicSite/PublicFooter";
import HeroVideo from "../components/common/PublicSite/HeroVideo";
import { AboutHeading, EditorialImage } from "../components/About/AboutPrimitives";
import MiningLifecycle from "../components/About/MiningLifecycle";
import MiningTechnology from "../components/About/MiningTechnology";
import AboutCredibility from "../components/About/AboutCredibility";
import { capabilityItems, companySnapshot, regionalProfiles, safetyAreas, esgPillars, communityAreas } from "../data/aboutContent";
import { operationalStates } from "../data/operationalStates";
import "./AboutPage.css";

const capabilityIcons = [HiOutlineMap, HiOutlineBuildingOffice2, HiOutlineBolt, HiOutlineTruck, HiOutlineCog6Tooth, HiOutlineCube, HiOutlineCog6Tooth, HiOutlineCube, HiOutlineTruck, HiOutlineBuildingOffice2, HiOutlineGlobeAsiaAustralia, HiOutlineGlobeAsiaAustralia];
const esgIcons = [HiOutlineGlobeAsiaAustralia, HiOutlineUsers, HiOutlineScale];

export default function AboutPage() {
  const page = useRef(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("mdo-in-view"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    page.current.querySelectorAll(".mdo-heading, .mdo-timeline li").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="mdo-about" ref={page}>
    <PublicHeader />
    <section className="mdo-hero" aria-labelledby="mdo-hero-title">
      <HeroVideo src="/about_hero.mp4" poster="/coral/coral-mine-hero.png" />
      <div className="coral-shell mdo-hero__content"><p className="coral-eyebrow"><span /> About us / Mine Developer &amp; Operator</p><h1 id="mdo-hero-title">Engineering the future<br />of <em>responsible mining.</em></h1><p>Integrated mine development and operational expertise delivering safer, smarter and more efficient mining solutions.</p><div className="mdo-actions"><Link className="coral-button coral-button--primary" to="/capabilities">Explore our capabilities <HiArrowUpRight aria-hidden="true" /></Link><Link className="coral-button coral-button--ghost" to="/contact">Partner with Coral <HiArrowUpRight aria-hidden="true" /></Link></div></div>
      <div className="coral-shell mdo-hero__bottom"><a href="#mdo-overview"><HiArrowDown aria-hidden="true" /> Discover Coral</a><span>Develop / Operate / Restore</span></div>
    </section>

    <nav className="mdo-section-nav" aria-label="About page sections"><div className="coral-shell">{[["Our company", "mdo-overview"], ["Mining lifecycle", "mdo-lifecycle"], ["Capabilities", "mdo-capabilities"], ["Safety & ESG", "mdo-safety-title"], ["Our teams", "mdo-leadership-title"]].map(([label, id]) => <a key={id} href={`#${id}`}>{label}<HiArrowDown aria-hidden="true" /></a>)}</div></nav>

    <section className="mdo-section" id="mdo-overview" aria-labelledby="mdo-overview-title"><div className="coral-shell mdo-overview">
      <EditorialImage src="/coral/mining-workforce-team.jpg" alt="Mining professionals reviewing field operations" caption="People, engineering and execution · Illustrative site image" />
      <div><AboutHeading id="mdo-overview-title" eyebrow="Who we are" title="Owner-level thinking." accent="Operator-level discipline." /><p className="mdo-lead">Coral connects the expertise required to develop, operate and responsibly close a mine.</p><p>Our MDO approach keeps technical planning connected to field execution, equipment performance, workforce capability and mineral logistics.</p><p>One coordinated operating model. Clear responsibility at every interface. A longer view of the value a mine can create.</p><dl className="mdo-overview__metrics"><div><dt>States on our operational map</dt><dd>{String(operationalStates.length).padStart(2, "0")}</dd></div><div><dt>Districts in the mapped network</dt><dd>{operationalStates.reduce((total, state) => total + state.districts.length, 0)}</dd></div></dl><p className="mdo-overview__regions">{operationalStates.map(state => state.name).join(" · ")}</p><Link className="mdo-text-link" to="/#operational-areas">Explore our operational footprint <HiArrowUpRight aria-hidden="true" /></Link></div>
    </div></section>

    <MiningLifecycle />

    <section className="mdo-section mdo-sand" aria-labelledby="mdo-scale-title"><div className="coral-shell"><AboutHeading id="mdo-scale-title" eyebrow="Coral at a glance" title="Regional reach." accent="Integrated capability." description="Our mapped network spans Odisha, Jharkhand and Chhattisgarh, with capabilities from mine planning to reclamation." /><dl className="mdo-statistics">{companySnapshot.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></section>

    <section className="mdo-section" id="mdo-capabilities" aria-labelledby="mdo-capabilities-title"><div className="coral-shell"><AboutHeading id="mdo-capabilities-title" eyebrow="Our capabilities" title="Technical depth." accent="Field-ready execution." description="An integrated capability framework spanning the complete mine lifecycle." /><div className="mdo-capabilities">{capabilityItems.map(([title, text], index) => { const Icon = capabilityIcons[index]; return <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>; })}</div><Link className="mdo-text-link" to="/capabilities">See our integrated solutions <HiArrowUpRight aria-hidden="true" /></Link></div></section>

    <section className="mdo-section mdo-sand" aria-labelledby="mdo-projects-title"><div className="coral-shell"><AboutHeading id="mdo-projects-title" eyebrow="Our operating regions" title="Connected regions." accent="Local understanding." description="Explore the regional network behind Coral’s mine development and mineral logistics approach." /><div className="mdo-projects">{regionalProfiles.map(profile => <article key={profile.title}><EditorialImage src={profile.image} alt="Illustrative mining and mineral logistics landscape" caption={`${profile.region} · Illustrative image`} /><div className="mdo-projects__body"><p>{profile.region}</p><h3>{profile.title}</h3><p>{profile.description}</p><dl><div><dt>Districts in our network</dt><dd>{profile.districts}</dd></div></dl></div></article>)}</div><Link className="mdo-text-link" to="/#operational-areas">Explore our operational footprint <HiArrowUpRight aria-hidden="true" /></Link></div></section>

    <MiningTechnology />

    <section className="mdo-section mdo-safety" aria-labelledby="mdo-safety-title"><div className="coral-shell mdo-safety__layout"><div><p className="coral-eyebrow"><span /> Safety first</p><h2 id="mdo-safety-title">Zero Harm.<br /><em>Every decision.</em></h2><p className="mdo-lead">A commitment that starts before the shift.</p><p>Safe work depends on competent people, effective controls and the confidence to stop and correct. Safety is a planning responsibility as much as an operating discipline.</p><ul>{safetyAreas.map(area => <li key={area}><HiOutlineShieldCheck aria-hidden="true" />{area}</li>)}</ul><div className="mdo-safety__metric"><strong>Assess. Brief. Protect.</strong><span>Task risk assessment, pre-shift briefings and equipment checks guide our approach to safe work.</span></div></div><EditorialImage src="/coral/safety-training-session.jpg" alt="Mining workforce safety training session with simulator equipment" caption="Zero Harm is our commitment, not a claimed safety result." /></div></section>

    <section className="mdo-section mdo-sand" aria-labelledby="mdo-esg-title"><div className="coral-shell"><AboutHeading id="mdo-esg-title" eyebrow="Sustainability & ESG" title="Responsible through" accent="the life of the mine." description="Consider the land, the people and the decisions that connect mining to its wider community." /><EditorialImage className="mdo-esg__landscape" src="/coral/mine-rehabilitation.jpg" alt="Rehabilitated mine landscape with native planting and water-retention pond" caption="Progressive rehabilitation · Illustrative landscape" /><div className="mdo-esg">{esgPillars.map((pillar, index) => { const Icon = esgIcons[index]; return <article key={pillar.title}><Icon aria-hidden="true" /><p>{pillar.title}</p><h3>{pillar.subtitle}</h3><ul>{pillar.items.map(item => <li key={item}>{item}</li>)}</ul></article>; })}</div><Link className="mdo-text-link" to="/sustainability">Our approach to sustainability <HiArrowUpRight aria-hidden="true" /></Link></div></section>

    <AboutCredibility />

    <section className="mdo-section mdo-community mdo-dark" aria-labelledby="mdo-community-title"><div className="coral-shell mdo-community__layout"><EditorialImage src="/coral/eco-mine-tourism-poster.jpg" alt="Illustrative landscape for post-mining eco-tourism" caption="Beyond extraction · Illustrative image" /><div><AboutHeading id="mdo-community-title" eyebrow="Community & social impact" title="Progress should" accent="stay with people." /><p>Local participation, meaningful skills and a future for restored land belong in the conversation about mining.</p><p>Our social-impact framework considers the needs of communities alongside the requirements of the operation.</p><ul>{communityAreas.map(area => <li key={area}><HiOutlineCheckCircle aria-hidden="true" />{area}</li>)}</ul><p>Our service framework connects operator recruitment and competency assessment with mine deployment, and considers skills and livelihoods in the transition to post-mining land use.</p></div></div></section>

    <section className="mdo-final-cta" aria-labelledby="mdo-cta-title"><div className="coral-shell"><p className="coral-eyebrow"><span /> Build with Coral</p><h2 id="mdo-cta-title">Building the future<br />of responsible mining.</h2><p>Discover how our integrated MDO capabilities can deliver safer, smarter and more efficient mining operations.</p><div className="mdo-actions"><Link className="coral-button coral-button--primary" to="/projects">Explore our projects <HiArrowUpRight aria-hidden="true" /></Link><Link className="coral-button" to="/capabilities">Explore our capabilities <HiArrowUpRight aria-hidden="true" /></Link><Link className="coral-button" to="/contact">Contact us <HiArrowUpRight aria-hidden="true" /></Link></div></div></section>
    <PublicFooter />
  </main>;
}
