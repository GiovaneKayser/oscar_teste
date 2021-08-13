import React from "react";
import Navbar from "../../../components/navbar/Navbar.jsx";

export default function DefaultLayout({ children }) {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <main>{children}</main>
    </React.Fragment>
  );
}
