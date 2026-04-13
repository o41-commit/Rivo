import React, { useState, useEffect } from "react";
import Spinner from "../componnent/Spinner";

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(12);

  const formatPrice = (price) => Number(price).toLocaleString();

  const getProduct = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://rivo-ecommerce-db.onrender.com/items/all"
      );

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#f6fff9] md:pt-[100px] pt-[80px] px-4">

      {/* SEARCH INPUT */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(12); // reset when searching
          }}
          className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#224F34]"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-[#224F34] mb-4">
            Results ({filteredProducts.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-[#224F34]">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ₦{formatPrice(product.price)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found
              </p>
            )}
          </div>

          {/* LOAD MORE */}
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="bg-green-900 text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;