import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "@/components/layout/Header/Header.jsx";
import Navbar from "@/components/layout/Navbar/Navbar.jsx";
import {useAppContext} from "@/contexts/appContext.jsx";
import ConfirmEmailPopup from "@/components/layout/ConfirmEmailPopup/ConfirmEmailPopup.jsx";

const MainLayout = () => {

  const {confirmedEmailPopupOpen, setConfirmedEmailPopupOpen} = useAppContext()

  return (
    <div>
      <Header/>
      <Outlet/>
      <Navbar/>
      {confirmedEmailPopupOpen && <ConfirmEmailPopup setConfirmedEmailPopupOpen={setConfirmedEmailPopupOpen} />}
    </div>
  );
};

export default MainLayout;