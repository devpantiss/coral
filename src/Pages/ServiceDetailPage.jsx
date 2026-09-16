import { Navigate, useParams } from 'react-router-dom';
import InnerPage from '../components/common/PublicSite/InnerPage';
import Partners from '../components/Homepage/Partners';
import { ServiceFleet, ServiceProcess, ServiceProjects } from '../components/Services/ServiceSections';
import { whatWeDoServicesBySlug } from '../data/whatWeDoServices';
import { serviceDelivery } from '../data/serviceDelivery';
import './ServiceDetailPage.css';
import ServiceSolutions from '../components/Services/ServiceSolutions';

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const service = whatWeDoServicesBySlug[serviceSlug];
  const delivery = serviceDelivery[serviceSlug];
  if (!service || !delivery) return <Navigate to="/capabilities" replace />;

  return <div className="service-experience"><InnerPage eyebrow={service.title} title={service.heroTitle} accent={service.heroAccent} intro={service.intro} image={service.image} video={delivery.video}>
    <div className="service-detail" key={serviceSlug}>
      <nav className="service-index coral-shell" aria-label="On this page"><span>Explore this segment</span><div>{['Process', 'Fleet', 'Solutions', 'Projects', 'Partners'].map((label, index) => <a key={label} href={`#${label.toLowerCase() === 'partners' ? 'partners' : `service-${label.toLowerCase()}`}`}><small>{String(index + 2).padStart(2, '0')}</small>{label}</a>)}</div></nav>
      <ServiceProcess service={service} delivery={delivery} />
      <ServiceFleet delivery={delivery} />
      <ServiceSolutions service={service} />
      <ServiceProjects service={service} delivery={delivery} />
      <Partners />
    </div>
  </InnerPage></div>;
}
