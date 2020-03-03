import React from "react";
import { render } from "react-dom";

const CharComponent = props => {
  const style = {
    display: "inline-block",
    padding: "16px",
    textAlign: "center",
    backgroundColor: "white",
    font: "inherit",
    border: "1px solid blue",
    padding: "8px",
    cursor: "pointer"
  };
  return (
    <div onClick={props.deleteCharHandler} className="style">
      {" "}
      Displayed Char: {props.value}{" "}
    </div>
  );
};
export default CharComponent;
