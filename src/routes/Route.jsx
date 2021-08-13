import React from "react";
import { Route, Redirect } from "react-router-dom";

import DefaultLayout from "../pages/_layouts/default/Default";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const Layout =  DefaultLayout;
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}