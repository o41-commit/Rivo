import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BuyNow = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 120,
    });
  }, []);

  return (
    <div data-aos="fade-up" className="px-5 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* CARD 1 */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center bg-black w-full text-white px-6 md:px-8 py-8 md:py-10 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <h2 className="uppercase text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Peace of Mind
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
            A one-stop platform for all your fashion needs, hassle-free. Buy
            with a peace of mind.
          </p>

          <Link
            to="/categories"
            className="block w-full text-center bg-white text-black uppercase font-medium text-sm sm:text-base md:text-lg py-3 md:py-4 rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-200"
          >
            Buy Now
          </Link>
        </div>

        {/* CARD 2 */}
        <div
          data-aos="fade-up"
          data-aos-delay="220"
          className="text-center bg-black w-full text-white px-6 md:px-8 py-8 md:py-10 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <h2 className="uppercase text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Buy 2 Get 1 Free
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
            End of season sale. Buy any 2 items of your choice and get 1 free.
          </p>

          <Link
            to="/categories"
            className="block w-full text-center bg-white text-black uppercase font-medium text-sm sm:text-base md:text-lg py-3 md:py-4 rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-200"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(BuyNow);
