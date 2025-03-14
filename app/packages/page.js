"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import PackagesSection from "../_components/PackagesSection";

const Packages = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const lineVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center">
        <Image
          src="/studio.png"
          alt="Packages Banner"
          layout="fill"
          objectFit="cover"
         // className="opacity"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textVariants}
          className="text-center z-10"
        >
          <div className="flex items-center justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={lineVariants}
              className="w-20 h-1 bg-white mx-2"
            ></motion.div>
            <h1 className="text-3xl font-semibold text-white">Our Photography Packages</h1>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={lineVariants}
              className="w-20 h-1 bg-white mx-2"
            ></motion.div>
          </div>
          <p className="text-xl mt-4 text-white">Capture your special moments with our tailored photography packages.</p>
          <p className="text-lg mt-2 text-white">From weddings to corporate events, we offer a range of options to suit your needs.</p>
        </motion.div>
      </section>

      {/* Packages Section */}
      <PackagesSection title="Choose Your Perfect Package" />
    </div>
  );
};

export default Packages;