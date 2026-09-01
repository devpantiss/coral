import {
  HiOutlineBolt,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineMap,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export const integratedSolutions = [
  {
    number: "01", shortTitle: "Mine development", title: "Mine Development Solutions", icon: HiOutlineMap, image: "/coral/coral-mine-hero.png", label: "Asset development",
    summary: "Technical, commercial and regulatory expertise to move mineral assets from first study to a development-ready mine.", outcomes: ["Development readiness", "Risk clarity", "Regulatory alignment"],
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
    number: "02", shortTitle: "Mine operations", title: "Mining Operations & Production", icon: HiOutlineBolt, image: "/coral/coral-mine-hero.png", label: "Production delivery",
    summary: "End-to-end execution built around predictable output, disciplined operating standards and contractual performance.", outcomes: ["Predictable output", "Quality control", "Contract performance"],
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
    number: "03", shortTitle: "HEMM & equipment", title: "HEMM & Equipment Solutions", icon: HiOutlineCog6Tooth, image: "/coral/impact-safety-team.jpg", label: "Fleet performance",
    summary: "Fit-for-purpose fleets, maintenance systems and rebuild capability engineered for availability and productivity.", outcomes: ["Fleet availability", "Higher utilisation", "Lifecycle cost control"],
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
    number: "04", shortTitle: "Processing & logistics", title: "Mineral Processing & Logistics", icon: HiOutlineTruck, image: "/coral/coral-port-logistics.png", label: "Pit-to-market flow",
    summary: "A connected material flow that protects mineral quality and reliably moves production from pit to customer.", outcomes: ["Improved recovery", "Flow visibility", "Delivery assurance"],
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
    number: "05", shortTitle: "Digital & sustainable", title: "Digital, Safety & Sustainable Mining", icon: HiOutlineChartBarSquare, image: "/coral/impact-land-restoration.jpg", label: "Responsible operations",
    summary: "Connected technology, engineered controls and environmental stewardship for safer, smarter mining.", outcomes: ["Critical-risk control", "Live intelligence", "Progressive restoration"],
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
    number: "06", shortTitle: "Workforce & community", title: "Mining Workforce Solutions", icon: HiOutlineUserGroup, image: "/coral/impact-safety-team.png", label: "People & communities",
    summary: "Competent mine teams and inclusive local partnerships that strengthen performance and shared value.", outcomes: ["Role-ready teams", "Faster mobilisation", "Shared local value"],
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
