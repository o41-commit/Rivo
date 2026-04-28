import React, { memo } from "react";
import { Link } from "react-router-dom";
import Sell1 from "../images/Sell1.png";
import Sell2 from "../images/Sell2.png";
import Sell3 from "../images/Sell3.png";
import Sell4 from "../images/Sell4.png";
import Sell5 from "../images/Sell5.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const products = [
  { id: 1, name: "Plain Shirt", price: 49, image: Sell1 },
  { id: 2, name: "Blue Plain Shirt", price: 89, image: Sell2 },
  { id: 3, name: "Polo Shirt", price: 29, image: Sell3 },
  { id: 4, name: "Black Polo Shirt", price: 49, image: Sell4 },
  { id: 5, name: "Blue Shirt", price: 49, image: Sell5 },
];

const BestSelling = () => {
  return (
    <div className="px-4 pt-[50px] pb-6">
      {/* HEADER */}
      <div className="text-center text-[#224F34] mb-6">
        <h1 className="text-3xl font-bold mb-2">Best Selling</h1>
        <p className="text-sm text-[#224F34]/70 max-w-md mx-auto">
          Get in on the trend with our curated selection of best-selling styles.
        </p>
      </div>

      {/* SLIDER */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 group">
              {/* IMAGE */}
              <div className="bg-[#C2EFD4] p-4 flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 object-contain group-hover:scale-105 transition duration-300"
                 loading="lazy" decoding="async"/>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="font-semibold text-[#224F34] text-lg">
                  {product.name}
                </h2>

                <p className="text-[#224F34]/70 text-sm mt-1">
                  ${product.price}.00
                </p>

                {/* BUTTON */}
                <Link
                  to="/cart"
                  className="mt-4 inline-block w-full text-center bg-[#224F34] text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* SEE ALL */}
      <div className="flex justify-center mt-8">
        <Link
          to="/categories"
          className="border border-[#224F34] text-[#224F34] px-6 py-2.5 rounded-xl font-medium hover:bg-[#224F34] hover:text-white transition"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default memo(BestSelling);
