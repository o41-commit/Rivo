import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../componnent/Spinner";

import { auth } from "../firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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
  const googleLogin = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;

      const firebaseToken = await user.getIdToken();

      // send token to backend
      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: firebaseToken,
          }),
        }
      );

      const data = await res.json();

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
        "https://rivo-ecommerce-db.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
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

          await fetch(
            "https://rivo-ecommerce-db.onrender.com/cart/merge",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                guestId,
              }),
            }
          );

        } catch (err) {

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



          {error && (
            <p className="text-red-600 mb-2 text-sm">
              {error}
            </p>
          )}



          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-900 cursor-pointer active:scale-95"
            } text-white`}
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



        <button
          onClick={googleLogin}
          className="w-full mt-4 py-3 rounded-lg bg-blue-500 cursor-pointer text-white flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
        >
          Login with Google
        </button>



        <p className="text-sm text-center mt-4">

          Don't have an account?{" "}

          <Link to="/register">
            <span className="text-green-900">
              Register
            </span>
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;