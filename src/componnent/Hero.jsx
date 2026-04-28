import React, { memo } from "react";
import { Link } from "react-router-dom";
import Hero1 from "../images/Hero1.png";
import Hero2 from "../images/Hero2.png";
import Hero3 from "../images/Hero3.jpg";
import Hero4 from "../images/Hero4.jpg";
import Hero5 from "../images/Hero5.jpg";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <div>
      <div className="bg-[#C2EFD4] pt-[70px] md:pt-[100px] p-5">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          loop={true}
        >
          <SwiperSlide>
            <div className="mb-5 md:flex md:flex-row-reverse items-center gap-10">
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={Hero4}
                  alt="Hero"
                  className="w-full max-w-[500px] h-[350px] md:h-[450px] object-cover rounded-2xl shadow-lg"
                 loading="lazy" decoding="async"/>
              </div>
              <div className="md:max-w-[50%]">
                <h1 className="text-[35px] md:text-[45px] font-semibold text-[#224F34]">
                  Timeless Fashion, Modern Comfort
                </h1>
                <p className="text-[#224F34] md:text-[18px] my-3 mb-9">
                  Clothes crafted to keep you stylish wherever you go.
                </p>

                <Link
                  to="/categories"
                  className="bg-[#224F34] md:px-6 md:py-3 md:text-[20px] px-6 py-3 rounded-md shadow-lg-green-800/40  text-white "
                >
                  Explore
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="mb-5 md:flex md:flex-row-reverse items-center gap-10">
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={Hero2}
                  alt="Hero"
                  className="w-full max-w-[500px] h-[350px] md:h-[450px] object-cover rounded-2xl shadow-lg"
                 loading="lazy" decoding="async"/>
              </div>
              <div className="md:max-w-[55%]">
                <h1 className="text-[35px] md:text-[45px] font-semibold text-[#224F34]">
                  Evaluate Your Style With Our Latest Collection
                </h1>
                <p className="text-[#224F34]  my-3 mb-9">
                  Discover premium outfits designed for comfort and confidence.
                </p>

                <Link
                  to="/categories"
                  className="bg-[#224F34] md:px-6 md:py-3 md:text-[20px] px-6 py-3 rounded-md shadow-lg-green-800/40  text-white "
                >
                  Explore
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="mb-5 md:flex md:flex-row-reverse items-center gap-10">
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={Hero3}
                  alt="Hero"
                  className="w-full max-w-[500px] h-[350px] md:h-[450px] object-cover rounded-2xl shadow-lg"
                 loading="lazy" decoding="async"/>
              </div>
              <div className="md:max-w-[50%]">
                <h1 className="text-[35px] md:text-[45px] font-semibold text-[#224F34]">
                  New Season. New Look. New You.
                </h1>
                <p className="text-[#224F34] md:text-[18px] my-3 mb-9">
                  Step into fresh fashion built for everyday style.
                </p>

                <Link
                  to="/categories"
                  className="bg-[#224F34] md:px-6 md:py-3 md:text-[20px] px-6 py-3 rounded-md shadow-lg-green-800/40  text-white "
                >
                  Explore
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="mb-5 md:flex md:flex-row-reverse items-center gap-10">
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={Hero1}
                  alt="Hero"
                  className="w-full max-w-[500px] h-[400px] md:h-[450px] object-cover  shadow-lg"
                 loading="lazy" decoding="async"/>
              </div>
              <div className="md:max-w-[50%]">
                <h1 className="text-[35px] md:text-[45px] font-semibold text-[#224F34]">
                  Discover and Find Your Own Fashion!
                </h1>
                <p className="text-[#224F34] md:text-[18px]  my-3 mb-9">
                  Explore our curated collection of stylish clothing and
                  accessories tailored to your unique taste.
                </p>

                <Link
                  to="/categories"
                  className="bg-[#224F34] md:px-6 md:py-3 md:text-[20px] px-4 py-2 rounded-md shadow-lg-green-800/40  text-white "
                >
                  Explore
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="mb-5 md:flex md:flex-row-reverse items-center gap-10">
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={Hero5}
                  alt="Hero"
                  className="w-full max-w-[500px] h-[350px] md:h-[450px] object-cover rounded-2xl shadow-lg"
                 loading="lazy" decoding="async"/>
              </div>
              <div className="md:max-w-[50%]">
                <h1 className="text-[35px] md:text-[45px] font-semibold text-[#224F34]">
                  Upgrade Your Wardrobe Today
                </h1>
                <p className="text-[#224F34] md:text-[18px] my-3 mb-9">
                  Trend-driven pieces made for bold personalities.
                </p>

                <Link
                  to="/categories"
                  className="bg-[#224F34] md:px-6 md:py-3 md:text-[20px] px-6 py-3 rounded-md shadow-lg-green-800/40  text-white "
                >
                  Explore
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default memo(Hero);
