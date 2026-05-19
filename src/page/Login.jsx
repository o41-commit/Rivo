import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../componnent/Spinner";
import { FaGoogle } from "react-icons/fa";

import { auth } from "../firebase";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const guestId = localStorage.getItem("guest_id");

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

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

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

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const token = data.token;

      localStorage.setItem("token", token);

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

      // merge guest cart
      if (guestId) {
        try {
          await fetch("https://rivo-ecommerce-db.onrender.com/cart/merge", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              guestId,
            }),
          });
        } catch {
          console.error("Merge failed");
        }
      }
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-emerald-50 to-[#f6fff9] px-4">
      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-4xl shadow-2xl border border-slate-200 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-500 text-center mb-7">
          Log in to access your orders, saved items, and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
            onChange={handleChange}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

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
                <Spinner />
                Logging in...
              </>
            ) : (
              "Login"
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
          Login with Google
        </button>

        <p className="text-sm text-center mt-5 text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-900 font-semibold hover:text-emerald-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
