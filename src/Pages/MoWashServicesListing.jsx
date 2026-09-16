import { useMemo, useState } from "react";
import { HiMagnifyingGlass, HiOutlineUserGroup } from "react-icons/hi2";
import { MdEngineering, MdOutlineBadge, MdOutlineVerified, MdWorkOutline } from "react-icons/md";
import { workforceDistricts, workforceRoles, getDistrictWorkforce } from "../data/workforceData";

// Aggregate all workers across all Odisha districts once
const allWorkers = workforceDistricts.flatMap((district) => getDistrictWorkforce(district));

const totalWorkforce = allWorkers.length;
const certifiedCount = allWorkers.filter((w) => w.certification && !w.certification.includes("First Aid")).length;
const avgExp = Math.round(allWorkers.reduce((sum, w) => sum + w.experienceYears, 0) / totalWorkforce);
const avgPackageLakh = (allWorkers.reduce((sum, w) => sum + w.lastPackage, 0) / totalWorkforce / 100000).toFixed(1);

function JobRoleCard({ role, workers }) {
  const female = workers.filter((w) => w.gender === "Female").length;
  const maleCount = workers.length - female;
  const femalePercent = Math.round((female / workers.length) * 100);
  const malePercent = 100 - femalePercent;
  const avgYears = (workers.reduce((sum, w) => sum + w.experienceYears, 0) / workers.length).toFixed(1);
  const avgPkg = (workers.reduce((sum, w) => sum + w.lastPackage, 0) / workers.length / 100000).toFixed(1);

  // Top certifications
  const certTally = {};
  workers.forEach((w) => { certTally[w.certification] = (certTally[w.certification] || 0) + 1; });
  const topCerts = Object.entries(certTally).sort((a, b) => b[1] - a[1]).slice(0, 3);

  // Districts
  const districtSet = new Set(workers.map((w) => w.location.split(" / ")[0]));

  return (
    <article className="coral-jobrole-card">
      <header className="coral-jobrole-card__header">
        <span className="coral-jobrole-card__icon"><MdEngineering aria-hidden="true" /></span>
        <div>
          <h3>{role.label}</h3>
          <small>{workers.length} workers across {districtSet.size} district{districtSet.size !== 1 ? "s" : ""}</small>
        </div>
        <strong className="coral-jobrole-card__count">{workers.length}</strong>
      </header>

      <div className="coral-jobrole-card__stats">
        <div>
          <span>Avg. experience</span>
          <strong>{avgYears} yrs</strong>
        </div>
        <div>
          <span>Avg. last package</span>
          <strong>₹{avgPkg}L</strong>
        </div>
        <div>
          <span>Female workforce</span>
          <strong>{femalePercent}%</strong>
        </div>
        <div>
          <span>Male workforce</span>
          <strong>{malePercent}%</strong>
        </div>
      </div>

      <div className="coral-jobrole-card__gender-bar" title={`Male: ${malePercent}% · Female: ${femalePercent}%`}>
        <span style={{ width: `${malePercent}%` }} data-label="M" />
        <span style={{ width: `${femalePercent}%` }} data-label="F" />
      </div>
      <div className="coral-jobrole-card__gender-labels">
        <span>Male ({maleCount})</span>
        <span>Female ({female})</span>
      </div>

      <div className="coral-jobrole-card__certs">
        <small>Top certifications</small>
        <ul>{topCerts.map(([cert, count]) => (
          <li key={cert}><span className="coral-worker-cert">{cert}</span><em>{count}</em></li>
        ))}</ul>
      </div>

      <footer className="coral-jobrole-card__districts">
        <small>Active in:</small>
        <div>{[...districtSet].map((d) => <span key={d}>{d}</span>)}</div>
      </footer>
    </article>
  );
}

function MoWashServicesListing() {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();

  const filteredRoles = useMemo(() => workforceRoles.filter((role) =>
    !normalizedSearch || role.label.toLowerCase().includes(normalizedSearch)
  ), [normalizedSearch]);

  const workersByRole = useMemo(() => {
    const map = {};
    workforceRoles.forEach((role) => { map[role.key] = []; });
    allWorkers.forEach((worker) => { if (map[worker.roleKey]) map[worker.roleKey].push(worker); });
    return map;
  }, []);

  return (
    <div className="coral-jobrole-directory">
      <header className="coral-directory__header">
        <div>
          <span>Workforce · role breakdown</span>
          <h1>Job Role wise</h1>
          <p>Workforce strength, experience, certification coverage, and gender distribution broken down by job role across all operating districts.</p>
        </div>
        <div className="coral-directory__live"><i /> Live register <small>{totalWorkforce} verified workers</small></div>
      </header>

      <section className="coral-directory__metrics" aria-label="Workforce summary">
        <article><span><HiOutlineUserGroup aria-hidden="true" /></span><div><small>Total workforce</small><strong>{totalWorkforce}</strong><em>Across all roles</em></div></article>
        <article><span><MdWorkOutline aria-hidden="true" /></span><div><small>Avg. experience</small><strong>{avgExp} yrs</strong><em>Across workforce</em></div></article>
        <article><span><MdOutlineVerified aria-hidden="true" /></span><div><small>Certified workers</small><strong>{certifiedCount}</strong><em>Specialty certifications</em></div></article>
        <article><span><MdOutlineBadge aria-hidden="true" /></span><div><small>Avg. last package</small><strong>₹{avgPackageLakh}L</strong><em>Per annum</em></div></article>
      </section>

      <section className="coral-directory__panel">
        <div className="coral-directory__panel-heading">
          <div><span>Breakdown</span><h2>Roles register</h2></div>
          <p>Each card summarises one job role's workforce with experience, pay, gender, and certification data.</p>
        </div>

        <div className="coral-directory__toolbar">
          <label className="coral-directory__search">
            <HiMagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a job role…"
              aria-label="Search job role"
            />
          </label>
          <span className="coral-jobrole-count">{filteredRoles.length} role{filteredRoles.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="coral-jobrole-grid">
          {filteredRoles.length > 0 ? filteredRoles.map((role) => (
            <JobRoleCard key={role.key} role={role} workers={workersByRole[role.key] || []} />
          )) : (
            <div className="coral-directory__empty">
              <HiMagnifyingGlass />
              <strong>No roles found</strong>
              <span>Try a different search term.</span>
              <button type="button" onClick={() => setSearch("")}>Clear search</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MoWashServicesListing;
