import { MdBadge, MdGroups, MdSchedule } from "react-icons/md";
import CustomPieChart from "./CustomPieChart";

const charts = [
  { eyebrow: "Career stage", title: "Age distribution", icon: MdSchedule, data: [{ name: "18–25 years", value: 22 }, { name: "26–35 years", value: 38 }, { name: "36–45 years", value: 27 }, { name: "46+ years", value: 13 }] },
  { eyebrow: "Representation", title: "Gender mix", icon: MdGroups, data: [{ name: "Male", value: 78 }, { name: "Female", value: 18 }, { name: "Other", value: 4 }] },
  { eyebrow: "Engagement", title: "Employment status", icon: MdBadge, data: [{ name: "Permanent", value: 52 }, { name: "Contract", value: 36 }, { name: "Apprentice", value: 12 }] },
];

function PieChartSection() {
  return (
    <div className="coral-demographics">
      <div className="coral-demographics__intro">
        <div><span>People intelligence</span><h2>Workforce composition</h2><p>A clear view of representation, experience and employment across mining operations.</p></div>
        <dl><div><dt>Active workforce</dt><dd>855</dd></div><div><dt>Operating districts</dt><dd>08</dd></div><div><dt>Core job roles</dt><dd>06</dd></div></dl>
      </div>
      <div className="coral-demographics__grid">{charts.map((chart) => <CustomPieChart {...chart} key={chart.title} />)}</div>
    </div>
  );
}

export default PieChartSection;
