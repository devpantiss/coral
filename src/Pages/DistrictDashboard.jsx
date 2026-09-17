import { useCallback, useMemo, useRef, useState } from "react";
import {
  HiArrowLeft, HiArrowRight, HiChevronLeft, HiChevronRight,
  HiMagnifyingGlass, HiMapPin,
} from "react-icons/hi2";
import {
  MdEngineering, MdGroups, MdOutlineBadge,
  MdPrecisionManufacturing, MdRefresh,
} from "react-icons/md";
import {
  districtBlocks, getBlockSummaries, workforceDistricts, workforceRoles,
} from "../data/workforceData";
import { useWorkforceSheet } from "../hooks/useWorkforceSheet";
import { SHEET_CONFIGURED } from "../config/sheetsConfig";

// ── Global totals (computed once) ───────────────────────────────────
const workforceTotal = workforceDistricts.reduce((sum, d) => sum + d.total, 0);
const operatorTotal  = workforceDistricts.reduce((sum, d) => sum + d.dumper + d.excavator + d.loader, 0);
const technicalTotal = workforceTotal - operatorTotal;
const rowsPerPage    = 10;

function districtMetrics(district) {
  return {
    operators:     district.dumper + district.excavator + district.loader,
    technical:     district.mechanic + district.electrician + district.welder,
    permanentRate: 67, // placeholder until live data
  };
}

// ── Skeleton row ─────────────────────────────────────────────────────
function SkeletonRow({ cols = 9 }) {
  return (
    <tr className="coral-worker-skeleton-row" aria-hidden="true">
      {Array.from({ length: cols }, (_, i) => (
        <td key={i}><span className="coral-worker-skeleton" /></td>
      ))}
    </tr>
  );
}

// ── Block slider card ────────────────────────────────────────────────
function BlockSliderCard({ block, index, districtName, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`coral-block-slide-card ${isActive ? "is-active" : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <header>
        <span><HiMapPin /> {districtName}</span>
        <em>Block {String(index + 1).padStart(2, "0")}</em>
      </header>
      <h3>{block.name}</h3>
      <div className="coral-block-slide-card__total">
        <strong>{block.total}</strong>
        <span>workers</span>
      </div>
      <dl>
        <div><dt>Operators</dt><dd>{block.operators}</dd></div>
        <div><dt>Technical</dt><dd>{block.technical}</dd></div>
      </dl>
      {isActive && <div className="coral-block-slide-card__active-indicator" />}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────
function DistrictDashboard() {
  const [selectedDistrictName, setSelectedDistrictName] = useState(null);
  const [activeBlockName,      setActiveBlockName]      = useState(null); // null = all blocks
  const [search,               setSearch]               = useState("");
  const [roleFilter,           setRoleFilter]           = useState("all");
  const [currentPage,          setCurrentPage]          = useState(1);
  const sliderRef = useRef(null);

  const selectedDistrict = workforceDistricts.find((d) => d.name === selectedDistrictName);
  const blockSummaries   = useMemo(
    () => selectedDistrict ? getBlockSummaries(selectedDistrict) : [],
    [selectedDistrict],
  );

  // Fetch ALL district workers once; block filter is client-side
  const { workers: allDistrictWorkers, loading, error, refresh } = useWorkforceSheet(selectedDistrict);

  // Client-side block filter (instant, no re-fetch)
  const blockWorkers = useMemo(() => {
    if (!activeBlockName) return allDistrictWorkers;
    return allDistrictWorkers.filter(
      (w) => (w.block || (w.location || "").split(" / ")[1] || "")
        .toLowerCase() === activeBlockName.toLowerCase(),
    );
  }, [allDistrictWorkers, activeBlockName]);

  // Search + role filter on top of block filter
  const filteredWorkers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return blockWorkers.filter((w) => {
      const matchesSearch = !term
        || w.name.toLowerCase().includes(term)
        || w.jobRole.toLowerCase().includes(term)
        || w.location.toLowerCase().includes(term);
      const matchesRole = roleFilter === "all" || w.roleKey === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [blockWorkers, search, roleFilter]);

  const totalPages       = Math.max(1, Math.ceil(filteredWorkers.length / rowsPerPage));
  const pageStart        = (currentPage - 1) * rowsPerPage;
  const paginatedWorkers = filteredWorkers.slice(pageStart, pageStart + rowsPerPage);

  // ── Actions ──────────────────────────────────────────────────────
  const selectDistrict = useCallback((name) => {
    setSelectedDistrictName(name);
    setActiveBlockName(null);
    setSearch("");
    setRoleFilter("all");
    setCurrentPage(1);
  }, []);

  const selectBlock = useCallback((name) => {
    // Toggle: clicking the active block deselects it (shows all)
    setActiveBlockName((prev) => (prev === name ? null : name));
    setSearch("");
    setRoleFilter("all");
    setCurrentPage(1);
  }, []);

  const goBackToDistricts = useCallback(() => {
    setSelectedDistrictName(null);
    setActiveBlockName(null);
    setSearch("");
    setRoleFilter("all");
    setCurrentPage(1);
  }, []);

  // Slider scroll helpers
  const scrollSlider = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const districtView = Boolean(selectedDistrict);

  return (
    <div className="coral-district-dashboard">

      {/* ── Page header ─────────────────────────────────────────── */}
      <header className="coral-district-dashboard__header">
        <div>
          <span>Workforce directory</span>
          <h1>{districtView ? selectedDistrict.name : "District operations"}</h1>
          <p>
            {districtView
              ? activeBlockName
                ? `Showing ${activeBlockName} block workforce · click the card again to see the full district`
                : `All ${selectedDistrict.total} workers across ${blockSummaries.length} blocks — select a block card to filter`
              : "Select a district to review block-level deployment and workforce records."}
          </p>
        </div>
        {districtView && (
          <button type="button" className="coral-district-back-btn" onClick={goBackToDistricts}>
            <HiArrowLeft /> All districts
          </button>
        )}
      </header>

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <nav className="coral-district-breadcrumb" aria-label="District dashboard breadcrumb">
        <button type="button" onClick={goBackToDistricts}>Districts</button>
        {selectedDistrict && (
          <>
            <span>/</span>
            <strong>{selectedDistrict.name}</strong>
          </>
        )}
        {activeBlockName && (
          <>
            <span>/</span>
            <span>{activeBlockName}</span>
          </>
        )}
      </nav>

      {/* ════════════════════════════════════════════════════════════
          DISTRICT LIST VIEW
          ════════════════════════════════════════════════════════════ */}
      {!districtView && (
        <>
          <section className="coral-district-overview" aria-label="Workforce overview">
            <article><span><MdGroups /></span><div><small>Total workforce</small><strong>{workforceTotal}</strong><em>Mapped personnel</em></div></article>
            <article><span><HiMapPin /></span><div><small>Operating districts</small><strong>{String(workforceDistricts.length).padStart(2, "0")}</strong><em>Odisha mining belt</em></div></article>
            <article><span><MdPrecisionManufacturing /></span><div><small>Equipment operators</small><strong>{operatorTotal}</strong><em>{Math.round((operatorTotal / workforceTotal) * 100)}% of workforce</em></div></article>
            <article><span><MdEngineering /></span><div><small>Technical support</small><strong>{technicalTotal}</strong><em>HEMM and welding</em></div></article>
          </section>

          <section className="coral-district-section">
            <div className="coral-district-section__heading">
              <div><span>08 active districts</span><h2>Select a district</h2></div>
              <p>Each card summarizes current mine workforce deployment.</p>
            </div>
            <div className="coral-district-grid">
              {workforceDistricts.map((district, index) => {
                const metrics = districtMetrics(district);
                return (
                  <button
                    className="coral-district-card"
                    type="button"
                    key={district.name}
                    onClick={() => selectDistrict(district.name)}
                  >
                    <header><span><HiMapPin /> Odisha</span><em>{String(index + 1).padStart(2, "00")}</em></header>
                    <h3>{district.name}</h3>
                    <div className="coral-district-card__total"><strong>{district.total}</strong><span>total workers</span></div>
                    <dl>
                      <div><dt>Operators</dt><dd>{metrics.operators}</dd></div>
                      <div><dt>Technical</dt><dd>{metrics.technical}</dd></div>
                      <div><dt>Blocks</dt><dd>{districtBlocks[district.name].length}</dd></div>
                    </dl>
                    <div className="coral-district-card__progress">
                      <span><i style={{ width: `${metrics.permanentRate}%` }} /></span>
                      <small>{metrics.permanentRate}% permanent workforce</small>
                    </div>
                    <footer><span>View blocks &amp; workforce</span><HiArrowRight /></footer>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* ════════════════════════════════════════════════════════════
          DISTRICT DETAIL VIEW  (blocks slider + workforce table)
          ════════════════════════════════════════════════════════════ */}
      {districtView && (
        <>
          {/* ── District summary strip ──────────────────────────── */}
          <div className="coral-district-summary-strip">
            <span><strong>{selectedDistrict.total}</strong><small>Total workers</small></span>
            <span><strong>{districtMetrics(selectedDistrict).operators}</strong><small>Operators</small></span>
            <span><strong>{districtMetrics(selectedDistrict).technical}</strong><small>Technical</small></span>
            <span><strong>{blockSummaries.length}</strong><small>Blocks</small></span>
            {activeBlockName && (
              <button
                type="button"
                className="coral-district-clear-block"
                onClick={() => { setActiveBlockName(null); setCurrentPage(1); }}
              >
                ✕ Clear block filter
              </button>
            )}
          </div>

          {/* ── Block slider ─────────────────────────────────────── */}
          <div className="coral-block-slider-wrap">
            <button
              type="button"
              className="coral-block-slider__arrow coral-block-slider__arrow--left"
              onClick={() => scrollSlider(-1)}
              aria-label="Scroll blocks left"
            >
              <HiChevronLeft />
            </button>

            <div className="coral-block-slider" ref={sliderRef} role="list" aria-label="Block selector">
              {blockSummaries.map((block, index) => (
                <div key={block.name} role="listitem">
                  <BlockSliderCard
                    block={block}
                    index={index}
                    districtName={selectedDistrict.name}
                    isActive={activeBlockName === block.name}
                    onClick={() => selectBlock(block.name)}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="coral-block-slider__arrow coral-block-slider__arrow--right"
              onClick={() => scrollSlider(1)}
              aria-label="Scroll blocks right"
            >
              <HiChevronRight />
            </button>
          </div>

          {/* ── Workforce table ──────────────────────────────────── */}
          <section className="coral-worker-register">

            {/* Source badge */}
            {SHEET_CONFIGURED && (
              <div className="coral-sheet-badge">
                <i className="coral-sheet-badge__dot" />
                Live data · Google Sheets
                <button type="button" onClick={refresh} title="Refresh from Google Sheets" className="coral-sheet-badge__refresh">
                  <MdRefresh />
                </button>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="coral-worker-error" role="alert">
                <strong>Could not load data from Google Sheets</strong>
                <span>{error}</span>
                <button type="button" onClick={refresh}><MdRefresh /> Retry</button>
              </div>
            )}

            {/* Summary strip */}
            <div className="coral-worker-register__summary">
              <div>
                <span><MdOutlineBadge /></span>
                <div>
                  <small>{activeBlockName ? `${activeBlockName} workforce` : "District workforce"}</small>
                  <strong>{loading ? "…" : blockWorkers.length}</strong>
                </div>
              </div>
              <div><small>Operators</small><strong>{blockWorkers.filter((w) => ["dumper", "excavator", "loader"].includes(w.roleKey)).length}</strong></div>
              <div><small>Technical</small><strong>{blockWorkers.filter((w) => ["mechanic", "electrician", "welder"].includes(w.roleKey)).length}</strong></div>
              <div><small>Filtered results</small><strong>{filteredWorkers.length}</strong></div>
            </div>

            {/* Toolbar */}
            <div className="coral-worker-register__toolbar">
              <label>
                <HiMagnifyingGlass />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  placeholder={`Search ${activeBlockName ? activeBlockName : selectedDistrict.name} workforce…`}
                />
              </label>
              <select
                value={roleFilter}
                onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                aria-label="Filter by job role"
              >
                <option value="all">All job roles</option>
                {workforceRoles.map((r) => <option value={r.key} key={r.key}>{r.label}</option>)}
              </select>
              <span>{filteredWorkers.length} results</span>
            </div>

            {/* Table */}
            <div className="coral-worker-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Job Role</th>
                    <th>Location</th>
                    <th>Aadhar</th>
                    <th>Gender</th>
                    <th>Certification</th>
                    <th colSpan={3} className="is-group-header">Experience</th>
                  </tr>
                  <tr className="coral-worker-subheader">
                    <th /><th /><th /><th /><th /><th />
                    <th>Years</th>
                    <th>Companies</th>
                    <th>Last Package</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 6 }, (_, i) => <SkeletonRow key={i} cols={9} />)
                    : paginatedWorkers.map((worker) => (
                        <tr key={worker.id}>
                          <td>
                            <span className="coral-worker-avatar">
                              {worker.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                            </span>
                            <strong>{worker.name}</strong>
                          </td>
                          <td>{worker.jobRole}</td>
                          <td>{worker.location}</td>
                          <td><span className="coral-worker-aadhar">{worker.aadhar}</span></td>
                          <td>{worker.gender}</td>
                          <td><span className="coral-worker-cert">{worker.certification}</span></td>
                          <td className="is-centered">
                            {worker.experienceYears} yr{worker.experienceYears !== 1 ? "s" : ""}
                          </td>
                          <td className="is-centered">{worker.experienceCompanies}</td>
                          <td className="is-numeric">
                            {worker.lastPackage ? `₹${(worker.lastPackage / 100000).toFixed(1)}L` : "—"}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>

              {!loading && !filteredWorkers.length && !error && (
                <div className="coral-worker-empty">
                  <HiMagnifyingGlass />
                  <strong>No workers found</strong>
                  <span>Try changing your search or filters.</span>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && filteredWorkers.length > 0 && (
              <div className="coral-worker-pagination">
                <p>
                  Showing <strong>{pageStart + 1}–{Math.min(pageStart + rowsPerPage, filteredWorkers.length)}</strong> of {filteredWorkers.length} workers
                </p>
                <div>
                  <button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page"><HiChevronLeft /></button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button type="button" className={p === currentPage ? "is-active" : ""} onClick={() => setCurrentPage(p)} aria-current={p === currentPage ? "page" : undefined} key={p}>{p}</button>
                  ))}
                  <button type="button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page"><HiChevronRight /></button>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default DistrictDashboard;
