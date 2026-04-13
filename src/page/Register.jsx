import React, { useState } from "react";
import Spinner from "../componnent/Spinner";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const guestId = localStorage.getItem("guest_id");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent multiple clicks

    if (formData.password !== formData.confirmPassword) {
      setError("Password does not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 🔥 clean payload (no confirmPassword)
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const respond = await fetch(
        "https://rivo-ecommerce-db.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await respond.json();

      if (!respond.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      const token = data.token;
      localStorage.setItem("token", token);

      // merge guest cart
      if (guestId) {
        try {
          await fetch(
            "https://rivo-ecommerce-db.onrender.com/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ guestId }),
            }
          );
        } catch (err) {
          console.error("Merge failed");
        }
      }

      window.location.href = "/";
    } catch (error) {
      console.error("error submitting form", error);
      setError("Something went wrong on the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6fff9] px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-3 p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-3 p-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-3 p-3 border rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full mb-4 p-3 border rounded-lg"
          />

          {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white transition-all duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-900 cursor-pointer active:scale-95"
              }`}
          >
            {loading ? (
              <>
                <Spinner /> Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;