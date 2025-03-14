"use client";

import React from "react";
import { motion } from "framer-motion";

const MissionVisionSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center border-2 border-green-700 p-8 rounded-lg shadow-xl max-w-2xl bg-gray-100"
      >
        <h2 className="text-lg font-semibold tracking-wide text-green-700">OUR</h2>
        <h2 className="text-4xl font-extrabold inline-block border-b-4 border-green-700 px-4 text-green-700">
          VISION
        </h2>
        <p className="text-2xl font-semibold mt-4 text-gray-800">
          We capture moments that resonate, evolving creatively to tell powerful visual stories.
        </p>
      </motion.div>

      {/* Separator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center my-4"
      >
        <h2 className="text-6xl font-bold text-yellow-500">&</h2>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center border-2 border-green-700 p-8 rounded-lg shadow-xl max-w-2xl bg-gray-100"
      >
        <h2 className="text-4xl font-extrabold inline-block border-b-4 border-green-700 px-4 text-green-700">
          MISSION
        </h2>
        <div className="mt-4 space-y-3">
          <p className="text-xl font-semibold text-gray-800">
            Captivating audiences with innovative visual storytelling that inspires.
          </p>
          <div className="border-t border-green-700 w-1/2 mx-auto"></div>
          <p className="text-xl font-semibold text-gray-800">
            Upholding integrity and professionalism in every interaction.
          </p>
          <div className="border-t border-green-700 w-1/2 mx-auto"></div>
          <p className="text-xl font-semibold text-gray-800">
            Evolving creatively, embracing new techniques and challenging projects.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionVisionSection;
