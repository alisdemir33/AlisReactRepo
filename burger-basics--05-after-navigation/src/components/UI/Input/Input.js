import React from "react";
import classes from './Input.css'

const input = props => {
  let inputElement;
  let inputClasses=[classes.InputElement];

  if(props.invalid && props.shouldValidate){ 
    inputClasses.push(classes.Invalid);  
  }
  //console.log(inputClasses);


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

  let validationError = null;
 
if (props.invalid && props.touched) {
validationError = <p className = {classes.ValidationError}>{props.customMsg + ' must be entered'}</p>;
   // console.log('invalid:'+props)
}

  return (
    <div className={classes.Input}>
      <label className={classes.Label} >{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
