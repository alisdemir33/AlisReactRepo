import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  console.log("isAuth:" + props.isAuthenticated);
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthenticated
        ? [
            <NavigationItem link="/orders">Siparişler</NavigationItem>,
            <NavigationItem exact link="/burgerbuilder">
              Burger Builder
            </NavigationItem>,
            <NavigationItem link="/logout">Çıkış</NavigationItem>,
          ]
        : [
            <NavigationItem link="/auth">Giriş Yap</NavigationItem>,
            <NavigationItem link="/signup">Kaydol</NavigationItem>,
          ]}
    </ul>
  );
};

export default navigationItems;
