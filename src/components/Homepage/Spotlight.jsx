import React from "react";
import Heading from "../common/Heading";
import { MdEventAvailable, MdCampaign } from "react-icons/md";
import { SiStorybook, SiGooglepodcasts } from "react-icons/si";
import { HiNewspaper, HiArrowRight } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { FaAward, FaBlog } from "react-icons/fa6";

const Spotlight = () => {
  const categoryIcons = {
    Events: <MdEventAvailable className="inline-block mr-2 text-xl flex-shrink-0" />,
    Stories: <SiStorybook className="inline-block mr-2 text-xl flex-shrink-0" />,
    Campaigns: <MdCampaign className="inline-block mr-2 text-xl flex-shrink-0" />,
    Podcasts: <SiGooglepodcasts className="inline-block mr-2 text-xl flex-shrink-0" />,
    News: <HiNewspaper className="inline-block mr-2 text-xl flex-shrink-0" />,
    Reports: <HiDocumentReport className="inline-block mr-2 text-xl flex-shrink-0" />,
    Awards: <FaAward className="inline-block mr-2 text-xl flex-shrink-0" />,
    Blogs: <FaBlog className="inline-block mr-2 text-xl flex-shrink-0" />,
  };

  const newsItems = [
    {
      category: "Events",
      title: "PAGA 1.0",
      description: "PAGA 1.0 2022, organized by PANTISS and UNICEF, focuses on accelerating climate change adaptation through the convergence of Just Transition and Circular Economy.",
      imageUrl: "/Home/spotlight/PAGA_1.png",
      linkText: "View More",
    },
    {
      category: "Stories",
      title: "Stepping Forward: Chappal-Making Unit Empowering Communities",
      description: "Discover the journey of establishing a chappal-making unit under the WASH Enterprise, fostering livelihood opportunities while promoting hygiene and sustainability in rural communities.",
      imageUrl: "/Home/spotlight/slipper_unit.jpeg",
      linkText: "View More",
    },
    {
      category: "Campaigns",
      title: "Youth4Water+: Empowering Odisha’s Water Warriors",
      description: "Join the Youth4Water+ campaign in Odisha to inspire, engage, and empower young changemakers in addressing water challenges. Together, let’s promote sustainable water practices and create a cleaner, healthier future for all.",
      imageUrl: "/Home/spotlight/y4w.png",
      linkText: "View More",
    },
    {
      category: "Podcasts",
      title: "UN Career Spotlight: With Anwesha Dutta",
      description: "Discover the inspiring journey of Anwesha Dutta, WASH Officer at UNICEF, as she shares her experiences, challenges, and insights from her impactful career in the United Nations. Tune in to learn about her role in transforming communities through WASH initiatives and her advice for aspiring change-makers.",
      imageUrl: "/Home/spotlight/podcasts.jpg",
      linkText: "View More",
    },
    {
      category: "News",
      title: "Sato Toilets Transform Thuamulrampur: A Step Towards Hygiene and Dignity",
      description: "Under the MoWash Model Village initiative, the construction of Sato toilets in Thuamulrampur marks a significant stride toward improving sanitation in rural Odisha. This effort aims to enhance hygiene, reduce open defecation, and ensure dignity for the local community.",
      imageUrl: "/Home/spotlight/sato.jpeg",
      linkText: "View More",
    },
    {
      category: "Reports",
      title: "The WASH Guardians: Odisha Report",
      description: "Explore detailed insights into Odisha's WASH initiatives, highlighting key achievements, challenges, and progress in ensuring clean water, sanitation, and hygiene for communities across the state.",
      imageUrl: "/Home/spotlight/washguardian.jpeg",
      linkText: "View More",
    },
    {
      category: "Awards",
      title: "Listed on India Book of Records for Largest Hand Washing at one Place",
      description: "Recognized by the India Book of Records for organizing the largest handwashing event at a single location, promoting hygiene awareness and emphasizing the importance of handwashing as a cornerstone of public health",
      imageUrl: "/Home/spotlight/handwash.jpeg",
      linkText: "View More",
    },
    {
      category: "Blogs",
      title: "Safety and Dignity for Safai Karmacharis",
      description: "Explore stories, initiatives, and insights focused on empowering Safai Karmacharis with safer work environments, proper safety gear, and the dignity they deserve in their essential roles.",
      imageUrl: "/Home/spotlight/rise.JPG",
      linkText: "View More",
    },
  ];

  return (
    <div className="bg-blue-600 px-4 sm:px-10 py-10">
      <section className="container mx-auto">
        <Heading text="SPOTLIGHT" color="text-white" bgColor="bg-white" />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="group ring-1 ring-blue-500/30 flex flex-col justify-between rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:ring-white bg-white hover:bg-blue-600 hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow justify-between group-hover:bg-blue-600 transition-colors duration-300">
                <div>
                  <p className="text-xl font-bold flex items-center uppercase text-blue-600 group-hover:text-white mb-2 transition-colors duration-300">
                    {categoryIcons[item.category]}
                    <span>{item.category}</span>
                  </p>
                  <h3 className="text-base font-bold mb-3 text-blue-600 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 group-hover:text-gray-100 mb-6 transition-colors duration-300 line-clamp-3 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-blue-700 group-hover:text-white hover:underline transition-colors duration-300 mt-auto"
                >
                  <span>{item.linkText}</span>
                  <HiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Image Section */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500 ease-out"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                {/* Arrow Pointer */}
                <div className="absolute top-0 left-[10%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-white group-hover:border-t-blue-600 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Spotlight;
