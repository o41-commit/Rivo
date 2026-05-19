import React, { useState, useEffect, useMemo, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaPlus } from "react-icons/fa";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const priceFormatter = new Intl.NumberFormat("en-NG");

const CategoryProducts = ({ category }) => {
  const [items, setItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const [guestId, setGuestId] = useState(null);

  const token = useMemo(() => localStorage.getItem("token"), []);

  const formatPrice = useCallback((price) => {
    if (!price) return "0";
    return priceFormatter.format(price);
  }, []);

  const userName = useCallback((name) => {
    const limit = 15;
    return name?.length > limit ? `${name.slice(0, limit)}...` : name;
  }, []);

  const fetchItems = useCallback(async () => {
    try {
      setPageLoading(true);

      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/items/all",
      );
      const data = await res.json();

      const filtered = data.filter(
        (item) => item.category?.toLowerCase() === category?.toLowerCase(),
      );

      setItems(filtered);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    } finally {
      setPageLoading(false);
    }
  }, [category]);

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

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 120,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [items]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addToCart = useCallback(
    async (productId) => {
      try {
        setCartLoadingId(productId);

        const res = await fetch(
          "https://rivo-ecommerce-db.onrender.com/cart/add",
          {
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
          },
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to add to cart");
        }

        await res.json();
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setCartLoadingId(null);
      }
    },
    [guestId, token],
  );

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="flex flex-col items-center gap-3">
          <Spinner />
          <p className="text-sm text-gray-500 animate-pulse">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.length > 0 ? (
        items.map((item, index) => {
          const isLoading = cartLoadingId === item._id;

          return (
            <Link to={`/product/${item._id}`} key={item._id}>
              <div
                data-aos="zoom-in"
                data-aos-delay={index * 80}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[180px] md:h-48 lg:h-56 xl:h-60 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs md:text-sm px-2 py-1 rounded-full">
                    {category?.toUpperCase() || "ITEM"}
                  </span>
                </div>

                <div className="p-3 md:p-4">
                  <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 truncate">
                    {userName(item.name)}
                  </h2>
                  <div className="flex items-center gap-1 text-sm md:text-base text-gray-500 mt-1">
                    <FaStar className="text-yellow-400" />
                    <span>5.0</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg md:text-xl font-bold text-green-700">
                      ₦{formatPrice(item.price)}
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isLoading) addToCart(item._id);
                      }}
                      disabled={isLoading}
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition active:scale-95
                        ${isLoading ? "bg-transparent" : "bg-green-600 hover:bg-green-700 text-white"}`}
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <FaPlus className="text-xs md:text-sm" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="text-green-600 font-semibold text-xl col-span-2 md:col-span-3 lg:col-span-4 text-center">
          No products found
        </p>
      )}
    </div>
  );
};

export default React.memo(CategoryProducts);
