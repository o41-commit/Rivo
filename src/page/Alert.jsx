import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../componnent/Spinner";
import {
  IoNotificationsOutline,
  IoCheckmarkCircle,
  IoCartOutline,
  IoPricetagOutline,
  IoTrashOutline,
} from "react-icons/io5";

const Alerts = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [notificationsData, setNotificationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); 
  const [deletingId, setDeletingId] = useState(null); 
  const token = localStorage.getItem("token");

  const getAlerts = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/notification/all", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setNotificationsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error, "Error when fetching data");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    setDeletingId(id);
    setMessage("");

    try {
      const res = await fetch(
        `https://rivo-ecommerce-db.onrender.com/notification/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, 
          },
        }
      );

      const data = await res.json();

      setMessage(data.message || "Notification deleted");

      await getAlerts();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to delete notification.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getAlerts();
  }, []);

  const filteredNotifications =
    filter === "all"
      ? notificationsData
      : notificationsData.filter((n) => n.type === filter);

  return (
    <div className="min-h-screen md:pt-[100px] bg-[#f6fff9] pt-[80px] pb-[90px] px-4">
      <div className="flex items-center gap-2 mb-6">
        <IoNotificationsOutline size={26} className="text-green-900" />
        <h1 className="text-2xl font-bold text-green-900">Notifications</h1>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-sm font-medium">
          {message}
        </div>
      )}

      {loading && <Spinner />}

      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "user", "promotion"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition
              ${
                filter === tab
                  ? "bg-green-900 text-white"
                  : "bg-white text-green-900 border border-green-900/30"
              }`}
          >
            {tab === "all" ? "All" : tab === "user" ? "Orders" : "Promotions"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item._id}
              className={`flex flex-col gap-3 p-4 rounded-xl shadow-sm border transition
                ${
                  item.read
                    ? "bg-white border-gray-200"
                    : "bg-[#C2EFD4]/40 border-green-200"
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-green-900">
                  {item.type === "order" ? (
                    <IoCartOutline size={22} />
                  ) : (
                    <IoPricetagOutline size={22} />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-green-900">
                    {item.title || "Notification"}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1 break-words">
                    {item.message}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {item.time}
                    </span>

                    {!item.read && (
                      <span className="text-[10px] bg-green-900 text-white px-2 py-[2px] rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {item.type === "user" && (
                <button
                  onClick={() => deleteNotification(item._id)}
                  disabled={deletingId === item._id}
                  className={`flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg transition
                    ${
                      deletingId === item._id
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                >
                  <IoTrashOutline size={16} />
                  {deletingId === item._id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center col-span-full">
            <IoCheckmarkCircle size={50} className="text-green-900 mb-3" />
            <h3 className="text-lg font-semibold text-green-900">
              You're all caught up!
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              No new notifications right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;