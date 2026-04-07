import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6fff9] text-center px-4">
      
      <h1 className="text-2xl font-bold text-green-900 mb-3">
        Order Successful 🎉
      </h1>

      <p className="text-gray-500 mb-6">
        Your order has been placed successfully
      </p>

      <Link
        to="/orders"
        className="bg-green-900 text-white px-6 py-3 rounded-xl"
      >
        View Orders
      </Link>
    </div>
  );
};

export default Success;