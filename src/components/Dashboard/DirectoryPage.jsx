import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { HiChevronLeft, HiChevronRight, HiMagnifyingGlass, HiOutlineAdjustmentsHorizontal, HiOutlineInbox } from "react-icons/hi2";

const PAGE_SIZE = 12;

function DirectoryPage({ eyebrow, title, description, items, columns, metrics, entityLabel, searchPlaceholder }) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [page, setPage] = useState(1);

  const districts = useMemo(() => [...new Set(items.map((item) => item.district))].sort(), [items]);
  const blocks = useMemo(() => [...new Set(items.filter((item) => !district || item.district === district).map((item) => item.block))].sort(), [items, district]);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery = !normalizedQuery || Object.values(item).some((value) => String(value).toLowerCase().includes(normalizedQuery));
      return matchesQuery && (!district || item.district === district) && (!block || item.block === block);
    });
  }, [items, query, district, block]);

  useEffect(() => setPage(1), [query, district, block]);
  useEffect(() => {
    if (block && !blocks.includes(block)) setBlock("");
  }, [block, blocks]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const resultStart = filteredItems.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const resultEnd = Math.min(currentPage * PAGE_SIZE, filteredItems.length);
  const hasFilters = Boolean(query || district || block);

  const clearFilters = () => {
    setQuery("");
    setDistrict("");
    setBlock("");
  };

  return (
    <div className="coral-directory">
      <header className="coral-directory__header">
        <div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
        <div className="coral-directory__live"><i /> Live directory <small>{items.length} verified records</small></div>
      </header>

      <section className="coral-directory__metrics" aria-label={`${title} summary`}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return <article key={metric.label}><span><Icon aria-hidden="true" /></span><div><small>{metric.label}</small><strong>{metric.value}</strong><em>{metric.detail}</em></div></article>;
        })}
      </section>

      <section className="coral-directory__panel">
        <div className="coral-directory__panel-heading">
          <div><span>Directory</span><h2>{entityLabel} register</h2></div>
          <p>Search the full register or narrow coverage by district and block.</p>
        </div>

        <div className="coral-directory__toolbar">
          <label className="coral-directory__search">
            <HiMagnifyingGlass aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label={`Search ${entityLabel}`} />
          </label>
          <label><span>District</span><select value={district} onChange={(event) => setDistrict(event.target.value)}><option value="">All districts</option>{districts.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label><span>Block / ULB</span><select value={block} onChange={(event) => setBlock(event.target.value)}><option value="">All blocks</option>{blocks.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <button type="button" onClick={clearFilters} disabled={!hasFilters}><HiOutlineAdjustmentsHorizontal aria-hidden="true" /> Reset</button>
        </div>

        <div className="coral-directory__results"><p>Showing <strong>{resultStart}–{resultEnd}</strong> of {filteredItems.length} {entityLabel.toLowerCase()}</p>{hasFilters && <span>Filtered view</span>}</div>

        <div className="coral-directory__table-wrap">
          <table>
            <thead><tr><th scope="col">#</th>{columns.map((column) => <th scope="col" className={column.align === "center" ? "is-centered" : ""} key={column.key}>{column.label}</th>)}</tr></thead>
            <tbody>
              {pageItems.map((item, rowIndex) => (
                <tr key={item.id}>
                  <td>{String((currentPage - 1) * PAGE_SIZE + rowIndex + 1).padStart(2, "0")}</td>
                  {columns.map((column) => {
                    const value = item[column.key];
                    return <td className={`${column.kind ? `is-${column.kind}` : ""} ${column.align === "center" ? "is-centered" : ""}`} key={column.key}>{column.kind === "status" ? <span className={`coral-directory-status is-${String(value).toLowerCase()}`}><i />{value}</span> : value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {!pageItems.length && <div className="coral-directory__empty"><HiOutlineInbox /><strong>No matching records</strong><span>Try changing or clearing the active filters.</span><button type="button" onClick={clearFilters}>Clear filters</button></div>}
        </div>

        <div className="coral-directory__pagination">
          <span>Page {currentPage} of {totalPages}</span>
          <div>
            <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} aria-label="Previous page"><HiChevronLeft /></button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => <button type="button" className={pageNumber === currentPage ? "is-active" : ""} onClick={() => setPage(pageNumber)} aria-current={pageNumber === currentPage ? "page" : undefined} key={pageNumber}>{pageNumber}</button>)}
            <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages} aria-label="Next page"><HiChevronRight /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

const metricShape = PropTypes.shape({ icon: PropTypes.elementType.isRequired, label: PropTypes.string.isRequired, value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, detail: PropTypes.string.isRequired });
const columnShape = PropTypes.shape({ key: PropTypes.string.isRequired, label: PropTypes.string.isRequired, kind: PropTypes.string, align: PropTypes.string });

DirectoryPage.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(columnShape).isRequired,
  metrics: PropTypes.arrayOf(metricShape).isRequired,
  entityLabel: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
};

export default DirectoryPage;
