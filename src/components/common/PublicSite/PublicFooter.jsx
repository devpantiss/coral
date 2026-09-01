import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CoralBrand } from "./PublicHeader";
import {
  HiPhone,
  HiEnvelope,
  HiMapPin,
  HiArrowUp,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import miningBg from "../../../assets/mining-footer-bg.jpg";

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
];

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/fleet", label: "Fleet" },
  { to: "/projects", label: "Projects" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

function PublicFooter() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="coral-footer" id="site-footer">
      {/* Background image */}
      <img
        className="coral-footer__bg"
        src={miningBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      {/* Gradient overlay – lighter to let the image breathe */}
      <div className="coral-footer__overlay" aria-hidden="true" />

      {/* Main footer content */}
      <div className="coral-shell coral-footer__main">
        {/* Column 1 – Brand */}
        <div className="coral-footer__brand">
          <CoralBrand light />
          <p className="coral-footer__tagline">
            Developing resources responsibly.
            <br />
            Delivering value reliably.
          </p>
          {/* Accent rule */}
          <span className="coral-footer__accent" aria-hidden="true" />
        </div>

        {/* Column 2 – Office */}
        <div className="coral-footer__col">
          <h4 className="coral-footer__heading">Office</h4>
          <ul className="coral-footer__contact">
            <li>
              <span className="coral-footer__icon-wrap">
                <HiPhone />
              </span>
              <span>+91 9876543210</span>
            </li>
            <li>
              <span className="coral-footer__icon-wrap">
                <HiEnvelope />
              </span>
              <a href="mailto:info@coralmines.com">INFO@CORALMINES.COM</a>
            </li>
            <li>
              <span className="coral-footer__icon-wrap">
                <HiMapPin />
              </span>
              <span>
                PLOT NO 77, JUBILEE ENCLAVE,
                <br />
                OPP. HITEX, MADHAPUR,
                <br />
                HYDERABAD - 500081,
                <br />
                TELANGANA, INDIA
              </span>
            </li>
          </ul>
        </div>

        {/* Column 3 – Quick Links */}
        <div className="coral-footer__col">
          <h4 className="coral-footer__heading">Quick Links</h4>
          <nav className="coral-footer__nav" aria-label="Footer navigation">
            {quickLinks.map(({ to, label }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 4 – Social Links */}
        <div className="coral-footer__col">
          <h4 className="coral-footer__heading">Social Links</h4>
          <div className="coral-footer__socials">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="coral-shell coral-footer__bottom">
        <span>
          © {new Date().getFullYear()}, ALL RIGHTS RESERVED | CORAL MINES &amp;
          SHIPPING
        </span>
        <span className="coral-footer__bottom-right">INDIA</span>
      </div>

      {/* Scroll to top */}
      <button
        className={`coral-footer__totop ${showTop ? "is-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        type="button"
      >
        <HiArrowUp />
      </button>
    </footer>
  );
}

export default PublicFooter;
