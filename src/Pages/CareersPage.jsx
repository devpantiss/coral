import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const teams = [
  { icon: HiOutlineWrenchScrewdriver, title: "Operations & maintenance", text: "Mining, processing, fleet, reliability and technical services." },
  { icon: HiOutlineAcademicCap, title: "Engineering & projects", text: "Mine planning, geology, civil, infrastructure and project controls." },
  { icon: HiOutlineUserGroup, title: "Enabling teams", text: "HSE, sustainability, communities, commercial, finance and people." },
];

function CareersPage() {
  return <InnerPage eyebrow="Careers" title="Build the systems" accent="that move progress." intro="Join multidisciplinary teams solving real operating challenges across mines, infrastructure and logistics." image="/coral/impact-safety-team.jpg" imageAlt="Mining professionals collaborating at an operating site">
    <section className="coral-page-intro coral-shell"><div><p className="coral-eyebrow"><span /> Work at Coral</p><h2>Serious work. Supportive teams. Visible impact.</h2></div><div><p className="coral-page-lead">We look for people who combine technical depth with curiosity, ownership and care for others.</p><p>At Coral, careers grow through field experience, meaningful accountability and exposure to the complete mine-to-market system.</p></div></section>
    <section className="coral-page-section coral-shell"><div className="coral-page-card-grid">{teams.map((team) => { const Icon = team.icon; return <article key={team.title}><Icon /><h3>{team.title}</h3><p>{team.text}</p></article>; })}</div></section>
    <section className="coral-careers-cta"><div className="coral-shell"><div><span>Current opportunities</span><h2>Bring your experience to Coral.</h2></div><Link to="/contact">Share your profile <HiArrowRight /></Link></div></section>
  </InnerPage>;
}

export default CareersPage;
