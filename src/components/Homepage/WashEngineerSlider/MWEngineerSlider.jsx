import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons

const slides = [
  {
    id: 1,
    title: "Mason",
    price: "₹ 546",
    discountedPrice: "₹ 464",
    imageUrl:
      "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842795%2Fuploads%2F1721842795394-1.png.jpg&w=256&q=75",
    videoUrl:
      "https://res.cloudinary.com/dgtc2fvgu/video/upload/v1729499644/Mason_xrj7ik.mp4",
    description: "DR. PARIKSHA RAO CLINICAL NUTRITIONIST",
  },
  {
    id: 2,
    title: "Electrician",
    price: "₹ 546",
    discountedPrice: "₹ 464",
    imageUrl:
      "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842795%2Fuploads%2F1721842795394-1.png.jpg&w=256&q=75",
    videoUrl:
      "https://aceblend.com/cdn/shop/files/quinn_vqxksymjj7u43ugmx7t1643h.mp4", // Add video URL for each product
    description: "DR. PARIKSHA RAO CLINICAL NUTRITIONIST",
  },
  {
    id: 3,
    title: "Plumber",
    price: "₹ 546",
    discountedPrice: "₹ 464",
    imageUrl:
      "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842795%2Fuploads%2F1721842795394-1.png.jpg&w=256&q=75",
    videoUrl:
      "https://aceblend.com/cdn/shop/files/quinn_vqxksymjj7u43ugmx7t1643h.mp4", // Add video URL for each product
    description: "DR. PARIKSHA RAO CLINICAL NUTRITIONIST",
  },
  {
    id: 4,
    title: "CessPool Vehicle Operator",
    price: "₹ 499",
    discountedPrice: "₹ 499",
    imageUrl:
      "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842833%2Fuploads%2F1721842833295-2.png.jpg&w=256&q=75",
    videoUrl:
      "https://res.cloudinary.com/dgtc2fvgu/video/upload/v1729499628/cesspool_op_nzkhwd.mp4",
    description: "Shivoham - Celebrity Fitness Coach",
  },
  {
    id: 5,
    title: "Sanitation Crew",
    price: "₹ 499",
    discountedPrice: "₹ 499",
    imageUrl:
      "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842864%2Fuploads%2F1721842864505-3.png.jpg&w=256&q=75",
    videoUrl:
      "https://res.cloudinary.com/dgtc2fvgu/video/upload/v1729499636/Sanitation_Crew_vrkhy7.mp4",
    description: "Shivoham - Celebrity Fitness Coach",
  },
  // {
  //   id: 6,
  //   title: "Nal Jal Mitra",
  //   price: "₹ 499",
  //   discountedPrice: "₹ 499",
  //   imageUrl:
  //     "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842899%2Fuploads%2F1721842899350-4.png.jpg&w=256&q=75",
  //   videoUrl:
  //     "https://aceblend.com/cdn/shop/files/quinn_w0v4m1kbsd0vgtxjz3wr5xvg.mp4", // Add video URL for each product
  //   description: "Shivoham - Celebrity Fitness Coach",
  // },
  {
    id: 7,
    title: "STP Operator",
    price: "₹ 499",
    discountedPrice: "₹ 499",
    imageUrl:
    "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842833%2Fuploads%2F1721842833295-2.png.jpg&w=256&q=75",
    videoUrl:
      "https://res.cloudinary.com/dgtc2fvgu/video/upload/v1729499634/STP_OP_omn8pm.mp4",
    description: "Shivoham - Celebrity Fitness Coach",
  },
  {
    id: 8,
    title: "Solar Pump Operator",
    price: "₹ 499",
    discountedPrice: "₹ 499",
    imageUrl:
      "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721842959%2Fuploads%2F1721842959325-6.png.jpg&w=256&q=75",
    videoUrl:
      "https://res.cloudinary.com/dgtc2fvgu/video/upload/v1729575854/solar_rgxwix.mp4",
    description: "Shivoham - Celebrity Fitness Coach",
  },
  {
    id: 9,
    title: "Pond Excavator",
    price: "₹ 499",
    discountedPrice: "₹ 499",
    imageUrl:
      "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721843023%2Fuploads%2F1721843023351-8.png.jpg&w=256&q=75",
    videoUrl:
      "https://res.cloudinary.com/dgtc2fvgu/video/upload/v1729499637/pond_excavator_jx6czh.mp4",
    description: "Shivoham - Celebrity Fitness Coach",
  },
  // {
  //   id: 10,
  //   title: "Water Bill Collector",
  //   price: "₹ 499",
  //   discountedPrice: "₹ 499",
  //   imageUrl:
  //     "https://www.mowash.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdd1dbnkhw%2Fimage%2Fupload%2Fv1721843101%2Fuploads%2F1721843101241-10.png.jpg&w=256&q=75",
  //   videoUrl:
  //     "https://aceblend.com/cdn/shop/files/quinn_v2d4jc7nj9vmatmoa5wy9p3f.mp4", // Add video URL for each product
  //   description: "Shivoham - Celebrity Fitness Coach",
  // },
  ];

// Custom Previous Arrow
const PrevArrow = ({ className, onClick }) => (
  <div
    className={`${className} custom-arrow prev-arrow`}
    onClick={onClick}
    style={{
      display: "block",
      position: "absolute",
      left: "-30px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 1,
      color: "white",
    }}
  >
    <FaChevronLeft size={30} />
  </div>
);

// Custom Next Arrow
const NextArrow = ({ className, onClick }) => (
  <div
    className={`${className} custom-arrow next-arrow`}
    onClick={onClick}
    style={{
      display: "block",
      position: "absolute",
      right: "-30px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 1,
      color: "white",
      backgroundColor: "blue",
    }}
  >
    <FaChevronRight size={30} />
  </div>
);

// Custom Dot Indicator
const CustomDot = ({ onClick, active }) => {
  return (
    <div
      className={`w-3 h-3 rounded-full cursor-pointer ${active ? "bg-red-600" : "bg-gray-300"}`}
      onClick={onClick}
      style={{ margin: "0 5px" }}
    ></div>
  );
};

const MWEngineerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    swipe: true, // Enable swipe
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => setCurrentSlide(index),
    customPaging: (i) => <CustomDot active={i === currentSlide} />, // Custom dot
    dotsClass: "slick-dots custom-dots", // Add custom dot class
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Center the slide in mobile view
          centerPadding: "40px", // Adjust padding to keep the slide centered
        },
      },
    ],
  };

  return (
    <div className="px-4 py-6 relative">
      <Slider
        {...settings}
        className="py-12 w-[400px] md:w-[768px] lg:w-[1400px]"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative px-2">
            {/* Card Container */}
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              style={{ width: "250px", margin: "0 auto" }} // Center the card on mobile view
            >
              {/* Video Section */}
              <div className="relative">
                <video
                  src={slide.videoUrl}
                  autoPlay
                  loop
                  muted
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Product Details Section */}
              <div className="p-4 h-[100px] relative text-center">
                {/* Product Image */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="mx-auto absolute -top-12 left-[39%] w-16 h-16 object-contain"
                />
                {/* Product Title */}
                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                  {slide.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MWEngineerSlider;
