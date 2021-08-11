import React from "react";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <React.Fragment>
      <div class="logo">
        <img src={process.env.PUBLIC_URL + "/img/Logo-Oscars.svg"} height="150" width="490" alt="Logo-Oscars" />
      </div>
    </React.Fragment>
  );
}
