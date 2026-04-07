import React, { useState } from "react";
import AllProducts from "../component/AllProducts";
import Orders from "../component/Order";
import Promotion from "../component/Promotion";
import CreateProduct from "../component/CreateProduct";

const Staff = () => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    { id: "products", label: "All Products" },
    { id: "create", label: "Create Product" },
    { id: "orders", label: "Orders" },
    { id: "promotion", label: "Promotion" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "products":
        return <AllProducts />;
      case "create":
        return <CreateProduct />;
      case "orders":
        return <Orders />;
      case "promotion":
        return <Promotion />;
      default:
        return <AllProducts />;
    }
  };

  return (
    <div className="min-h-screen mt-[50px] bg-[#f6fff9] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
            Staff Dashboard
          </h1>
          <p className="text-green-800/70 text-sm mt-1">
            Manage products, orders and promotions
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-green-900 text-white shadow"
                  : "bg-white text-green-900 border border-gray-200 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="transition-all duration-300">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default Staff;