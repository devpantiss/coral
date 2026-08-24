import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiSparkles, HiArrowRight } from "react-icons/hi";

const slides = [
  {
    id: 1,
    title: "Wash Services",
    tags: [
      { text: "Toilet Masonary" },
      { text: "Faecal Desludging" },
      { text: "Plumbing" },
    ],
    buttons: [
      { text: "MoWash Users", link: "https://users.mowash.in" },
      { text: "Partners", link: "https://partners.mowash.in" },
    ],
    buttonLink: "https://mowash-services.com",
    backgroundImage: "/Home/wash_services.png",
  },
  {
    id: 2,
    title: "Green Facility Management",
    tags: [
      { text: "Healthcare" },
      { text: "Public Transport" },
      { text: "Residential" },
    ],
    buttonText: "Explore",
    buttonLink: "https://facility-management-orpin.vercel.app/",
    backgroundImage: "/Home/facility_management.png",
  },
  {
    id: 3,
    title: "Mo WASH Academy",
    tags: [
      { text: "Nal Jal Mitra" },
      { text: "Sanitary Crew" },
      { text: "Septic Tank Technician" },
    ],
    buttonText: "Explore",
    buttonLink: "https://wash-academy.mowash.com",
    backgroundImage: "/Home/wash_academy.png",
  },
  {
    id: 4,
    title: "Work Force in WASH",
    tags: [
      { text: "Job Search" },
      { text: "Staffing" },
      { text: "Payrolling" },
    ],
    buttonText: "Explore",
    buttonLink: "https://staffing-xi.vercel.app/",
    backgroundImage: "/Home/workforce_wash.png",
  },
  {
    id: 5,
    title: "Circular Economy",
    tags: [
      { text: "E-Waste" },
      { text: "Plastic Waste" },
      { text: "Bio-Medical" },
    ],
    buttonText: "Explore",
    buttonLink: "https://circular-economy.mowash.com",
    backgroundImage: "/Home/circular_economy.png",
  },
  {
    id: 6,
    title: "WASH Equipments",
    tags: [
      { text: "Cesspool Vehicle" },
      { text: "BOV Tricycle" },
      { text: "Dumpsters" },
    ],
    buttonText: "Explore",
    buttonLink: "https://wash-equipments.mowash.com",
    backgroundImage: "/Home/wash_equipment.png",
  },
  {
    id: 7,
    title: "WASH SHG-SME",
    tags: [
      { text: "Innovation" },
      { text: "Incubation" },
      { text: "Investment" },
    ],
    buttonText: "Explore",
    buttonLink: "https://circular-economy.mowash.com",
    backgroundImage: "/Home/wash_shg_sme.png",
  },
  {
    id: 8,
    title: "WASH Construction",
    tags: [
      { text: "Canals" },
      { text: "Check Dams" },
      { text: "FSTP Plant" },
    ],
    buttonText: "Explore",
    buttonLink: "https://circular-economy.mowash.com",
    backgroundImage: "/Home/wash_construction.png",
  },
];

const WhatWeDo2 = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-blue-600 py-12 px-4 sm:px-10 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-center items-center mb-10">
          <div className="text-center max-w-3xl flex flex-col justify-center items-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 uppercase text-white">
              What We Do
            </h2>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-light">
              At MoWash, we focus on providing innovative solutions for
              sanitation, hygiene, and water management. Explore our services
              aimed at creating a sustainable and healthier community.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-8">
          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          >
            <FaChevronLeft className="text-lg sm:text-2xl group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            ref={nextRef}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          >
            <FaChevronRight className="text-lg sm:text-2xl group-hover:translate-x-0.5 transition-transform" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="mySwiper !py-2"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="group relative h-[400px] rounded-xl overflow-hidden shadow-lg border border-white/20 transition-all duration-300">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                  />

                  {/* Dark Image Overlay (Scoped strictly inside the card) */}
                  <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-center items-center text-center text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 drop-shadow-md">
                      {slide.title}
                    </h3>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {slide.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white/15 backdrop-blur-md text-cyan-100 text-xs px-3 py-1 rounded-full border border-white/20 font-medium"
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    {slide.buttons ? (
                      <div className="flex flex-wrap justify-center gap-3 w-full">
                        {slide.buttons.map((button, index) => (
                          <a
                            key={index}
                            href={button.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-xs font-semibold shadow-lg shadow-blue-900/40 hover:scale-105 transition-all"
                          >
                            <span>{button.text}</span>
                            <HiArrowRight className="text-xs" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        href={slide.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-xs font-semibold shadow-lg shadow-blue-900/40 hover:scale-105 transition-all group/btn"
                      >
                        <span>{slide.buttonText}</span>
                        <HiArrowRight className="text-xs group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo2;
