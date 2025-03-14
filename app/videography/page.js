"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";

const videos = [
  { src: "/videograpy.MP4", thumbnail: "/videography-thumbnail.png" },
  { src: "/wedding.mp4", thumbnail: "/wedding-thumbnail.png" },
];

const Videography = () => {
  const text = "Awesome Studio";
  const textArray = text.split("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);

  useEffect(() => {
    // Calculate the total duration of the text animation
    const textAnimationDuration = textArray.length * 0.2 + 0.5; // 0.2s delay per character + 0.5s duration

    // Set a timeout to mark the text animation as complete
    const timer = setTimeout(() => {
      setTextAnimationComplete(true);
    }, textAnimationDuration * 1000); // Convert to milliseconds

    return () => clearTimeout(timer);
  }, [textArray.length]);

  return (
    <>
      {/* Hero Section with White Background */}
      <div className="relative bg-white text-gray-900 min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0"> {/* z-0 ensures it stays behind */}
          <Image
            src="/videography.jpg"
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Text */}
   <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[20vw] font-serif uppercase leading-none ttracking-tight z-10"
          style={{
            color: "#ffff", // Soft green color
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

        {/* Optional Call-to-Action */}
        {/* <motion.p
          initial={{ opacity: 0 }} // Start invisible
          animate={{ opacity: 1 }} // Fade in
          transition={{ delay: 1.5, duration: 1 }} // Delay and duration
          className="mt-4 text-lg text-gray-500 z-10" 
        >
          Capturing Moments, Creating Memories
        </motion.p> */}
      </div>

      {/* Video Gallery Section */}
      <div className="w-full py-10 bg-white px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 0.98 }}
              className="relative w-full cursor-pointer"
              onClick={() => setSelectedVideo(video.src)}
            >
              <Image
                src={video.thumbnail}
                alt="Video Thumbnail"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <Dialog
          open={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        >
          <DialogPanel className="relative w-auto max-w-4xl p-4 bg-white rounded-lg shadow-2xl">
            <button
              className="absolute top-2 right-2 bg-gray-200 text-gray-900 px-3 py-1 rounded-full"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            <video controls autoPlay className="w-full h-auto rounded-lg shadow-lg">
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </DialogPanel>
        </Dialog>
      )}
    </>
  );
};

export default Videography;