import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';
import { getServiceScopeImage } from '../../data/serviceProjectCards';
import { SectionHeading } from './ServiceSections';
import './ServiceSolutions.css';

export default function ServiceSolutions({ service }) {
  return (
    <section id="service-solutions" className="service-solutions service-section" aria-label="Segment solutions">
      <div className="coral-shell">
        <SectionHeading number="04" label="Our solutions" title="One partner. Every moving part.">
          {service.body}
        </SectionHeading>

        {/* ── Photo card grid — 3 per row ─────────────────────────── */}
        <div className="ss-grid">
          {service.scopes.map(([title, description], index) => {
            const visual = getServiceScopeImage(title);
            const img    = visual?.image    || service.image;
            const alt    = visual?.imageAlt || title;
            return (
              <article className="ss-card" key={title}>
                <div className="ss-card__img-wrap">
                  <img src={img} alt={alt} loading={index < 3 ? 'eager' : 'lazy'} />
                  <div className="ss-card__overlay" />
                </div>

                <div className="ss-card__bottom">
                  <h3 className="ss-card__title">{title}</h3>
                  <Link
                    to="/contact"
                    className="ss-card__arrow"
                    aria-label={`Discuss ${title}`}
                  >
                    <HiArrowRight aria-hidden="true" />
                  </Link>
                </div>

                {/* Hover — description strip */}
                <div className="ss-card__desc" aria-hidden="true">
                  <p>{description}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Footer CTA ────────────────────────────────────────── */}
        <div className="service-solutions__footer">
          <div>
            <span>Connected expertise. One accountable partner.</span>
            <p>Let's shape the right scope for your project.</p>
          </div>
          <Link to="/contact">Talk to our team <HiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

ServiceSolutions.propTypes = { service: PropTypes.object.isRequired };
