import PropTypes from "prop-types";

export function AboutHeading({ eyebrow, title, accent, description, id }) {
  return <header className="mdo-heading"><div><p className="coral-eyebrow"><span />{eyebrow}</p><h2 id={id}>{title}{accent && <><br /><em>{accent}</em></>}</h2></div>{description && <p>{description}</p>}</header>;
}
AboutHeading.propTypes = { eyebrow: PropTypes.string.isRequired, title: PropTypes.string.isRequired, accent: PropTypes.string, description: PropTypes.string, id: PropTypes.string.isRequired };

export function EditorialImage({ src, alt, caption, className = "" }) {
  return <figure className={`mdo-image ${className}`}><img src={src} alt={alt} width="960" height="720" loading="lazy" />{caption && <figcaption>{caption}</figcaption>}</figure>;
}
EditorialImage.propTypes = { src: PropTypes.string.isRequired, alt: PropTypes.string.isRequired, caption: PropTypes.string, className: PropTypes.string };

export function ContentNote({ children }) {
  return <p className="mdo-content-note"><span aria-hidden="true" />{children}</p>;
}
ContentNote.propTypes = { children: PropTypes.node.isRequired };
