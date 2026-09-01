import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowDown,
  HiArrowRight,
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineBolt,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineCubeTransparent,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import PublicFooter from "../components/common/PublicSite/PublicFooter";
import PublicHeader from "../components/common/PublicSite/PublicHeader";

const fleetGroups = [
  { number: "01", icon: HiOutlineBolt, title: "Mine development", role: "Access → Benches → Infrastructure", description: "Fleet packages for opening the mine safely and establishing the operating geometry required by the approved mine plan.", outcome: "Production-ready mine access", equipment: ["Blast-hole and crawler drills", "Excavators and crawler dozers", "Graders and road-development fleet"] },
  { number: "02", icon: HiOutlineCog6Tooth, title: "Coal & ore production", role: "Fragment → Extract → Load", description: "Primary production equipment configured to geology, bench dimensions, selectivity and contracted output targets.", outcome: "Quantity, quality and stripping control", equipment: ["Surface miners and excavators", "Front-end loaders", "Production support equipment"] },
  { number: "03", icon: HiOutlineTruck, title: "HEMM & haulage", role: "Load → Haul → Dump", description: "Matched loading and transport fleets designed around payload, lead distance, gradient, road conditions and cycle time.", outcome: "Reliable material movement", equipment: ["Mining dump trucks and tippers", "Dozers and motor graders", "Fuel, lube and service vehicles"] },
  { number: "04", icon: HiOutlineCubeTransparent, title: "Processing & stockyard", role: "Crush → Screen → Handle", description: "Mobile and yard equipment supporting the controlled flow of coal and ore through processing, stacking and reclaiming.", outcome: "Consistent plant and stockyard feed", equipment: ["Wheel loaders and feeders", "Crushing and screening support", "Conveyor and stockpile equipment"] },
  { number: "05", icon: HiOutlineWrenchScrewdriver, title: "Dispatch & logistics", role: "Stockpile → Dispatch → Delivery", description: "Dispatch fleets and handling systems connecting mine output with road, rail and customer delivery requirements.", outcome: "Planned product evacuation", equipment: ["Road tippers and carriers", "Forklifts and hydra cranes", "Rail-loading support equipment"] },
  { number: "06", icon: HiOutlineShieldCheck, title: "Environment & closure", role: "Control → Restore → Monitor", description: "Specialised site fleets that control operating impacts and support progressive reclamation throughout the mine lifecycle.", outcome: "Safer, lower-impact operations", equipment: ["Water sprinklers and tankers", "Dust-control and drainage units", "Land-shaping and plantation fleet"] },
];

const fleetSelectionFactors = [
  ["Mine plan", "Production schedule, bench geometry and sequencing"],
  ["Material", "Geology, density, fragmentation and selectivity"],
  ["Haul profile", "Lead distance, gradient, rolling resistance and roads"],
  ["Operating target", "Quantity, quality, stripping ratio and shifts"],
  ["Lifecycle value", "Availability, fuel, maintenance and cost per tonne"],
];

const performanceControls = [
  ["Availability", "Planned maintenance, parts readiness and rapid defect elimination."],
  ["Utilisation", "Dispatch discipline and equipment matching that reduce idle time."],
  ["Cycle time", "Haul-road, loading and traffic controls that improve productive movement."],
  ["Payload", "Consistent loading practices that protect output and machine health."],
  ["Fuel", "Operating standards, idle management and route-level consumption visibility."],
];

const lifecycle = ["Select & size", "Mobilise", "Operate", "Maintain", "Rebuild", "Optimise"];

const operatedFleet = [
  { id: 1, name: "Volvo 460 Dumper", image: "/fleet3/volv.png", stats: [["Payload", "41T"], ["Training", "Advanced"], ["Application", "Mining"], ["Registration", "OD-02-AB-1234"], ["Asset No", "AST-460-01"], ["Engine", "ENV460P55421"]] },
  { id: 2, name: "Volvo Excavator", image: "/fleet3/ex.png", stats: [["Bucket", "2.1m³"], ["Training", "Operator"], ["Application", "Earthwork"], ["Registration", "OD-02-EX-2221"], ["Asset No", "AST-EX-02"], ["Engine", "ENEXC33219"]] },
  { id: 3, name: "Tata Prima 2830K", image: "/fleet3/prime.png", stats: [["GVW", "28T"], ["Training", "Driver"], ["Application", "Transport"], ["Registration", "OD-02-TP-7781"], ["Asset No", "AST-TP-03"], ["Engine", "ENTP55219"]] },
  { id: 4, name: "Komatsu Bulldozer", image: "/fleet3/bull.png", stats: [["Power", "215HP"], ["Training", "Operator"], ["Application", "Land Prep"], ["Registration", "OD-02-KB-4455"], ["Asset No", "AST-KB-04"], ["Engine", "ENKOM66211"]] },
  { id: 5, name: "Toyota Pneumatic Forklift", image: "/fleet3/fork.png", stats: [["Capacity", "5T"], ["Training", "Operator"], ["Application", "Logistics"], ["Registration", "OD-02-TF-8891"], ["Asset No", "AST-TF-05"], ["Engine", "ENTOY44122"]] },
  { id: 6, name: "Propel Electric Tipper", image: "/fleet3/prop.png", stats: [["Drive", "Electric"], ["Training", "Driver"], ["Application", "Mining"], ["Registration", "OD-02-PE-9901"], ["Asset No", "AST-PE-06"], ["Engine", "ENPRO88311"]] },
  { id: 7, name: "Caterpillar Haulpack", image: "/fleet3/haul-pack.png", stats: [["Payload", "90T+"], ["Training", "Expert"], ["Application", "Open Cast"], ["Registration", "OD-02-CH-6721"], ["Asset No", "AST-CH-07"], ["Engine", "ENCAT99211"]] },
  { id: 8, name: "Caterpillar Loader", image: "/fleet3/kom_loader.png", stats: [["Bucket", "5m³"], ["Training", "Operator"], ["Application", "Loading"], ["Registration", "OD-02-CL-5512"], ["Asset No", "AST-CL-08"], ["Engine", "ENLOD33211"]] },
  { id: 9, name: "Ace Hydra Crane", image: "/fleet3/hydra_crane.png", stats: [["Lift", "15T"], ["Training", "Operator"], ["Application", "Rigging"], ["Registration", "OD-02-AH-7789"], ["Asset No", "AST-AH-09"], ["Engine", "ENHYD99111"]] },
];

function FleetShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const vehicle = operatedFleet[activeIndex];

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % operatedFleet.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const changeVehicle = (direction) => setActiveIndex((current) => (current + direction + operatedFleet.length) % operatedFleet.length);

  return <section className="coral-fleet-showcase" aria-labelledby="operated-fleet-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <img className="coral-fleet-showcase__background" src="/coral/coral-mine-hero.png" alt="" loading="lazy" aria-hidden="true" />
    <div className="coral-fleet-showcase__shade" aria-hidden="true" />
    <div className="coral-fleet-showcase__top">
      <div><p className="coral-eyebrow coral-eyebrow--light"><span /> Fleet register</p><h2 id="operated-fleet-title">Our operating fleet</h2></div>
      <dl>{vehicle.stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>

    <div className="coral-fleet-showcase__tabs" role="tablist" aria-label="Select fleet equipment">
      {operatedFleet.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`View ${item.name}`} className={index === activeIndex ? "is-active" : ""} onClick={() => setActiveIndex(index)}><img src={item.image} alt="" loading="lazy" /><span>{String(index + 1).padStart(2, "0")}</span></button>)}
    </div>

    <div className="coral-fleet-showcase__stage" role="tabpanel" aria-live="polite">
      <div className="coral-fleet-showcase__identity" key={`title-${vehicle.id}`}><span>{String(activeIndex + 1).padStart(2, "0")}</span><h3>{vehicle.name}</h3></div>
      <div className="coral-fleet-showcase__dust" aria-hidden="true" />
      <img key={vehicle.image} className="coral-fleet-showcase__machine" src={vehicle.image} alt={vehicle.name} />
    </div>

    <div className="coral-fleet-showcase__footer">
      <div className="coral-fleet-showcase__progress"><span key={activeIndex} style={{ animationPlayState: paused ? "paused" : "running" }} /></div>
      <p><strong>{String(activeIndex + 1).padStart(2, "0")}</strong> / {String(operatedFleet.length).padStart(2, "0")}</p>
      <div><button type="button" onClick={() => changeVehicle(-1)} aria-label="Previous vehicle"><HiChevronLeft /></button><button type="button" onClick={() => changeVehicle(1)} aria-label="Next vehicle"><HiChevronRight /></button></div>
    </div>
  </section>;
}

function FleetPage() {
  return <main className="coral-inner-page coral-fleet-page">
    <section className="coral-fleet-hero" aria-labelledby="fleet-hero-title">
      <video className="coral-fleet-hero__video" autoPlay muted loop playsInline poster="/coral/coral-mine-hero.png" aria-label="Coral mining fleet operating at an open-cast mine">
        <source src="/fleet_hero.mp4" type="video/mp4" />
      </video>
      <div className="coral-fleet-hero__shade" aria-hidden="true" />
      <div className="coral-fleet-hero__frame" aria-hidden="true" />
      <PublicHeader overlay />

      <div className="coral-shell coral-fleet-hero__content">
        <p className="coral-fleet-hero__eyebrow"><span>Coral operating fleet</span><i /><span>Mine-ready systems</span></p>
        <h1 id="fleet-hero-title">Built to move<br /><em>the earth.</em></h1>
        <p className="coral-fleet-hero__lede">Production and support fleets engineered around the mine plan, maintained for availability and managed for every productive tonne.</p>
        <a className="coral-fleet-hero__explore" href="#fleet-content"><span>Explore the fleet</span><HiArrowDown aria-hidden="true" /></a>
      </div>

      <div className="coral-fleet-hero__rail" aria-label="Fleet operating model">
        <div><small>System</small><strong>Fleet operations</strong></div>
        <div><small>Coverage</small><strong>Production · Support</strong></div>
        <div><small>Control</small><strong>Plan · Dispatch · Maintain</strong></div>
        <span aria-hidden="true">01 / Fleet</span>
      </div>
    </section>

    <div id="fleet-content">
      <section className="coral-page-intro coral-shell coral-fleet-intro"><div><p className="coral-eyebrow"><span /> Fleet capability</p><h2>Equipment is only productive as a system.</h2></div><div><p className="coral-page-lead">We align machine selection, operators, workshops, parts and dispatch around the work the mine must deliver.</p><p>Coral’s fleet model connects equipment capacity with material characteristics, haul profiles, shift plans and lifecycle economics—creating a controlled path from machine availability to cost per tonne.</p></div></section>

      <FleetShowcase />

    <section className="coral-fleet-register" aria-labelledby="fleet-register-title"><div className="coral-shell"><header className="coral-fleet-register__head"><div><p className="coral-eyebrow"><span /> Operating segments</p><h2 id="fleet-register-title">Built for every<br />operating segment.</h2></div><p>From first access to final rehabilitation, each fleet is configured around the workstream it must deliver—not treated as a standalone equipment list.</p></header><div className="coral-fleet-register__grid">{fleetGroups.map((group) => { const Icon = group.icon; return <article key={group.number}><header><span>{group.number}</span><Icon aria-hidden="true" /></header><small>{group.role}</small><h3>{group.title}</h3><p>{group.description}</p><div className="coral-fleet-register__outcome"><small>Fleet contribution</small><strong>{group.outcome}</strong></div><ul>{group.equipment.map((item) => <li key={item}><HiCheck aria-hidden="true" />{item}</li>)}</ul></article>; })}</div><div className="coral-fleet-register__logic"><header><span>Fleet selection framework</span><p>The machine is selected only after the operating system is understood.</p></header><div>{fleetSelectionFactors.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{description}</small></article>)}</div></div></div></section>

    <section className="coral-fleet-system"><div className="coral-fleet-system__media"><img src="/coral/impact-safety-team.jpg" alt="Mining operations team managing fleet performance" loading="lazy" /><span aria-hidden="true" /><div><HiOutlineChartBarSquare aria-hidden="true" /><small>Fleet control</small><strong>Plan · Dispatch · Maintain</strong></div></div><div className="coral-fleet-system__content"><p className="coral-eyebrow coral-eyebrow--light"><span /> Performance system</p><h2>From machine hours<br />to productive tonnes.</h2><p>Fleet performance is managed through connected operational measures—not isolated equipment statistics.</p><div>{performanceControls.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><small>{description}</small></div></article>)}</div></div></section>

    <section className="coral-fleet-lifecycle"><div className="coral-shell"><header><div><p className="coral-eyebrow"><span /> Equipment lifecycle</p><h2>Care beyond the shift.</h2></div><p>Lifecycle planning protects availability today while preparing the fleet for the operating years ahead.</p></header><ol>{lifecycle.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /><strong>{stage}</strong></li>)}</ol></div></section>

      <section className="coral-fleet-cta"><div className="coral-shell"><div><span>Fleet partnership</span><h2>Build the right fleet around your production plan.</h2></div><Link to="/contact">Discuss your requirement <HiArrowRight aria-hidden="true" /></Link></div></section>
    </div>
    <PublicFooter />
  </main>;
}

export default FleetPage;
