import React from 'react';
import {Outlet} from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>header</header>

        <Outlet/>
      <footer>navbar</footer>
    </div>
  );
};

export default MainLayout;