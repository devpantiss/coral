import { useState } from "react";
import PropTypes from "prop-types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const chartColors = ["var(--demo-primary)", "var(--demo-secondary)", "var(--demo-tertiary)", "var(--demo-muted)"];

function DemographicTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return <div className="coral-demographic-tooltip"><span>{item.name}</span><strong>{item.value}%</strong></div>;
}

DemographicTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({ payload: PropTypes.shape({ name: PropTypes.string, value: PropTypes.number }) })),
};

function CustomPieChart({ data, eyebrow, title, icon: Icon }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex] || data[0];

  return (
    <article className="coral-demographic-card">
      <header className="coral-demographic-card__header">
        <div><small>{eyebrow}</small><h3>{title}</h3></div>
        <span aria-hidden="true"><Icon /></span>
      </header>

      <div className="coral-demographic-card__chart" role="img" aria-label={`${title} distribution chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="61%" outerRadius="82%" paddingAngle={3} cornerRadius={5} stroke="none" activeIndex={activeIndex} onMouseEnter={(_, index) => setActiveIndex(index)}>
              {data.map((item, index) => <Cell className={index === activeIndex ? "is-active" : ""} key={item.name} fill={chartColors[index % chartColors.length]} />)}
            </Pie>
            <Tooltip content={<DemographicTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
        <div className="coral-demographic-card__center" aria-hidden="true"><strong>{activeItem.value}%</strong><span>{activeItem.name}</span></div>
      </div>

      <ul className="coral-demographic-legend">
        {data.map((item, index) => (
          <li className={index === activeIndex ? "is-active" : ""} key={item.name} onMouseEnter={() => setActiveIndex(index)}>
            <i style={{ background: chartColors[index % chartColors.length] }} />
            <span>{item.name}</span>
            <div><b style={{ width: `${item.value}%` }} /></div>
            <strong>{item.value}%</strong>
          </li>
        ))}
      </ul>
    </article>
  );
}

CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, value: PropTypes.number.isRequired })).isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default CustomPieChart;
