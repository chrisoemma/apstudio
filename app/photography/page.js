"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";

const images = [
  "/gallary-1.jpeg",
  "/gallary-2.jpeg",
  "/wedding.jpeg",
  "/happy-women.jpg",
];

const gallaries = [
  "/gallary-1.jpeg",
  "/gallary-2.jpeg",
  "/gallary-3.jpeg",
  "/gallary-4.jpeg",
  "/gallary-5.jpeg",
  "/gallary-6.jpeg",
  "/gallary-7.jpeg",
  "/gallary-8.jpeg",
  "/gallary-9.jpg",
  "/gallary-10.jpg",
  "/gallary-11.jpeg",
  "/gallary-12.jpeg",
  "/gallary-13.jpg",
  "/gallary-14.jpg",
  "/gallary-15.jpg",
  "/gallary-16.jpg",
  "/gallary-17.jpg",
  "/gallary-18.jpg",
];

const Photography = () => {
  const text = "Awesome Studio";
  const textArray = text.split("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const [loadedImages, setLoadedImages] = useState(gallaries.slice(0, 4)); // Initially load 4 images
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more images to load
  const loadMoreRef = useRef(null);

  // Set fixed positions for the images
  const positions = [
    { top: "0%", left: "10%" },
    { top: "20%", left: "50%" },
    { top: "40%", left: "80%" },
    { top: "60%", left: "30%" },
  ];

  useEffect(() => {
    // Calculate the total duration of the text animation
    const textAnimationDuration = textArray.length * 0.2 + 0.5; // 0.2s delay per character + 0.5s duration

    // Set a timeout to mark the text animation as complete
    const timer = setTimeout(() => {
      setTextAnimationComplete(true);
    }, textAnimationDuration * 1000); // Convert to milliseconds

    return () => clearTimeout(timer);
  }, [textArray.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          setTimeout(() => {
            const nextImages = gallaries.slice(
              loadedImages.length,
              loadedImages.length + 4
            );
            if (nextImages.length === 0) {
              setHasMore(false); // No more images to load
            } else {
              setLoadedImages((prev) => [...prev, ...nextImages]); // Append new images
            }
            setLoading(false);
          }, 1000);
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadedImages, hasMore, loading]);

  return (
    <>
      <div className="relative bg-white text-gray-900 min-h-screen flex flex-col items-center justify-start overflow-hidden">
        {/* Images */}
        {images.map((src, index) => {
          const position = positions[index]; // Use predefined positions

          return (
            <motion.div
              key={index}
              initial={{ x: "100%", opacity: 0 }} // Start hidden off-screen to the right and fully transparent
              animate={
                textAnimationComplete
                  ? { x: "0%", opacity: 1 } // Move to its normal position and fade in
                  : {}
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1 + index * 1, // Stagger the animation start after the text animation
              }}
              className="absolute w-80 h-60"
              style={{
                top: position.top,
                left: position.left,
                transform:
                  position.left === "50%" ? "translateX(-50%)" : "none", // Center if needed
              }}
            >
              <Image
                src={src}
                alt="Photography"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}

        {/* Animated Text */}
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[20vw] font-serif uppercase leading-none ttracking-tight"
          style={{
            color: "#2b5235", // Soft green color
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {textArray.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
      {/* New Masonry Gallery Section */}
      <div className="w-full py-10 bg-gray-100 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {loadedImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 0.98 }}
              className="relative w-full cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt="Gallery Image"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Observer target */}
        {hasMore && <div ref={loadMoreRef} className="h-10"></div>}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <Dialog
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        >
          <DialogPanel className="relative w-auto max-w-4xl p-4 bg-white rounded-lg shadow-2xl">
            <button
              className="absolute top-2 right-2 bg-gray-200 text-gray-900 px-3 py-1 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Preview"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </DialogPanel>
        </Dialog>
      )}
    </>
  );
};

export default Photography;