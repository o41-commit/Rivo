import React, { memo, useEffect } from "react";
import Hot from "./Hot";
import AOS from "aos";
import "aos/dist/aos.css";

const Product = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 120,
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="px-5 md:px-8 lg:px-12 py-8 md:py-12 bg-gradient-to-b from-white to-green-50"
    >
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl md:max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#224F34] leading-tight">
          Discover Your Style
        </h2>

        <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
          Explore our latest collection of modern, comfortable, and stylish
          clothing. Designed to fit your everyday lifestyle while keeping you
          confident and unique.
        </p>

        {/* SMALL BADGE */}
        <div className="mt-5 inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-semibold">
          New Arrivals • Trending • Best Quality
        </div>
      </div>

      {/* SECTION TITLE */}
      <h3 className="text-center text-[#224F34] text-xl sm:text-2xl md:text-3xl font-semibold mb-8 md:mb-10">
        🔥 Trending Now
      </h3>

      {/* PRODUCTS */}
      <div>
        <Hot />
      </div>
    </div>
  );
};

export default memo(Product);
