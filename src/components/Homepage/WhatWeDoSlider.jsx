import { useRef } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineArrowPath,
  HiOutlineMap,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { A11y, Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
  const previousButton = useRef(null);
  const nextButton = useRef(null);

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
            <div className="coral-services__controls" aria-label="Slider controls">
              <button ref={previousButton} type="button" aria-label="Previous service">
                <HiArrowLeft />
              </button>
              <button ref={nextButton} type="button" aria-label="Next service">
                <HiArrowRight />
              </button>
            </div>
          </div>
        </div>

        <Swiper
          className="coral-services__slider"
          modules={[A11y, Autoplay, Keyboard, Navigation]}
          slidesPerView={1.08}
          spaceBetween={14}
          speed={600}
          loop
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: previousButton.current,
            nextEl: nextButton.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = previousButton.current;
            swiper.params.navigation.nextEl = nextButton.current;
          }}
          breakpoints={{
            560: { slidesPerView: 1.65, spaceBetween: 16 },
            800: { slidesPerView: 2.35, spaceBetween: 18 },
            1120: { slidesPerView: 3.15, spaceBetween: 20 },
          }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <SwiperSlide key={service.number}>
                <article className="coral-service-card">
                  <img
                    className="coral-service-card__image"
                    src={service.image}
                    alt=""
                    loading="lazy"
                  />
                  <span className="coral-service-card__shade" aria-hidden="true" />
                  <div className="coral-service-card__top">
                    <span>{service.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <span className="coral-service-card__line" aria-hidden="true" />
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default WhatWeDoSlider;
