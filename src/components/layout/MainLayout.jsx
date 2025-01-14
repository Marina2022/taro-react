import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "@/components/layout/Header/Header.jsx";

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <footer>
        <div className="container">
          <br/>
          navbar
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;