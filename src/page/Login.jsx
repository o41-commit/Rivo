import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Login");
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const guestId = localStorage.getItem("guest_id");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Logging in...");

    try {
      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      // console.log(data, "login response");

      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (data.role === "admin") {
        window.location.href = "/admin";
      }
      if (data.role === "user") {
        window.location.href = "/";
      }
      if (data.role === "staff") {
        window.location.href = "/staff";
      }

      let token = data.token;
      localStorage.setItem("token", token);
      if (guestId) {
        const merge = async () => {
          const res = await fetch(
            "https://rivo-ecommerce-db.onrender.com/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(guestId),
            },
          );

          const data = await res.json();
        };
        merge();
      }
    } catch (error) {
      console.error(error, "error submiting");
    } finally {
      setLoading("Login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6fff9] px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border rounded-lg"
            onChange={handleChange}
          />

          {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full  cursor-pointer active:scale-95 transition-all duration-200 bg-green-900 text-white py-3 rounded-lg"
          >
            {loading}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?
          <Link to="/register">
            <span className="text-green-900">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
