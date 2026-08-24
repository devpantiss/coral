import PropTypes from "prop-types";
import { HiArrowDown } from "react-icons/hi2";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

function InnerPage({ eyebrow, title, accent, intro, image, imageAlt, children }) {
  return <main className="coral-inner-page"><PublicHeader /><section className={`coral-inner-hero ${!image ? "coral-inner-hero--text" : ""}`}><div className="coral-shell coral-inner-hero__content"><p className="coral-eyebrow"><span /> {eyebrow}</p><h1>{title}<br /><em>{accent}</em></h1><p>{intro}</p><a href="#page-content" aria-label="Continue to page content"><HiArrowDown /></a></div>{image && <div className="coral-inner-hero__media"><img src={image} alt={imageAlt} /></div>}</section><div id="page-content">{children}</div><PublicFooter /></main>;
}

InnerPage.propTypes = { eyebrow: PropTypes.string.isRequired, title: PropTypes.string.isRequired, accent: PropTypes.string.isRequired, intro: PropTypes.string.isRequired, image: PropTypes.string, imageAlt: PropTypes.string, children: PropTypes.node.isRequired };

export default InnerPage;
