import React, { useState } from "react";
import Spinner from "../componnent/Spinner";
import { auth } from "../firebase";
import { FaGoogle } from "react-icons/fa";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

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

  // GOOGLE LOGIN
  const googleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const firebaseToken = await user.getIdToken();

      // console.log("Firebase token:", firebaseToken);
      // send token to backend
      console.log("ABOUT TO CALL BACKEND");
      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: firebaseToken,
          }),
        },
      );

      console.log("RESPONSE RECEIVED:", res);

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setError(data.message || "Google login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      // role redirect
      if (data.role === "admin") {
        window.location.href = "/admin";
      }

      if (data.role === "user") {
        window.location.href = "/";
      }

      if (data.role === "staff") {
        window.location.href = "/staff";
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);

      setError("Google authentication failed");
    }
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
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.confirmPassword,
      };

      const respond = await fetch(
        "https://rivo-ecommerce-db.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
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
          await fetch("https://rivo-ecommerce-db.onrender.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ guestId }),
          });
        } catch {
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-emerald-50 to-[#f6fff9] px-4">
      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-4xl shadow-2xl border border-slate-200 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">
          Create Account
        </h2>
        <p className="text-sm text-slate-500 text-center mb-7">
          Secure signup for faster checkout, order tracking, and personalized
          offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />

          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />

          {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-white transition-all duration-200 shadow-lg
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-900 hover:bg-emerald-800 active:scale-[0.98]"
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

        <div className="mt-4 flex items-center gap-3 text-slate-400 text-sm">
          <span className="h-px flex-1 bg-slate-200"></span>
          or continue with
          <span className="h-px flex-1 bg-slate-200"></span>
        </div>

        <button
          type="button"
          onClick={googleLogin}
          className="w-full mt-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-all duration-200"
        >
          <FaGoogle className="text-lg text-rose-500" />
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
