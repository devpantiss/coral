import PropTypes from "prop-types";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { FaFire, FaHardHat, FaTools, FaTractor, FaTruck } from "react-icons/fa";

const deliveryGroups = [
  {
    title: "Dumper / Tipper operations",
    shortTitle: "Haulage operators",
    total: 330,
    share: 39,
    icon: FaTruck,
    detail: "330 Dumper / Tipper Operators",
    data: [48, 42, 62, 58, 30, 39, 27, 24],
  },
  {
    title: "Excavation & loading",
    shortTitle: "Production operators",
    total: 281,
    share: 33,
    icon: FaTractor,
    detail: "149 Excavator · 132 Loader",
    data: [42, 34, 53, 49, 26, 32, 24, 21],
  },
  {
    title: "HEMM maintenance",
    shortTitle: "Technical support",
    total: 176,
    share: 20,
    icon: FaTools,
    detail: "104 Mechanics · 72 Electricians",
    data: [26, 20, 33, 31, 16, 22, 15, 13],
  },
  {
    title: "Mine welding support",
    shortTitle: "Fabrication workforce",
    total: 68,
    share: 8,
    icon: FaFire,
    detail: "68 qualified Mine Welders",
    data: [10, 7, 13, 12, 7, 8, 6, 5],
  },
];

const districts = [
  ["Jajapur", "JAJ"], ["Angul", "ANG"], ["Kendujhar", "KDJ"], ["Sundargarh", "SNG"],
  ["Kalahandi", "KLD"], ["Jharsuguda", "JSG"], ["Kandhamal", "KDM"], ["Nuapada", "NPD"],
];

function DeliveryTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return <div className="coral-delivery-tooltip"><span>{item.district}</span><strong>{item.workforce} people</strong></div>;
}

DeliveryTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({ payload: PropTypes.shape({ district: PropTypes.string, workforce: PropTypes.number }) })),
};

function WorkCards() {
  return (
    <div className="coral-delivery">
      <div className="coral-delivery__summary">
        <div className="coral-delivery__headline">
          <span className="coral-delivery__summary-icon" aria-hidden="true"><FaHardHat /></span>
          <div><span>Deployment coverage</span><strong>855</strong><small>skilled personnel across 8 operating districts</small></div>
        </div>
        <div className="coral-delivery__readiness">
          <div><span>Operational readiness</span><strong>100%</strong></div>
          <div className="coral-delivery__meter"><i><b /></i><span><em>71% operators</em><em>29% technical support</em></span></div>
        </div>
      </div>

      <div className="coral-delivery__grid">
        {deliveryGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          const chartData = districts.map(([district, short], index) => ({ district, short, workforce: group.data[index] }));
          const maximum = Math.max(...group.data);
          return (
            <article className="coral-delivery-card" key={group.title}>
              <header><span><Icon /></span><small>{group.shortTitle}</small><em>0{groupIndex + 1}</em></header>
              <h3>{group.title}</h3>
              <div className="coral-delivery-card__metric">
                <div><strong>{group.total}</strong><small>deployed personnel</small></div>
                <span className="coral-delivery-card__share" style={{ "--delivery-share": `${group.share * 3.6}deg` }}><b>{group.share}%</b><small>share</small></span>
              </div>
              <div className="coral-delivery-card__chart" role="img" aria-label={`${group.title} by district`}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
                    <CartesianGrid vertical={false} stroke="var(--delivery-grid)" strokeDasharray="2 5" />
                    <XAxis dataKey="short" axisLine={false} tickLine={false} interval={0} tick={{ fill: "var(--delivery-text-muted)", fontSize: 7 }} />
                    <Tooltip content={<DeliveryTooltip />} cursor={{ fill: "var(--delivery-hover)" }} />
                    <Bar dataKey="workforce" radius={[3, 3, 0, 0]}>
                      {chartData.map((item) => <Cell key={item.district} fill={item.workforce === maximum ? "var(--delivery-primary)" : "var(--delivery-bar)"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <footer><span>{group.detail}</span><strong><i />8/8 districts</strong></footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default WorkCards;
