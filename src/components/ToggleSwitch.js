
import React from "react";
  
const ToggleSwitch = ( props ) => {
  return (
    <div className="container toggleCon">
      {props.label}{" "}
      <div className="toggle-switch">
        <input onClick={props.onClick} type="checkbox" checked={props.checked} className="checkbox" 
               name={props.label} id={props.label} />
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;