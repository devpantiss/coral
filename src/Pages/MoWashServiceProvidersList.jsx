import { MdEngineering, MdGroups, MdHandshake, MdOutlineVerified } from "react-icons/md";
import DirectoryPage from "../components/Dashboard/DirectoryPage";
import { miningCapabilities, totalWorksCompleted } from "../data/miningOperationsData";

const districts = [["Angul", "Talcher"], ["Cuttack", "Niali"], ["Bhadrak", "Basudevpur"], ["Jajpur", "Korei"], ["Jharsuguda", "Lakhanpur"], ["Kalahandi", "Bhawanipatna"], ["Kandhamal", "Phulbani"], ["Koraput", "Jeypore"], ["Nuapada", "Khariar"], ["Sundargarh", "Rajgangpur"]];
const names = ["Anil Kumar", "Suman Singh", "Deepak Reddy", "Priya Sharma", "Ravi Patnaik", "Arjun Das", "Neha Jaiswal", "Sunita Mohanty", "Amit Mishra", "Rohit Panda", "Sanjay Behera", "Sneha Sahu", "Rajeev Swain", "Alok Mahapatra", "Kajal Nayak"];

const serviceProviders = Array.from({ length: 100 }, (_, index) => {
  const [district, primaryBlock] = districts[index % districts.length];
  const capability = miningCapabilities[index % miningCapabilities.length];
  const worksDone = 6 + ((index * 7) % 36);
  return { id: `provider-${index + 1}`, district, block: index % 3 === 0 ? `${primaryBlock} ULB` : primaryBlock, provider: names[index % names.length], pillar: capability.title, expertise: capability.serviceLines[index % capability.serviceLines.length], worksDone, onboarding: `Jan ${String((index % 28) + 1).padStart(2, "0")}, 2024`, status: index % 13 === 0 ? "Review" : "Verified" };
});

const columns = [{ key: "provider", label: "Team member" }, { key: "pillar", label: "Lifecycle capability" }, { key: "expertise", label: "Field specialty" }, { key: "district", label: "District" }, { key: "worksDone", label: "Works done", align: "center" }, { key: "onboarding", label: "Onboarded" }, { key: "status", label: "Status", kind: "status" }];

function MoWashServiceProvidersList() {
  const verified = serviceProviders.filter((provider) => provider.status === "Verified").length;
  const pillarCount = new Set(serviceProviders.map((provider) => provider.pillar)).size;
  const fieldWorks = serviceProviders.reduce((total, provider) => total + provider.worksDone, 0);
  return <DirectoryPage eyebrow="What we do · field capability" title="Mining workforce" description="The field teams that deliver every stage of the mining lifecycle—from project preparation and equipment readiness to responsible closure." items={serviceProviders} columns={columns} entityLabel="team members" searchPlaceholder="Search a team member, specialty, or capability" metrics={[
    { icon: MdEngineering, label: "Registered workforce", value: serviceProviders.length, detail: "Available for deployment" }, { icon: MdOutlineVerified, label: "Verified profiles", value: `${verified}%`, detail: "Records ready for assignment" }, { icon: MdHandshake, label: "Field works done", value: fieldWorks.toLocaleString(), detail: "Completed by active teams" }, { icon: MdGroups, label: "Portfolio works", value: totalWorksCompleted.toLocaleString(), detail: `${pillarCount} lifecycle capabilities` },
  ]} />;
}

export default MoWashServiceProvidersList;
