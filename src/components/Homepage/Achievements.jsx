import { Link } from "react-router-dom";
import { HiArrowUpRight, HiOutlineMapPin } from "react-icons/hi2";
import { miningCapabilities } from "../../data/miningOperationsData";
import { operationalStates } from "../../data/operationalStates";
import "./Achievements.css";

const visuals = [
  { image: "/coral/land-acquisition-survey.jpg", alt: "Land surveying team assessing terrain for mine development", title: "Land ready. Possibilities open.", text: "Preparing the ground for responsible mine development." },
  { image: "/coral/mining-workforce-team.jpg", alt: "Mining workforce reviewing operations at site", title: "Skilled people. Stronger operations.", text: "Building capability where it matters: on the ground." },
  { image: "/fleet3/haul-pack.png", alt: "Mining haul truck", title: "Equipped to keep moving.", text: "Supporting reliable equipment across the mining lifecycle." },
  { image: "/coral/mine-rehabilitation.jpg", alt: "Rehabilitated mine landscape with native planting and water retention", title: "A new chapter for every landscape.", text: "Restoring land and creating possibilities beyond extraction." },
];

const achievements = [
  ...miningCapabilities.map((capability, index) => ({ ...capability, ...visuals[index], category: capability.title })),
  { id: "community", category: "Community & local opportunity", image: "/coral/eco-mine-tourism-poster.jpg", alt: "Restored landscape for eco-mine tourism", title: "Progress that stays local.", text: "Connecting restored landscapes, local stories and new opportunities across our operating regions." },
];

export default function Achievements() {
  const districtCount = operationalStates.reduce((sum, state) => sum + state.districts.length, 0);

  return <section className="coral-achievements" id="achievements" aria-labelledby="achievements-title">
    <div className="coral-shell">
      <header className="coral-achievements__heading">
        <div><p className="coral-eyebrow"><span /> Our achievements</p><h2 id="achievements-title">Progress on the ground.<br /><em>Possibilities beyond it.</em></h2></div>
        <p>From land readiness to a landscape’s next chapter, our four areas of expertise turn local action into lasting progress.</p>
      </header>

      <div className="coral-achievements__grid">
        {achievements.map((achievement) => (
          <article className={`coral-achievement coral-achievement--${achievement.id}`} key={achievement.id}>
            <div className="coral-achievement__image"><img src={achievement.image} alt={achievement.alt} loading="lazy" width="560" height="500" /></div>
            <div className="coral-achievement__body">
              <p className="coral-achievement__category">{achievement.category}</p>
              <div className="coral-achievement__story"><h3>{achievement.title}</h3><p>{achievement.text}</p></div>
            </div>
          </article>
        ))}
      </div>

      <div className="coral-achievements__reach">
        <div className="coral-achievements__reach-copy"><HiOutlineMapPin aria-hidden="true" /><div><h3>Local presence. Connected progress.</h3><p>{operationalStates.map(state => state.name).join(" · ")}</p></div></div>
        <dl><div><dt>Operational states</dt><dd>{String(operationalStates.length).padStart(2, "0")}</dd></div><div><dt>Operating districts</dt><dd>{districtCount}</dd></div></dl>
        <a href="#operational-areas">Explore our footprint <HiArrowUpRight aria-hidden="true" /></a>
      </div>
      <footer className="coral-achievements__footer"><p>Connected expertise, local opportunity and responsible land stewardship across our operational footprint.</p><Link to="/dashboard">View performance dashboard <HiArrowUpRight aria-hidden="true" /></Link></footer>
    </div>
  </section>;
}
