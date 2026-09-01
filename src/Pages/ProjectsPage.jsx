import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiArrowUpRight,
  HiMagnifyingGlass,
  HiOutlineCog6Tooth,
  HiOutlineCube,
  HiOutlineFunnel,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const stages = [
  ["Evaluate", "Understand the resource, risks and development case."],
  ["Plan", "Connect engineering, approvals, equipment and economics."],
  ["Develop", "Build access, infrastructure and production readiness."],
  ["Operate", "Control safety, quality, output and cost every shift."],
  ["Evacuate", "Move material reliably through road, rail and port."],
  ["Rehabilitate", "Restore land progressively and plan beyond closure."],
];

const projectProfiles = [
  { title: "Integrated Mine Development", category: "Mine Development", model: "MDO", status: "Ongoing", location: "Eastern India", scope: "End-to-end", description: "Resource evaluation, mine planning, enabling infrastructure and production ramp-up under one accountable delivery system.", image: "/coral/coral-mine-hero.png", icon: HiOutlineCube },
  { title: "Open-Cast Production Operations", category: "Mine Operations", model: "O&M", status: "Ongoing", location: "Odisha", scope: "24/7 operations", description: "Coordinated excavation, material movement, grade control and production management aligned to contracted outcomes.", image: "/coral/coral-mine-hero.png", icon: HiOutlineCog6Tooth },
  { title: "HEMM Fleet Performance Programme", category: "Mine Operations", model: "O&M", status: "Delivered", location: "India", scope: "Fleet lifecycle", description: "Equipment deployment, maintenance planning, component rebuild and utilisation improvement for demanding mine conditions.", image: "/coral/impact-safety-team.jpg", icon: HiOutlineCog6Tooth },
  { title: "Pit-to-Port Mineral Movement", category: "Logistics", model: "EPC", status: "Ongoing", location: "Mineral corridor", scope: "Connected flow", description: "Integrated stockyard, dispatch, road and rail coordination that protects quality and delivery reliability.", image: "/coral/coral-port-logistics.png", icon: HiOutlineTruck },
  { title: "Progressive Mine Rehabilitation", category: "Sustainability", model: "Managed service", status: "Ongoing", location: "Active mine sites", scope: "Lifecycle ESG", description: "Concurrent dump shaping, drainage, plantation and environmental monitoring designed around the operating mine plan.", image: "/coral/impact-land-restoration.jpg", icon: HiOutlineShieldCheck },
  { title: "Mine Workforce Readiness", category: "Workforce", model: "Managed service", status: "Delivered", location: "Odisha", scope: "People systems", description: "Operator sourcing, competency assessment, safety-led training and deployment aligned to equipment and production plans.", image: "/coral/impact-safety-team.png", icon: HiOutlineShieldCheck },
];

const categories = ["All", ...new Set(projectProfiles.map((project) => project.category))];

function ProjectsPage() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projectProfiles.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesStatus = status === "All" || project.status === status;
      const matchesQuery = !normalizedQuery || [project.title, project.category, project.location, project.description].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [category, query, status]);

  const clearFilters = () => { setCategory("All"); setStatus("All"); setQuery(""); };

  return <InnerPage eyebrow="Projects" title="Mining projects." accent="Controlled delivery." intro="A project-led approach connecting mine development, production, equipment, logistics and responsible rehabilitation." image="/coral/coral-port-logistics.png" imageAlt="Bulk mineral handling and shipping operation">
    <section className="coral-page-intro coral-shell coral-projects-intro"><div><p className="coral-eyebrow"><span /> Mining portfolio</p><h2>Built around the realities of each asset.</h2></div><div><p className="coral-page-lead">Every deposit, community and logistics chain demands its own operating response.</p><p>Our project profiles show how Coral configures technical teams, equipment, field systems and delivery partnerships around distinct mine-to-market requirements.</p></div></section>
    <section className="coral-projects-snapshot" aria-label="Project delivery strengths"><div className="coral-shell"><article><strong>360°</strong><span>Mine lifecycle capability</span></article><article><strong>24/7</strong><span>Operating discipline</span></article><article><strong>Pit → Port</strong><span>Connected logistics</span></article><article><strong>One plan</strong><span>Single-point accountability</span></article></div></section>
    <section className="coral-projects-portfolio" aria-labelledby="project-portfolio-title"><div className="coral-shell">
      <header className="coral-projects-portfolio__head"><div><p className="coral-eyebrow"><span /> Selected profiles</p><h2 id="project-portfolio-title">Project portfolio</h2></div><p>Explore Coral’s delivery capabilities by operating area and project status.</p></header>
      <div className="coral-projects-portfolio__layout">
        <aside className="coral-project-filters" aria-label="Filter projects"><header><HiOutlineFunnel aria-hidden="true" /><div><strong>Filter projects</strong><span>Refine the portfolio</span></div></header><label><span>Search</span><div className="coral-project-filters__search"><HiMagnifyingGlass aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Project or location" /></div></label><fieldset><legend>Project category</legend>{categories.map((item) => <label key={item}><input type="radio" name="project-category" value={item} checked={category === item} onChange={() => setCategory(item)} /><span>{item}</span><small>{item === "All" ? projectProfiles.length : projectProfiles.filter((project) => project.category === item).length}</small></label>)}</fieldset><label><span>Project status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="All">All statuses</option><option value="Ongoing">Ongoing</option><option value="Delivered">Delivered</option></select></label><button type="button" onClick={clearFilters}>Reset filters</button></aside>
        <div className="coral-project-results"><div className="coral-project-results__bar"><p><strong>{visibleProjects.length}</strong> project profiles</p><span>{category === "All" ? "All capabilities" : category}</span></div>{visibleProjects.length > 0 ? <div className="coral-project-grid">{visibleProjects.map((project, index) => { const Icon = project.icon; return <article className="coral-project-card" key={project.title}><div className="coral-project-card__media"><img src={project.image} alt="" loading="lazy" /><span aria-hidden="true" /><div><small>{String(index + 1).padStart(2, "0")}</small><em className={project.status === "Ongoing" ? "is-active" : ""}>{project.status}</em></div></div><div className="coral-project-card__body"><div className="coral-project-card__category"><Icon aria-hidden="true" /><span>{project.category}</span></div><h3>{project.title}</h3><dl><div><dt>Location</dt><dd><HiOutlineMapPin aria-hidden="true" />{project.location}</dd></div><div><dt>Delivery model</dt><dd>{project.model}</dd></div><div><dt>Scope</dt><dd>{project.scope}</dd></div></dl><p>{project.description}</p><Link to="/contact">Discuss a similar project <HiArrowUpRight aria-hidden="true" /></Link></div></article>; })}</div> : <div className="coral-project-results__empty"><HiMagnifyingGlass aria-hidden="true" /><strong>No matching projects</strong><p>Try another category, status or search term.</p><button type="button" onClick={clearFilters}>Clear all filters</button></div>}</div>
      </div>
    </div></section>
    <section className="coral-project-lifecycle"><div className="coral-shell"><div className="coral-project-lifecycle__head"><div className="coral-page-heading coral-page-heading--light"><p className="coral-eyebrow coral-eyebrow--light"><span /> Asset lifecycle</p><h2>Continuity at<br />every stage.</h2></div><p>One delivery architecture connects early technical decisions to operating performance and responsible closure.</p></div><div className="coral-project-lifecycle__showcase"><div className="coral-project-lifecycle__media"><video autoPlay muted loop playsInline poster="/coral/coral-mine-hero.png" aria-label="Mining operation across the asset lifecycle"><source src="/hero_bg.mp4" type="video/mp4" /></video><span className="coral-project-lifecycle__media-shade" aria-hidden="true" /><div className="coral-project-lifecycle__scan" aria-hidden="true" /><div className="coral-project-lifecycle__media-top"><span><i /> Integrated delivery live</span><small>COR / MDO · 360°</small></div><div className="coral-project-lifecycle__media-copy"><small>One connected operating system</small><strong>From first study<br />to final landform.</strong></div><div className="coral-project-lifecycle__filmstrip"><figure><img src="/coral/coral-port-logistics.png" alt="Mineral port logistics" loading="lazy" /><figcaption>Move / Deliver</figcaption></figure><figure><img src="/coral/impact-land-restoration.jpg" alt="Restored post-mining landscape" loading="lazy" /><figcaption>Restore / Renew</figcaption></figure></div></div><ol>{stages.map(([stage, description], index) => <li key={stage}><span>{String(index + 1).padStart(2,"0")}</span><i aria-hidden="true"><b /></i><div><strong>{stage}</strong><small>{description}</small></div></li>)}</ol></div></div></section>
    <section className="coral-page-section coral-shell"><div className="coral-project-region"><HiOutlineMapPin /><div><span>Operating focus</span><h2>Mineral corridors across India.</h2><p>Our model is suited to bulk mineral assets requiring disciplined mine development, large-scale production and integrated market logistics.</p></div><Link to="/contact">Discuss an opportunity <HiArrowRight /></Link></div></section>
  </InnerPage>;
}

export default ProjectsPage;
