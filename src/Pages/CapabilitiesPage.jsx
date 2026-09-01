import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiArrowUpRight, HiCheck, HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import InnerPage from "../components/common/PublicSite/InnerPage";
import { whatWeDoServices } from "../data/whatWeDoServices";
import { integratedSolutions } from "../data/integratedSolutions";

function CapabilitiesPage() {
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const solutionsSlider = useRef(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(motionPreference.matches);
    updatePreference();
    motionPreference.addEventListener("change", updatePreference);
    return () => motionPreference.removeEventListener("change", updatePreference);
  }, []);

  return <InnerPage eyebrow="Capabilities" title="One operating system." accent="Every stage of mining." intro="Integrated expertise spanning land, people, equipment, production, processing, logistics and responsible closure." image="/coral/coral-mine-hero.png" imageAlt="Terraced open-cast mine at sunrise">
    <section className="coral-page-intro coral-shell coral-capabilities-intro"><div><p className="coral-eyebrow"><span /> Integrated execution</p><h2>Fewer handoffs. Clearer ownership.</h2></div><div><p className="coral-page-lead">Coral aligns the complete operating chain behind one plan and one performance framework.</p><p>Engage us for a focused specialist mandate or connect our capabilities into a complete mine-to-market delivery system.</p></div></section>

    <section className="coral-capabilities-expertise" aria-labelledby="expertise-title"><div className="coral-shell">
      <header className="coral-capabilities-heading"><div><p className="coral-eyebrow"><span /> Our expertise</p><h2 id="expertise-title">Four foundations.<br />One mining partner.</h2></div><p>Core capabilities that prepare assets, equip operations, build competent teams and create productive post-mining outcomes.</p></header>
      <div className="coral-capabilities-expertise__grid">{whatWeDoServices.map((service) => { const Icon = service.icon; return <Link to={`/services/${service.slug}`} key={service.number}>
        <img src={service.image} alt="" loading="lazy" /><span className="coral-capabilities-expertise__shade" aria-hidden="true" />
        <header><span>{service.number}</span><Icon aria-hidden="true" /></header>
        <div><small>{service.eyebrow}</small><h3>{service.title}</h3><p>{service.cardDescription}</p><strong>Explore expertise <HiArrowUpRight aria-hidden="true" /></strong></div>
      </Link>; })}</div>
    </div></section>

    <section className="coral-capabilities-solutions" aria-labelledby="integrated-solutions-title"><div className="coral-shell">
      <header className="coral-capabilities-solutions__head"><div><p className="coral-eyebrow coral-eyebrow--light"><span /> Integrated solutions</p><h2 id="integrated-solutions-title">Capability across the<br /><em>complete mine lifecycle.</em></h2></div><div className="coral-capabilities-solutions__stats"><div><strong>06</strong><span>Solution verticals</span></div><div><strong>30</strong><span>Core services</span></div><div><strong>360°</strong><span>Lifecycle coverage</span></div></div></header>
      <nav className="coral-capabilities-solutions__nav" aria-label="Choose a solution slide">{integratedSolutions.map((solution, index) => <button className={activeSolutionIndex === index ? "is-active" : ""} type="button" onClick={() => solutionsSlider.current?.slideTo(index)} aria-current={activeSolutionIndex === index ? "true" : undefined} key={solution.number}><span>{solution.number}</span><strong>{solution.shortTitle}</strong></button>)}</nav>
      <Swiper className="coral-capabilities-solutions__slider" id="integrated-solutions-slider" modules={[A11y, Autoplay, Keyboard]} slidesPerView={1} spaceBetween={18} speed={650} autoHeight rewind autoplay={prefersReducedMotion ? false : { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }} keyboard={{ enabled: true }} onSwiper={(swiper) => { solutionsSlider.current = swiper; }} onSlideChange={(swiper) => setActiveSolutionIndex(swiper.activeIndex)}>{integratedSolutions.map((solution) => { const Icon = solution.icon; return <SwiperSlide className="coral-capabilities-solutions__slide" key={solution.number}><article id={`capability-solution-${solution.number}`}>
        <div className="coral-capabilities-solution__media"><img src={solution.image} alt="" loading="lazy" /><span aria-hidden="true" /><header><div><Icon aria-hidden="true" /><small>{solution.label}</small></div><strong>{solution.number}</strong></header><h3>{solution.title}</h3></div>
        <div className="coral-capabilities-solution__body"><div className="coral-capabilities-solution__chapter"><span>Solution chapter</span><strong>{solution.number} / {String(integratedSolutions.length).padStart(2, "0")}</strong></div><p>{solution.summary}</p><div className="coral-capabilities-solution__outcomes"><span>Designed outcomes</span><div>{solution.outcomes.map((outcome) => <strong key={outcome}>{outcome}</strong>)}</div></div><div className="coral-capabilities-solution__journey" aria-label={`${solution.title} delivery pathway`}>{solution.journey.map((step, index) => <span key={step}><small>{String(index + 1).padStart(2, "0")}</small>{step}</span>)}</div>
        <details onToggle={() => requestAnimationFrame(() => solutionsSlider.current?.updateAutoHeight(300))}><summary><span>View detailed scope</span><small>{String(solution.services.length).padStart(2, "0")} services</small><HiChevronDown aria-hidden="true" /></summary><div>{solution.services.map(([title, description]) => <div key={title}><HiCheck aria-hidden="true" /><p><strong>{title}</strong><span>{description}</span></p></div>)}</div></details></div>
      </article></SwiperSlide>; })}</Swiper>
      <div className="coral-capabilities-solutions__controls"><div><span>{String(activeSolutionIndex + 1).padStart(2, "0")}</span><i><b style={{ width: `${((activeSolutionIndex + 1) / integratedSolutions.length) * 100}%` }} /></i><small>{String(integratedSolutions.length).padStart(2, "0")}</small></div><p>Swipe or use arrow keys to explore each solution</p><div><button type="button" onClick={() => solutionsSlider.current?.slidePrev()} disabled={activeSolutionIndex === 0} aria-label="Previous solution"><HiChevronLeft /></button><button type="button" onClick={() => solutionsSlider.current?.slideNext()} disabled={activeSolutionIndex === integratedSolutions.length - 1} aria-label="Next solution"><HiChevronRight /></button></div></div>
    </div></section>

    <section className="coral-capabilities-model"><div className="coral-shell"><div><p className="coral-eyebrow"><span /> Flexible engagement</p><h2>Specialist scope or<br />integrated mandate.</h2></div><div><p>Our model scales around the asset: one focused capability where support is needed, or one accountable system across development, operations and delivery.</p><Link to="/contact">Discuss your requirement <HiArrowRight aria-hidden="true" /></Link></div></div></section>
    <section className="coral-page-band"><div className="coral-shell"><span>Technology-enabled operations</span><strong>Planning · Dispatch · Fleet · HSE · ESG · Logistics</strong></div></section>
  </InnerPage>;
}

export default CapabilitiesPage;
