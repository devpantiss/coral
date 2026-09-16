import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiArrowUpRight, HiMinus, HiPlus } from 'react-icons/hi2';
import { getServiceScopeImage } from '../../data/serviceProjectCards';
import { SectionHeading } from './ServiceSections';
import './ServiceSolutions.css';

export default function ServiceSolutions({ service }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const buttons = useRef([]);
  const [title] = service.scopes[selected];
  const visual = getServiceScopeImage(title);
  const ServiceIcon = service.icon;

  function select(index) {
    setExpanded(index === selected ? !expanded : true);
    setSelected(index);
  }

  function navigate(event, index) {
    const next = {
      ArrowDown: (index + 1) % service.scopes.length,
      ArrowUp: (index + service.scopes.length - 1) % service.scopes.length,
      Home: 0,
      End: service.scopes.length - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    buttons.current[next]?.focus();
  }

  return <section id="service-solutions" className="service-solutions service-section" aria-label="Segment solutions">
    <div className="coral-shell">
      <SectionHeading number="04" label="Our solutions" title="One partner. Every moving part.">{service.body}</SectionHeading>
      <div className="service-solutions__explorer">
        <div className="service-solutions__visual">
          <figure>
            <img src={visual?.image || service.image} alt={visual?.imageAlt || service.title} loading="lazy" width="1536" height="1024" />
            <figcaption><span>{String(selected + 1).padStart(2, '0')} / {String(service.scopes.length).padStart(2, '0')}</span><span>{title}</span></figcaption>
          </figure>
          <div className="service-solutions__promise"><ServiceIcon aria-hidden="true" /><div><span>Built around your operation</span><p>A focused scope or a fully connected programme.</p></div></div>
        </div>
        <div className="service-solutions__list">
          <div className="service-solutions__list-heading"><span>Explore our expertise</span><span>{String(service.scopes.length).padStart(2, '0')} solutions</span></div>
          {service.scopes.map(([scopeTitle, description], index) => {
            const open = selected === index && expanded;
            const id = `solution-${service.slug}-${index}`;
            return <article className={`service-solution${open ? ' is-open' : ''}`} key={scopeTitle}>
              <h3><button ref={button => { buttons.current[index] = button; }} type="button" id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => select(index)} onKeyDown={event => navigate(event, index)}>
                <span className="service-solution__number">{String(index + 1).padStart(2, '0')}</span><span>{scopeTitle}</span><span className="service-solution__toggle">{open ? <HiMinus aria-hidden="true" /> : <HiPlus aria-hidden="true" />}</span>
              </button></h3>
              <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} hidden={!open} className="service-solution__panel">
                <p>{description}</p><Link to="/contact" aria-label={`Discuss ${scopeTitle.toLowerCase()}`}>Discuss this solution <HiArrowUpRight aria-hidden="true" /></Link>
              </div>
            </article>;
          })}
        </div>
      </div>
      <div className="service-solutions__footer"><div><span>Connected expertise. One accountable partner.</span><p>Let’s shape the right scope for your project.</p></div><Link to="/contact">Talk to our team <HiArrowUpRight aria-hidden="true" /></Link></div>
    </div>
  </section>;
}

ServiceSolutions.propTypes = { service: PropTypes.object.isRequired };
