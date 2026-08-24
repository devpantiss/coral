import React from "react";
import { Link } from "react-router-dom";
import { HiLocationMarker, HiArrowRight } from "react-icons/hi";

const fellowshipLocations = [
  "T.Rampur",
  "Nagada",
  "Mangalajodi",
  "Bagapatia",
  "Koida",
];

const Summit = () => {
  return (
    <div className="relative w-full lg:h-[420px] min-h-[480px] overflow-hidden flex items-center justify-center py-10 px-4 sm:px-10">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/Home/spotlight/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Floating Content (No Boxes) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">

          {/* Left Initiative */}
          <div className="flex flex-col items-center text-center w-full lg:w-1/2 px-2">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md mb-2">
              ODISHA Just Transition Conclave-'24
            </span>

            <div className="inline-flex items-center gap-1.5 text-blue-300 text-base font-semibold mb-3">
              <HiLocationMarker className="text-blue-400" />
              <span>Talcher</span>
            </div>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light max-w-lg mb-6">
              Focusing on sustainable development and empowering professionals associated with the WASH sector.
            </p>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 hover:border-blue-400 text-white font-medium text-sm transition-all duration-300 hover:bg-blue-500/20 hover:scale-105 group"
            >
              Explore More
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
          <div className="hidden lg:block h-48 w-[2px] bg-gradient-to-b from-transparent via-white/50 to-transparent flex-shrink-0" />
          <div className="block lg:hidden w-48 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent flex-shrink-0 my-2" />

          {/* Right Initiative */}
          <div className="flex flex-col items-center text-center w-full lg:w-1/2 px-2">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md mb-4">
              ODISHA WASHPRENEUR FELLOWSHIP-'24
            </span>

            {/* Locations Divider Line */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-base text-blue-200 font-medium mb-6">
              {fellowshipLocations.map((loc, idx) => (
                <React.Fragment key={loc}>
                  <span className="hover:text-white transition-colors">{loc}</span>
                  {idx < fellowshipLocations.length - 1 && (
                    <span className="text-white/40 font-light">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light max-w-lg mb-6">
              Empowering grassroots sanitation leaders and youth entrepreneurs across key vulnerable regions.
            </p>

            <Link
              to="/dashboard/welfare-kendra"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/80 hover:border-blue-400 text-white font-medium text-sm transition-all duration-300 hover:bg-blue-500/20 hover:scale-105 group"
            >
              Explore Fellowship
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Summit;
