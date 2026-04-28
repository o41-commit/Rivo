import React, { useState } from "react";

const EditProduct = ({ product }) => {
  const [price, setPrice] = useState(product?.price || "");
  const [size, setSize] = useState(product?.size || "");
  const [color, setColor] = useState(product?.color || "");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow rounded-xl my-4 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Edit Product
      </h2>

      {/* Responsive Grid for Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 w-full"
        />

        <input
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Size"
          className="border p-2 w-full"
        />

        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color"
          className="border p-2 w-full"
        />
      </div>

      {/* Image Upload Section */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Product Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="border p-2 w-full mb-2"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`preview-${index}`}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
             loading="lazy" decoding="async"/>
          ))}
        </div>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto block mx-auto sm:mx-0">
        Update Product
      </button>
    </div>
  );
};

export default EditProduct;