"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";

const PackagesSection = ({ packagesRef }) => {
  const localRef = useRef(null);
  const refToUse = packagesRef || localRef;
  const isInView = useInView(refToUse, { once: false, margin: "-50px" });

  const packageVariants = {
    hidden: { opacity: 0, rotateY: -90, transformOrigin: "left center", scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section ref={refToUse} className="py-20 bg-white text-black text-left">
      <h2 className="text-3xl font-semibold mb-10 text-center text-green-700">
        Awesome studio packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto">
        {[
          {
            id: "1",
            title: "Essence Package",
            description: [
              "1-hour photo shoot at a location of your choice",
              "30-40 professionally edited pictures",
              "1-minute highlight video",
            ],
            price: "$300",
            image: "/package1.JPG",
            isPremium: false,
          },
          {
            id: "2",
            title: "Eterno Package",
            description: [
              "2 to 3-hour family photo shoot",
              "Unlimited professionally edited pictures",
              "Sunset pictures & video",
              "Drone shots & photo book",
              "Full documentary-style video",
            ],
            price: "$500",
            image: "/package2.JPG",
            isPremium: false,
          },
          {
            id: "3",
            title: "Island romance wedding Package",
            description: [
              "Full-day wedding photography",
              "Unlimited edited pictures",
              "Sunset photos & video",
              "Jet ski & horse riding photo session",
              "Drone shots & cinematic documentary",
              "Photo book & elegant wooden frame",
            ],
            price: "$1,000",
            image: "/package3.JPG",
            isPremium: false,
          },
          {
            id: "4",
            title: "Island elegance package",
            description: [
              "Full-Day Photo Shoot with unlimited photos",
              "DJ Services for the celebration",
              "Elegant décor for beach ceremony",
              "Professional makeup services",
              "Pre-Wedding Photoshoot session",
              "Documentary-Style Video",
              "Customizable Add-Ons",
            ],
            price: "$5,800",
            image: "/package1.JPG",
            isPremium: true,
          },
        ].map((pkg, i) => (
          <motion.div
            key={pkg.id}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={packageVariants}
            className="flex flex-col items-center p-5 sm:p-6 border border-green-700 rounded-lg shadow-lg bg-gray-50 h-full"
          >
            <div className="relative w-full">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-52 sm:h-64 rounded-lg object-cover mb-4"
              />
              {pkg.isPremium && (
                <span className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-white text-xs font-bold px-3 py-1 rounded-full">
                  PREMIUM
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-2 text-center">{pkg.title}</h3>
            
            {/* Make description take up space to push button down */}
            <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 flex-grow">
              {pkg.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="mt-4 text-lg sm:text-xl font-bold text-green-700">{pkg.price}</div>

            {/* Center the button */}
            <div className="mt-auto flex justify-center w-full">
              <Link href={`/booking?packageId=${pkg.id}`} className="w-full flex justify-center">
                <button
                  className="px-4 sm:px-6 mt-3 py-2 border-2 text-base sm:text-lg font-medium transition w-full max-w-[200px] text-green-700 border-green-700 bg-transparent flex items-center justify-center"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#006400";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#006400";
                  }}
                >
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
