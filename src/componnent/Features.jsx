import React from "react";
import { FaTruck } from "react-icons/fa";
import { MdHeadsetMic, MdRotateLeft, MdSecurity } from "react-icons/md";

const Features = () => {
  return (
    <div className="px-5 md:px-8 lg:px-12 py-10 md:py-14">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        
        <div className="flex items-start gap-4 border border-[#0e9b46] rounded-xl p-5 md:p-6 hover:scale-105 transition-transform duration-300 bg-white shadow-sm">
          <FaTruck className="text-[#224F34] text-2xl md:text-3xl flex-shrink-0" />
          
          <div>
            <h2 className="font-semibold text-sm sm:text-base md:text-lg text-[#224F34] uppercase">
              Free Shipping
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-relaxed">
              Enjoy free shipping on all orders above $100
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border border-[#0e9b46] rounded-xl p-5 md:p-6 hover:scale-105 transition-transform duration-300 bg-white shadow-sm">
          <MdHeadsetMic className="text-[#224F34] text-2xl md:text-3xl flex-shrink-0" />
          
          <div>
            <h2 className="font-semibold text-sm sm:text-base md:text-lg text-[#224F34] uppercase">
              Support 24/7
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-relaxed">
              Our support team is always ready to help you
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border border-[#0e9b46] rounded-xl p-5 md:p-6 hover:scale-105 transition-transform duration-300 bg-white shadow-sm">
          <MdRotateLeft className="text-[#224F34] text-2xl md:text-3xl flex-shrink-0" />
          
          <div>
            <h2 className="font-semibold text-sm sm:text-base md:text-lg text-[#224F34] uppercase">
              30 Days Return
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-relaxed">
              Simply return within 30 days for an exchange
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border border-[#0e9b46] rounded-xl p-5 md:p-6 hover:scale-105 transition-transform duration-300 bg-white shadow-sm">
          <MdSecurity className="text-[#224F34] text-2xl md:text-3xl flex-shrink-0" />
          
          <div>
            <h2 className="font-semibold text-sm sm:text-base md:text-lg text-[#224F34] uppercase">
              Secure Payment
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-relaxed">
              Payments secured with 256-bit encryption
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Features;