"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

const Decorations = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const lineVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Define imageVariants as a function that accepts index
  const imageVariants = (index) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 }, // Use index to alternate direction
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  });

  const decorationsData = [
    {
      id: 1,
      title: "Weddings",
      description:
        "We create stunning wedding decorations that reflect your love story. From floral arrangements to lighting, every detail is tailored to your vision.",
      image: "/weddings.jpeg",
    },
    {
      id: 3,
      title: "Engagements",
      description:
        "Celebrate your engagement with beautifully crafted decorations that set the mood for your special moment.",
      image: "/engagement.jpeg",
    },
    {
      id: 2,
      title: "Corporate Meetings",
      description:
        "Transform your corporate events with elegant and professional decorations. We ensure your meetings leave a lasting impression.",
      image: "/coperate-meetings.jpg",
    },
    {
      id: 4,
      title: "Social Activities",
      description:
        "From birthdays to anniversaries, we create vibrant and lively decorations for all your social gatherings.",
      image: "/social-gathering.jpeg",
    },
    {
      id: 5,
      title: "Surprises",
      description:
        "Plan the perfect surprise with our creative and unique decoration ideas. We make every moment unforgettable.",
      image: "/suprises.jpeg",
    },
    {
      id: 6,
      title: "Wildlife Photography",
      description:
        "Bring the beauty of nature into your events with decorations inspired by wildlife and natural elements.",
      image: "/wildlife.jpeg",
    },
    {
      id: 7,
      title: "Baby Showers",
      description:
        "Celebrate the arrival of your little one with adorable and heartwarming baby shower decorations.",
      image: "/babyshower.jpeg",
    },
    {
      id: 8,
      title: "Decorations",
      description:
        "Explore our wide range of decoration services for every occasion. We bring your ideas to life with creativity and precision.",
      image: "/decorations.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* First Section with Background Image and Text */}
      <div className="w-full h-screen relative flex items-center justify-center mb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/decorations.jpg" // Replace with your background image path
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-98"
          />
        </div>

        {/* Text with Lines */}
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
            <h1 className="text-3xl font-semibold text-white">AP STUDIO</h1>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={lineVariants}
              className="w-20 h-1 bg-white mx-2"
            ></motion.div>
          </div>
          <p className="text-xl mt-4 text-white">Bringing your vision to life with stunning decor.</p>
          <p className="text-lg mt-2 text-white">From weddings to corporate events, we create unforgettable experiences tailored to you.</p>
        </motion.div>
      </div>

      {/* Alternating Image and Text Sections */}
      <div className="w-full flex flex-col items-center">
        {decorationsData.map((category, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-100px" });

          return (
            <div
              key={category.id}
              ref={ref}
              className={`w-4/5 flex flex-col md:flex-row items-center mb-20 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image Section */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={imageVariants(index)} // Pass index to imageVariants
                className="w-full md:w-1/2 mb-8 md:mb-0"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>

              {/* Text Section */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={textVariants}
                className="w-full md:w-1/2 md:pl-8"
              >
                <div className="flex items-center justify-start">
                  <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={lineVariants}
                    className="w-12 h-1 bg-black mr-4"
                  ></motion.div>
                  <h2 className="text-3xl font-semibold text-green-700">{category.title}</h2>
                </div>
                <p className="text-lg mt-4 text-black">{category.description}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Decorations;