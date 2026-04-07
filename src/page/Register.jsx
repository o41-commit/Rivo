import React, { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Password dose not match");
      return;
    }

    try {
      const respond = await fetch("https://rivo-ecommerce-db.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await respond.json();

      if (!respond.ok) {
        setError(data.message);
        return;
      }

      if (respond.ok) {
        let token = data.token;
        localStorage.setItem("token", token);

        if (guestId) {
          const merge = async () => {
            const res = await fetch("https://rivo-ecommerce-db.onrender.com/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(guestId),
            });

            const data = await res.json();
          };
          merge();
        }
        window.location.href = "/";
      }
    } catch (error) {
      console.error("error submiting the form", error);
      setError("Something went wrong on the server ");
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
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="ConfirmPassword"
            className="w-full mb-4 p-3 border rounded-lg"
          />

          {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-900 cursor-pointer active:scale-95 transition-all duration-200 text-white py-3 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
