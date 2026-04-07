import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6fff9] text-center px-4">
      
      <h1 className="text-6xl font-bold text-[#224F34] mb-2">
        404
      </h1>

      <h2 className="text-xl font-semibold text-[#224F34] mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6 max-w-sm">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-[#224F34] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;