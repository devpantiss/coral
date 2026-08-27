import PropTypes from "prop-types";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FaHardHat, FaTools, FaTruck } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { districtBlocks, workforceDistricts } from "../../data/workforceData";

const totalWorkforce = workforceDistricts.reduce((sum, district) => sum + district.total, 0);
const equipmentOperators = workforceDistricts.reduce((sum, district) => sum + district.dumper + district.excavator + district.loader, 0);
const technicalSupport = totalWorkforce - equipmentOperators;
const totalBlocks = Object.values(districtBlocks).reduce((sum, blocks) => sum + blocks.length, 0);

const cards = [
  {
    eyebrow: "Registered strength",
    title: "Total mining workforce",
    value: totalWorkforce,
    icon: FaHardHat,
    share: 100,
    stats: [["Districts", "08"], ["Active blocks", String(totalBlocks).padStart(2, "0")]],
  },
  {
    eyebrow: "Production workforce",
    title: "Equipment operators",
    value: equipmentOperators,
    icon: FaTruck,
    share: Math.round((equipmentOperators / totalWorkforce) * 100),
    stats: [["Haulage", "330"], ["Excavation / loading", "281"]],
  },
  {
    eyebrow: "Maintenance workforce",
    title: "Technical support",
    value: technicalSupport,
    icon: FaTools,
    share: Math.round((technicalSupport / totalWorkforce) * 100),
    stats: [["HEMM support", "176"], ["Mine welders", "68"]],
  },
];

const districtChartData = workforceDistricts.map((district) => ({
  district: district.name,
  short: district.name.slice(0, 3).toUpperCase(),
  workforce: district.total,
}));
const highestDistrictTotal = Math.max(...districtChartData.map((district) => district.workforce));

function KpiTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return <div className="coral-kpi-tooltip"><span>{item.district}</span><strong>{item.workforce} workers</strong></div>;
}

KpiTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({ payload: PropTypes.shape({ district: PropTypes.string, workforce: PropTypes.number }) })),
};

function FirstRow() {
  return (
    <div className="coral-kpi-grid">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article className="coral-kpi-card" key={card.title}>
            <header><span><Icon /></span><small>{card.eyebrow}</small></header>
            <h3>{card.title}</h3>
            <div className="coral-kpi-card__value"><strong>{card.value}</strong><span>{card.share}%<small>of total workforce</small></span></div>
            <div className="coral-kpi-card__progress"><i style={{ width: `${card.share}%` }} /></div>
            <dl>{card.stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </article>
        );
      })}

      <article className="coral-kpi-chart-card">
        <header><div><span>District coverage</span><h3>Workforce deployment</h3></div><div><HiMapPin /><strong>855</strong><small>deployed</small></div></header>
        <div className="coral-kpi-chart-card__chart" role="img" aria-label="Mining workforce deployed by district">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtChartData} margin={{ top: 10, right: 4, bottom: 0, left: -24 }}>
              <CartesianGrid vertical={false} stroke="var(--kpi-grid-line)" strokeDasharray="2 5" />
              <XAxis dataKey="short" axisLine={false} tickLine={false} interval={0} tick={{ fill: "var(--kpi-muted)", fontSize: 7 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--kpi-muted)", fontSize: 7 }} />
              <Tooltip content={<KpiTooltip />} cursor={{ fill: "var(--kpi-hover)" }} />
              <Bar dataKey="workforce" radius={[3, 3, 0, 0]}>
                {districtChartData.map((district) => <Cell key={district.district} fill={district.workforce === highestDistrictTotal ? "var(--kpi-primary)" : "var(--kpi-bar)"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <footer><span><i />8 districts reporting</span><strong>Highest deployment: Kendujhar · 161</strong></footer>
      </article>
    </div>
  );
}

export default FirstRow;
