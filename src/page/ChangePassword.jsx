import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!currentPassword) {
      setError("Current password is required.");
      setLoading(false);
      return;
    }

    if (!newPassword) {
      setError("New password is required.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      setLoading(false);
      return;
    }

    if (!token) {
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),


      });

      if (!res.ok) {
        const errorData = await res.json();

        setError(
          errorData.message || "Failed to change password. Please try again.",
        );
        setLoading(false);
        return;
      }

      if(res.status === 401 || res.status === 403) {
        setError("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setSuccess("Password changed successfully!");

      // Clear form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Optionally redirect after success
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error changing password:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[80px] pb-[100px] px-4 bg-[#f6fff9]">
      <h1 className="text-2xl font-bold text-green-900 mb-6">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 max-w-md mx-auto space-y-6"
      >
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Current Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password (min 6 characters)"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
