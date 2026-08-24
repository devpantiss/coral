import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineMapPin } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const stages = ["Evaluate", "Plan", "Develop", "Operate", "Evacuate", "Rehabilitate"];

function ProjectsPage() {
  return <InnerPage eyebrow="Projects" title="Complex assets." accent="Controlled delivery." intro="A lifecycle approach that creates alignment from early evaluation through steady-state operations and responsible closure." image="/coral/coral-port-logistics.png" imageAlt="Bulk mineral handling and shipping operation">
    <section className="coral-page-intro coral-shell"><div><p className="coral-eyebrow"><span /> Project approach</p><h2>Designed around the realities of each asset.</h2></div><div><p className="coral-page-lead">No two deposits, communities or logistics chains are identical.</p><p>We configure project teams, operating systems and delivery partnerships around the geology, approvals, infrastructure and market requirements of each opportunity.</p></div></section>
    <section className="coral-project-lifecycle"><div className="coral-shell"><div className="coral-page-heading coral-page-heading--light"><p className="coral-eyebrow coral-eyebrow--light"><span /> Asset lifecycle</p><h2>Continuity at every stage.</h2></div><ol>{stages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2,"0")}</span><strong>{stage}</strong></li>)}</ol></div></section>
    <section className="coral-page-section coral-shell"><div className="coral-project-region"><HiOutlineMapPin /><div><span>Operating focus</span><h2>Mineral corridors across India.</h2><p>Our model is suited to bulk mineral assets requiring disciplined mine development, large-scale production and integrated market logistics.</p></div><Link to="/contact">Discuss an opportunity <HiArrowRight /></Link></div></section>
  </InnerPage>;
}

export default ProjectsPage;
