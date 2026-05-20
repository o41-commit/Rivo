import React, { useState, useEffect, useCallback } from "react";
import { MdCheckCircle, MdLocalShipping } from "react-icons/md";
import Spinner from "../../componnent/Spinner";
import { useNavigate, Link } from "react-router-dom";

const priceFormatter = new Intl.NumberFormat("en-NG");

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

    const formatPrice = useCallback((price) => {
      if (!price) return "0";
      return priceFormatter.format(price);
    }, []);

  const getOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/staff/confirm-order/all",
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
        `https://rivo-ecommerce-db.onrender.com/staff/confirm-order/confirm/${id}`,
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
        `https://rivo-ecommerce-db.onrender.com/staff/confirm-order/approve/${id}`,
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Orders Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Manage customer orders efficiently
          </p>
        </div>

        {loading && <Spinner />}

        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border"
            >
              <div className="flex justify-between items-center mb-4">

                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Order #{order._id.slice(0, 8)}...
                  </h3>
                  <p className="text-sm text-gray-500">
                    {order.userName || "Unknown User"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>Items: {order.items?.length}</p>
                <p>Total: ₦{formatPrice(order.totalPrice)}</p>
              </div>

              <div className="flex flex-wrap gap-3 mt-5">

                <Link to={`/user-order/${order._id}`}>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black text-sm">
                    View Order
                  </button>
                </Link>


                {canConfirm(order) && (
                  <button
                    onClick={() => approveOrder(order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    <MdCheckCircle />
                    Confirm
                  </button>
                )}

                {canShip(order) && (
                  <button
                    onClick={() => shipOrder(order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <MdLocalShipping />
                    Ship
                  </button>
                )}

                {isCompleted(order) && (
                  <span className="text-green-600 text-sm font-medium">
                    ✓ Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && !loading && (
          <div className="text-center mt-12 text-gray-500">
            No orders available
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;