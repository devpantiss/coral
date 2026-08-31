import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import { whatWeDoServices } from "../../data/whatWeDoServices";

function WhatWeDoSlider() {
  return (
    <section className="coral-services" id="what-we-do" aria-labelledby="what-we-do-title">
      <div className="coral-shell">
        <div className="coral-services__header">
          <div>
            <p className="coral-eyebrow"><span /> Our expertise</p>
            <h2 id="what-we-do-title">What We Do</h2>
          </div>
          <div className="coral-services__intro">
            <p>
              Practical expertise for the complete mining lifecycle—from securing
              the ground to shaping what comes next.
            </p>
          </div>
        </div>

        <div className="coral-services__grid">
          {whatWeDoServices.map((service) => {
            const Icon = service.icon;
            return <Link className="coral-service-card" to={`/services/${service.slug}`} key={service.number} aria-label={`Explore ${service.title}`}>
              <img className="coral-service-card__image" src={service.image} alt="" loading="lazy" />
              <span className="coral-service-card__shade" aria-hidden="true" />
              <div className="coral-service-card__top"><span>{service.number}</span><Icon aria-hidden="true" /></div>
              <div><h3>{service.title}</h3><p>{service.cardDescription}</p><small>Explore service <HiArrowUpRight aria-hidden="true" /></small></div>
              <span className="coral-service-card__line" aria-hidden="true" />
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDoSlider;
