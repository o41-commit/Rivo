import React, { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const MainLayout = lazy(() => import("./layout/mainLayout"));
const Home = lazy(() => import("./page/Home"));
const Categories = lazy(() => import("./page/Categories"));
const Alerts = lazy(() => import("./page/Alert"));
const Profile = lazy(() => import("./page/Profile"));
const NotFound = lazy(() => import("./page/NotFound"));
const Search = lazy(() => import("./page/Search"));
const Admin = lazy(() => import("./admin/pages/admin"));
const Staff = lazy(() => import("./admin/pages/Staff"));
const UserOrder = lazy(() => import("./admin/pages/UserOrder"));
const Orders = lazy(() => import("./page/Order"));
const Wishlist = lazy(() => import("./page/Whichlist"));
const Settings = lazy(() => import("./page/Settings"));
const Login = lazy(() => import("./page/Login"));
const Register = lazy(() => import("./page/Register"));
const Cart = lazy(() => import("./page/Cart"));
const Checkout = lazy(() => import("./page/Checkout"));
const Success = lazy(() => import("./page/Success"));
const ProductDetails = lazy(() => import("./page/ProductDetails"));

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
          <Route path="user-order/:id" element={<UserOrder />} />
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

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-green-700">Loading...</div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
