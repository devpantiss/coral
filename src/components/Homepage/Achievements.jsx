import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import { miningCapabilities } from "../../data/miningOperationsData";
import { operationalStates } from "../../data/operationalStates";
import "./Achievements.css";

const visuals = {
  "land-acquisition": "/coral/land-acquisition-survey.jpg",
  "workforce-mining": "/coral/mining-workforce-team.jpg",
  "mining-equipments": "/fleet3/haul-pack.png",
  "mine-repurposing": "/coral/mine-rehabilitation.jpg",
  "operating-reach": "/coral/community-development.jpg",
};

const achievements = [
  ...miningCapabilities,
  {
    id: "operating-reach",
    worksCompleted: operationalStates.reduce((total, state) => total + state.districts.length, 0),
    unit: "operating districts",
  },
];

export default function Achievements() {
  return (
    <section className="coral-achievements" id="achievements" aria-labelledby="achievements-title">
      <div className="coral-shell">
        <header className="coral-achievements__heading">
          <p className="coral-eyebrow"><span /> Progress on the ground</p>
          <h2 id="achievements-title">Our achievements</h2>
        </header>
        <div className="coral-achievements__grid">
          {achievements.map((achievement) => (
            <article className={`coral-achievement coral-achievement--${achievement.id}`} key={achievement.id}>
              <div className="coral-achievement__image">
                <img src={visuals[achievement.id]} alt="" loading="lazy" width="560" height="360" />
              </div>
              <div className="coral-achievement__body">
                <h3>{achievement.worksCompleted.toLocaleString("en-IN")}</h3>
                <p>{achievement.unit}</p>
              </div>
            </article>
          ))}
        </div>
        <footer className="coral-achievements__footer">
          <Link to="/dashboard">Explore Dashboard <HiArrowUpRight aria-hidden="true" /></Link>
        </footer>
      </div>
    </section>
  );
}
