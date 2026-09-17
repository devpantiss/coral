import { MdEngineering, MdGroups, MdLocationOn, MdOutlineBusinessCenter, MdVerified } from "react-icons/md";
import DirectoryPage from "../components/Dashboard/DirectoryPage";
import { districtBlocks, workforceRoles } from "../data/workforceData";

// ── One onboarding center per block ─────────────────────────────────
const coordinators = [
  "Ananya Das", "Rakesh Behera", "Priya Sahu", "Sanjay Nayak",
  "Mitali Jena", "Amit Patra", "Sunita Mahapatra", "Deepak Pradhan",
  "Kavitha Rao", "Biswajit Mohanty", "Rekha Swain", "Tapas Sahoo",
];

const trainingTracks = [
  ["Dumper / Tipper Operation", "HEMM Safety Level-I"],
  ["Excavator Operation", "HEMM Safety Level-II"],
  ["Loader Operation", "ISO 45001 Safety"],
  ["HEMM Maintenance", "Mine Foreman Certificate"],
  ["Electrical Systems", "DGMS Winding Engine Driver"],
  ["Mine Welding", "Gas Testing Certificate"],
  ["Dumper Operation", "Blasting Certificate"],
  ["Multi-role HEMM", "HEMM Safety Level-I"],
];

const centerTypes = [
  "Block Operator Training Hub",
  "HEMM Skills Development Centre",
  "Mine Operator Induction Centre",
  "Mining Skills Academy",
];

let centerIndex = 0;
export const onboardingCenters = Object.entries(districtBlocks).flatMap(([district, blocks]) =>
  blocks.map((block) => {
    const seed      = centerIndex;
    const capacity  = 20 + (seed * 7) % 41;          // 20–60
    const enrolled  = Math.round(capacity * (0.55 + (seed * 13) % 36 / 100)); // 55–90%
    const graduated = Math.round(enrolled * (0.6 + (seed * 17) % 36 / 100));
    const tracks    = trainingTracks[seed % trainingTracks.length];
    const type      = centerTypes[seed % centerTypes.length];
    const coord     = coordinators[seed % coordinators.length];
    const status    = seed % 11 === 0 ? "Launching" : "Active";
    centerIndex++;
    return {
      id:          `obc-${district.toLowerCase().replace(/\s+/g, "-")}-${block.toLowerCase().replace(/\s+/g, "-")}`,
      district,
      block,
      centerName:  `${block} ${type}`,
      coordinator: coord,
      primaryTrack: tracks[0],
      certTrack:   tracks[1],
      capacity,
      enrolled,
      graduated,
      status,
    };
  })
);

const totalEnrolled  = onboardingCenters.reduce((s, c) => s + c.enrolled,  0);
const totalGraduated = onboardingCenters.reduce((s, c) => s + c.graduated, 0);
const activeCenters  = onboardingCenters.filter((c) => c.status === "Active").length;

const columns = [
  { key: "district",     label: "District" },
  { key: "block",        label: "Block" },
  { key: "centerName",   label: "Onboarding Centre" },
  { key: "coordinator",  label: "Coordinator" },
  { key: "primaryTrack", label: "Primary Training" },
  { key: "certTrack",    label: "Certification Track" },
  { key: "capacity",     label: "Capacity", align: "center" },
  { key: "enrolled",     label: "Enrolled", align: "center" },
  { key: "graduated",    label: "Graduated", align: "center" },
  { key: "status",       label: "Status", kind: "status" },
];

function MowashOnboardingCenters() {
  return (
    <DirectoryPage
      eyebrow="Workforce · operator readiness"
      title="Operators Onboarding Centres"
      description="One dedicated operator training and onboarding centre per block — building certified HEMM operators across all active mining districts."
      items={onboardingCenters}
      columns={columns}
      entityLabel="centres"
      searchPlaceholder="Search a centre, block, coordinator, or training track…"
      metrics={[
        { icon: MdOutlineBusinessCenter, label: "Total centres",    value: onboardingCenters.length, detail: `${activeCenters} currently active` },
        { icon: MdLocationOn,            label: "Districts covered", value: Object.keys(districtBlocks).length, detail: "Mining belt coverage" },
        { icon: MdGroups,                label: "Operators enrolled", value: totalEnrolled.toLocaleString(), detail: "Across all centres" },
        { icon: MdVerified,              label: "Certified graduates", value: totalGraduated.toLocaleString(), detail: "HEMM ready operators" },
        { icon: MdEngineering,           label: "Training tracks",   value: workforceRoles.length * 2, detail: "Role × certification pairs" },
      ]}
    />
  );
}

export default MowashOnboardingCenters;
