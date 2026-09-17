import { projectProfiles } from "../data/projectProfiles";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiArrowUpRight,
  HiMagnifyingGlass,
  HiOutlineMapPin,
} from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const PAGE_SIZE = 12;

const categories = ["All", ...new Set(projectProfiles.map((project) => project.category))];

function ProjectsPage() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("Ongoing");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProjects = useMemo(() => projectProfiles.filter((project) =>
    (category === "All" || project.category === category) && project.status === status
  ), [category, status]);
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const selectCategory = (value) => { setCategory(value); setVisibleCount(PAGE_SIZE); };
  const selectStatus = (value) => { setStatus(value); setVisibleCount(PAGE_SIZE); };
  const clearFilters = () => { selectCategory("All"); selectStatus("Ongoing"); };

  return <InnerPage eyebrow="Projects" title="Mining projects." accent="Controlled delivery." intro="A project-led approach connecting mine development, production, equipment, logistics and responsible rehabilitation." video="/hero_bg.mp4" image="/coral/projects-hero.jpg" imageAlt="Grand integrated mining and infrastructure project with overland conveyor">
    <section className="coral-page-intro coral-shell coral-projects-intro"><div><p className="coral-eyebrow"><span /> Mining portfolio</p><h2>Built around the realities of each asset.</h2></div><div><p className="coral-page-lead">Every deposit, community and logistics chain demands its own operating response.</p><p>Our project profiles show how Coral configures technical teams, equipment, field systems and delivery partnerships around distinct mine-to-market requirements.</p></div></section>
    <section className="coral-projects-snapshot" aria-label="Project delivery strengths"><div className="coral-shell"><article><strong>360°</strong><span>Mine lifecycle capability</span></article><article><strong>24/7</strong><span>Operating discipline</span></article><article><strong>Pit → Port</strong><span>Connected logistics</span></article><article><strong>One plan</strong><span>Single-point accountability</span></article></div></section>
    <section className="coral-projects-portfolio" aria-labelledby="project-portfolio-title"><div className="coral-shell">
      <header className="coral-projects-portfolio__head"><div><p className="coral-eyebrow"><span /> Selected profiles</p><h2 id="project-portfolio-title">Project portfolio</h2></div><p>Explore Coral’s delivery capabilities by operating area and project status.</p></header>
      <div className="coral-projects-portfolio__layout">
        <div className="coral-project-controls" aria-label="Filter projects">
          <div className="coral-project-segments" role="group" aria-label="Project segment">
            {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => selectCategory(item)}>{item === "All" ? "All segments" : item}</button>)}
          </div>
          <div className="coral-project-status" role="group" aria-label="Project status">
            {[['Ongoing', 'Ongoing'], ['Delivered', 'Completed']].map(([value, label]) => <button key={value} type="button" aria-pressed={status === value} aria-controls="project-results" onClick={() => selectStatus(value)}>{label}</button>)}
          </div>
        </div>
        <div className="coral-project-results" id="project-results"><div className="coral-project-results__bar"><p role="status"><strong>{filteredProjects.length}</strong> project profiles</p><span>{category === "All" ? "All capabilities" : category}</span></div>{visibleProjects.length > 0 ? <div className="coral-project-grid">{visibleProjects.map((project, index) => { const Icon = project.icon; return <article className="coral-project-card" key={project.title}><div className="coral-project-card__media"><img src={project.image} alt="" loading="lazy" /><span aria-hidden="true" /><div><small>{String(index + 1).padStart(2, "0")}</small><em className={project.status === "Ongoing" ? "is-active" : ""}>{project.status === "Delivered" ? "Completed" : project.status}</em></div></div><div className="coral-project-card__body"><div className="coral-project-card__category"><Icon aria-hidden="true" /><span>{project.category}</span></div><h3>{project.title}</h3><dl><div><dt>Location</dt><dd><HiOutlineMapPin aria-hidden="true" />{project.location}</dd></div><div><dt>Delivery model</dt><dd>{project.model}</dd></div><div><dt>Scope</dt><dd>{project.scope}</dd></div></dl><p>{project.description}</p><Link to="/contact">Discuss a similar project <HiArrowUpRight aria-hidden="true" /></Link></div></article>; })}</div> : <div className="coral-project-results__empty"><HiMagnifyingGlass aria-hidden="true" /><strong>No matching projects</strong><p>Try another segment or project status.</p><button type="button" onClick={clearFilters}>Reset filters</button></div>}
          {visibleCount < filteredProjects.length && <div className="coral-project-results__more"><button type="button" aria-controls="project-results" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show more <HiArrowRight aria-hidden="true" /></button><span>Showing {visibleProjects.length} of {filteredProjects.length} projects</span></div>}
        </div>
      </div>
    </div></section>

    <section className="coral-page-section coral-shell"><div className="coral-project-region"><HiOutlineMapPin /><div><span>Operating focus</span><h2>Mineral corridors across India.</h2><p>Our model is suited to bulk mineral assets requiring disciplined mine development, large-scale production and integrated market logistics.</p></div><Link to="/contact">Discuss an opportunity <HiArrowRight /></Link></div></section>
  </InnerPage>;
}

export default ProjectsPage;
