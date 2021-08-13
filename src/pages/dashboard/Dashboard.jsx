import { React, useState } from "react";
import api from "../../services/extenalApi";
export default function Dashboard() {
  async function loadMovies() {
    var res = await api.tenantGet("/Movie");
    console.log(res);
  }
  loadMovies();
  return (
    <>
      <h2>oi</h2>
    </>
  );
}
