import React from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Testimonials = () => {
  return (
    <div className=" p-4">
      <h2 className="text-center py-6 text-3xl text-[#224F34] font-bold">
        Feedback Corner
      </h2>

      <div className="flex justifycenter">
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
            {({ isActive }) => (
              <div
                className={` p-3 py-5 flex flex-col shadow-xl shadow-[0_20px_50x_rgba(0,0,0,0,2)] gap-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#C2EFD4] text-[#224F34]"
                    : " bg-white text-black"
                } `}
              >
                <BiSolidQuoteLeft size={40} color="#224F34" />
                <h2 className="text-[#224F34] font-bold text-[20px]">
                  Emily Wilson
                </h2>
                <p className="font-semibold">
                  The customer experience was exceptional from start to finish.
                  The website is user-friendly, the checkout process was smooth,
                  and the clothes I ordered fit perfectly. I'm beyond satisfied!
                </p>
              </div>
            )}
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) => (
              <div
                className={` p-3 py-5 flex flex-col shadow-xl shadow-[0_20px_50x_rgba(0,0,0,0,2)] gap-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#C2EFD4] text-[#224F34] sclae-102"
                    : " bg-white text-black"
                } `}
              >
                <BiSolidQuoteLeft size={40} color="#224F34" />
                <h2 className="text-[#224F34] font-bold text-[20px]">
                  Sarah Thompson
                </h2>
                <p className="font-semibold">
                  I absolutely love the quality and style of the clothing I
                  purchased from this website. customer service was outstanding,
                  and I received my order quickly. Highly recommended!
                </p>
              </div>
            )}
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) => (
              <div
                className={` p-3 py-5 flex flex-col shadow-xl  shadow-[0_20px_50x_rgba(0,0,0,0,2)] gap-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#C2EFD4] text-[#224F34] sclae-102"
                    : " bg-white text-black"
                } `}
              >
                <BiSolidQuoteLeft size={40} color="#224F34" />
                <h2 className="text-[#224F34] font-bold text-[20px]">
                    Olivia Martinez
                </h2>
                <p className="font-semibold">
                  I had a great experience shopping on this website. The clothes
                  I bought are fashionable and comfortable. Highly satisfied!
                </p>
              </div>
            )}
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) => (
              <div
                className={` p-3 py-5 flex flex-col shadow-xl shadow-[0_20px_50x_rgba(0,0,0,0,2)] gap-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#C2EFD4] text-[#224F34] sclae-102"
                    : " bg-white text-black"
                } `}
              >
                <BiSolidQuoteLeft size={40} color="#224F34" />
                <h2 className="text-[#224F34] font-bold text-[20px]">
                  Emily Wilson
                </h2>
                <p className="font-semibold">
                  The customer experience was exceptional from start to finish.
                  The website is user-friendly, the checkout process was smooth,
                  and the clothes I ordered fit perfectly. I'm beyond satisfied!
                </p>
              </div>
            )}
          </SwiperSlide>
        </Swiper>
        
      </div>
    </div>
  );
};

export default Testimonials;
