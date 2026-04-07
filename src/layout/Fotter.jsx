import React from "react";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#224F34] text-white py-10 px-6">
      {/* Main container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 md:gap-20">
        {/* Branding & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <h1 className="text-4xl md:text-5xl font-bold">Rivo</h1>
          <p className="text-[#C2EFD4]">Follow us on social media</p>
          <div className="flex gap-5 mt-2">
            <a href="#" className="hover:text-white text-[#C2EFD4] transition">
              <FaInstagram size={28} />
            </a>
            <a href="#" className="hover:text-white text-[#C2EFD4] transition">
              <FaXTwitter size={28} />
            </a>
            <a href="#" className="hover:text-white text-[#C2EFD4] transition">
              <FaFacebook size={28} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-10 text-center md:text-left">
          <div>
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-3">SHOP</h2>
            <ul className="flex flex-col gap-2 text-[#C2EFD4]">
              <li className="hover:text-white transition cursor-pointer">Products</li>
              <li className="hover:text-white transition cursor-pointer">Overview</li>
              <li className="hover:text-white transition cursor-pointer">Pricing</li>
              <li className="hover:text-white transition cursor-pointer">Releases</li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-3">COMPANY</h2>
            <ul className="flex flex-col gap-2 text-[#C2EFD4]">
              <li className="hover:text-white transition cursor-pointer">About Us</li>
              <li className="hover:text-white transition cursor-pointer">Contact</li>
              <li className="hover:text-white transition cursor-pointer">News</li>
              <li className="hover:text-white transition cursor-pointer">Support</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <h2 className="text-white text-xl md:text-2xl font-semibold">STAY UP TO DATE</h2>
          <p className="text-[#C2EFD4]">Subscribe to our newsletter for updates</p>
          <form className="flex flex-col sm:flex-row gap-2 mt-2 w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-[#A3F3BE] bg-transparent text-[#A3F3BE] focus:outline-none focus:ring-2 focus:ring-[#A3F3BE]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#A3F3BE] text-[#224F34] font-semibold rounded-lg hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Bottom links */}
      <div className="border-t border-[#3ae67f] mt-10 mb-[50px] pt-5 flex flex-col sm:flex-row justify-center items-center gap-4 text-[#C2EFD4] text-sm">
        <ul className="flex gap-6 flex-wrap justify-center">
          <li className="hover:text-white cursor-pointer transition">Terms</li>
          <li className="hover:text-white cursor-pointer transition">Privacy</li>
          <li className="hover:text-white cursor-pointer transition">Cookies</li>
        </ul>
        <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Rivo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;