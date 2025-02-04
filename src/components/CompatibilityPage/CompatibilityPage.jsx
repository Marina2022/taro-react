import s from './CompatibilityPage.module.scss';
import {Outlet} from "react-router-dom";
import Header24 from "@/components/ui/systemComponents/Header24/Header24.jsx";
import React from "react";

const CompatibilityPage = () => {
  return (

    <div className={s.compatibility}>
      <div className='container'>
        <Header24 classname={s.mainTitle}>СОВМЕСТИМОСТЬ</Header24>
        <Outlet />
      </div>
    </div>
    
  );
};

export default CompatibilityPage;