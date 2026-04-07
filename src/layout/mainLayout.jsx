import React from "react";
import NavBar from "./NavBar";
import Fotter from "./Fotter";
import { Outlet } from "react-router-dom";

const mainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Fotter />
    </div>
  );
};

export default mainLayout;
