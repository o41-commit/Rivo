import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../componnent/Spinner";

const Checkout = () => {
  const navigate = useNavigate();

  const [num, setNum] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const token = localStorage.getItem("token");

  //  FETCH USER INFO 
  const getInfo = async () => {
    if (!token) {
      navigate("/login");
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

      if (!res.ok) {
        navigate("/profile");
        return;
      }

      const data = await res.json();
      console.log(data)

      if (!data.num || data.num === null) {
        setMessage("No number registered");
        navigate("/settings");
        return;
      }

      if (!data.address || data.address.length === 0) {
        setMessage("No address registered");
        navigate("/settings");
        return;
      }

      setAddress(data.address);
      setNum(data.num);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error loading profile information");
    } finally {
      setLoading(false);
    }
  };

//  PLACE ORDER 
  const placeOrder = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setPlacingOrder(true);

      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        navigate("/success");
      } else {
        setMessage(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Error placing order");
    } finally {
      setPlacingOrder(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[80px] px-4 bg-[#f6fff9]">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Checkout</h1>

      <div className="bg-white p-4 rounded-xl mb-4 shadow-sm">
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        <p className="text-sm text-gray-500">
          {address || "No address found"}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl mb-6 shadow-sm">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <p className="text-sm text-gray-500">
          Pay on Delivery (Demo)
        </p>
      </div>

      {message && (
        <p className="text-sm text-red-500 mb-4">{message}</p>
      )}

      <button
        onClick={placeOrder}
        disabled={placingOrder}
        className={`w-full py-3 rounded-xl font-semibold text-white transition ${
          placingOrder
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-900 hover:bg-green-800"
        }`}
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;