import React from "react";
import { Link } from "react-router-dom";
import Hero4 from "../images/Hero4.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Premium Background Image with Zoom-in Animation on Load */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[zoom-out_2s_ease-out_forwards]"
        style={{ backgroundImage: `url(${Hero4})` }}
      />

      {/* Dark Overlay for Readability and Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent backdrop-blur-[1px]" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-start text-left text-white">
        <div className="max-w-2xl space-y-6 animate-[fade-in-up_1s_ease-out_forwards]">
          
          {/* Subtle Accent Tag */}
          <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-md text-[#C2EFD4] px-4 py-2 rounded-full border border-white/20">
            Exclusive Collection
          </span>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Timeless Fashion, <br />
            <span className="text-[#C2EFD4] bg-clip-text">Modern Comfort</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-200 text-lg md:text-xl max-w-lg font-light leading-relaxed">
            Clothes beautifully crafted to keep you confident, sophisticated, and stylish wherever your journey takes you.
          </p>

          {/* Premium Call to Action Button */}
          <div className="pt-4">
            <Link
              to="/categories"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium text-[#224F34] bg-[#C2EFD4] rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[#C2EFD4]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                {/* Elegant Animated Arrow */}
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;