import { HiArrowRight, HiOutlineArrowTrendingUp, HiOutlineShieldCheck } from "react-icons/hi2";

function ImpactPrelude() {
  return (
    <section className="coral-impact-prelude" aria-labelledby="impact-prelude-title">
      <div className="coral-impact-prelude__shade" />
      <div className="coral-shell coral-impact-prelude__content">
        <div className="coral-impact-prelude__copy">
          <p className="coral-eyebrow coral-eyebrow--light"><span /> From footprint to progress</p>
          <h2 id="impact-prelude-title">Connected operations.<br /><em>Visible outcomes.</em></h2>
          <p>Scale matters when it creates safer work, stronger local economies and landscapes designed for life beyond mining.</p>
          <a className="coral-impact-prelude__link" href="#impact">
            Explore our impact <HiArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="coral-impact-prelude__principles" aria-label="Impact principles">
          <div><HiOutlineShieldCheck aria-hidden="true" /><span>Responsible growth</span></div>
          <div><HiOutlineArrowTrendingUp aria-hidden="true" /><span>Measured progress</span></div>
        </div>
      </div>
    </section>
  );
}

export default ImpactPrelude;
