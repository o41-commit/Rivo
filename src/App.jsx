import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layout/mainLayout";

// Main Pages
import Home from "./page/Home";
import Categories from "./page/Categories";
import Alerts from "./page/Alert";
import Profile from "./page/Profile";
import NotFound from "./page/NotFound";
import Search from "./page/Search";
import Admin from "./admin/pages/admin";
import Staff from "./admin/pages/Staff";

// New Pages
import Orders from "./page/Order";
import Wishlist from "./page/Whichlist";
import Settings from "./page/Settings";
import Login from "./page/Login";
import Register from "./page/Register";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import Success from "./page/Success";
import ProductDetails from "./page/ProductDetails";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* MAIN APP LAYOUT */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="notifications" element={<Alerts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="search" element={<Search />} />
          <Route path="admin" element={<Admin />} />
          <Route path="staff" element={<Staff />} />
          <Route path="*" element={<NotFound />} />

          {/* CONNECTED PAGES */}
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* AUTH PAGES (NO NAVBAR) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
