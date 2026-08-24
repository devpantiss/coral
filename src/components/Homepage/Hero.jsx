import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { HiArrowRight, HiSparkles, HiChartBar, HiChevronDown } from "react-icons/hi";

const Hero = () => {
  return (
    <div className="relative w-full h-screen font-sans bg-slate-950">
      {/* Sticky Hero Container - Video remains fixed for Hero section */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-105"
          aria-hidden="true"
          preload="auto"
        >
          <source src="/Home/Mowash_Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Light Translucent Overlay for clear video visibility */}
        <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 w-full z-30 px-4 sm:px-8 py-3.5 bg-slate-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Main Logo */}
          <a
            href="https://mowash.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MoWash Home"
            className="transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/Home/mowash-logo.webp"
              alt="MoWash Logo"
              className="w-36 sm:w-44 h-auto object-contain filter drop-shadow-md"
            />
          </a>

          {/* Initiative & Partner Logos */}
          <div className="flex items-center gap-6 sm:gap-10">
            <a
              href="https://pantiss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group text-left"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-300/80 font-medium">An initiative by</p>
                <img
                  src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1727680521/pantiss_logo_kuiof0.png"
                  alt="PANTISS Logo"
                  className="h-7 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-90 filter brightness-110"
                />
              </div>
            </a>

            <div className="h-8 w-[1px] bg-white/20" />

            <a
              href="https://www.unicef.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group text-left"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-300/80 font-medium">Supported by</p>
                <img
                  src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1726530975/UNICEF-logo_lctnsz.webp"
                  alt="UNICEF Logo"
                  className="h-7 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-90 filter brightness-110"
                />
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Central Content */}
      <div className="relative inset-0 h-full flex flex-col items-center justify-center text-white text-center z-20 px-4 pt-16 max-w-5xl mx-auto">
        
        {/* Top Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-md mb-6 animate-pulse">
          <HiSparkles className="text-cyan-400 text-sm" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-cyan-200 uppercase">
            Transforming WASH Infrastructure in Odisha
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Welcome to <br />
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
            MoWash Company
          </span>
        </h1>

        {/* Dynamic Typing Subtitle */}
        <div className="h-12 flex items-center justify-center">
          <h2 className="text-lg sm:text-2xl font-medium text-slate-200 tracking-wide">
            <TypeAnimation
              sequence={[
                "We are the Toilet Directors!",
                2200,
                "Transforming Water, Sanitation & Hygiene across Odisha",
                2200,
                "Empowering Local Communities & Sanitation Workers",
                2200,
                "Sustainable Infrastructure for a Healthier Tomorrow",
                2200,
              ]}
              wrapper="span"
              className="inline-block bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent font-semibold"
              cursor={true}
              repeat={Infinity}
            />
          </h2>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            to="/dashboard"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-semibold text-base shadow-xl shadow-blue-900/40 hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
          >
            <HiChartBar className="text-xl text-cyan-200" />
            <span>Go to Admin Dashboard</span>
            <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://mowash.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-base backdrop-blur-md hover:scale-105 transition-all duration-300"
          >
            <span>Visit Mowash Portal</span>
            <HiArrowRight className="text-lg" />
          </a>
        </div>
      </div>

      {/* Background text with white outline mockup style */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center z-5 pointer-events-none">
        <h1
          className="text-[12rem] xl:text-[16rem] font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 opacity-55 select-none"
          style={{
            WebkitTextStroke: "2px white", // White outline
          }}
          aria-hidden="true"
        >
          MoWash
        </h1>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll Down</span>
        <HiChevronDown className="text-lg text-cyan-400" />
      </div>
      </div>
    </div>
  );
};

export default Hero;
