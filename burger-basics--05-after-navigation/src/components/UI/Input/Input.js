import React from "react";
import classes from './Input.css'

const input = props => {
  let inputElement;
  let inputClasses=[classes.InputElement];

  if(props.invalid && props.shouldValidate){ 
    inputClasses.push(classes.Invalid);  
  }
  console.log(inputClasses);


  switch (props.elementType) {
    case "input":
      inputElement = <input 
      className={inputClasses.join(' ')} 
      {...props.elementConfig}
        value={props.value} 
        onChange={props.changed}></input>;
      break;

    case "textarea":
      inputElement = <textarea 
      className={inputClasses.join(' ')} 
       {...props.elementConfig}
       value={props.value}
       onChange={props.changed}></textarea>;
      break;

      case "select":
        inputElement = <select 
        className={inputClasses.join(' ')}      
         value={props.value}
         onChange={props.changed}>
        {   props.elementConfig.options.map( option =>(
           <option key ={option.value} value={option.value} >{option.displayValue} </option>
        ))};
         </select>;
        break;

    default:
      inputElement = <input 
      className={inputClasses.join(' ')} 
      {...props.elementConfig} 
      value={props.value}
      onChange={props.changed}></input>;
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
