"use client";

import React from "react";
import { useScroll } from "../_context/ScrollContext";
import StatsSection from "./StatsSection";
import MissionVissionSection from "./MissionVissionSection";
import PackagesSection from "./PackagesSection"; // Import the PackagesSection component

const Hero = () => {
  const { packagesRef } = useScroll(); // Get the reference for packages section

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/home.MP4" type="video/mp4" />
        </video>

        {/* Light Overlay */}
        <div className="absolute top-0 left-0 w-full h-full"></div>

        {/* Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-10">
          <div className="max-w-lg bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-green-700 text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
              Capturing Moments, Creating Memories
            </h2>
            <p className="text-black text-sm md:text-base lg:text-lg">
              AP Studio specializes in professional photography and videography,
              preserving your cherished moments with creativity and precision.
            </p>

            {/* Book Now Button */}
            <button
              className="border-2 border-green-700 text-green-700 px-6 py-2 text-sm font-bold 
                hover:bg-green-700 hover:text-white transition mt-6"
                onClick={() =>
                  packagesRef.current?.scrollIntoView({ behavior: "smooth" })
                }
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </section>

      <MissionVissionSection />

      {/* Embed the PackagesSection component */}
      <PackagesSection packagesRef={packagesRef} />

      <StatsSection />
    </>
  );
};

export default Hero;
