import React from "react";
import Header from "./Header";
import RootRoutes from "../RootRoutes.js";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <RootRoutes />
    </React.Fragment>
  );
}

export default Layout;
