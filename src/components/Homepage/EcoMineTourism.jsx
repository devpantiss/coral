import { Link } from "react-router-dom";
import { HiArrowUpRight, HiOutlineArrowPath, HiOutlineMapPin } from "react-icons/hi2";

function EcoMineTourism() {
  return (
    <section className="coral-eco-tourism" aria-labelledby="eco-mine-tourism-title">
      <div className="coral-eco-tourism__shade" />

      <div className="coral-shell coral-eco-tourism__content">
        <div className="coral-eco-tourism__copy">
          <p className="coral-eyebrow coral-eyebrow--light"><span /> Beyond extraction</p>
          <h2 id="eco-mine-tourism-title">Eco-Mine<br /><em>Tourism.</em></h2>
          <p>Discover how responsible mining, restored landscapes and local stories can shape a new kind of journey—one that makes industry, ecology and community visible together.</p>
          <Link className="coral-eco-tourism__link" to="/sustainability">
            Explore the experience <HiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="coral-eco-tourism__notes" aria-label="Eco-Mine Tourism principles">
          <div><HiOutlineArrowPath aria-hidden="true" /><span>Regenerative landscapes</span></div>
          <div><HiOutlineMapPin aria-hidden="true" /><span>Place-led experiences</span></div>
        </div>
      </div>
    </section>
  );
}

export default EcoMineTourism;
