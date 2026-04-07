import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCameraOutline, IoPersonCircleOutline } from "react-icons/io5";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [img, setImg] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const updateInfo = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("num", number);
      if (profilePicture) {
        formDataToSend.append("image", profilePicture);
      }

      const res = await fetch("https://rivo-ecommerce-db.onrender.com/profile/update", {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

            if(res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile. Please try again.");
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
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

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setName(data.name || "");
        setNumber(data.num || "");

        let imageUrl = null;
        if (data.image) {
          if (data.image.startsWith("http")) {
            imageUrl = data.image;
          } else {
            const path = data.image.startsWith("/")
              ? data.image
              : `/uploads/${data.image}`;
            imageUrl = `https://rivo-ecommerce-db.onrender.com${path}`;
          }
        }
        setImg(imageUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInfo();
  }, [token, navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-900 mb-6">Edit Profile</h2>

      {message && (
        <div
          className={`mb-4 p-4 rounded-xl ${message.includes("Error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={updateInfo}
        className="bg-white rounded-2xl shadow-md p-6 space-y-6"
      >
        {/* PROFILE IMAGE */}
        <div className="flex items-center gap-6">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : img ? (
              <img
                src={img}
                alt="profile"
                className="w-34 h-24 rounded-full object-cover border"
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <IoPersonCircleOutline className="w-24 h-24 text-gray-400" />
            )}

            <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer text-white shadow">
              <IoCameraOutline />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Profile Photo</h3>
            <p className="text-sm text-gray-500">
              Upload a clear image (JPG, PNG)
            </p>
          </div>
        </div>

        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* NAME */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* PHONE NUMBER */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
