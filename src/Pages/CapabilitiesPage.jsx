import { HiCheck, HiOutlineChartBarSquare, HiOutlineCube, HiOutlineTruck } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";

const capabilityGroups = [
  { number: "01", icon: HiOutlineCube, title: "Mine development", intro: "Convert a resource into an operating asset with disciplined technical and project execution.", items: ["Resource evaluation and mine planning", "Statutory and development coordination", "Site infrastructure and enabling works", "Commissioning and production ramp-up"] },
  { number: "02", icon: HiOutlineChartBarSquare, title: "Mine operations", intro: "Deliver safe, predictable output through integrated people, equipment and production systems.", items: ["Drilling, blasting and excavation", "Grade control and material management", "Fleet maintenance and optimisation", "HSE assurance and operational reporting"] },
  { number: "03", icon: HiOutlineTruck, title: "Logistics & shipping", intro: "Connect mine output to customers through controlled, visible pit-to-port movement.", items: ["Road and rail evacuation", "Stockyard and blending management", "Port handling coordination", "Bulk shipping and delivery assurance"] },
];

function CapabilitiesPage() {
  return <InnerPage eyebrow="Capabilities" title="One operating system." accent="Mine to market." intro="Integrated capability across mine development, production, logistics and bulk mineral delivery." image="/coral/coral-mine-hero.png" imageAlt="Terraced open-cast mine at sunrise">
    <section className="coral-page-intro coral-shell"><div><p className="coral-eyebrow"><span /> Integrated execution</p><h2>Fewer handoffs. Clearer ownership.</h2></div><div><p className="coral-page-lead">Coral aligns the entire operating chain behind one plan and one performance framework.</p><p>Our model is modular enough to support a focused operating mandate and integrated enough to manage the complete mine-to-market value chain.</p></div></section>
    <section className="coral-capability-page-list coral-shell">{capabilityGroups.map((group) => { const Icon = group.icon; return <article key={group.number}><div className="coral-capability-page-list__number">{group.number}</div><div className="coral-capability-page-list__icon"><Icon /></div><div><h2>{group.title}</h2><p>{group.intro}</p></div><ul>{group.items.map((item) => <li key={item}><HiCheck />{item}</li>)}</ul></article>; })}</section>
    <section className="coral-page-band"><div className="coral-shell"><span>Technology-enabled operations</span><strong>Planning · Dispatch · Fleet · HSE · ESG · Logistics</strong></div></section>
  </InnerPage>;
}

export default CapabilitiesPage;
