import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowUpRight,
  HiChevronRight,
  HiOutlineBolt,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineMap,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const solutions = [
  {
    number: "01",
    shortTitle: "Mine development",
    title: "Mine Development Solutions",
    icon: HiOutlineMap,
    image: "/coral/coral-mine-hero.png",
    label: "Asset development",
    summary:
      "Technical, commercial and regulatory expertise to move mineral assets from first study to a development-ready mine.",
    journey: ["Explore", "Assess", "Plan", "Approve", "Develop"],
    services: [
      ["Exploration & geology", "Geological mapping, geophysical surveys and reserve/resource estimation."],
      ["Mine planning & engineering", "Mine design, pit optimisation, life-of-mine plans, scheduling, equipment selection and haul-road design."],
      ["Feasibility & technical studies", "PFS, feasibility studies, DPRs, techno-economic studies, due diligence and resource evaluation."],
      ["Infrastructure development", "Access roads, workshops and essential site infrastructure."],
      ["Statutory support", "Mining-plan approvals, environment and forest clearances, land acquisition, R&R and compliance coordination."],
    ],
  },
  {
    number: "02",
    shortTitle: "Mine operations",
    title: "Mining Operations & Production",
    icon: HiOutlineBolt,
    image: "/coral/coral-mine-hero.png",
    label: "Production delivery",
    summary:
      "End-to-end execution built around predictable output, disciplined operating standards and contractual performance.",
    journey: ["Mobilise", "Prepare", "Extract", "Control", "Deliver"],
    services: [
      ["Mine development works", "Site preparation, access development and production-area readiness."],
      ["Overburden removal", "Efficient excavation, haulage, placement and engineered dump management."],
      ["Coal & ore production", "Complete mine production to contracted quantity, quality and stripping ratios."],
      ["Production management", "Shift planning, grade control, performance monitoring and operating discipline."],
      ["Integrated MDO delivery", "Coordinated people, plant, systems and infrastructure under one accountable operating model."],
    ],
  },
  {
    number: "03",
    shortTitle: "HEMM & equipment",
    title: "HEMM & Equipment Solutions",
    icon: HiOutlineCog6Tooth,
    image: "/coral/impact-safety-team.jpg",
    label: "Fleet performance",
    summary:
      "Fit-for-purpose fleets, maintenance systems and rebuild capability engineered for availability and productivity.",
    journey: ["Deploy", "Operate", "Maintain", "Rebuild", "Optimise"],
    services: [
      ["Fleet deployment", "Equipment selection, mobilisation, commissioning and operating-readiness support."],
      ["HEMM operations", "Dumpers, excavators, dozers, loaders, graders, drills, surface miners and auxiliary equipment."],
      ["Maintenance", "Preventive, predictive and breakdown maintenance supported by disciplined planning."],
      ["Overhaul & rebuild", "Component overhaul, fleet refurbishment and structured machine rebuild programmes."],
      ["Equipment optimisation", "Availability, utilisation, fuel, cycle-time and cost-per-tonne improvement."],
    ],
  },
  {
    number: "04",
    shortTitle: "Processing & logistics",
    title: "Mineral Processing & Logistics",
    icon: HiOutlineTruck,
    image: "/coral/coral-port-logistics.png",
    label: "Pit-to-market flow",
    summary:
      "A connected material flow that protects mineral quality and reliably moves production from pit to customer.",
    journey: ["Crush", "Screen", "Beneficiate", "Handle", "Dispatch"],
    services: [
      ["Crushing & screening", "Sized, consistent material prepared to customer and downstream plant requirements."],
      ["Beneficiation", "Process solutions designed to improve recovery, grade and product value."],
      ["Material handling", "Stockyards, conveyors, loading systems and controlled product movement."],
      ["Dispatch management", "Weighment, grade reconciliation, inventory control and dispatch coordination."],
      ["Rail & road logistics", "Integrated evacuation planning and multimodal movement to ports, plants and customers."],
    ],
  },
  {
    number: "05",
    shortTitle: "Digital & sustainable",
    title: "Digital, Safety & Sustainable Mining",
    icon: HiOutlineChartBarSquare,
    image: "/coral/impact-land-restoration.jpg",
    label: "Responsible operations",
    summary:
      "Connected technology, engineered controls and environmental stewardship for safer, smarter mining.",
    journey: ["Sense", "Connect", "Protect", "Improve", "Restore"],
    services: [
      ["Digital mining", "Fleet management, GPS, dispatch systems, drone surveys, IoT, analytics and production monitoring."],
      ["Mine safety", "Safety systems, operator and fatigue monitoring, slope monitoring and emergency response."],
      ["Environmental management", "Dust suppression, water, waste and dump management, plus emissions reduction."],
      ["Mine closure", "Progressive reclamation, final closure, plantation, land restoration and post-mining monitoring."],
      ["Operational intelligence", "Decision support that turns field data into safer and more productive actions."],
    ],
  },
  {
    number: "06",
    shortTitle: "Workforce & community",
    title: "Mining Workforce Solutions",
    icon: HiOutlineUserGroup,
    image: "/coral/impact-safety-team.png",
    label: "People & communities",
    summary:
      "Competent mine teams and inclusive local partnerships that strengthen performance and shared value.",
    journey: ["Recruit", "Train", "Certify", "Deploy", "Perform"],
    services: [
      ["Technical manpower", "Skilled operators, supervisors, mining engineers, maintenance teams and technical specialists."],
      ["Training & certification", "HEMM, simulator and safety training, upskilling and competency assessment."],
      ["Workforce deployment", "Role-ready teams deployed against mine plans, rosters and operational requirements."],
      ["Productivity management", "Performance coaching, skills matrices, utilisation tracking and continuous improvement."],
      ["Community & R&R", "Rehabilitation and resettlement, local employment, livelihoods and community development programmes."],
    ],
  },
];

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
            </div>

            <div className="coral-solutions__panel-body">
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
