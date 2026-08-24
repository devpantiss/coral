import { Link } from "react-router-dom";
import { CoralBrand } from "./PublicHeader";

function PublicFooter() {
  return <footer className="coral-footer"><div className="coral-shell coral-footer__main"><CoralBrand light /><p>Developing resources responsibly.<br />Delivering value reliably.</p><div className="coral-footer__links"><Link to="/about">Company</Link><Link to="/capabilities">Capabilities</Link><Link to="/projects">Projects</Link><Link to="/sustainability">Sustainability</Link><Link to="/careers">Careers</Link><Link to="/contact">Contact</Link></div></div><div className="coral-shell coral-footer__bottom"><span>© {new Date().getFullYear()} Coral Mines &amp; Shipping. All rights reserved.</span><span>India</span></div></footer>;
}

export default PublicFooter;
