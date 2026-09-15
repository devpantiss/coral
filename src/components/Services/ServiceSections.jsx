import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiArrowUpRight, HiChevronLeft, HiChevronRight, HiOutlineMapPin } from 'react-icons/hi2';
import { operatedFleet } from '../../data/operatedFleet';
import { projectProfiles } from '../../data/projectProfiles';
import { getServiceProjectCards, PROJECT_CARDS_PER_TAB } from '../../data/serviceProjectCards';

export function SectionHeading({ number, label, title, children }) {
  return <header className="service-section-heading"><div><p className="coral-eyebrow"><span />{number} / {label}</p><h2>{title}</h2></div>{children && <p>{children}</p>}</header>;
}
SectionHeading.propTypes = { number: PropTypes.string.isRequired, label: PropTypes.string.isRequired, title: PropTypes.string.isRequired, children: PropTypes.node };

export function ServiceProcess({ service, delivery }) {
  const [active, setActive] = useState(0);
  const stepsRef = useRef(null);
  function selectStep(index, focus = false) {
    setActive(index);
    const button = stepsRef.current?.querySelectorAll('button')[index];
    if (focus) button?.focus();
    button?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }
  function stepKey(event, index) {
    const next = { ArrowRight: (index + 1) % service.phases.length, ArrowLeft: (index + service.phases.length - 1) % service.phases.length, Home: 0, End: service.phases.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    selectStep(next, true);
  }
  return <section id="service-process" className="service-process service-section" aria-labelledby="service-process-title"><div className="coral-shell">
    <header className="service-section-heading"><div><p className="coral-eyebrow"><span />02 / Our process</p><h2 id="service-process-title">{service.sectionTitle}</h2></div><p>{service.lead}</p></header>
    <div ref={stepsRef} className="service-stepper" role="tablist" aria-label="Delivery stages">{service.phases.map((phase, index) => <button type="button" role="tab" id={`process-step-${index}`} aria-controls="process-stage" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => selectStep(index)} onKeyDown={event => stepKey(event, index)} key={phase}><span className="service-stepper__line"><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true" /></span><strong>{phase}</strong><small>{index === active ? 'In focus' : 'Explore stage'} <HiArrowUpRight aria-hidden="true" /></small></button>)}</div>
    <div id="process-stage" className="service-process__stage" role="tabpanel" aria-labelledby={`process-step-${active}`} tabIndex={0}>
      <div className="service-process__image"><img src={service.image} alt="" loading="lazy" /><span>{service.title}</span></div>
      <div className="service-process__detail" key={active}><span className="service-process__counter">Step {String(active + 1).padStart(2, '0')} <i /> {String(service.phases.length).padStart(2, '0')}</span><h3>{service.phases[active]}</h3><p>{delivery.steps[active]}</p><div className="service-process__navigation"><span>From assessment to delivery</span><button type="button" onClick={() => selectStep((active + 1) % service.phases.length, true)} aria-label="Explore next process stage"><HiArrowUpRight aria-hidden="true" /></button></div></div>
    </div>
    <div className="service-process__outcome"><span>The outcome</span><p>{service.bandText}</p></div>
  </div></section>;
}
ServiceProcess.propTypes = { service: PropTypes.object.isRequired, delivery: PropTypes.object.isRequired };

export function ServiceFleet({ delivery }) {
  const [active, setActive] = useState(0);
  const fleet = delivery.fleetIds.map(id => operatedFleet.find(item => item.id === id));
  const vehicle = fleet[active];
  const move = direction => setActive(index => (index + direction + fleet.length) % fleet.length);
  return <section id="service-fleet" className="service-fleet" aria-label="Segment operating fleet">
    <img className="service-fleet__backdrop" src="/coral/coral-mine-hero.png" alt="" loading="lazy" />
    <div className="coral-shell service-fleet__inner">
      <SectionHeading number="03" label="Our fleet" title="Built for the work ahead.">{delivery.fleetIntro}</SectionHeading>
      <div className="service-fleet__stage" aria-live="polite" aria-atomic="true">
        <div className="service-fleet__identity"><span>{String(active + 1).padStart(2, '0')} / {String(fleet.length).padStart(2, '0')}</span><h3>{vehicle.name}</h3><dl>{vehicle.stats.slice(0, 3).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><Link to="/fleet">Explore the full fleet <HiArrowUpRight aria-hidden="true" /></Link></div>
        <span className="service-fleet__watermark" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span><img key={vehicle.id} className="service-fleet__machine" src={vehicle.image} alt={vehicle.name} loading="lazy" />
      </div>
      <div className="service-fleet__controls"><div className="service-fleet__thumbnails" aria-label="Choose equipment">{fleet.map((item, index) => <button type="button" key={item.id} aria-pressed={index === active} aria-label={`Show ${item.name}`} onClick={() => setActive(index)}><img src={item.image} alt="" loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span><small>{item.name}</small></button>)}</div><div className="service-fleet__arrows"><button type="button" onClick={() => move(-1)} aria-label="Previous machine"><HiChevronLeft /></button><button type="button" onClick={() => move(1)} aria-label="Next machine"><HiChevronRight /></button></div></div>
    </div>
  </section>;
}
ServiceFleet.propTypes = { delivery: PropTypes.object.isRequired };

const statuses = ['Completed', 'Ongoing'];
export function ServiceProjects({ service, delivery }) {
  const projects = projectProfiles.filter(project => delivery.projectTitles.includes(project.title));
  const [status, setStatus] = useState(projects.some(project => project.status === 'Delivered') ? 'Completed' : 'Ongoing');
  const visible = getServiceProjectCards(service, projects, status);
  function handleKey(event, index) {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = 1;
    else return;
    event.preventDefault();
    setStatus(statuses[next]);
    event.currentTarget.parentElement.children[next].focus();
  }
  return <section id="service-projects" className="service-projects service-section" aria-label="Segment projects"><div className="coral-shell">
    <SectionHeading number="05" label="Our projects" title="Capability, put into practice.">Explore the project profiles connected to this segment, from delivered programmes to work in progress.</SectionHeading>
    <div className="service-projects__toolbar"><div className="service-projects__tabs" role="tablist" aria-label="Project status">{statuses.map((value, index) => <button key={value} type="button" role="tab" id={`projects-tab-${value}`} aria-controls="service-projects-panel" aria-selected={status === value} tabIndex={status === value ? 0 : -1} onClick={() => setStatus(value)} onKeyDown={event => handleKey(event, index)}>{value}<span>{PROJECT_CARDS_PER_TAB}</span></button>)}</div><Link to="/projects">All projects <HiArrowUpRight aria-hidden="true" /></Link></div>
    <div id="service-projects-panel" role="tabpanel" aria-labelledby={`projects-tab-${status}`} tabIndex={0}>
      <div className="service-projects__grid">{visible.map((project, index) => <article className="service-project" key={`${status}-${index}`}><img src={project.image} alt="" loading="lazy" /><div className="service-project__top"><span>{project.placeholder ? 'Placeholder' : status}</span><span>{project.model}</span></div><div className="service-project__body"><p><HiOutlineMapPin aria-hidden="true" />{project.location}</p><h3>{project.title}</h3><p>{project.description}</p><Link to="/contact" aria-label={`Discuss ${project.title}`}>{project.placeholder ? 'Discuss your requirement' : 'Discuss a similar project'} <HiArrowUpRight aria-hidden="true" /></Link></div></article>)}</div>
    </div>
  </div></section>;
}
ServiceProjects.propTypes = { service: PropTypes.object.isRequired, delivery: PropTypes.object.isRequired };
