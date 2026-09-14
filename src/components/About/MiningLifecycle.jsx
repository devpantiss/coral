import { useRef, useState } from "react";
import { HiArrowDown, HiArrowUpRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { lifecycleStages } from "../../data/aboutContent";
import { AboutHeading } from "./AboutPrimitives";

export default function MiningLifecycle() {
  const [active, setActive] = useState(0);
  const buttons = useRef([]);
  const onKeyDown = (event, index) => {
    let next;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % lifecycleStages.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + lifecycleStages.length) % lifecycleStages.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = lifecycleStages.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };
  return <section className="mdo-section mdo-dark" id="mdo-lifecycle" aria-labelledby="mdo-lifecycle-title"><div className="coral-shell">
    <AboutHeading id="mdo-lifecycle-title" eyebrow="Integrated MDO lifecycle" title="From first plan" accent="to the next landscape." description="One coordinated delivery model connects development, operations and responsible closure. Explore each stage of the mine lifecycle." />
    <p className="mdo-lifecycle__position" role="status">{active === null ? "Select a stage to explore" : `Stage ${active + 1} of ${lifecycleStages.length} · ${lifecycleStages[active].phase}`}</p>
    <ol className="mdo-lifecycle">
      {lifecycleStages.map((stage, index) => <li className={`${active === index ? "is-active" : ""}${index < active ? " is-past" : ""}`} key={stage.title}>
        <h3><button type="button" ref={element => { buttons.current[index] = element; }} id={`mdo-stage-${index}`} aria-expanded={active === index} aria-controls={`mdo-stage-panel-${index}`} onClick={() => setActive(active === index ? null : index)} onKeyDown={event => onKeyDown(event, index)}><span>{String(index + 1).padStart(2, "0")}</span>{stage.title}<HiArrowUpRight aria-hidden="true" /></button></h3>
        <div className="mdo-lifecycle__panel" id={`mdo-stage-panel-${index}`} role="region" aria-labelledby={`mdo-stage-${index}`} hidden={active !== index}>
          <div className={`mdo-lifecycle__image${stage.equipment ? " is-equipment" : ""}`}><img src={stage.image} alt="" width="900" height="500" loading="lazy" /><span>{stage.phase} / {String(index + 1).padStart(2, "0")}</span></div>
          <div className="mdo-lifecycle__copy"><p>{stage.text}</p><small>Delivery focus</small><strong>{stage.deliverable}</strong><Link to="/capabilities">Explore our capabilities <HiArrowUpRight aria-hidden="true" /></Link></div>
        </div>
      </li>)}
    </ol>
    <p className="mdo-lifecycle__closing"><HiArrowDown aria-hidden="true" /> Closure thinking begins with the first mining decision.</p>
  </div></section>;
}
