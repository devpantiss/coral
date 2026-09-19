import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";
import "./ResourcePage.css";

const content = {
  reports: { label: "Reports", title: "Our work.", accent: "In perspective.", intro: "Reports and publications from Coral Mines & Shipping.", heading: "Reports coming soon", text: "Published reports will be available here. Contact our team for information about our operations." },
  news: { label: "News", title: "Stories from", accent: "the ground.", intro: "News, announcements and events from across Coral.", heading: "Odisha Mining Week", text: "Talcher, Odisha · December. Explore our upcoming event announcement.", link: "/#odisha-mining-week", linkText: "View event announcement" },
  tenders: { label: "Tenders", title: "Work with us.", accent: "Build what’s next.", intro: "Procurement opportunities and tender notices from Coral.", heading: "Tender notices coming soon", text: "Tender documents and submission details will be published here when available." },
  apps: { label: "Apps", title: "Connected tools.", accent: "Clearer decisions.", intro: "Access Coral's digital applications and operational tools.", video: "/apps.mp4" },
};

export default function ResourcePage({ type }) {
  const page = content[type];
  return <InnerPage eyebrow={page.label} title={page.title} accent={page.accent} intro={page.intro} video={page.video}>
    <section className="coral-shell coral-resource-content" aria-label={page.label}>
      {type === "apps" ? <div className="coral-resource-grid"><Link to="/dashboard"><h2>Operations dashboard</h2><p>Explore operational coverage, teams and mining capabilities.</p><span>Open dashboard <HiArrowUpRight aria-hidden="true" /></span></Link><a href="https://payroll-ten-beta.vercel.app/" target="_blank" rel="noopener noreferrer"><h2>PayFlow</h2><p>Access the payroll application.</p><span>Open PayFlow <HiArrowUpRight aria-hidden="true" /></span></a></div> : <article><p className="coral-eyebrow"><span /> {page.label}</p><h2>{page.heading}</h2><p>{page.text}</p><Link to={page.link || "/contact"}>{page.linkText || "Contact our team"} <HiArrowUpRight aria-hidden="true" /></Link></article>}
    </section>
  </InnerPage>;
}
ResourcePage.propTypes = { type: PropTypes.oneOf(["reports", "news", "tenders", "apps"]).isRequired };
