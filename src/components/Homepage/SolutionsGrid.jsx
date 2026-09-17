import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";
import { integratedSolutions } from "../../data/integratedSolutions";
import "./SolutionsGrid.css";

export default function SolutionsGrid() {
  return (
    <section className="coral-solutions-grid" id="solutions" aria-labelledby="solutions-title">
      <div className="coral-shell">
        <header className="coral-solutions-grid__heading">
          <p>Rely on our expertise</p>
          <h2 id="solutions-title">Integrated solutions</h2>
        </header>
        <div className="coral-solutions-grid__cards">
          {integratedSolutions.map((solution) => (
            <Link className="coral-solution-tile" to="/contact" key={solution.number} aria-label={`Discuss ${solution.title}`}>
              <img src={solution.image} alt="" loading="lazy" />
              <h3>{solution.title}</h3>
              <span className="coral-solution-tile__arrow" aria-hidden="true"><HiChevronRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
