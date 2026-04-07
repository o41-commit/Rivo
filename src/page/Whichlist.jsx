import React from "react";
import { IoHeart } from "react-icons/io5";

const Wishlist = () => {
  return (
    <div className="min-h-screen pt-[90px] pb-[120px] px-4 md:px-10 bg-[#f6fff9] flex flex-col justify-center items-center text-center">
      
      {/* Icon */}
      <IoHeart className="text-green-900 text-8xl md:text-9xl mb-6 animate-bounce" />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
        Wishlist Coming Soon
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-xl">
        We're working hard to bring you a personalized wishlist experience! 
        Soon you'll be able to save your favorite products and access them anytime.
      </p>

      {/* Optional Button */}
      <div className="mt-8">
        <a
          href="/categories"
          className="bg-green-900 hover:bg-green-800 text-white px-6 py-3 rounded-full text-lg md:text-xl transition-all duration-200 shadow-md"
        >
          Explore Products
        </a>
      </div>

      {/* Decorative placeholder card grid (optional for visual appeal) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl opacity-40">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center gap-3 animate-pulse"
          >
            <div className="w-32 h-32 bg-gray-200 rounded-lg" />
            <div className="h-5 w-3/4 bg-gray-200 rounded-md" />
            <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;