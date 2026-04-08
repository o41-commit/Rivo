import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Spinner from "../../componnent/Spinner";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    size: "",
    colors: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder:text-gray-400";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => {
        data.append("images", img);
      });

      const res = await fetch("https://rivo-ecommerce-db.onrender.com/product/create", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      });

            if (res.status === 401 || res.status === 403 || !token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setMessage("✅ Product created successfully!");

      setFormData({
        name: "",
        price: "",
        category: "",
        size: "",
        colors: "",
        description: "",
      });
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create New Product
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Add a new product to your store inventory
          </p>
        </div>


        {loading && (
          <div className="flex justify-center my-4">
            <Spinner />
          </div>
        )}

        {message && (
          <div className="mb-4 text-center text-sm font-medium text-green-700 bg-green-50 border border-green-200 p-3 rounded-xl">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              placeholder="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              placeholder="Sizes (e.g S,M,L)"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              placeholder="Colors (e.g Red,Blue)"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <textarea
            placeholder="Product Description..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${inputClass} min-h-[120px] resize-none`}
          />

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Product Images
            </label>

            <label className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-300">
              <IoCloudUploadOutline
                size={36}
                className="text-gray-500 group-hover:text-green-600 transition"
              />

              <p className="mt-2 text-sm text-gray-600 group-hover:text-green-700">
                Click to upload or drag images
              </p>

              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG up to 5 files
              </span>

              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative group w-24 h-24 rounded-xl overflow-hidden border shadow-sm"
                  >
                    <img
                      src={url}
                      alt="preview"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
                      Preview
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-900 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
