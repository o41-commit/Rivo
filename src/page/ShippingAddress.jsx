import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShippingAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://rivo-ecommerce-db.onrender.com/profile/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

              if(res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

        const data = await res.json();
        if (data.address) {
          setAddresses(
            Array.isArray(data.address) ? data.address : [data.address],
          );
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [token, navigate]);

  const handleAddAddress = async () => {
    if (!newAddress.trim() || !token) return;

    try {
      const updatedAddresses = [...addresses, newAddress];
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: updatedAddresses }),
      });

      if (!res.ok) return;

      setAddresses(updatedAddresses);
      setNewAddress("");
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleRemoveAddress = async (index) => {
    if (!token) return;

    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: updatedAddresses }),
      });

      if (!res.ok) return;

      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error removing address:", error);
    }
  };

  return (
    <div className="min-h-screen pt-[80px] pb-[100px] px-4 bg-[#f6fff9]">
      <h1 className="text-2xl font-bold text-green-900 mb-6">
        Shipping Addresses
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Manage Your Addresses
        </h2>

        {/* Add New Address */}
        <div className="mb-6 flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddAddress()}
            placeholder="Enter new address"
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 break-words"
          />
          <button
            onClick={handleAddAddress}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 transition font-medium flex-shrink-0"
          >
            Add Address
          </button>
        </div>

        {/* Addresses List */}
        {addresses.length > 0 ? (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              Your Addresses
            </h3>
            <ul className="space-y-2">
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-row flex-wrap justify-between items-start bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-gray-700 break-all md:flex-1 w-full md:w-auto">
                    {address}
                  </span>
                  <button
                    onClick={() => handleRemoveAddress(index)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm mt-2 md:mt-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No addresses added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
