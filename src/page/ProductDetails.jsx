import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  const token = useMemo(() => localStorage.getItem("token"), []);

  const formatPrice = useCallback((price) => {
    return Number(price).toLocaleString();
  }, []);

  const sizes = useMemo(
    () =>
      Array.isArray(product?.sizes)
        ? product.sizes.join(", ")
        : product?.sizes || "N/A",
    [product?.sizes],
  );

  const colors = useMemo(
    () =>
      Array.isArray(product?.colors)
        ? product.colors.join(", ")
        : product?.colors || "N/A",
    [product?.colors],
  );

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

  const addToCart = async (productId) => {
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

      if (!res.ok) throw new Error(data.message);

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
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-6 shadow-md flex justify-center items-center"
        >
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-72 md:h-96 object-contain"
          />
        </motion.div>

        {/* DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-[#1a3d2f]">{product.name}</h1>

          <p className="text-2xl text-green-700 font-semibold mt-2">
            ₦{formatPrice(product.price)}
          </p>

          <p className="text-gray-600 mt-4 whitespace-pre-line">
            {product.description}
          </p>

          {/* SIZE DISPLAY */}
          <div className="mt-4">
            <span className="font-semibold text-gray-800">
              Available Sizes:{" "}
            </span>
            <span className="text-gray-600">{sizes}</span>
          </div>

          {/* COLOR DISPLAY */}
          <div className="mt-2">
            <span className="font-semibold text-gray-800">
              Available Colors:{" "}
            </span>
            <span className="text-gray-600">{colors}</span>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            <span>Quantity:</span>
            <div className="flex bg-gray-100 rounded-full px-4 py-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => addToCart(product._id)}
            disabled={cartLoadingId === product._id || (!token && !guestId)}
            className={`mt-8 w-full py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-2 ${
              cartLoadingId === product._id ? "bg-gray-400" : "bg-green-900"
            }`}
          >
            {cartLoadingId === product._id ? (
              <>
                <Spinner /> Adding...
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
