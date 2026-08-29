import {
  HiOutlineArrowPath,
  HiOutlineMap,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const services = [
  {
    number: "01",
    title: "Land Acquisition",
    description:
      "Responsible land aggregation and stakeholder coordination that prepare projects for long-term success.",
    icon: HiOutlineMap,
    image: "/coral/coral-mine-hero.png",
  },
  {
    number: "02",
    title: "Work Force in Mining",
    description:
      "Skilled, safety-led teams that bring dependable capability to every stage of mine operations.",
    icon: HiOutlineUserGroup,
    image: "/coral/impact-safety-team.jpg",
  },
  {
    number: "03",
    title: "Mining Equipments",
    description:
      "Fit-for-purpose equipment and fleet support engineered for productivity in demanding conditions.",
    icon: HiOutlineTruck,
    image: "/coral/coral-port-logistics.png",
  },
  {
    number: "04",
    title: "Mine Repurposing",
    description:
      "Thoughtful closure and adaptive reuse strategies that give former mine sites a productive next chapter.",
    icon: HiOutlineArrowPath,
    image: "/coral/impact-land-restoration.jpg",
  },
];

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
          {services.map((service) => {
            const Icon = service.icon;
            return <article className="coral-service-card" key={service.number}>
              <img className="coral-service-card__image" src={service.image} alt="" loading="lazy" />
              <span className="coral-service-card__shade" aria-hidden="true" />
              <div className="coral-service-card__top"><span>{service.number}</span><Icon aria-hidden="true" /></div>
              <div><h3>{service.title}</h3><p>{service.description}</p></div>
              <span className="coral-service-card__line" aria-hidden="true" />
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDoSlider;
