import { Link, Navigate, useParams } from "react-router-dom";
import { HiArrowUpRight, HiCheck } from "react-icons/hi2";
import InnerPage from "../components/common/PublicSite/InnerPage";
import { whatWeDoServicesBySlug } from "../data/whatWeDoServices";

function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const service = whatWeDoServicesBySlug[serviceSlug];

  if (!service) return <Navigate to="/capabilities" replace />;

  const Icon = service.icon;

  return (
    <InnerPage
      eyebrow={service.eyebrow}
      title={service.heroTitle}
      accent={service.heroAccent}
      intro={service.intro}
      image={service.image}
      imageAlt={`${service.title} by Coral Mines and Shipping`}
    >
      <section className="coral-page-intro coral-shell coral-service-detail__intro">
        <div>
          <p className="coral-eyebrow"><span /> Service {service.number}</p>
          <h2>{service.sectionTitle}</h2>
        </div>
        <div>
          <p className="coral-page-lead">{service.lead}</p>
          <p>{service.body}</p>
        </div>
      </section>

      <section className="coral-service-detail__pathway">
        <div className="coral-shell">
          <header>
            <div><Icon aria-hidden="true" /><span>Coral delivery framework</span></div>
            <p>One connected workstream from first assessment to assured delivery.</p>
          </header>
          <ol>
            {service.phases.map((phase, index) => (
              <li key={phase}><span>{String(index + 1).padStart(2, "0")}</span><strong>{phase}</strong></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="coral-service-detail__scope coral-shell">
        <div className="coral-service-detail__scope-head">
          <div><p className="coral-eyebrow"><span /> Scope of service</p><h2>Capability where<br />it matters.</h2></div>
          <p>Modular enough for a defined mandate. Integrated enough for end-to-end accountability.</p>
        </div>
        <div className="coral-service-detail__scope-grid">
          {service.scopes.map(([title, description], index) => (
            <article key={title}>
              <header><span>{String(index + 1).padStart(2, "0")}</span><HiCheck aria-hidden="true" /></header>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="coral-page-band coral-service-detail__band">
        <div className="coral-shell">
          <div><span>{service.bandLabel}</span><strong>{service.bandText}</strong></div>
          <Link to="/contact">Discuss your requirement <HiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
    </InnerPage>
  );
}

export default ServiceDetailPage;
