import React from "react";
import Transition from "react-transition-group/Transition";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";

const animationTiming = {
  enter:500,
  exit:1000
}

const modal = (props) => {
  
  return (
    <CSSTransition in={props.show} 
    timeout={animationTiming}
     mountOnEnter 
     unmountOnExit
     onEnter= {()=>{console.log('enter')}}
     onEntering= {()=>{console.log('entering')}}
     onEntered= {()=>{console.log('entered')}}
     onExit= {()=>{console.log('exit')}}
     onExiting= {()=>{console.log('exiting')}}
     onExited= {()=>{console.log('exited')}}
     classNames="fade-slide"
     >

      
          <div className={"Modal"}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
      
    </CSSTransition>
  );
};

export default modal;
