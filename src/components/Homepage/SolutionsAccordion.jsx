import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowUpRight, HiPlus, HiMinus } from "react-icons/hi2";
import { integratedSolutions } from "../../data/integratedSolutions";
import "./SolutionsAccordion.css";

export default function SolutionsAccordion() {
  const [active, setActive] = useState(0);
  const triggers = useRef([]);

  const navigate = (event, index) => {
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % integratedSolutions.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + integratedSolutions.length) % integratedSolutions.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = integratedSolutions.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    triggers.current[next]?.focus();
  };

  return <section className="coral-solution-accordion" id="solutions" aria-labelledby="accordion-title">
    <div className="coral-shell">
      <header className="coral-solution-accordion__heading">
        <div><p className="coral-eyebrow"><span /> Integrated solutions</p><h2 id="accordion-title">Every stage.<br /><em>One connected partner.</em></h2></div>
        <p>Explore the expertise behind the complete mine lifecycle. Select a solution to see how we bring it together.</p>
      </header>
      <div className="coral-solution-accordion__panels">
        {integratedSolutions.map((solution, index) => {
          const expanded = active === index;
          const Icon = solution.icon;
          return <article className={`coral-solution-panel${expanded ? " is-open" : ""}`} key={solution.number}>
            <img className="coral-solution-panel__image" src={solution.image} alt="" loading="lazy" />
            <h3 className="coral-solution-panel__heading"><button
              ref={element => { triggers.current[index] = element; }}
              id={`solution-trigger-${solution.number}`}
              type="button" aria-expanded={expanded} aria-controls={`solution-content-${solution.number}`}
              onClick={() => setActive(expanded ? null : index)} onKeyDown={event => navigate(event, index)}
            ><span className="coral-solution-panel__number">{solution.number}</span><Icon aria-hidden="true" /><span className="coral-solution-panel__label">{solution.shortTitle}</span><span className="coral-solution-panel__toggle">{expanded ? <HiMinus aria-hidden="true" /> : <HiPlus aria-hidden="true" />}</span></button></h3>
            <div className="coral-solution-panel__content" id={`solution-content-${solution.number}`} role="region" aria-labelledby={`solution-trigger-${solution.number}`} hidden={!expanded}>
              <p className="coral-solution-panel__eyebrow">{solution.label}</p>
              <h4>{solution.title}</h4><p className="coral-solution-panel__summary">{solution.summary}</p>
              <ul className="coral-solution-panel__outcomes">{solution.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
              <div className="coral-solution-panel__services"><span>Scope of delivery</span><ul>{solution.services.map(([title, description]) => <li key={title}><strong>{title}</strong><span>{description}</span></li>)}</ul></div>
              <Link to="/contact">Discuss your project <HiArrowUpRight aria-hidden="true" /></Link>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
