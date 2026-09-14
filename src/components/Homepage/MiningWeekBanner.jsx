import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineCalendarDays, HiOutlineMapPin } from "react-icons/hi2";
import "./MiningWeekBanner.css";

export default function MiningWeekBanner() {
  return <section className="coral-impact-prelude coral-mining-week" id="odisha-mining-week" aria-labelledby="mining-week-title">
    <div className="coral-impact-prelude__shade" aria-hidden="true" />
    <div className="coral-shell coral-impact-prelude__content">
      <div className="coral-impact-prelude__copy">
        <p className="coral-eyebrow coral-eyebrow--light"><span /> A meeting point for mining’s future</p>
        <h2 id="mining-week-title">Odisha<br /><em>Mining Week.</em></h2>
        <p>This December, the conversation comes to Talcher. Discover new perspectives on mining, skilled workforces and the future of our mineral-rich communities.</p>
        <Link className="coral-impact-prelude__link" to="/contact">Enquire about the event <HiArrowRight aria-hidden="true" /></Link>
      </div>
      <div className="coral-impact-prelude__principles coral-mining-week__details" aria-label="Event location and month">
        <div><HiOutlineMapPin aria-hidden="true" /><span><small>Where</small>Talcher, Odisha</span></div>
        <div><HiOutlineCalendarDays aria-hidden="true" /><span><small>When</small>December</span></div>
      </div>
    </div>
  </section>;
}
