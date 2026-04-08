import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Spinner from "../../componnent/Spinner";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/product/items", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403 || !token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await fetch(`https://rivo-ecommerce-db.onrender.com/product/delete/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      getProduct(); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...selectedProduct,
        size: Array.isArray(selectedProduct.size)
          ? selectedProduct.size.join(",")
          : selectedProduct.size,
        colors: Array.isArray(selectedProduct.colors)
          ? selectedProduct.colors.join(",")
          : selectedProduct.colors,
      };

      await fetch(
        `https://rivo-ecommerce-db.onrender.com/product/item/edit/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      setShowModal(false);
      getProduct();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const filtered = products.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f6fff9] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
            Product Management
          </h2>
          <p className="text-green-800/70 text-sm mt-1">
            Manage, update and control your store inventory efficiently
          </p>
        </div>

        <div className="relative mb-6">
          <IoSearchOutline
            className="absolute left-3 top-1/2 -translate-y-1/2 text-green-900/60"
            size={20}
          />
          <input
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <Spinner />}

        <div className="flex flex-col gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  {item.name}
                </h3>

                <p className="text-xs text-green-700/60 mt-1 flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-mono">
                    ID: {item._id?.slice(0, 8)}...
                  </span>
                </p>

                <p className="text-sm text-green-800/70 mt-2">
                  ₦{item.price} • Size {item.size} • {item.colors} •{" "}
                  {item.category}
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleEditClick(item)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-yellow-400 text-white font-medium shadow hover:opacity-90 active:scale-95 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(item._id)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:opacity-90 active:scale-95 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center mt-10 text-green-800/70">
            No products found.
          </div>
        )}
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-900">
              Edit Product
            </h3>

            <div className="space-y-3">
              <input
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              />

              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              />

              <input
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              />

              <input
                value={selectedProduct.size}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    size: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              />

              <input
                value={selectedProduct.colors}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    colors: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-green-900 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
