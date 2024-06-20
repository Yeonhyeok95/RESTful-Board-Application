import { AUTH_PATH } from "constant";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

//          component: Layout          //
export default function Container() {
  //          state: current page path name          //
  const { pathname } = useLocation();

  //          render: Layout          //
  return (
    <>
      <Header />
      <Outlet />
      {pathname !== AUTH_PATH() && <Footer />}
    </>
  );
}
