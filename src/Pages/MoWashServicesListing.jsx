import { HiOutlineArrowPath, HiOutlineMap, HiOutlineTruck, HiOutlineUserGroup } from "react-icons/hi2";
import { activeProjectCount, miningCapabilities, totalWorksCompleted } from "../data/miningOperationsData";

const capabilityIcons = [HiOutlineMap, HiOutlineUserGroup, HiOutlineTruck, HiOutlineArrowPath];

function MoWashServicesListing() {
  return (
    <div className="coral-capability-directory">
      <header className="coral-directory__header">
        <div><span>What we do · integrated capability</span><h1>Mining services</h1><p>A delivery view of the completed works, live projects, and operational progress across the full mining lifecycle.</p></div>
        <div className="coral-directory__live"><i /> Integrated delivery <small>4 core capabilities</small></div>
      </header>
      <section className="coral-capability-directory__summary" aria-label="Mining service summary">
        <article><strong>{miningCapabilities.length}</strong><span>Core capabilities</span></article><article><strong>{totalWorksCompleted.toLocaleString()}</strong><span>Works completed</span></article><article><strong>{activeProjectCount}</strong><span>Active projects</span></article><article><strong>86%</strong><span>Portfolio completion</span></article>
      </section>
      <section className="coral-capability-directory__panel" aria-labelledby="capability-register-title">
        <div className="coral-directory__panel-heading"><div><span>Capability register</span><h2 id="capability-register-title">Our expertise</h2></div><p>The same focus areas featured in the public “What We Do” section, structured for operational use.</p></div>
        <div className="coral-capability-directory__grid">
          {miningCapabilities.map((capability, index) => {
            const Icon = capabilityIcons[index];
            return <article className="coral-capability-directory__card" key={capability.title}><header><span>{capability.number}</span><Icon aria-hidden="true" /></header><h3>{capability.title}</h3><p>{capability.description}</p><div className="coral-capability-directory__work"><strong>{capability.worksCompleted}</strong><span>{capability.unit}</span><small>{capability.activeProjects} active projects · {capability.completionRate}% complete</small></div><ul>{capability.serviceLines.map((service) => <li key={service}>{service}</li>)}</ul><footer><span>Lifecycle capability</span><strong>Active</strong></footer></article>;
          })}
        </div>
      </section>
    </div>
  );
}

export default MoWashServicesListing;
