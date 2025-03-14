"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import MissionVissionSection from "../_components/MissionVissionSection";
import Zoom from "react-medium-image-zoom"; // Import the Zoom component
import "react-medium-image-zoom/dist/styles.css"; // Import the default styles

// Portfolio data
const portfolioData = [
  {
    id: 1,
    title: "Wedding Photography",
    description:
      "Capturing the most precious moments of your special day. Every emotion, detail, and memory preserved beautifully.",
    images: [
      "/gallary-10.jpg",
      "/gallary-9.jpg",
      "/download.jpeg",
    ],
  },
  {
    id: 2,
    title: "Portrait Photography",
    description:
      "Professional portrait sessions that highlight personality and style. Perfect for individuals, families, or corporate headshots.",
    images: [
      "/pic-1.jpeg",
      "/pic-2.jpeg",
      "/pic-3.jpeg",
    ],
  },
  {
    id: 3,
    title: "Event Photography",
    description:
      "Documenting corporate events and private parties with creativity and precision. Every moment captured.",
    images: [
      "/pic-9.jpeg",
      "/pic-8.jpeg",
      "/pic-10.jpeg",
    ],
  },
  {
    id: 4,
    title: "Wildlife Photography",
    description:
      "Capturing nature's raw beauty, from majestic predators to serene landscapes. Perfect for documentaries, conservation efforts, and nature enthusiasts.",
    images: [
      "/pic-14.jpeg",
      "/pic-15.jpeg",
      "/pic-16.jpeg",
    ],
  },
  {
    id: 5,
    title: "Landscape Photography",
    description:
      "Exploring the beauty of nature through stunning landscapes. Perfect for wall art and travel blogs.",
    images: [
      "/pic-23.jpeg",
      "/pic-24.jpeg",
      "/pic-13.jpeg",
    ],
  },
  {
    id: 6,
    title: "Fashion Photography",
    description:
      "Bringing fashion ideas to life with creative and edgy visuals. Collaborating with designers, models, and brands.",
    images: [
      "/pic-18.jpeg",
      "/pic-19.jpeg",
      "/pic-21.jpeg",
    ],
  },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedCategory.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedCategory.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      {/* Header Section */}
      <MissionVissionSection />
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800">
          <span className="text-green-700">OUR</span> Works
        </h1>
      </div>

      {/* Portfolio Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-[0.1rem]">
          {portfolioData.map((item) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setSelectedCategory(item);
                setCurrentImageIndex(0);
              }}
            >
              {/* Image */}
              <div className="w-full aspect-square relative">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-2 bg-black/50">
                <h2 className="text-white text-[14px] font-semibold">
                  {item.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      >
        <DialogPanel className="relative w-auto max-w-4xl p-6 bg-white rounded-lg shadow-2xl">
          <button
            className="absolute top-4 right-4 bg-gray-200 text-gray-900 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors"
            onClick={() => setSelectedCategory(null)}
          >
            ✕
          </button>
          {selectedCategory && (
            <div className="text-center">
              {/* Title */}
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                <span className="text-green-700">{selectedCategory.title}</span>
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3">
                {selectedCategory.description}
              </p>

              {/* Carousel */}
              <div className="relative">
                {/* Current Image */}
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-h-[80vh] relative"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Zoom>
                      <Image
                        src={selectedCategory.images[currentImageIndex]}
                        alt={`${selectedCategory.title} - ${currentImageIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
                      />
                    </Zoom>
                  </div>
                </motion.div>

                {/* Navigation Buttons */}
                <button
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 text-gray-900 px-3 py-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  onClick={handlePrev}
                >
                  &#10094;
                </button>
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 text-gray-900 px-3 py-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  onClick={handleNext}
                >
                  &#10095;
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedCategory.images.length}
                </div>
              </div>
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default Portfolio;