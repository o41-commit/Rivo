import React, { useState, useEffect } from "react";
import ShippingAddress from "./ShippingAddress";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import Alerts from "./Alert";
import { useNavigate } from "react-router-dom";

import {
  IoPersonOutline,
  IoLockClosedOutline,
  IoLocationOutline,
  IoCardOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

const settings = [
  { key: "profile", title: "Edit Profile", icon: <IoPersonOutline /> },
  { key: "password", title: "Change Password", icon: <IoLockClosedOutline /> },
  { key: "address", title: "Shipping Address", icon: <IoLocationOutline /> },
  { key: "payment", title: "Payment Methods", icon: <IoCardOutline /> },
  {
    key: "notifications",
    title: "Notifications",
    icon: <IoNotificationsOutline />,
  },
];

const Settings = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getInfo = async () => {
    if (!token) {
      navigate("/login");
    }

    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/profile/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
    } catch (error) {
      console.error(error, "error fetching data");
    }
  };

  const [active, setActive] = useState("profile");

  const renderContent = () => {
    switch (active) {
      case "profile":
        return <EditProfile />;
      case "password":
        return <ChangePassword />;
      case "address":
        return <ShippingAddress />;
      case "notifications":
        return <Alerts />;
      case "payment":
        return (
          <div className="text-gray-500">Payment feature coming soon...</div>
        );
      default:
        return <div>Select a setting</div>;
    }
  };

  useEffect(() => getInfo, []);

  return (
    <div className="min-h-screen pt-[80px] pb-[100px] px-4 bg-[#f6fff9]">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Settings</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT MENU */}
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {settings.map((item) => (
            <div
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex items-center gap-3 px-4 py-4 cursor-pointer transition ${
                active === item.key ? "bg-green-100" : "hover:bg-gray-50"
              }`}
            >
              <div className="text-green-900 text-lg">{item.icon}</div>
              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
