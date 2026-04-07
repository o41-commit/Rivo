import React from "react";
import Designer1 from "../images/Designer1.png";
import Designer2 from "../images/Designer2.png";
import Designer3 from "../images/Designer3.png";

const Designers = () => {
  return (
    <div className="px-5 md:px-8 lg:px-12 py-10 md:py-14">
      
      <div className="text-center text-[#224F34] max-w-2xl md:max-w-3xl mx-auto mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Designer Clothes For You
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#224F34]/80 leading-relaxed">
          Immerse yourself in the world of luxury fashion with our meticulously crafted designer clothes!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        
        <div className="text-center group">
          <img
            className="rounded-xl w-full h-[300px] md:h-[350px] object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
            src={Designer3}
            alt="Accessories"
          />

          <h2 className="font-semibold mt-5 text-lg sm:text-xl md:text-2xl text-[#224F34]">
            Accessories
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed max-w-sm mx-auto">
            Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.
          </p>
        </div>

        <div className="text-center group">
          <img
            className="rounded-xl w-full h-[300px] md:h-[350px] object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
            src={Designer2}
            alt="Dresses"
          />

          <h2 className="font-semibold mt-5 text-lg sm:text-xl md:text-2xl text-[#224F34]">
            Dresses
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed max-w-sm mx-auto">
            Explore a stunning range of designer dresses, including evening gowns and chic day dresses.
          </p>
        </div>

        <div className="text-center group">
          <img
            className="rounded-xl w-full h-[300px] md:h-[350px] object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
            src={Designer1}
            alt="Outerwear"
          />

          <h2 className="font-semibold mt-5 text-lg sm:text-xl md:text-2xl text-[#224F34]">
            Outerwear
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed max-w-sm mx-auto">
            Browse luxurious designer coats, jackets, and blazers to stay stylishly warm during colder seasons.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Designers;