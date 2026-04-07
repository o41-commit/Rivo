import React, { useState, useEffect } from "react";
import Spinner from "../componnent/Spinner";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // GET ORDERS
  const getInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/order/my", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (error) {
      console.error("Error getting order:", error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE ORDER 
  const deleteOrder = async (id, status) => {
    if (status?.toLowerCase() !== "pending") {
      setMessage("Only pending orders can be deleted.");
      return;
    }

    setDeletingId(id);
    setMessage("");

    try {
      const res = await fetch(
        `https://rivo-ecommerce-db.onrender.com/order/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      // ✅ show backend message
      setMessage(data.message || "Order deleted successfully");

      // ✅ re-fetch fresh data (source of truth)
      await getInfo();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Something went wrong while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="min-h-screen pt-[80px] pb-[100px] px-4 bg-[#f6fff9]">
      <h1 className="text-2xl font-bold text-green-900 mb-6">
        My Orders
      </h1>

      {/* ✅ MESSAGE */}
      {message && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-sm font-medium">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {loading && <Spinner />}

        {orders.map((order) => {
          const isPending =
            order.status?.toLowerCase() === "pending";

          return (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  ID: {order._id}
                </span>

                <span className="text-green-900">
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Date: {order.createdAt}
              </p>

              <p className="text-sm text-gray-500">
                Total: ₦{order.totalPrice}
              </p>

              {/* ✅ DELETE BUTTON */}
              <button
                onClick={() =>
                  deleteOrder(order._id, order.status)
                }
                disabled={
                  !isPending || deletingId === order._id
                }
                className={`mt-3 px-4 py-2 text-sm rounded-lg font-medium transition ${
                  !isPending
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : deletingId === order._id
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {!isPending
                  ? "Cannot Delete"
                  : deletingId === order._id
                  ? "Deleting..."
                  : "Delete Order"}
              </button>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 && !loading && (
        <div className="text-center mt-10 text-green-800/70">
          No order found.
        </div>
      )}
    </div>
  );
};

export default Orders;