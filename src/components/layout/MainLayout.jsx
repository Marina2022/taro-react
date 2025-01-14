import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "@/components/layout/Header/Header.jsx";

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <footer>navbar</footer>
    </div>
  );
};

export default MainLayout;