import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {        
/*         alert(Auth.isAuthenticated());
        console.log(props);
        alert(props.location.pathname) */
        if (Auth.isAuthenticated()) {          
            return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
             /* pathname: "/RedirectToLogin",  */
                pathname:'/login', 
                redirectAfterLogin: {
                  comingFrom: props.location.pathname
                }
              }}
            />
          );
        }
      }}
    />
  );
};