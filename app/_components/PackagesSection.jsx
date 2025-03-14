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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-10">
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
          },
          {
            id: "3",
            title: "Island Romance Wedding Package",
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
          },
        ].map((pkg, i) => (
          <motion.div
            key={pkg.id}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={packageVariants}
            className="flex flex-col items-center p-6 border border-green-700 rounded-lg shadow-lg bg-gray-50"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-60 rounded-lg object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-700 mb-2">{pkg.title}</h3>
            
            {/* Make description take up space to push button down */}
            <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2 flex-grow">
              {pkg.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="mt-4 text-xl font-bold text-green-700">{pkg.price}</div>

            {/* Center the button */}
            <div className="mt-auto flex justify-center w-full">
              <Link href={`/booking?packageId=${pkg.id}`} className="w-full flex justify-center">
                <button
                  className="px-6  mt-3 py-2 border-2 text-lg font-medium transition w-full max-w-[200px] text-green-700 border-green-700 bg-transparent flex items-center justify-center"
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
