
import React from "react";

const Validation = props => {
   
    let validationMessage = null;
    if(props.stringLength>5)
    validationMessage=<p style={{color: "red"}} > Dunya 5 ten BUYUKTUR</p>
    else
    validationMessage=<p style={{color: "green"}}>Maaalesef Dunya 5 ten kucuktur</p>
    return (
      <div className="Person">
        <p>
         String length {props.stringLength} <br></br>
         soo..{validationMessage}
        </p>       
      </div>
    );
  };
  
  export default Validation;