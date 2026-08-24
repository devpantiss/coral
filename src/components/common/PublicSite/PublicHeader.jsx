import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { HiArrowUpRight, HiBars3, HiXMark } from "react-icons/hi2";

export function CoralBrand({ light = false }) {
  return <Link className={`coral-brand ${light ? "coral-brand--light" : ""}`} to="/" aria-label="Coral Mines and Shipping home"><span className="coral-brand__mark" aria-hidden="true"><i /><i /><i /></span><span className="coral-brand__copy"><strong>CORAL</strong><small>Mines &amp; Shipping</small></span></Link>;
}

CoralBrand.propTypes = { light: PropTypes.bool };

function PublicHeader({ overlay = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!overlay);

  useEffect(() => {
    if (!overlay) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const close = () => setOpen(false);
  const navClass = ({ isActive }) => isActive ? "is-active" : "";

  return <header className={`coral-header ${scrolled ? "is-scrolled" : ""}`}><CoralBrand light={!scrolled} /><nav className={`coral-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation"><NavLink className={navClass} to="/about" onClick={close}>Company</NavLink><NavLink className={navClass} to="/capabilities" onClick={close}>Capabilities</NavLink><NavLink className={navClass} to="/projects" onClick={close}>Projects</NavLink><NavLink className={navClass} to="/sustainability" onClick={close}>Sustainability</NavLink><NavLink className={navClass} to="/careers" onClick={close}>Careers</NavLink><Link className="coral-nav__cta" to="/contact" onClick={close}>Contact us <HiArrowUpRight /></Link></nav><button className="coral-menu" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <HiXMark /> : <HiBars3 />}</button></header>;
}

PublicHeader.propTypes = { overlay: PropTypes.bool };

export default PublicHeader;
