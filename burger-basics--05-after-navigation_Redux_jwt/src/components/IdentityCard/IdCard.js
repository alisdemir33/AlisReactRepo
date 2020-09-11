import React from "react";

import IdCardOld from "../../assets/images/identity_old.png";
import IdCardNew from "../../assets/images/identity_new.png";
import classes from "./IdCard.css";

const CardImage = (props) => {
 
  let cardName;  
  if (props.cardType === true)
   cardName = IdCardNew;
  else cardName = IdCardOld;
  
  return (
    <div className={classes.Card} style={{ height: props.height, align:"center" }}>
      <img src={cardName} alt="MyBurger" />
    </div>
  );
};

export default CardImage;
