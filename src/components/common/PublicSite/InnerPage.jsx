import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HiArrowDown, HiChevronRight, HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

function InnerPage({ eyebrow, title, accent, intro, image, imageAlt, children }) {
  return <main className="coral-inner-page"><PublicHeader /><section className={`coral-inner-hero ${!image ? "coral-inner-hero--text" : ""}`}><div className="coral-inner-hero__texture" aria-hidden="true" /><div className="coral-shell coral-inner-hero__content"><nav className="coral-inner-hero__breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><HiChevronRight /><span>{eyebrow}</span></nav><p className="coral-eyebrow"><span /> {eyebrow}</p><h1>{title}<br /><em>{accent}</em></h1><p>{intro}</p><a className="coral-inner-hero__scroll" href="#page-content" aria-label="Continue to page content"><HiArrowDown /><span>Explore page</span></a></div>{image && <div className="coral-inner-hero__media"><img src={image} alt={imageAlt} /><span className="coral-inner-hero__media-shade" aria-hidden="true" /><div className="coral-inner-hero__media-note"><HiOutlineGlobeAsiaAustralia /><div><small>Coral operating system</small><strong>Mine · Move · Restore</strong></div></div><div className="coral-inner-hero__media-index" aria-hidden="true"><span>01</span><i /><span>04</span></div></div>}<div className="coral-inner-hero__rail" aria-hidden="true"><span>Integrated capability</span><i /><span>Responsible delivery</span></div></section><div id="page-content">{children}</div><PublicFooter /></main>;
}

InnerPage.propTypes = { eyebrow: PropTypes.string.isRequired, title: PropTypes.string.isRequired, accent: PropTypes.string.isRequired, intro: PropTypes.string.isRequired, image: PropTypes.string, imageAlt: PropTypes.string, children: PropTypes.node.isRequired };

export default InnerPage;
