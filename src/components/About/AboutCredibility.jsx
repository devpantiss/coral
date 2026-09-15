import { HiOutlineMap, HiOutlineCog6Tooth, HiOutlineGlobeAsiaAustralia, HiOutlineDocumentCheck, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { deliveryTeams, deliveryStages } from "../../data/aboutContent";
import { AboutHeading } from "./AboutPrimitives";

const teamIcons = [HiOutlineMap, HiOutlineCog6Tooth, HiOutlineGlobeAsiaAustralia];

export default function AboutCredibility() {
  return <>
    <section className="mdo-section" aria-labelledby="mdo-leadership-title"><div className="coral-shell">
      <AboutHeading id="mdo-leadership-title" eyebrow="Our teams" title="Technical judgement." accent="Shared responsibility." description="Our delivery approach connects engineering, field operations and environmental planning throughout the life of a mine." />
      <div className="mdo-leaders">{deliveryTeams.map((team, index) => { const Icon = teamIcons[index]; return <article key={team.discipline}><div className="mdo-leaders__portrait"><Icon aria-hidden="true" /><span>{team.discipline}</span></div><p>{team.discipline}</p><h3>{team.title}</h3><p>{team.text}</p></article>; })}</div>
    </div></section>
    <section className="mdo-section mdo-sand" aria-labelledby="mdo-journey-title"><div className="coral-shell"><AboutHeading id="mdo-journey-title" eyebrow="Our delivery approach" title="From resource" accent="to restoration." description="Six connected steps keep technical decisions, field execution and long-term land outcomes in the same plan." /><ol className="mdo-timeline">{deliveryStages.map(([stage, description], index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /><h3>{stage}</h3><p>{description}</p></li>)}</ol></div></section>
    <section className="mdo-section" aria-labelledby="mdo-credentials-title"><div className="coral-shell"><AboutHeading id="mdo-credentials-title" eyebrow="Working with Coral" title="Clear scope." accent="Connected execution." description="Define the asset’s requirements, align the delivery team and keep operational decisions grounded in site conditions." /><div className="mdo-credentials">
      <article><HiOutlineDocumentCheck aria-hidden="true" /><h3>Project planning & controls</h3><dl><div><dt>Planning</dt><dd>Mine design and production sequencing</dd></div><div><dt>Readiness</dt><dd>Land records, site access and infrastructure</dd></div><div><dt>Visibility</dt><dd>Progress reporting and issue tracking</dd></div></dl></article>
      <article><HiOutlineBuildingOffice2 aria-hidden="true" /><h3>Integrated delivery support</h3><dl><div><dt>People</dt><dd>Recruitment, assessment and deployment</dd></div><div><dt>Equipment</dt><dd>Fleet selection, maintenance and rebuilds</dd></div><div><dt>Logistics</dt><dd>Stockyards, dispatch and mineral transport</dd></div></dl></article>
    </div></div></section>
  </>;
}
