import { useRef, useState } from "react";
import { HiOutlineSignal, HiOutlineMap, HiOutlineCog6Tooth } from "react-icons/hi2";
import { technologyGroups } from "../../data/aboutContent";
import { AboutHeading } from "./AboutPrimitives";

const icons = [HiOutlineMap, HiOutlineSignal, HiOutlineCog6Tooth];
export default function MiningTechnology() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const navigate = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % technologyGroups.length;
    if (event.key === "ArrowLeft") next = (index - 1 + technologyGroups.length) % technologyGroups.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = technologyGroups.length - 1;
    if (next === undefined) return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  };
  return <section className="mdo-section mdo-dark mdo-technology" aria-labelledby="mdo-technology-title"><div className="coral-shell">
    <AboutHeading id="mdo-technology-title" eyebrow="Technology & innovation" title="Field intelligence." accent="Engineering advantage." description="A technology-enabled approach to mine planning, operational visibility and continuous improvement." />
    <div className="mdo-technology__layout">
      <figure className="mdo-technology__visual"><img src="/coral/coral-mine-hero.png" width="900" height="800" loading="lazy" alt="Terraced open-cast mine with an illustrative survey grid" /><div className="mdo-technology__grid" aria-hidden="true" /><div className="mdo-technology__nodes" aria-hidden="true"><i /><i /><i /></div><figcaption><span>Engineering systems / Concept view</span><strong>{technologyGroups[active].title}</strong></figcaption></figure>
      <div><div className="mdo-technology__tabs" role="tablist" aria-label="Mining technology areas">{technologyGroups.map((group, index) => { const Icon = icons[index]; return <button type="button" key={group.label} ref={element => { tabs.current[index] = element; }} role="tab" id={`mdo-tech-tab-${index}`} aria-selected={active === index} aria-controls={`mdo-tech-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}><Icon aria-hidden="true" />{group.label}</button>; })}</div>
        {technologyGroups.map((group, index) => <div className="mdo-technology__panel" role="tabpanel" id={`mdo-tech-panel-${index}`} aria-labelledby={`mdo-tech-tab-${index}`} hidden={active !== index} tabIndex={0} key={group.label}><h3>{group.title}</h3><p>{group.description}</p><ul>{group.items.map((item, n) => <li key={item}><span>{String(n + 1).padStart(2, "0")}</span>{item}</li>)}</ul><small>Technology approach shown for context. Site deployments and performance data require confirmation.</small></div>)}
      </div>
    </div>
  </div></section>;
}
