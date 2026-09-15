import PropTypes from "prop-types";
import { HiOutlineInbox } from "react-icons/hi2";

export function OpportunityHeading({ eyebrow, title, text }) {
  return <header className="op-heading"><p className="coral-eyebrow"><span />{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</header>;
}
OpportunityHeading.propTypes = { eyebrow: PropTypes.string.isRequired, title: PropTypes.string.isRequired, text: PropTypes.string };

export function OpportunityEmpty({ title, text }) {
  return <div className="op-empty" role="status"><HiOutlineInbox aria-hidden="true" /><h3>{title}</h3><p>{text}</p></div>;
}
OpportunityEmpty.propTypes = { title: PropTypes.string.isRequired, text: PropTypes.string.isRequired };

export function StatusFilter({ value, onChange, options, records }) {
  return <div className="op-filters" role="group" aria-label="Filter notices by status">{options.map(option => <button key={option} type="button" aria-pressed={value === option} onClick={() => onChange(option)}>{option}<span>{records.filter(record => option === "All" || record.status === option).length}</span></button>)}</div>;
}
StatusFilter.propTypes = { value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired, options: PropTypes.arrayOf(PropTypes.string).isRequired, records: PropTypes.arrayOf(PropTypes.shape({ status: PropTypes.string.isRequired })).isRequired };
