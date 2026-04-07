import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoGridOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <IoHomeOutline />, label: "Home" },
    { path: "/categories", icon: <IoGridOutline />, label: "Categories" },
    { path: "/notifications", icon: <IoNotificationsOutline />, label: "Alerts" },
    { path: "/profile", icon: <IoPersonOutline />, label: "Profile" },
  ];

  return (
    <>
      {/* TOP NAV */}
      <div className="bg-[#C2EFD4] fixed top-0 left-0 w-full z-[999] border-b border-[#224F34] text-[#224F34]">
        <div className="flex justify-between items-center px-4 py-3 md:py-4">
          
          {/* LOGO */}
          <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-green-900 tracking-wide">
            <span className="font-bold">R</span>ivo
          </h2>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <Link to="/search">
              <IoSearchOutline className="text-xl sm:text-2xl md:text-3xl" />
            </Link>

            {/* CART */}
            <Link to="/cart" className="relative">
              <IoCartOutline className="text-xl sm:text-2xl md:text-3xl" />

              {/* OPTIONAL: Cart Count Badge */}
              <div className="absolute -top-0.5 w-3 h-3 rounded-full -right-1 bg-green-900"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-3 left-0 w-full px-3 z-[999]">
        <div className="bg-[#C2EFD4] border border-[#224F34] rounded-2xl shadow-lg py-2 flex justify-around items-center">
          
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center font-medium transition-all duration-200
                  ${isActive ? "text-green-900" : "text-[#0a3d1f]/70"}
                  text-sm sm:text-base md:text-lg`}
              >
                <div
                  className={`p-1.5 rounded-lg transition-all duration-200
                    ${isActive ? "bg-white shadow-sm" : ""}`}
                >
                  {React.cloneElement(item.icon, { 
                    className: "text-xl sm:text-2xl md:text-3xl"
                  })}
                </div>

                <span className="mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;