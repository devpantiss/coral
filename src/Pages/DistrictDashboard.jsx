import { useMemo, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiChevronLeft, HiChevronRight, HiMagnifyingGlass, HiMapPin } from "react-icons/hi2";
import { MdEngineering, MdGroups, MdOutlineBadge, MdPrecisionManufacturing } from "react-icons/md";
import { districtBlocks, getBlockSummaries, getBlockWorkforce, getDistrictWorkforce, workforceDistricts, workforceRoles } from "../data/workforceData";

const workforceTotal = workforceDistricts.reduce((sum, district) => sum + district.total, 0);
const operatorTotal = workforceDistricts.reduce((sum, district) => sum + district.dumper + district.excavator + district.loader, 0);
const technicalTotal = workforceTotal - operatorTotal;
const rowsPerPage = 10;

function districtMetrics(district) {
  const records = getDistrictWorkforce(district);
  const permanent = records.filter((worker) => worker.employmentStatus === "Permanent").length;
  return {
    operators: district.dumper + district.excavator + district.loader,
    technical: district.mechanic + district.electrician + district.welder,
    permanent,
    permanentRate: Math.round((permanent / district.total) * 100),
  };
}

function DistrictDashboard() {
  const [selectedDistrictName, setSelectedDistrictName] = useState(null);
  const [selectedBlockName, setSelectedBlockName] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const selectedDistrict = workforceDistricts.find((district) => district.name === selectedDistrictName);
  const blockSummaries = useMemo(() => selectedDistrict ? getBlockSummaries(selectedDistrict) : [], [selectedDistrict]);
  const workers = useMemo(() => selectedDistrict && selectedBlockName ? getBlockWorkforce(selectedDistrict, selectedBlockName) : [], [selectedDistrict, selectedBlockName]);
  const filteredWorkers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return workers.filter((worker) => {
      const matchesSearch = !term || worker.name.toLowerCase().includes(term) || worker.jobRole.toLowerCase().includes(term);
      const matchesRole = roleFilter === "all" || worker.roleKey === roleFilter;
      const matchesStatus = statusFilter === "all" || worker.employmentStatus === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [workers, search, roleFilter, statusFilter]);
  const totalPages = Math.max(1, Math.ceil(filteredWorkers.length / rowsPerPage));
  const pageStart = (currentPage - 1) * rowsPerPage;
  const paginatedWorkers = filteredWorkers.slice(pageStart, pageStart + rowsPerPage);

  const selectDistrict = (districtName) => {
    setSelectedDistrictName(districtName);
    setSelectedBlockName(null);
  };

  const selectBlock = (blockName) => {
    setSelectedBlockName(blockName);
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const goBack = () => {
    if (selectedBlockName) setSelectedBlockName(null);
    else setSelectedDistrictName(null);
  };

  const level = selectedBlockName ? "workers" : selectedDistrict ? "blocks" : "districts";

  return (
    <div className="coral-district-dashboard">
      <header className="coral-district-dashboard__header">
        <div>
          <span>Workforce directory</span>
          <h1>{level === "districts" ? "District operations" : level === "blocks" ? selectedDistrict.name : selectedBlockName}</h1>
          <p>{level === "districts" ? "Select a district to review block-level deployment and workforce records." : level === "blocks" ? `Select a block in ${selectedDistrict.name} to open its worker register.` : `${selectedDistrict.name} / ${selectedBlockName} workforce register`}</p>
        </div>
        {level !== "districts" && <button type="button" onClick={goBack}><HiArrowLeft /> {level === "workers" ? "Back to blocks" : "All districts"}</button>}
      </header>

      <nav className="coral-district-breadcrumb" aria-label="District dashboard breadcrumb">
        <button type="button" onClick={() => { setSelectedDistrictName(null); setSelectedBlockName(null); }}>Districts</button>
        {selectedDistrict && <><span>/</span><button type="button" onClick={() => setSelectedBlockName(null)}>{selectedDistrict.name}</button></>}
        {selectedBlockName && <><span>/</span><strong>{selectedBlockName}</strong></>}
      </nav>

      {level === "districts" && (
        <>
          <section className="coral-district-overview" aria-label="Workforce overview">
            <article><span><MdGroups /></span><div><small>Total workforce</small><strong>{workforceTotal}</strong><em>Mapped personnel</em></div></article>
            <article><span><HiMapPin /></span><div><small>Operating districts</small><strong>{String(workforceDistricts.length).padStart(2, "0")}</strong><em>Odisha mining belt</em></div></article>
            <article><span><MdPrecisionManufacturing /></span><div><small>Equipment operators</small><strong>{operatorTotal}</strong><em>{Math.round((operatorTotal / workforceTotal) * 100)}% of workforce</em></div></article>
            <article><span><MdEngineering /></span><div><small>Technical support</small><strong>{technicalTotal}</strong><em>HEMM and welding</em></div></article>
          </section>

          <section className="coral-district-section">
            <div className="coral-district-section__heading"><div><span>08 active districts</span><h2>Select a district</h2></div><p>Each card summarizes current mine workforce deployment.</p></div>
            <div className="coral-district-grid">
              {workforceDistricts.map((district, index) => {
                const metrics = districtMetrics(district);
                return (
                  <button className="coral-district-card" type="button" key={district.name} onClick={() => selectDistrict(district.name)}>
                    <header><span><HiMapPin /> Odisha</span><em>{String(index + 1).padStart(2, "0")}</em></header>
                    <h3>{district.name}</h3>
                    <div className="coral-district-card__total"><strong>{district.total}</strong><span>total workers</span></div>
                    <dl><div><dt>Operators</dt><dd>{metrics.operators}</dd></div><div><dt>Technical</dt><dd>{metrics.technical}</dd></div><div><dt>Blocks</dt><dd>{districtBlocks[district.name].length}</dd></div></dl>
                    <div className="coral-district-card__progress"><span><i style={{ width: `${metrics.permanentRate}%` }} /></span><small>{metrics.permanentRate}% permanent workforce</small></div>
                    <footer><span>View blocks</span><HiArrowRight /></footer>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      {level === "blocks" && (
        <section className="coral-district-section coral-block-section">
          <div className="coral-district-section__heading"><div><span>{blockSummaries.length} operating blocks</span><h2>Blocks in {selectedDistrict.name}</h2></div><div className="coral-district-context"><span>{selectedDistrict.total}<small>District workforce</small></span><span>{districtMetrics(selectedDistrict).operators}<small>Operators</small></span><span>{districtMetrics(selectedDistrict).technical}<small>Technical</small></span></div></div>
          <div className="coral-block-grid">
            {blockSummaries.map((block, index) => {
              const blockWorkers = getBlockWorkforce(selectedDistrict, block.name);
              const permanent = blockWorkers.filter((worker) => worker.employmentStatus === "Permanent").length;
              const permanentRate = Math.round((permanent / block.total) * 100);
              return (
                <button className="coral-district-card coral-block-card--district" type="button" key={block.name} onClick={() => selectBlock(block.name)}>
                  <header><span><HiMapPin /> {selectedDistrict.name}</span><em>Block {String(index + 1).padStart(2, "0")}</em></header>
                  <h3>{block.name}</h3>
                  <div className="coral-district-card__total"><strong>{block.total}</strong><span>deployed workers</span></div>
                  <dl><div><dt>Operators</dt><dd>{block.operators}</dd></div><div><dt>Technical</dt><dd>{block.technical}</dd></div><div><dt>Permanent</dt><dd>{permanent}</dd></div></dl>
                  <div className="coral-district-card__progress"><span><i style={{ width: `${permanentRate}%` }} /></span><small>{permanentRate}% permanent workforce</small></div>
                  <footer><span>Open worker register</span><HiArrowRight /></footer>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {level === "workers" && (
        <section className="coral-worker-register">
          <div className="coral-worker-register__summary">
            <div><span><MdOutlineBadge /></span><div><small>Registered workforce</small><strong>{workers.length}</strong></div></div>
            <div><small>Operators</small><strong>{workers.filter((worker) => ["dumper", "excavator", "loader"].includes(worker.roleKey)).length}</strong></div>
            <div><small>Technical</small><strong>{workers.filter((worker) => ["mechanic", "electrician", "welder"].includes(worker.roleKey)).length}</strong></div>
            <div><small>Permanent</small><strong>{workers.filter((worker) => worker.employmentStatus === "Permanent").length}</strong></div>
          </div>

          <div className="coral-worker-register__toolbar">
            <label><HiMagnifyingGlass /><input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }} placeholder="Search name or job role" /></label>
            <select value={roleFilter} onChange={(event) => { setRoleFilter(event.target.value); setCurrentPage(1); }} aria-label="Filter by job role"><option value="all">All job roles</option>{workforceRoles.map((role) => <option value={role.key} key={role.key}>{role.label}</option>)}</select>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setCurrentPage(1); }} aria-label="Filter by employment status"><option value="all">All employment</option><option>Permanent</option><option>Contract</option><option>Apprentice</option></select>
            <span>{filteredWorkers.length} results</span>
          </div>

          <div className="coral-worker-table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Job role</th><th>Age</th><th>Gender</th><th>Employment status</th></tr></thead>
              <tbody>{paginatedWorkers.map((worker) => <tr key={worker.id}><td><span className="coral-worker-avatar">{worker.name.split(" ").map((part) => part[0]).join("")}</span><strong>{worker.name}</strong></td><td>{worker.jobRole}</td><td>{worker.age}</td><td>{worker.gender}</td><td><span className={`coral-worker-status is-${worker.employmentStatus.toLowerCase()}`}>{worker.employmentStatus}</span></td></tr>)}</tbody>
            </table>
            {!filteredWorkers.length && <div className="coral-worker-empty"><HiMagnifyingGlass /><strong>No workers found</strong><span>Try changing your search or filters.</span></div>}
          </div>
          {!!filteredWorkers.length && <div className="coral-worker-pagination"><p>Showing <strong>{pageStart + 1}–{Math.min(pageStart + rowsPerPage, filteredWorkers.length)}</strong> of {filteredWorkers.length} workers</p><div><button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} aria-label="Previous page"><HiChevronLeft /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" className={page === currentPage ? "is-active" : ""} onClick={() => setCurrentPage(page)} aria-label={`Page ${page}`} aria-current={page === currentPage ? "page" : undefined} key={page}>{page}</button>)}<button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} aria-label="Next page"><HiChevronRight /></button></div></div>}
        </section>
      )}
    </div>
  );
}

export default DistrictDashboard;
