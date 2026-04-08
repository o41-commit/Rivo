import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Spinner from "../componnent/Spinner";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const [guestId, setGuestId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchGuestId = useCallback(async () => {
    if (!token) {
      try {
        const storedGuestId = localStorage.getItem("guest_id");
        if (storedGuestId) setGuestId(storedGuestId);
        else {
          const res = await fetch(
            "https://rivo-ecommerce-db.onrender.com/cart/guest/new",
          );
          const data = await res.json();
          localStorage.setItem("guest_id", data.guestId);
          setGuestId(data.guestId);
        }
      } catch (error) {
        console.error("Failed to get guestId:", error);
      }
    }
  }, [token]);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://rivo-ecommerce-db.onrender.com/items/${id}`,
      );
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGuestId();
    fetchProduct();
  }, [fetchGuestId, fetchProduct]);

  const addToCart = async (productId, quantity = 1) => {
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
            productId,
            quantity,
            guestId: token ? null : guestId,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      toast.success("Item added to cart 🛒");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    } finally {
      setCartLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center p-6">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6fff9] to-white pt-[100px] pb-[80px] px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-4 md:p-6 lg:p-8 shadow-md flex justify-center items-center"
        >
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="h-64 md:h-96 lg:h-[28rem] object-contain hover:scale-105 transition duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a3d2f]">
              {product.name}
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-green-700 font-semibold mt-3">
              ₦{product.price}
            </p>

            <p className="text-sm md:text-base lg:text-lg text-gray-600 mt-4 leading-relaxed break-words">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <span className="font-medium text-sm md:text-base lg:text-lg">
                Quantity:
              </span>
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 md:px-4 md:py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 md:px-3 text-lg font-bold hover:text-green-700"
                >
                  -
                </button>
                <span className="px-3 md:px-4 font-semibold text-sm md:text-base lg:text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 md:px-3 text-lg font-bold hover:text-green-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => addToCart(product._id, quantity)}
            disabled={cartLoadingId === product._id || (!token && !guestId)}
            className={`mt-6 md:mt-8 py-3 md:py-4 lg:py-5 rounded-2xl font-semibold shadow-lg w-full transition
              ${
                cartLoadingId === product._id || (!token && !guestId)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#224F34] hover:bg-[#1b3e2a] text-white"
              }`}
          >
            {cartLoadingId === product._id ? "Adding..." : "Add to Cart"}
          </motion.button>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 md:mt-16">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#224F34] mb-4 md:mb-6">
          Customer Reviews
        </h2>
        <div className="space-y-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 md:p-5 lg:p-6 rounded-2xl shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base lg:text-lg">
                    {review.name}
                  </h3>
                  <div className="flex text-yellow-500 text-sm md:text-base lg:text-lg">
                    {[...Array(review.rating)].map((_, i) => (
                      <IoStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-2">
                  {review.comment}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              No reviews yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
