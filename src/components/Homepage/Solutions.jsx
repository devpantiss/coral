import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowUpRight,
  HiChevronRight,
} from "react-icons/hi2";
import { integratedSolutions as solutions } from "../../data/integratedSolutions";

function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const activeSolution = solutions[activeIndex];
  const ActiveIcon = activeSolution.icon;

  const moveTabFocus = (event, index) => {
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1
      : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1
        : 0;

    if (!direction) return;
    event.preventDefault();
    const nextIndex = (index + direction + solutions.length) % solutions.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="coral-solutions" id="solutions" aria-labelledby="solutions-title">
      <div className="coral-shell">
        <div className="coral-solutions__heading">
          <div>
            <p className="coral-eyebrow coral-eyebrow--light"><span /> Integrated solutions</p>
            <h2 id="solutions-title">One partner.<br /><em>Every stage of mining.</em></h2>
          </div>
          <p>
            From resource definition to responsible closure, Coral brings together
            the technical depth, operating capability and field teams required to
            deliver across the complete mine lifecycle.
          </p>
        </div>

        <div className="coral-solutions__system-rail" aria-label="Coral integrated operating system">
          <span>One operating system</span>
          <div><small>01</small><strong>Define the asset</strong><em>Technical certainty</em></div>
          <i aria-hidden="true" />
          <div><small>02</small><strong>Deliver production</strong><em>Operating control</em></div>
          <i aria-hidden="true" />
          <div><small>03</small><strong>Create lasting value</strong><em>Responsible outcomes</em></div>
        </div>

        <div className="coral-solutions__workspace">
          <div className="coral-solutions__tabs" role="tablist" aria-label="Mining solution categories" aria-orientation="vertical">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const isActive = activeIndex === index;

              return (
                <button
                  key={solution.number}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  className={isActive ? "is-active" : ""}
                  id={`solution-tab-${solution.number}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`solution-panel-${solution.number}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => moveTabFocus(event, index)}
                >
                  <span className="coral-solutions__tab-number">{solution.number}</span>
                  <Icon aria-hidden="true" />
                  <strong>{solution.shortTitle}</strong>
                  <small>{solution.label}</small>
                  <HiChevronRight className="coral-solutions__tab-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <article
            className="coral-solutions__panel"
            id={`solution-panel-${activeSolution.number}`}
            role="tabpanel"
            aria-labelledby={`solution-tab-${activeSolution.number}`}
            key={activeSolution.number}
          >
            <div className="coral-solutions__visual">
              <img src={activeSolution.image} alt="" loading="lazy" />
              <span className="coral-solutions__visual-shade" aria-hidden="true" />
              <header>
                <div className="coral-solutions__panel-icon"><ActiveIcon aria-hidden="true" /></div>
                <span>Solution {activeSolution.number} / {String(solutions.length).padStart(2, "0")}</span>
              </header>
              <div className="coral-solutions__visual-copy">
                <p>{activeSolution.label}</p>
                <h3>{activeSolution.title}</h3>
                <span>{activeSolution.summary}</span>
              </div>
              <div className="coral-solutions__visual-meta" aria-label="Solution overview">
                <div><strong>{String(activeSolution.services.length).padStart(2, "0")}</strong><span>Core capabilities</span></div>
                <div><strong>360°</strong><span>Lifecycle coverage</span></div>
              </div>
              <div className="coral-solutions__visual-coordinate" aria-hidden="true"><i /><span>COR / MDO · {activeSolution.number}</span><small>20.27° N / 85.84° E</small></div>
            </div>

            <div className="coral-solutions__panel-body">
              <div className="coral-solutions__outcomes"><span>Designed outcomes</span>{activeSolution.outcomes.map((outcome, index) => <div key={outcome}><small>0{index + 1}</small><strong>{outcome}</strong></div>)}</div>
              <div className="coral-solutions__journey-wrap">
                <p>Delivery pathway</p>
                <div className="coral-solutions__journey" aria-label={`${activeSolution.title} process`}>
                  {activeSolution.journey.map((step, index) => (
                    <div key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{step}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="coral-solutions__scope-head">
                <p>Scope of expertise</p><span>Integrated delivery · Single-point accountability</span>
              </div>
              <div className="coral-solutions__services">
                {activeSolution.services.map(([title, description], index) => (
                  <div key={title}>
                    <span className="coral-solutions__service-index">{String(index + 1).padStart(2, "0")}</span>
                    <p><strong>{title}</strong><span>{description}</span></p>
                    <HiArrowUpRight aria-hidden="true" />
                  </div>
                ))}
              </div>

              <Link to="/capabilities" className="coral-solutions__link">
                Explore all capabilities <HiArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
