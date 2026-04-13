import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../componnent/Spinner";
import {
  IoPersonCircleOutline,
  IoBagHandleOutline,
  IoHeartOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoChevronForward,
} from "react-icons/io5";

const Profile = () => {
  const [user, setUser] = useState({ name: "Guest", email: "", img: null });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const [logOut, setLogout] = useState(token ? "Logout" : "Login");

  const menuItems = [
    { title: "My Orders", icon: <IoBagHandleOutline size={22} />, path: "/orders" },
    { title: "Wishlist", icon: <IoHeartOutline size={22} />, path: "/wishlist" },
    { title: "Settings", icon: <IoSettingsOutline size={22} />, path: "/settings" },
  ];

  const clearToken = () => {
    localStorage.removeItem("token");
    setLogout("Login");
  };

  useEffect(() => {
    const fetchInfo = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          "https://rivo-ecommerce-db.onrender.com/profile/info",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setUser({ name: "Guest", email: "", img: null });
          setLogout("Login");
          return;
        }

        let imageUrl = null;
        if (data.image) {
          imageUrl = data.image.startsWith("http")
            ? data.image
            : `https://rivo-ecommerce-db.onrender.com${
                data.image.startsWith("/") ? data.image : `/uploads/${data.image}`
              }`;
        }

        setUser({
          name: data.name || "Guest",
          email: data.email || "",
          img: imageUrl,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setUser({ name: "Guest", email: "", img: null });
        setLogout("Login");
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [token]);


  //  LOADING UI 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen md:pt-[100px] bg-[#f6fff9] pt-[80px] pb-[100px] px-4 md:px-8 lg:px-16">
      {/* PROFILE HEADER */}
      <div className="bg-[#C2EFD4] rounded-2xl p-5 md:p-6 lg:p-8 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-white shadow-sm">
          {user.img ? (
            <img
              src={Array.isArray(user.img) ? user.img[0] : user.img}
              alt={`Profile picture of ${user.name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <IoPersonCircleOutline size={32} className="text-gray-500 md:text-4xl lg:text-5xl" />
          )}
        </div>

        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-green-900">
            {user.name}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-green-800/70">
            {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6 md:grid-cols-3 lg:grid-cols-4">
        <Link to="/orders">
          <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl flex flex-col items-center shadow-sm hover:shadow-md transition">
            <IoBagHandleOutline size={24} className="text-green-900 md:text-2xl lg:text-3xl" />
            <span className="text-xs md:text-sm lg:text-base mt-2 font-medium text-green-900">
              Orders
            </span>
          </div>
        </Link>

        <Link to="/wishlist">
          <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl flex flex-col items-center shadow-sm hover:shadow-md transition">
            <IoHeartOutline size={24} className="text-green-900 md:text-2xl lg:text-3xl" />
            <span className="text-xs md:text-sm lg:text-base mt-2 font-medium text-green-900">
              Wishlist
            </span>
          </div>
        </Link>

        <Link to="/settings">
          <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl flex flex-col items-center shadow-sm hover:shadow-md transition">
            <IoSettingsOutline size={24} className="text-green-900 md:text-2xl lg:text-3xl" />
            <span className="text-xs md:text-sm lg:text-base mt-2 font-medium text-green-900">
              Settings
            </span>
          </div>
        </Link>
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow-sm divide-y">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 hover:bg-gray-50 transition cursor-pointer">
              <div className="flex items-center gap-3 text-green-900 text-sm md:text-base lg:text-lg">
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </div>
              <IoChevronForward size={18} className="text-gray-400 md:text-lg" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link to="/login">
          <button
            onClick={clearToken}
            className="w-full flex items-center justify-center gap-2 bg-green-900 text-white py-3 md:py-4 lg:py-5 rounded-xl font-semibold shadow-md hover:opacity-90 transition-all duration-200 active:scale-95"
          >
            <IoLogOutOutline size={20} className="md:text-2xl lg:text-3xl" />
            {logOut}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;