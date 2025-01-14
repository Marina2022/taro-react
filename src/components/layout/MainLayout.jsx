import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "@/components/layout/Header/Header.jsx";
import Navbar from "@/components/layout/Navbar/Navbar.jsx";

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Navbar />
    </div>
  );
};

export default MainLayout;