import React from "react";
import Marquee from "react-marquee-slider";

const QuickLinks = () => {
  return (
    <div className="bg-transparent ring-2 ring-gray-700 py-3 text-white mt-4 rounded-md overflow-hidden">
      <h1 className="text-3xl px-4 font-bold p-2 border-b-2 border-gray-700 mb-3">Quick Links</h1>
      {/* Marquee container */}
      <Marquee velocity={45} minScale={0.7} resetAfterTries={200} scatterRandomly={false}>
        {/* Link 1 */}
        <a href="#" className="flex flex-col items-center mx-32">
          <img
            src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1726660522/1200px-UNICEF_Logo_gfi4tc.png"
            alt="Government of Odisha"
            className="h-12 mb-2"
          />
        </a>
        {/* Link 2 */}
        <a href="#" className="flex flex-col items-center mx-32">
          <img
            src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1726661960/pngwing.com-removebg-preview_gjzzge.png"
            alt="Covid Dashboard"
            className="h-12 mb-2"
          />
        </a>
        {/* Link 3 */}
        <a href="#" className="flex flex-col items-center mx-32">
          <img
            src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1726530988/mo-wash-logo_eiq199.svg"
            alt="Biju Swasthya Kalyan Yojana"
            className="h-12 mb-2"
          />
        </a>
        {/* Link 4 */}
        <a href="#" className="flex flex-col items-center mx-32">
          <img
            src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1727680521/pantiss_logo_kuiof0.png"
            alt="Health and Family Welfare"
            className="h-12 mb-2"
          />
        </a>
      </Marquee>
    </div>
  );
};

export default QuickLinks;
