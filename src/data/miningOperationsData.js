export const miningCapabilities = [
  {
    id: "land-acquisition",
    number: "01",
    title: "Land Acquisition",
    description: "Responsible land aggregation and stakeholder coordination that prepare projects for long-term success.",
    serviceLines: ["Land records & due diligence", "Stakeholder engagement", "Community consultation"],
    worksCompleted: 148,
    activeProjects: 18,
    completionRate: 86,
    unit: "parcels cleared",
  },
  {
    id: "workforce-mining",
    number: "02",
    title: "Work Force in Mining",
    description: "Skilled, safety-led teams that bring dependable capability to every stage of mine operations.",
    serviceLines: ["Recruitment & skills assessment", "Safety induction", "Deployment planning"],
    worksCompleted: 1264,
    activeProjects: 26,
    completionRate: 92,
    unit: "shifts delivered",
  },
  {
    id: "mining-equipments",
    number: "03",
    title: "Mining Equipments",
    description: "Fit-for-purpose equipment and fleet support engineered for productivity in demanding conditions.",
    serviceLines: ["Fleet onboarding", "Operator authorization", "Maintenance readiness"],
    worksCompleted: 386,
    activeProjects: 14,
    completionRate: 89,
    unit: "equipment jobs closed",
  },
  {
    id: "mine-repurposing",
    number: "04",
    title: "Mine Repurposing",
    description: "Thoughtful closure and adaptive reuse strategies that give former mine sites a productive next chapter.",
    serviceLines: ["Closure planning", "Progressive reclamation", "Community transition"],
    worksCompleted: 74,
    activeProjects: 9,
    completionRate: 78,
    unit: "restoration works completed",
  },
];

export const totalWorksCompleted = miningCapabilities.reduce((total, capability) => total + capability.worksCompleted, 0);
export const activeProjectCount = miningCapabilities.reduce((total, capability) => total + capability.activeProjects, 0);
