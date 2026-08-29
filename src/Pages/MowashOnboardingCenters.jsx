import { MdGroups, MdLocationOn, MdOutlineBusinessCenter, MdVerified } from "react-icons/md";
import DirectoryPage from "../components/Dashboard/DirectoryPage";
import { miningCapabilities, totalWorksCompleted } from "../data/miningOperationsData";

const districts = [
  ["Angul", ["Talcher", "Kaniha", "Chhendipada"]], ["Cuttack", ["Niali", "Banki", "Tigiria"]], ["Bhadrak", ["Basudevpur", "Chandabali", "Tihidi"]], ["Jajpur", ["Rasulpur", "Korei", "Danagadi"]], ["Kalahandi", ["Bhawanipatna", "Kesinga", "Junagarh"]],
  ["Kandhamal", ["Phulbani", "Balliguda", "Raikia"]], ["Koraput", ["Jeypore", "Borigumma", "Laxmipur"]], ["Nuapada", ["Khariar", "Komna", "Boden"]], ["Sundargarh", ["Rajgangpur", "Koida", "Lahunipara"]], ["Puri", ["Pipili", "Nimapara", "Satyabadi"]],
];
const coordinators = ["Ananya Das", "Rakesh Behera", "Priya Sahu", "Sanjay Nayak", "Mitali Jena", "Amit Patra"];

const onboardingCenters = districts.flatMap(([district, blocks], districtIndex) => Array.from({ length: 10 }, (_, index) => {
  const block = blocks[index % blocks.length];
  const centerNumber = districtIndex * 10 + index + 1;
  const capability = miningCapabilities[(districtIndex + index) % miningCapabilities.length];
  const worksDone = 3 + ((districtIndex * 5 + index * 3) % 17);
  return { id: `center-${centerNumber}`, district, block, center: `${block} Project Liaison Hub`, programme: capability.title, track: capability.serviceLines[index % capability.serviceLines.length], worksDone, providers: 14 + ((districtIndex * 9 + index * 7) % 48), coordinator: coordinators[(districtIndex + index) % coordinators.length], status: index % 9 === 0 ? "Launching" : "Active" };
}));

const columns = [
  { key: "district", label: "District" }, { key: "block", label: "Block / ULB" }, { key: "center", label: "Project onboarding hub" }, { key: "programme", label: "Lifecycle capability" }, { key: "track", label: "Onboarding focus" }, { key: "worksDone", label: "Works done", align: "center" }, { key: "status", label: "Status", kind: "status" },
];

function MowashOnboardingCenters() {
  const activeCenters = onboardingCenters.filter((center) => center.status === "Active").length;
  const hubWorks = onboardingCenters.reduce((total, center) => total + center.worksDone, 0);
  return <DirectoryPage eyebrow="What we do · project readiness" title="Project onboarding hubs" description="Local project touchpoints that connect land, workforce, equipment, and responsible mine-transition activities." items={onboardingCenters} columns={columns} entityLabel="hubs" searchPlaceholder="Search a hub, capability, or district" metrics={[
    { icon: MdOutlineBusinessCenter, label: "Project hubs", value: onboardingCenters.length, detail: "Across 10 districts" }, { icon: MdLocationOn, label: "Active coverage", value: `${activeCenters}%`, detail: "Hubs currently operating" }, { icon: MdGroups, label: "Hub works done", value: hubWorks.toLocaleString(), detail: "Local delivery activities" }, { icon: MdVerified, label: "Portfolio works", value: totalWorksCompleted.toLocaleString(), detail: "Across all capabilities" },
  ]} />;
}

export default MowashOnboardingCenters;
