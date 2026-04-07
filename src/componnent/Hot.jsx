import React, { useState, useEffect } from "react";
import { FaStar, FaPlus } from "react-icons/fa";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Hot = () => {
  const [items, setItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const [guestId, setGuestId] = useState(null);

  const token = localStorage.getItem("token");

  const userName = (name) => {
    const limit = 15;
    return name.length > limit ? name.slice(0, limit) + "..." : name;
  };

  const getItems = async () => {
    try {
      setPageLoading(true);

      const res = await fetch("https://rivo-ecommerce-db.onrender.com/items/all");
      const data = await res.json();
      // console.log("Fetched items:", data);

      const hotItems = data.filter(
        (item) => item.category?.toLowerCase() === "hot"
      );

      setItems(hotItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      let storedId = localStorage.getItem("guest_id");

      if (!storedId) {
        storedId = crypto.randomUUID();
        localStorage.setItem("guest_id", storedId);
      }

      setGuestId(storedId);
    }
  }, [token]);

  const addToCart = async (productId) => {
    try {
      setCartLoadingId(productId);

      const res = await fetch("https://rivo-ecommerce-db.onrender.com/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          quantity: 1,
          productId,
          guestId: token ? null : guestId,
        }),
      });

      const data = await res.json();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoadingId(null);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.length > 0 ? (
        items.map((item) => (
          <Link to={`/product/${item._id}`} key={item._id}>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Image */}
              <div className="relative">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-[180px] md:h-48 lg:h-56 xl:h-60 object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Badge */}
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs md:text-sm px-2 py-1 rounded-full">
                  HOT
                </span>
              </div>

              {/* Content */}
              <div className="p-3 md:p-4">
                {/* Name */}
                <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 truncate">
                  {userName(item.name)}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm md:text-base text-gray-500 mt-1">
                  <FaStar className="text-yellow-400" />
                  <span>5.0</span>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg md:text-xl font-bold text-green-700">
                    ₦{item.price}
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(item._id );
                    }}
                    disabled={cartLoadingId === item._id}
                    className="bg-green-600 text-white p-2 md:p-3 rounded-full hover:bg-green-700 transition flex items-center justify-center"
                  >
                    {cartLoadingId === item._id ? (
                      <div className="scale-75">
                        <Spinner />
                      </div>
                    ) : (
                      <FaPlus size={12} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-green-600 font-semibold text-xl col-span-2 md:col-span-3 lg:col-span-4 text-center">
          No products found
        </p>
      )}
    </div>
  );
};

export default Hot;