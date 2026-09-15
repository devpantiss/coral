import { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowUpRight, HiMagnifyingGlass, HiOutlineAcademicCap, HiOutlineShieldCheck, HiOutlineUsers, HiOutlineArrowTrendingUp } from "react-icons/hi2";
import PublicHeader from "../components/common/PublicSite/PublicHeader";
import PublicFooter from "../components/common/PublicSite/PublicFooter";
import { OpportunityHeading, OpportunityEmpty } from "../components/Opportunities/OpportunityPrimitives";
import { careerTeams, jobOpenings } from "../data/opportunities";
import "./Opportunities.css";

const culture = [
  ["People & inclusion", "Make room for different perspectives and value the experience each person brings."],
  ["Safety & respect", "Bring care, sound judgement and respect for others to every shift."],
  ["Ownership & integrity", "Take responsibility for decisions and keep communication clear across teams."],
  ["Learning in the field", "Connect technical knowledge to the practical challenges of an operating mine."],
];
const support = [
  { icon: HiOutlineAcademicCap, title: "Build your skills", text: "Explore work that connects technical learning, equipment knowledge and field experience." },
  { icon: HiOutlineShieldCheck, title: "Put safety first", text: "Safety induction, task readiness and operational risk awareness are central to our workforce approach." },
  { icon: HiOutlineUsers, title: "Work across disciplines", text: "Understand how engineering, operations, logistics and environmental teams deliver together." },
  { icon: HiOutlineArrowTrendingUp, title: "Find your next step", text: "Discuss the scope, development opportunities and employment terms of each role with the hiring team." },
];

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("All teams");
  const jobs = jobOpenings.filter(job => (team === "All teams" || job.team === team) && `${job.title} ${job.location} ${job.team}`.toLowerCase().includes(query.trim().toLowerCase()));
  function search(event) {
    event.preventDefault();
    document.getElementById("career-openings").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    document.getElementById("openings-title").focus({ preventScroll: true });
  }
  return <main className="coral-inner-page op-page"><PublicHeader />
    <section className="op-career-hero" aria-labelledby="career-title"><img src="/coral/mining-workforce-team.jpg" alt="" /><div className="coral-shell"><p className="coral-eyebrow"><span />Careers at Coral</p><h1 id="career-title">Your next chapter.<br /><em>A shared purpose.</em></h1><p>Bring your skills to the people, equipment and ideas shaping responsible mining.</p><form className="op-search" role="search" onSubmit={search}><label className="op-sr-only" htmlFor="career-search">Search jobs by keyword or location</label><HiMagnifyingGlass aria-hidden="true" /><input id="career-search" type="search" placeholder="Job title, keyword or location" value={query} onChange={event => setQuery(event.target.value)} /><button type="submit">Search jobs <HiArrowUpRight aria-hidden="true" /></button></form><a className="op-hero-link" href="#life-at-coral">Discover life at Coral ↓</a></div></section>
    <nav className="op-section-nav" aria-label="Careers sections"><div className="coral-shell">{[["Life at Coral", "life-at-coral"], ["Career paths", "career-paths"], ["Growth & support", "career-support"], ["Early careers", "early-careers"], ["Opportunities", "career-openings"]].map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div></nav>
    <section className="op-section coral-shell" id="life-at-coral"><OpportunityHeading eyebrow="Life at Coral" title="Good work starts with people." text="Technical depth matters. So do curiosity, teamwork and care for the communities around an operation." /><div className="op-culture"><img src="/coral/community-development.jpg" alt="Community skills training near a mining site" loading="lazy" /><div>{culture.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="op-band" id="career-paths"><div className="coral-shell op-section"><OpportunityHeading eyebrow="Find your direction" title="Different skills. One connected operation." text="Explore the disciplines that bring our mine-to-market approach to life." /><div className="op-card-grid">{careerTeams.map((item, index) => <article className="op-card" key={item.title}><span className="op-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#career-openings" onClick={() => setTeam(item.title)}>Explore opportunities <HiArrowUpRight aria-hidden="true" /></a></article>)}</div></div></section>
    <section className="op-section coral-shell" id="career-support"><OpportunityHeading eyebrow="Growth & support" title="Make your experience count." text="A working environment shaped around capability, collaboration and safe execution." /><div className="op-card-grid">{support.map(item => { const Icon = item.icon; return <article className="op-card op-card--plain" key={item.title}><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></section>
    <section className="op-band" id="early-careers"><div className="coral-shell op-section op-split"><div><OpportunityHeading eyebrow="Students & recent graduates" title="Start close to the work." text="Discover where your education can take you across mining, engineering and operations." /><div className="op-pathways">{[["Graduate opportunities", "Apply your technical foundation to real operating challenges."], ["Internships & project learning", "Explore how field experience connects with your area of study."], ["Operator & technical pathways", "Build on practical skills in equipment, maintenance and safe work."]].map(([title, text]) => <details key={title}><summary>{title}</summary><p>{text} Enquire about available pathways and eligibility through our contact team.</p><Link to="/contact">Ask about early careers <HiArrowUpRight aria-hidden="true" /></Link></details>)}</div></div><img src="/coral/mine-development-site.jpg" alt="Mine development site showing scale of field operations" loading="lazy" /></div></section>
    <section className="op-section coral-shell" id="career-openings"><div className="op-section-top"><div><p className="coral-eyebrow"><span />Current opportunities</p><h2 id="openings-title" tabIndex={-1}>Find your place at Coral.</h2></div><label className="op-select">Team<select value={team} onChange={event => setTeam(event.target.value)}><option>All teams</option>{careerTeams.map(item => <option key={item.title}>{item.title}</option>)}</select></label></div>{query && <p className="op-result-copy">Search results for “{query}”</p>}{jobs.length ? <div className="op-card-grid">{jobs.map(job => <article className="op-card" key={job.id}><p>{job.team}</p><h3>{job.title}</h3><p>{job.location} · {job.type}</p><a href={job.applicationUrl}>View role <HiArrowUpRight aria-hidden="true" /></a></article>)}</div> : <OpportunityEmpty title={jobOpenings.length ? "No matching roles" : "No vacancies published at the moment"} text="Explore our career paths and check back for new openings, or contact us about your area of interest." />}{(query || team !== "All teams") && <button className="op-reset" type="button" onClick={() => { setQuery(""); setTeam("All teams"); }}>Clear filters</button>}</section>
    <section className="op-people"><div className="coral-shell op-section op-split"><img src="/coral/safety-training-session.jpg" alt="Mining safety training session with team collaboration" loading="lazy" /><div><OpportunityHeading eyebrow="People behind the operation" title="Every role sees a different part of the picture." text="From the engineer planning the next phase to the operator preparing for a shift, progress depends on people understanding one another's work." /><Link className="coral-button coral-button--primary" to="/about">Get to know Coral <HiArrowUpRight aria-hidden="true" /></Link></div></div></section>
    <PublicFooter /></main>;
}
