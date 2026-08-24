import React from "react";
import ReachMap from "./ReachMap";
import Heading from "../../common/Heading";

const ReachSection = () => {
  return (
    <div className="bg-blue-600 py-12">
      <section className="w-full">
        <div className="container mx-auto flex justify-center items-center w-full">
          <Heading text="OUR REACH" color="text-white" bgColor="bg-white" />
        </div>
        <div className="flex justify-center items-center">
          {/* ReachMap will only render on the client */}
          <ReachMap />
        </div>
      </section>
    </div>
  );
};

export default ReachSection;
