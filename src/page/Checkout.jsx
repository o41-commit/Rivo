import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [num, setNum] = useState(null);
  const [address, setAddress] = useState(null);
  const [message, setMessage] = useState(" ");
  const token = localStorage.getItem("token");

  const getInfo = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/profile/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        navigate("/profile");
        return;
      }

      const data = await res.json();
      setAddress(data.address);
      setNum(data.num);

 

      if (!data.num || data.num === "") {
        setMessage("No number registered");
        navigate("/settings");
        return;
      }

      if (!data.address || data.address === "") {
        setMessage("No address registered");
        navigate("/settings");
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error loading profile information");
    }
  };

  const placeOrder = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success === true) {
        setTimeout(() => {
          navigate("/success");
        }, 1000);
      } else {
        setMessage(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Error placing order");
    }
  };

  useEffect(() => getInfo, []);

  return (
    <div className="min-h-screen pt-[80px] px-4 bg-[#f6fff9]">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Checkout</h1>
      {/* ADDRESS */}
      <div className="bg-white p-4 rounded-xl mb-4 shadow-sm">
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        <p className="text-sm text-gray-500">{address}</p>
      </div>
      {/* PAYMENT METHOD */}
      <div className="bg-white p-4 rounded-xl mb-6 shadow-sm">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <p className="text-sm text-gray-500">Pay on Delivery (Demo)</p>
      </div>
      {message}
      {/* BUTTON */}
      <button
        onClick={() => placeOrder()}
        className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
