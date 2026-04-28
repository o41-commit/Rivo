import React, { memo } from "react";
import NavBar from "./NavBar";
import Fotter from "./Fotter";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Fotter />
    </div>
  );
};

export default memo(MainLayout);
