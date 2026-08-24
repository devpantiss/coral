import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const slides = [
  {
    id: 1,
    title: "Wash Services",
    description: "Providing access to safe and clean drinking water.",
    buttons: [
      { text: "MoWash Users", link: "https://users.mowash.in" },
      { text: "Partners", link: "https://partners.mowash.in" },
    ],
    buttonLink: "https://mowash-services.com", // Link for all slides
    backgroundImage:
      "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1728306740/Screenshot_2024-10-07_at_6.41.27_PM_w5faom.png",
  },
  {
    id: 2,
    title: "Facility Management",
    description: "Ensuring proper sanitation facilities for communities.",
    buttonText: "Explore",
    buttonLink: "https://facility-management-orpin.vercel.app/", // Link for all slides
    backgroundImage:
      "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1728306740/Screenshot_2024-10-07_at_6.41.27_PM_w5faom.png",
  },
  {
    id: 3,
    title: "Wash Academy",
    description:
      "Educating communities about hygiene and sanitation practices.",
    buttonText: "Explore",
    buttonLink: "https://wash-academy.mowash.com", // Link for all slides
    backgroundImage:
      "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1728306740/Screenshot_2024-10-07_at_6.41.27_PM_w5faom.png",
  },
  {
    id: 4,
    title: "Wash Equipments",
    description: "Providing high-quality sanitation tools and resources.",
    buttonText: "Explore",
    buttonLink: "https://wash-equipments.mowash.com", // Link for all slides
    backgroundImage:
      "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1728306740/Screenshot_2024-10-07_at_6.41.27_PM_w5faom.png",
  },
  {
    id: 5,
    title: "Circular Economy",
    description: "Promoting sustainable practices in waste management.",
    buttonText: "Explore",
    buttonLink: "https://circular-economy.mowash.com", // Link for all slides
    backgroundImage:
      "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1728306740/Screenshot_2024-10-07_at_6.41.27_PM_w5faom.png",
  },
  {
    id: 6,
    title: "Jobs",
    description: "Creating employment opportunities in the WASH sector.",
    buttonText: "Explore",
    buttonLink: "https://jobs.mowash.com", // Link for all slides
    backgroundImage:
      "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1728306740/Screenshot_2024-10-07_at_6.41.27_PM_w5faom.png",
  },
  {
    id: 7,
    title: "Enterprise",
    description: "Building businesses to improve sanitation infrastructure.",
    buttonText: "Explore",
    buttonLink: "https://enterprise.mowash.com", // Link for all slides
    backgroundImage:
      "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1728306740/Screenshot_2024-10-07_at_6.41.27_PM_w5faom.png",
  },
];

const WhatWeDo = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
  
    return (
      <div className="w-full bg-blue-600 py-16 px-6">
        <div className="container mx-auto flex flex-col items-center gap-8">
          {/* Left Section */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              What We Do
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              At MoWash, we focus on providing innovative solutions for sanitation, hygiene, and water management. Explore our services aimed at creating a sustainable and healthier community.
            </p>
          </div>
  
          {/* Right Section */}
          <div className="">
            <div className="relative">
              {/* Custom Navigation Buttons */}
              <button
                ref={prevRef}
                className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full"
              >
                <FaChevronLeft  className="text-[80px] text-white"/>
              </button>
              <button
                ref={nextRef}
                className="absolute right-0 z-10 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full"
              >
                <FaChevronRight className="text-[80px] text-white"/>
              </button>
  
              <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView={4}
                spaceBetween={25}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.update();
                  });
                }}
                className="mySwiper w-[400px] md:w-[1008px] overflow-auto"
              >
                {slides.map((slide) => (
                  <SwiperSlide
                    key={slide.id}
                    className="flex justify-center items-center"
                  >
                    <div
                      className="relative h-[600px] w-[300px] bg-cover bg-center rounded-lg shadow-lg"
                      style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 p-4 lg:inset-auto lg:bottom-2 lg:left-2 bg-black bg-opacity-50 rounded-lg flex flex-col justify-center items-center text-center text-white px-4">
                        <h2 className="text-2xl lg:text-4xl font-bold mb-2">
                          {slide.title}
                        </h2>
                        <p className="text-sm mb-4">{slide.description}</p>
  
                        {/* Buttons */}
                        {slide.id === 1 ? (
                          <div className="flex lg:flex-row flex-col gap-4">
                            {slide.buttons.map((button, index) => (
                              <a
                                key={index}
                                href={button.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-full"
                              >
                                {button.text}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <a
                            href={slide.buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-600 text-sm px-6 py-2 rounded-full"
                          >
                            {slide.buttonText}
                          </a>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default WhatWeDo;
