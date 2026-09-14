import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { HiArrowLeft, HiOutlineMapPin, HiOutlineUsers, HiOutlineTruck, HiOutlineSparkles } from "react-icons/hi2";
import { getDistrictMine, mineImpactSegments } from "../../data/footprintData";
import "./MineImpactPanel.css";

const segmentIcons = [HiOutlineMapPin, HiOutlineUsers, HiOutlineTruck, HiOutlineSparkles];

export default function MineImpactPanel({ stateName, district, onBack }) {
  const mine = getDistrictMine(stateName, district);
  const backButton = useRef(null);

  useEffect(() => {
    backButton.current?.focus({ preventScroll: true });
  }, [stateName, district]);

  return <div className="coral-mine-detail">
    <button ref={backButton} className="coral-mine-detail__back" type="button" onClick={onBack}>
      <HiArrowLeft aria-hidden="true" /> All {stateName} districts
    </button>
    <figure className="coral-mine-detail__image">
      <img key={mine.image} src={mine.image} alt={mine.imageAlt} width="720" height="450" />
      {mine.isSample && <figcaption>Illustrative mine image</figcaption>}
    </figure>
    {mine.source && <details className="coral-mine-detail__credit"><summary>Photo credit</summary><p>{mine.credit} · <a href={mine.source} target="_blank" rel="noreferrer">Wikimedia Commons</a> · <a href={mine.licenseUrl} target="_blank" rel="noreferrer">{mine.license}</a></p></details>}
    <p className="coral-mine-detail__location"><HiOutlineMapPin aria-hidden="true" /> {district}, {stateName}</p>
    <h3>{mine.name}</h3>
    {mine.isSample && <p className="coral-mine-detail__note">Sample mine profile · Illustrative impact figures</p>}
    <div className="coral-mine-detail__impact-heading"><h4>Our impact</h4><span>Across four capabilities</span></div>
    <dl className="coral-mine-detail__metrics">
      {mineImpactSegments.map((segment, index) => {
        const Icon = segmentIcons[index];
        return <div className={`coral-mine-detail__stat coral-mine-detail__stat--${segment.key}`} key={segment.key}>
          <dt><span className="coral-mine-detail__stat-icon"><Icon aria-hidden="true" /></span><span>{segment.label}</span></dt>
          <dd><strong>{mine.impact[segment.key].toLocaleString("en-IN")}</strong><span>{segment.unit}</span></dd>
        </div>;
      })}
    </dl>
  </div>;
}

MineImpactPanel.propTypes = {
  stateName: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};
