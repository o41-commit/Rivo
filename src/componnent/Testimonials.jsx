import React, { useState } from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Emily Wilson",
    text: "The customer experience was exceptional from start to finish. The website is user-friendly, checkout was smooth, and the clothes fit perfectly.",
  },
  {
    name: "Sarah Thompson",
    text: "I absolutely love the quality and style of the clothing. Customer service was outstanding and my order arrived quickly.",
  },
  {
    name: "Olivia Martinez",
    text: "Great shopping experience. The clothes are fashionable, comfortable, and exactly what I was looking for.",
  },
  {
    name: "Daniel Carter",
    text: "Very impressed with the design and quality. Everything matched the pictures perfectly.",
  },
  {
    name: "Jessica Brown",
    text: "Fast delivery and amazing quality. I will definitely be ordering again.",
  },
  {
    name: "Michael Lee",
    text: "One of the best online clothing stores I've used. Smooth interface and premium products.",
  },
];

const Testimonials = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeBtn, setActiveBtn] = useState("");

  return (
    <div className="px-5 md:px-8 lg:px-12 py-10 md:py-14">
      
      <h2 className="text-center mb-10 text-2xl sm:text-3xl md:text-4xl font-bold text-[#224F34]">
        Feedback Corner
      </h2>

      <Swiper
        modules={[Autoplay]}
        onSwiper={setSwiperRef}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 }, // tablet
          1024: { slidesPerView: 3 }, // desktop
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`h-full flex flex-col p-5 md:p-6 rounded-xl shadow-md transition-all duration-300 ${
                  isActive
                    ? "bg-[#C2EFD4] text-[#224F34]"
                    : "bg-white text-gray-700"
                }`}
              >
                <BiSolidQuoteLeft className="text-[#224F34] text-2xl md:text-3xl mb-3" />

                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">
                  {item.name}
                </h3>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={() => {
            swiperRef?.slidePrev();
            setActiveBtn("prev");
          }}
          className={`p-3 md:p-4 rounded-full border transition-all duration-200 ${
            activeBtn === "prev"
              ? "bg-[#224F34] text-white"
              : "bg-white text-[#224F34] border-[#224F34]"
          }`}
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={() => {
            swiperRef?.slideNext();
            setActiveBtn("next");
          }}
          className={`p-3 md:p-4 rounded-full border transition-all duration-200 ${
            activeBtn === "next"
              ? "bg-[#224F34] text-white"
              : "bg-white text-[#224F34] border-[#224F34]"
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;