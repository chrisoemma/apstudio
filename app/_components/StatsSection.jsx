"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(target.replace(/,/g, ""));
      const step = Math.ceil(end / (duration / 20));

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-[#f8f9fa] text-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        {[
          { title: "WE'VE CAPTURED", number: "999+", subtitle: "TIMELESS WEDDINGS" },
          { title: "WE'VE CELEBRATED", number: "3", subtitle: "YEARS IN BUSINESS" },
          { title: "WE'VE PARTNERED WITH", number: "673+", subtitle: "FOREVER COUPLES" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-3">
            <h4 className="text-2xl font-extrabold text-gray-900">{item.title}</h4>
            <h2 className="text-6xl font-extrabold text-[#006400]">
              <AnimatedCounter target={item.number} />
              {item.number === "10,000" ? "+" : ""}
            </h2>
            <p className="text-2xl font-extrabold text-gray-900">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
