import { Link, Navigate, useParams } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import InnerPage from '../components/common/PublicSite/InnerPage';
import Partners from '../components/Homepage/Partners';
import { SectionHeading, ServiceFleet, ServiceProcess, ServiceProjects } from '../components/Services/ServiceSections';
import { whatWeDoServicesBySlug } from '../data/whatWeDoServices';
import { serviceDelivery } from '../data/serviceDelivery';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const service = whatWeDoServicesBySlug[serviceSlug];
  const delivery = serviceDelivery[serviceSlug];
  if (!service || !delivery) return <Navigate to="/capabilities" replace />;

  const ServiceIcon = service.icon;

  return <div className="service-experience"><InnerPage eyebrow={service.title} title={service.heroTitle} accent={service.heroAccent} intro={service.intro} image={service.image} video={delivery.video}>
    <div className="service-detail" key={serviceSlug}>
      <nav className="service-index coral-shell" aria-label="On this page"><span>Explore this segment</span><div>{['Process', 'Fleet', 'Solutions', 'Projects', 'Partners'].map((label, index) => <a key={label} href={`#${label.toLowerCase() === 'partners' ? 'partners' : `service-${label.toLowerCase()}`}`}><small>{String(index + 2).padStart(2, '0')}</small>{label}</a>)}</div></nav>
      <ServiceProcess service={service} delivery={delivery} />
      <ServiceFleet delivery={delivery} />
      <section id="service-solutions" className="service-solutions service-section" aria-label="Segment solutions"><div className="coral-shell">
        <SectionHeading number="04" label="Our solutions" title="One partner. Every moving part.">{service.body}</SectionHeading>
        <div className="service-solutions__grid">{service.scopes.map(([title, description], index) => <article key={title}><header><span>{String(index + 1).padStart(2, '0')}</span><ServiceIcon aria-hidden="true" /></header><h3>{title}</h3><p>{description}</p></article>)}</div><div className="service-solutions__footer"><p>A defined scope or a complete delivery programme.</p><Link to="/contact">Let’s discuss your requirement <HiArrowUpRight aria-hidden="true" /></Link></div>
      </div></section>
      <ServiceProjects service={service} delivery={delivery} />
      <Partners />
    </div>
  </InnerPage></div>;
}
