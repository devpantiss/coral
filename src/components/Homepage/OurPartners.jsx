import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurPartners = () => {
  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000, 
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, 
    cssEase: "linear", 
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative bg-white flex flex-col lg:flex-row py-10 px-12 justify-center gap-x-16 items-center">
      {/* Image positioned at the top-left corner and rotated */}
      <div className="relative border-l-4 border-blue-600">
        <h1 className="text-4xl pl-2 font-bold">Our Partners</h1>
      </div>

      <div className="container w-[500px] lg:w-[1000px]">
        {/* Slider with Marquee Effect */}
        <Slider {...settings} className="gap-x-2"> {/* Added gap using Tailwind */}
          <div className="px-4">
            <img
              src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1726662470/group_company_logo1_bah9rm.jpg"
              alt="TPCODL"
              className="h-36 w-full object-contain"
            />
          </div>
          <div className="px-4">
            <img
              src="https://pantiss.com/wp-content/uploads/2022/08/logo.png"
              alt="IForest"
              className="h-36 w-full object-contain"
            />
          </div>
          <div className="px-4">
            <img
              src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1726661960/pngwing.com-removebg-preview_gjzzge.png"
              alt="Lixil"
              className="h-36 w-full object-contain"
            />
          </div>
          <div className="px-4">
            <img
              src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1726055080/1200px-UNICEF_Logo_g3gwyz.png"
              alt="Unicef"
              className="h-36 w-full object-contain"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default OurPartners;
