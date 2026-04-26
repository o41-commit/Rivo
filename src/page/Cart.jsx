import React, { useState, useEffect } from "react";
import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Spinner from "../componnent/Spinner";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const formatPrice = (price) => Number(price).toLocaleString();

  const getCart = async () => {
    const token = localStorage.getItem("token");
    let guestId = localStorage.getItem("guest_id");

    if (!token && !guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem("guest_id", guestId);
    }

    try {
      setLoading(true);

      const url = token
        ? "https://rivo-ecommerce-db.onrender.com/cart/all"
        : `https://rivo-ecommerce-db.onrender.com/cart/all/guest/${guestId}`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error(`server responded with ${res.status}`);

      const data = await res.json();
      console.log(data, "cart data");
      setCartItems(data);
    } catch (error) {
      console.error(error, "error fetching cart");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE =================
  const updateItem = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setActionLoadingId(id);

      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/cart/edit",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: id, quantity: newQuantity }),
        }
      );

      if (!res.ok) throw new Error("Failed to update cart item");

      await getCart();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const deleteItem = async (id) => {
    try {
      setActionLoadingId(id);

      const res = await fetch(
        `https://rivo-ecommerce-db.onrender.com/cart/delete/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete cart item");

      await getCart();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // ================= CALCULATIONS =================
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = cartItems.length > 0 ? 900 : 0;
  const total = subtotal + deliveryFee;

  // ================= LOADING UI =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6fff9] pt-[80px] pb-[120px] px-4">
      <h1 className="text-2xl font-bold text-green-900 mb-6">My Cart</h1>

      {/* EMPTY STATE */}
      {cartItems.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-green-900 text-white px-6 py-2 rounded-lg"
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* CART ITEMS */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-white p-4 rounded-xl shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full md:w-24 h-24 rounded-lg object-cover"
            />

            <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center w-full">
              <div className="flex-1">
                <h2 className="font-semibold text-green-900">{item.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  ₦{formatPrice(item.unitPrice)}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    disabled={actionLoadingId === item._id}
                    onClick={() => updateItem(item._id, item.quantity - 1)}
                    className="p-1.5 bg-gray-100 rounded disabled:opacity-50"
                  >
                    <IoRemove />
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    disabled={actionLoadingId === item._id}
                    onClick={() => updateItem(item._id, item.quantity + 1)}
                    className="p-1.5 bg-gray-100 rounded disabled:opacity-50"
                  >
                    <IoAdd />
                  </button>
                </div>
              </div>

              <button
                disabled={actionLoadingId === item._id}
                onClick={() => deleteItem(item._id)}
                className="text-red-500 mt-3 md:mt-0 md:ml-4 self-end disabled:opacity-50"
              >
                {actionLoadingId === item._id ? (
                  <Spinner />
                ) : (
                  <IoTrashOutline size={20} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTALS */}
      {cartItems.length > 0 && (
        <div className="mt-8 bg-white p-5 rounded-2xl shadow-md max-w-2xl mx-auto">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-green-900">
              ₦{formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Delivery</span>
            <span>₦{formatPrice(deliveryFee)}</span>
          </div>

          <div className="flex justify-between mb-5">
            <span className="font-bold text-green-900">Total</span>
            <span className="font-bold text-green-900 text-lg">
              ₦{formatPrice(total)}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;