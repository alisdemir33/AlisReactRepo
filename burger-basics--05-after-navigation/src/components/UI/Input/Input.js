import React from "react";
import classes from './Input.css'

const input = props => {
  let inputElement;

  switch (inputType) {
    case "input":
      inputElement = <input className={classes} {...props}></input>;

      break;
    case "textarea":
      inputElement = <textarea {...props}></textarea>;
      break;

    default:
      inputElement = <input {...props}></input>;
      break;
  }

  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
