import React, { useEffect, useState } from "react";
import { IoMegaphoneOutline, IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Promotion = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:8080/promotion";

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ✅ FETCH
  const fetchPromotions = async () => {
    try {
      setFetching(true);
      setError("");

      const res = await axios.get(`${BASE_URL}/all`, config);

      if (res.status === 403 || res.status === 401 || !token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setPromotions(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setPromotions([]);
      } else {
        setError("Failed to load promotions");
      }
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Unauthorized: No token found");
      setFetching(false);
      return;
    }

    fetchPromotions();
  }, []);

  // ✅ CREATE
  const handleCreate = async () => {
    if (!title || !message) {
      // alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/create`, { title, message }, config);

      setTitle("");
      setMessage("");

      fetchPromotions();
    } catch (err) {
      // alert("Failed to create promotion");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`, config);

      setPromotions((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      // alert("Failed to delete promotion");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fff9] p-3 sm:p-6">
      <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-2">
        {/* 🔹 CREATE SECTION */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 flex flex-col justify-between">
          {/* HEADER */}
          <div className="mb-6 flex items-start sm:items-center gap-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <IoMegaphoneOutline size={22} className="text-green-900" />
            </div>

            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-900">
                Create Promotion
              </h2>
              <p className="text-green-800/70 text-xs sm:text-sm">
                Reach your customers with updates
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-4 flex-1">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Promotion title"
              className="input-style text-sm sm:text-base"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write promotion details..."
              className="input-style min-h-[120px] sm:min-h-[160px] text-sm sm:text-base"
            />
          </div>

          {/* BUTTON */}
          <div className="mt-6">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-900 text-white font-semibold shadow-md hover:opacity-90 active:scale-95 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Promotion"}
            </button>
          </div>
        </div>

        {/* 🔹 LIST SECTION */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-4">
            Promotions
          </h3>

          {fetching ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : promotions.length === 0 ? (
            <p className="text-gray-500 text-sm">No promotions yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {promotions.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <h4 className="font-semibold text-green-900 text-base sm:text-lg">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {item.message}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Promo</span>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs sm:text-sm"
                    >
                      <IoTrashOutline />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotion;
