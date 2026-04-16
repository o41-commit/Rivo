import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Spinner from "../../componnent/Spinner";
import { MdCheckCircle, MdLocalShipping } from "react-icons/md";

const UserOrder = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const getOrder = async () => {
    try {
      const res = await fetch(
        `https://rivo-ecommerce-db.onrender.com/staff/confirm-order/order/${id}`,
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
      console.log(data)
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

  if (loading) return <Spinner />;

  if (!order) {
    return <div className="text-center p-10">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-8 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Order Details
          </h1>
          <p className="text-gray-500">
            Manage and track this customer order
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">

          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Order #{order._id}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Total: ₦{order.totalPrice}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* Customer Info */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Customer Info
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <p><strong>Name:</strong> {order.userName}</p>
              <p><strong>Email:</strong> {order.userEmail}</p>
              <p><strong>Phone:</strong> {order.userNum}</p>
              <p><strong>Address:</strong> {order.userAddress}</p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Order Items
            </h3>

            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
                >
                  <div>
                    <p className="text-sm text-gray-700">
                      Product ID: {item.productId}
                    </p>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-sm font-semibold text-gray-700">
                    ₦{item.totalPrice}
                  </div>

                  <Link to={`/product/${item.productId}`}>
                    <button className="text-blue-600 text-sm hover:underline">
                      View
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-4 flex gap-3 flex-wrap">

            {order.status === "Pending" && (
              <button
                onClick={() =>
                  updateStatus(
                    `https://rivo-ecommerce-db.onrender.com/staff/confirm-order/confirm/${id}`,
                    "Confirmed"
                  )
                }
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
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
                    "Shipped"
                  )
                }
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                <MdLocalShipping />
                Ship Order
              </button>
            )}

            {order.status === "Shipped" && (
              <span className="text-green-600 font-medium">
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