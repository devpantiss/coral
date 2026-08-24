import FirstRow from "../components/Dashboard/FirstRow";
import WorkersMap from "../components/Dashboard/WorkersMap";
import PieChartSection from "../components/Dashboard/demographic/PieChartSection";
import WorkCards from "../components/Dashboard/WorkCards";
import SalesSummary from "../components/Dashboard/SalesSummary";
import QuickLinks from "../components/Dashboard/QuickLinks";

function Dashboard() {
  return (
    <div className="coral-dashboard-legacy">
      <div className="coral-dashboard-legacy__heading">
        <div><span>Operational overview</span><h1>Dashboard</h1><p>A consolidated view of workforce, users, service delivery and district performance.</p></div>
        <div><i /> Live overview <small>Updated just now</small></div>
      </div>

      <section className="coral-dashboard-section coral-dashboard-section--metrics">
        <div className="coral-dashboard-section__title"><span>01</span><div><h2>Key performance</h2><p>Headline operational indicators</p></div></div>
        <FirstRow />
      </section>

      <section className="coral-dashboard-section coral-dashboard-section--dark coral-dashboard-section--map">
        <div className="coral-dashboard-section__title"><span>02</span><div><h2>Mining workforce distribution</h2><p>Equipment operators and HEMM support roles by district</p></div></div>
        <WorkersMap />
      </section>

      <section className="coral-dashboard-section coral-dashboard-section--dark">
        <div className="coral-dashboard-section__title"><span>03</span><div><h2>Workforce demographics</h2><p>Age, representation and employment composition</p></div></div>
        <PieChartSection />
      </section>

      <section className="coral-dashboard-section coral-dashboard-section--metrics">
        <div className="coral-dashboard-section__title"><span>04</span><div><h2>Delivery performance</h2><p>Infrastructure, resource and revenue outcomes</p></div></div>
        <WorkCards />
      </section>

      <section className="coral-dashboard-section coral-dashboard-section--dark">
        <div className="coral-dashboard-section__title"><span>05</span><div><h2>District revenue</h2><p>Revenue totals and monthly movement</p></div></div>
        <SalesSummary />
      </section>

      <section className="coral-dashboard-section coral-dashboard-section--dark coral-dashboard-section--links">
        <QuickLinks />
      </section>
    </div>
  );
}

export default Dashboard;
