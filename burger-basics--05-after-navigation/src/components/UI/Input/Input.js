import React from "react";
import classes from './Input.css'

const input = props => {
  let inputElement;

  switch (props.elementType) {
    case "input":
      inputElement = <input 
      className={classes.InputElement} 
      {...props.elementConfig}
        value={props.value} ></input>;

      break;
    case "textarea":
      inputElement = <textarea 
      className={classes.InputElement}
       {...props.elementConfig}
       value={props.value}></textarea>;
      break;

    default:
      inputElement = <input 
      className={classes.InputElement} 
      {...props.elementConfig} 
      value={props.value}></input>;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} >{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
