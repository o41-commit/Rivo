import React, { useState, useEffect } from "react";
import Spinner from "../componnent/Spinner";

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://rivo-ecommerce-db.onrender.com/product/items");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6fff9] md:pt-[100px] pt-[80px] px-4">
      {/* SEARCH INPUT */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#224F34]"
        />
      </div>

      {loading && <Spinner />}

      {/* RESULTS */}
      <h2 className="text-lg font-semibold text-[#224F34] mb-4">Results</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-[#224F34]">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">₦{product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;