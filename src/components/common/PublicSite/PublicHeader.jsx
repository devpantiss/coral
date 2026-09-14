import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";

import "./PublicHeader.css";

const mainLinks = [["Home", "/"], ["About", "/about"], ["What We Do", "/capabilities"], ["Sustainability", "/sustainability"], ["Reports", "/reports"]];
const secondaryLinks = [["News", "/news"], ["Apps", "/apps"], ["Tenders", "/tenders"], ["Careers", "/careers"], ["Contact", "/contact"]];

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

  const menuButton = useRef(null);
  const close = () => setOpen(false);
  const navClass = ({ isActive }) => isActive ? "is-active" : "";

  const renderLinks = links => links.map(([label, to]) => <NavLink key={to} className={navClass} to={to} end={to === "/"} onClick={close}>{label}</NavLink>);

  return <header className={`coral-header coral-header--dual ${scrolled ? "is-scrolled" : ""}`} onKeyDown={event => { if (event.key === "Escape" && open) { close(); menuButton.current?.focus(); } }}>
    <CoralBrand light={!scrolled} />
    <div className={`coral-header__navigation ${open ? "is-open" : ""}`} id="public-navigation">
      <nav className="coral-header__main" aria-label="Main navigation">{renderLinks(mainLinks)}</nav>
      <nav className="coral-header__secondary" aria-label="Secondary navigation">{renderLinks(secondaryLinks)}</nav>
    </div>
    <button ref={menuButton} className="coral-menu" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="public-navigation" aria-expanded={open}>{open ? <HiXMark /> : <HiBars3 />}</button>
  </header>;
}

PublicHeader.propTypes = { overlay: PropTypes.bool };

export default PublicHeader;
