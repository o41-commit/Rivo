import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdLocalShipping } from "react-icons/md";
import Spinner from "../../componnent/Spinner";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const getOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/staff/confirm-order/all",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

            if (res.status === 401 || res.status === 403 || !token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveOrder = async (id) => {
    try {
      await fetch(
        `http://localhost:8080/staff/confirm-order/confirm/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "confirmed" } : order
        )
      );
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const shipOrder = async (id) => {
    try {
      await fetch(
        `http://localhost:8080/staff/confirm-order/approve/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      // update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "shipped" } : order
        )
      );
    } catch (error) {
      console.error("Error shipping order:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-purple-100 text-purple-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const canConfirm = (order) =>
    order.status?.toLowerCase() === "pending";

  const canShip = (order) =>
    order.status?.toLowerCase() === "confirmed";

  const isCompleted = (order) =>
    order.status?.toLowerCase() === "shipped";

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6fff9] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900">
            Orders Overview
          </h2>
          <p className="text-green-800/70 text-base mt-2">
            Track and manage all customer orders in one place
          </p>
        </div>

        {loading && <Spinner />}

        {/* ORDER LIST */}
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm hover:shadow-lg transition border border-green-50"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">

                {/* ORDER INFO */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900">
                    Order #{order._id}
                  </h3>

                  <p className="text-sm text-green-800/70 mt-1">
                    ProductId: {order.items?.[0]?.productId || "No product"}
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5 pt-5 border-t border-green-100">

                {canConfirm(order) && (
                  <button
                    onClick={() => approveOrder(order._id)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <MdCheckCircle size={18} />
                    Confirm Order
                  </button>
                )}

                {canShip(order) && (
                  <button
                    onClick={() => shipOrder(order._id)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <MdLocalShipping size={18} />
                    Ship Order
                  </button>
                )}

                {isCompleted(order) && (
                  <div className="text-sm text-green-700 font-medium py-2.5">
                    ✓ Order shipped successfully
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && !loading && (
          <div className="text-center mt-12 text-green-800/70">
            <p className="text-lg">No orders available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;