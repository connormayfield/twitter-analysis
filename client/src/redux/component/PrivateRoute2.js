import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute2 = ({ component: Component, user, ...rest }) => (
  <Route
  {...rest}
  render={() =>
    user.logged ? (
      <Component user={user} {...rest} />
    ) : (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    )
  }
  />
);

export default PrivateRoute2;