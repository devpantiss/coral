import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdEngineering,
  MdInfoOutline,
  MdLocationCity,
  MdMiscellaneousServices,
  MdOutlineBusinessCenter,
} from "react-icons/md";

const navItems = [
  { to: "/dashboard", icon: MdDashboard, label: "Dashboard", match: ["/dashboard"], exact: true },
  { to: "/dashboard/page1", icon: MdLocationCity, label: "Dist. Dashboard", match: ["/dashboard/page1"] },
  { to: "/dashboard/onboarding-centers", icon: MdOutlineBusinessCenter, label: "Project Onboarding", match: ["/dashboard/onboarding-centers"] },
  { to: "/dashboard/total-service-providers", icon: MdEngineering, label: "Mining Workforce", match: ["/dashboard/total-service-providers"] },
  { to: "/dashboard/total-services", icon: MdMiscellaneousServices, label: "Mining Services", match: ["/dashboard/total-services"] },
  { to: "/dashboard/about", icon: MdInfoOutline, label: "Info", match: ["/dashboard/about"] },
];

function Sidebar() {
  const location = useLocation();
  const isActive = (item) => item.match.some((path) => location.pathname === path || (!item.exact && location.pathname.startsWith(`${path}/`)));

  return (
    <aside className="coral-legacy-sidebar" aria-label="Dashboard navigation">
      <div className="coral-legacy-sidebar__logo">
        <Link to="/" className="coral-legacy-brand" aria-label="Coral Mines and Shipping home">
          <span className="coral-legacy-brand__mark"><i /><i /><i /></span>
          <span><strong>CORAL</strong><small>Mines &amp; Shipping</small></span>
        </Link>
      </div>
      <nav className="coral-legacy-sidebar__nav">
        <ul>{navItems.map((item) => { const Icon = item.icon; const active = isActive(item); return <li key={item.to}><Link className={active ? "is-active" : ""} to={item.to} title={item.label}><Icon /><span>{item.label}</span>{active && <i />}</Link></li>; })}</ul>
      </nav>
      <div className="coral-legacy-sidebar__version">Coral Operations · v1.0</div>
    </aside>
  );
}

export default Sidebar;
