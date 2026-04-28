import React, { memo, useEffect, useState, useCallback } from "react";
import New from "../componnent/New";
import Hot from "../componnent/Hot";
import Mens from "../componnent/Mens";
import Women from "../componnent/Women";
import Children from "../componnent/Children";
import { FaArrowUp } from "react-icons/fa";

const Categories = () => {
  const [showTop, setShowTop] = useState(false);

  // show button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="mt-[70px] bg-[#f7faf7] min-h-screen pb-20">
      {/* PAGE HEADER */}
      <div className="px-4 pt-6">
        <h1 className="text-4xl font-bold text-green-900">Categories</h1>
        <p className="text-gray-600 mt-2">
          Explore our trending fashion collections curated for every style.
        </p>
      </div>

      {/* HOT WEARS */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-800">
            🔥 Hot Wears
          </h2>
          <span className="text-sm text-gray-500">Trending now</span>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4">
          <Hot />
        </div>
      </section>

      {/* NEW WEARS */}
      <section className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-800">
            ✨ New Wears
          </h2>
          <span className="text-sm text-gray-500">Latest arrivals</span>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4">
          <New />
        </div>
      </section>

      {/* WOMEN */}
      <section className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-800">
            👗 Women Wears
          </h2>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4">
          <Women />
        </div>
      </section>

      {/* MEN */}
      <section className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-800">
            👔 Men Wears
          </h2>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4">
          <Mens />
        </div>
      </section>

      {/* CHILDREN */}
      <section className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-green-800">
            🧸 Children Wears
          </h2>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4">
          <Children />
        </div>
      </section>

      {/* BACK TO TOP BUTTON */}
      {showTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-[100px] right-6 bg-[#224F34] text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default memo(Categories);
