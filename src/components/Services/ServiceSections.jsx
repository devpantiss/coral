import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiArrowUpRight, HiChevronLeft, HiChevronRight, HiOutlineMapPin, HiPause, HiPlay } from 'react-icons/hi2';
import { operatedFleet } from '../../data/operatedFleet';
import { projectProfiles } from '../../data/projectProfiles';
import { getServiceProjectCards } from '../../data/serviceProjectCards';
import { whatWeDoServices } from '../../data/whatWeDoServices';
import { serviceDelivery } from '../../data/serviceDelivery';

export function SectionHeading({ number, label, title, children }) {
  return <header className="service-section-heading"><div><p className="coral-eyebrow"><span />{number} / {label}</p><h2>{title}</h2></div>{children && <p>{children}</p>}</header>;
}
SectionHeading.propTypes = { number: PropTypes.string.isRequired, label: PropTypes.string.isRequired, title: PropTypes.string.isRequired, children: PropTypes.node };

export function ServiceProcess({ service, delivery }) {
  const [active, setActive] = useState(0);
  const stepsRef = useRef(null);
  const step = delivery.steps[active];
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
      <div className="service-process__image"><img src={step.image} alt={step.alt} loading="lazy" /><span>{service.phases[active]}</span></div>
      <div className="service-process__detail" key={active}><span className="service-process__counter">Step {String(active + 1).padStart(2, '0')} <i /> {String(service.phases.length).padStart(2, '0')}</span><h3>{service.phases[active]}</h3><p>{step.description}</p><div className="service-process__navigation"><span>From assessment to delivery</span><button type="button" onClick={() => selectStep((active + 1) % service.phases.length, true)} aria-label="Explore next process stage"><HiArrowUpRight aria-hidden="true" /></button></div></div>
    </div>
    <div className="service-process__outcome"><span>The outcome</span><p>{service.bandText}</p></div>
  </div></section>;
}
ServiceProcess.propTypes = { service: PropTypes.object.isRequired, delivery: PropTypes.object.isRequired };

export function ServiceFleet({ delivery }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const thumbnailsRef = useRef(null);
  const fleet = delivery.fleetIds.map(id => operatedFleet.find(item => item.id === id));
  const vehicle = fleet[active];
  const playing = !paused && !hovered && fleet.length > 1;

  useEffect(() => {
    if (!playing) return;
    // Restart the full delay after a manual selection or an automatic advance.
    const timer = window.setTimeout(() => setActive(index => (index + 1) % fleet.length), 3000);
    return () => window.clearTimeout(timer);
  }, [active, playing, fleet.length]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stopForReducedMotion = event => { if (event.matches) setPaused(true); };
    preference.addEventListener('change', stopForReducedMotion);
    return () => preference.removeEventListener('change', stopForReducedMotion);
  }, []);

  useEffect(() => {
    const strip = thumbnailsRef.current;
    const thumbnail = strip?.children[active];
    if (!strip || !thumbnail) return;
    const bounds = strip.getBoundingClientRect();
    const item = thumbnail.getBoundingClientRect();
    if (item.left < bounds.left) strip.scrollLeft -= bounds.left - item.left;
    else if (item.right > bounds.right) strip.scrollLeft += item.right - bounds.right;
  }, [active]);

  const move = direction => setActive(index => (index + direction + fleet.length) % fleet.length);
  return <section id="service-fleet" className="service-fleet" aria-label="Segment operating fleet">
    <div className="coral-shell service-fleet__inner">
      <SectionHeading number="03" label="Our fleet" title="Built for the work ahead.">{delivery.fleetIntro}</SectionHeading>
      <div className="service-fleet__stage" aria-live={playing ? 'off' : 'polite'} aria-atomic="true" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPaused(true)}>
        <div className="service-fleet__identity"><span>{String(active + 1).padStart(2, '0')} / {String(fleet.length).padStart(2, '0')}</span><h3>{vehicle.name}</h3><dl>{vehicle.stats.slice(0, 3).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><Link to="/fleet">Explore the full fleet <HiArrowUpRight aria-hidden="true" /></Link></div>
        <span className="service-fleet__watermark" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span><img key={vehicle.id} className="service-fleet__machine" src={vehicle.image} alt={vehicle.name} loading="lazy" />
      </div>
      <div className="service-fleet__controls"><div ref={thumbnailsRef} className="service-fleet__thumbnails" aria-label="Choose equipment" onFocusCapture={() => setPaused(true)}>{fleet.map((item, index) => <button type="button" key={item.id} aria-pressed={index === active} aria-label={`Show ${item.name}`} onClick={() => setActive(index)}><img src={item.image} alt="" loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span><small>{item.name}</small></button>)}</div><div className="service-fleet__arrows"><button type="button" onClick={() => move(-1)} aria-label="Previous machine"><HiChevronLeft aria-hidden="true" /></button><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Start automatic fleet rotation' : 'Pause automatic fleet rotation'}>{paused ? <HiPlay aria-hidden="true" /> : <HiPause aria-hidden="true" />}</button><button type="button" onClick={() => move(1)} aria-label="Next machine"><HiChevronRight aria-hidden="true" /></button></div></div>
    </div>
  </section>;
}
ServiceFleet.propTypes = { delivery: PropTypes.object.isRequired };

const STATUSES = [
  {
    key:     'Completed',
    label:   'Completed Projects',
    eyebrow: 'Delivered · Proven outcomes',
    bg:      '/coral/coral-mine-hero.png',
    // matches projectProfiles status field
    profileStatus: 'Delivered',
  },
  {
    key:     'Ongoing',
    label:   'Ongoing Projects',
    eyebrow: 'In progress · Active sites',
    bg:      '/coral/mine-development-site.jpg',
    profileStatus: 'Ongoing',
  },
];

/** Count real (non-placeholder) project profiles across all delivery segments for a given status key */
function countProjects(profileStatus) {
  // Collect all projectTitles across all segments
  const allTitles = new Set(
    Object.values(serviceDelivery).flatMap(d => d.projectTitles ?? [])
  );
  return projectProfiles.filter(
    p => allTitles.has(p.title) && p.status === profileStatus
  ).length;
}

/** One parallax banner + segment-tabs + cards block */
function ProjectsBlock({ status, service, projects }) {
  // 4 segment tabs – the current service's own segment is pre-selected
  const segments = whatWeDoServices;
  const defaultTab = segments.findIndex(s => s.slug === service.slug);
  const [activeSegment, setActiveSegment] = useState(Math.max(0, defaultTab));
  const seg = segments[activeSegment];

  // Filter projects to the selected segment, then build card list
  const segProjects = projectProfiles.filter(p => {
    const segDelivery = serviceDelivery[seg.slug];
    return segDelivery?.projectTitles?.includes(p.title);
  });
  const cards = getServiceProjectCards(seg, segProjects, status.key);

  function handleSegKey(event, index) {
    let next;
    if      (event.key === 'ArrowRight') next = (index + 1) % segments.length;
    else if (event.key === 'ArrowLeft')  next = (index + segments.length - 1) % segments.length;
    else if (event.key === 'Home')       next = 0;
    else if (event.key === 'End')        next = segments.length - 1;
    else return;
    event.preventDefault();
    setActiveSegment(next);
    event.currentTarget.parentElement.children[next]?.focus();
  }

  return (
    <>
      {/* ── Parallax banner ───────────────────────────────────────── */}
      <div
        className="sp-banner"
        style={{ backgroundImage: `url(${status.bg})` }}
      >
        <div className="sp-banner__shade" />
        <div className="sp-banner__copy coral-shell">
          <div className="sp-banner__left">
            <p className="sp-banner__eyebrow">{status.eyebrow}</p>
            <h3 className="sp-banner__title">{status.label}</h3>
          </div>
          <div className="sp-banner__stat">
            <span className="sp-banner__stat-num">
              {String(countProjects(status.profileStatus)).padStart(2, '0')}
            </span>
            <span className="sp-banner__stat-label">Projects</span>
            <Link to="/projects" className="sp-banner__explore">
              Explore all <HiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Segment tabs + cards ──────────────────────────────────── */}
      <div className="sp-block">
        <div className="coral-shell">
          {/* Segment tab bar */}
          <div
            className="sp-seg-tabs"
            role="tablist"
            aria-label={`Service segment — ${status.label}`}
          >
            {segments.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === activeSegment}
                tabIndex={i === activeSegment ? 0 : -1}
                onClick={() => setActiveSegment(i)}
                onKeyDown={e => handleSegKey(e, i)}
              >
                <span className="sp-seg-tabs__num">{s.number}</span>
                {s.title}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div
            className="service-projects__grid"
            role="tabpanel"
            aria-label={`${seg.title} — ${status.label}`}
            key={`${status.key}-${seg.slug}`}
          >
            {cards.map((project, index) => (
              <article className="service-project" key={`${status.key}-${seg.slug}-${index}`}>
                <img src={project.image} alt={project.imageAlt || project.title} loading="lazy" />
                <div className="service-project__top">
                  <span>{project.placeholder ? 'Preview' : status.key}</span>
                  <span>{project.model}</span>
                </div>
                <div className="service-project__body">
                  <p><HiOutlineMapPin aria-hidden="true" />{project.location}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Link to="/contact" aria-label={`Discuss ${project.title}`}>
                    {project.placeholder ? 'Discuss your requirement' : 'Discuss a similar project'}{' '}
                    <HiArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
ProjectsBlock.propTypes = { status: PropTypes.object.isRequired, service: PropTypes.object.isRequired, projects: PropTypes.array.isRequired };

export function ServiceProjects({ service, delivery }) {
  const projects = projectProfiles.filter(project => delivery.projectTitles.includes(project.title));
  return (
    <section id="service-projects" className="service-projects service-section" aria-label="Segment projects">
      <div className="coral-shell">
        <SectionHeading number="05" label="Our projects" title="Capability, put into practice.">
          Explore the project profiles connected to this segment, from delivered programmes to work in progress.
        </SectionHeading>
      </div>

      {STATUSES.map(status => (
        <ProjectsBlock key={status.key} status={status} service={service} projects={projects} />
      ))}

      <div className="coral-shell">
        <div className="service-projects__footer-cta">
          <div>
            <span>Full project portfolio</span>
            <p>See every programme across all four service segments.</p>
          </div>
          <Link to="/projects">All projects <HiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
ServiceProjects.propTypes = { service: PropTypes.object.isRequired, delivery: PropTypes.object.isRequired };
