import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Spinner from "../../componnent/Spinner";
import { MdCheckCircle, MdLocalShipping } from "react-icons/md";

const UserOrder = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsVisibleCount, setItemsVisibleCount] = useState(3);

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const priceFormatter = new Intl.NumberFormat("en-NG");

  const getOrder = async () => {
    try {
      const res = await fetch(
        `https://rivo-ecommerce-db.onrender.com/staff/confirm-order/order/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 401 || res.status === 403 || !token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (url, newStatus) => {
    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Error updating order:", error);
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

  useEffect(() => {
    getOrder();
  }, []);

  // FULLSCREEN LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center p-10">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Order Details
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage and track this customer order
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-all">
                Order #{order._id}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Total: ₦{priceFormatter.format(order.totalPrice)}
              </p>
            </div>

            <span
              className={`self-start sm:self-auto px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${getStatusStyle(
                order.status,
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* Customer Info */}
          <div className="border-t pt-4">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">
              Customer Info
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <p>
                <strong>Name:</strong> {order.userName}
              </p>
              <p>
                <strong>Email:</strong> {order.userEmail}
              </p>
              <p>
                <strong>Phone:</strong> {order.userNum}
              </p>
              <p>
                <strong>Address:</strong> {order.userAddress}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t pt-4">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">
              Order Items
            </h3>

            <div className="space-y-3">
              {order.items?.slice(0, itemsVisibleCount).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gray-50 p-4 rounded-xl"
                >
                  <div className="text-sm text-gray-700">
                    <p className="break-all">
                      <span className="font-medium">Product ID:</span>{" "}
                      {item.productId}
                    </p>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-sm font-semibold text-gray-700">
                    ₦{priceFormatter.format(item.totalPrice)}
                  </div>

                  <Link to={`/product/${item.productId}`}>
                    <button className="w-full sm:w-auto text-blue-600 text-sm hover:underline">
                      View
                    </button>
                  </Link>
                </div>
              ))}

              {order.items && order.items.length > itemsVisibleCount && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setItemsVisibleCount((c) => c + 3)}
                    className="px-4 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800"
                  >
                    Show more items
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-4 flex flex-col sm:flex-row gap-3">
            {order.status === "Pending" && (
              <button
                onClick={() =>
                  updateStatus(
                    `https://rivo-ecommerce-db.onrender.com/staff/confirm-order/confirm/${id}`,
                    "Confirmed",
                  )
                }
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                <MdCheckCircle />
                Confirm Order
              </button>
            )}

            {order.status === "Confirmed" && (
              <button
                onClick={() =>
                  updateStatus(
                    `https://rivo-ecommerce-db.onrender.com/staff/confirm-order/approve/${id}`,
                    "Shipped",
                  )
                }
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                <MdLocalShipping />
                Ship Order
              </button>
            )}

            {order.status === "Shipped" && (
              <span className="text-green-600 font-medium text-sm sm:text-base">
                ✓ Order completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
