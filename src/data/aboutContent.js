// About-page content reflects the service framework and regional map used across the site.
import { operationalStates } from "./operationalStates";
export const lifecycleStages = [
  { title: "Mine Planning", phase: "Define", text: "Translate resource understanding into a coordinated mine plan, production sequence and infrastructure strategy.", deliverable: "An integrated technical baseline", image: "/coral/coral-mine-hero.png" },
  { title: "Mine Development", phase: "Prepare", text: "Connect site access, enabling works and mine infrastructure to the planned production sequence.", deliverable: "Readiness for controlled operations", image: "/coral/coral-mine-hero.png" },
  { title: "Drilling & Blasting", phase: "Prepare", text: "Coordinate fragmentation design, exclusion zones and controlled execution with downstream excavation requirements.", deliverable: "Disciplined preparation of the working face", image: "/coral/coral-mine-hero.png" },
  { title: "Excavation & Loading", phase: "Operate", text: "Align loading equipment, haul cycles and working-face conditions for a consistent flow of material.", deliverable: "Coordinated people and equipment", image: "/fleet3/haul-pack.png", equipment: true },
  { title: "Mineral Extraction", phase: "Operate", text: "Bring grade control, extraction sequencing and production supervision into one operating plan.", deliverable: "Material quality through the production cycle", image: "/coral/coral-mine-hero.png" },
  { title: "Processing / Crushing", phase: "Process", text: "Prepare material to the required size and quality through coordinated crushing and screening.", deliverable: "Consistent downstream feed", image: "/coral/coral-port-logistics.png" },
  { title: "Material Handling", phase: "Connect", text: "Manage stockyards, loading systems and transfer points to maintain a visible, controlled material flow.", deliverable: "Continuity between mine and dispatch", image: "/coral/coral-port-logistics.png" },
  { title: "Transportation", phase: "Deliver", text: "Connect mine evacuation, road, rail and port interfaces around the customer’s delivery requirements.", deliverable: "A connected route to market", image: "/coral/coral-port-logistics.png" },
  { title: "Environmental Management", phase: "Protect", text: "Integrate dust, water, waste and land stewardship into daily operational planning and monitoring.", deliverable: "Environmental controls within the mine plan", image: "/coral/impact-land-restoration.jpg" },
  { title: "Mine Reclamation", phase: "Restore", text: "Plan landforms, drainage and progressive rehabilitation for a productive landscape beyond extraction.", deliverable: "A considered path to responsible closure", image: "/coral/impact-land-restoration.jpg" },
];

export const capabilityItems = [
  ["Mine Planning & Design", "Resource-led engineering, mine layouts and life-of-mine sequencing."],
  ["Mine Development", "Site preparation and production-area readiness."],
  ["Drilling & Blasting", "Controlled fragmentation coordinated with the mining sequence."],
  ["Overburden Removal", "Excavation, haulage and engineered dump management."],
  ["Excavation & Loading", "Equipment coordination and efficient working-face operations."],
  ["Mineral Extraction", "Production supervision, sequencing and grade control."],
  ["Crushing & Screening", "Material preparation for downstream quality requirements."],
  ["Material Handling", "Stockyards, conveyors and controlled transfer systems."],
  ["Mine Transportation", "Integrated road, rail and port evacuation planning."],
  ["Infrastructure Development", "Access roads, workshops and essential site infrastructure."],
  ["Environmental Management", "Water, dust, waste and land stewardship."],
  ["Mine Reclamation", "Progressive rehabilitation and post-mining land outcomes."],
];

export const companySnapshot = [
  [String(operationalStates.length).padStart(2, "0"), "States on our operational map"],
  [String(operationalStates.reduce((total, state) => total + state.districts.length, 0)), "Districts in the mapped network"],
  [String(capabilityItems.length), "Mining capabilities"],
  [String(lifecycleStages.length), "Mine lifecycle stages"],
];
export const regionalProfiles = operationalStates.map(state => ({
  title: state.name,
  region: state.region,
  description: state.description,
  districts: state.districts.join(" · "),
  image: state.name === "Odisha" ? "/coral/coral-mine-hero.png" : "/coral/coral-port-logistics.png",
}));
export const technologyGroups = [
  { title: "Understand the asset", label: "Survey & plan", items: ["Digital mine planning", "Drone surveying", "GIS & spatial intelligence"], description: "Connect survey information and spatial models to mine design and development decisions." },
  { title: "See the operation", label: "Monitor & coordinate", items: ["GPS fleet management", "IoT monitoring", "Real-time production monitoring"], description: "Bring fleet location, equipment condition and production information into a shared operational picture." },
  { title: "Improve the next shift", label: "Analyse & improve", items: ["Predictive maintenance", "Automation", "Data-driven mine optimisation"], description: "Use operational insight to guide maintenance, reduce avoidable delays and improve mine planning." },
];
export const safetyAreas = ["Occupational safety", "Workforce training", "PPE & compliance", "Equipment safety", "Emergency preparedness", "Operational risk management"];
export const esgPillars = [
  { title: "Environment", subtitle: "Protect the landscape.", items: ["Land reclamation", "Water management", "Dust suppression", "Biodiversity", "Carbon reduction"] },
  { title: "People", subtitle: "Build local opportunity.", items: ["Local employment", "Skill development", "Worker welfare", "Community development"] },
  { title: "Governance", subtitle: "Earn trust through action.", items: ["Regulatory compliance", "Ethical operations", "Transparency", "Responsible mining"] },
];
export const deliveryTeams = [
  { discipline: "Engineering", title: "Plan the asset", text: "Mine layouts, production sequences and infrastructure planning connect resource understanding to a practical development plan." },
  { discipline: "Operations", title: "Coordinate the shift", text: "Fleet deployment, operator readiness and maintenance planning bring people and equipment together around the production sequence." },
  { discipline: "Environment & community", title: "Plan beyond extraction", text: "Water management, land restoration and community transition connect daily operating decisions to the future of the site." },
];
export const deliveryStages = [
  ["Evaluate", "Review the resource, site conditions and development requirements."],
  ["Plan", "Align mine design, infrastructure, equipment and workforce needs."],
  ["Develop", "Coordinate site access, enabling works and production readiness."],
  ["Operate", "Bring excavation, loading, maintenance and grade control into the shift plan."],
  ["Deliver", "Connect stockyards and dispatch to road, rail and port interfaces."],
  ["Restore", "Integrate drainage, landform restoration and progressive rehabilitation."],
];
export const communityAreas = ["Education", "Healthcare", "Skill development", "Local employment", "Community infrastructure", "CSR & livelihoods"];
