import React from "react";
import Style from "./Button.module.css"
const Button = ({btnName,handleClick,classStyles}) => {
  return(
    <button className={Style.button} type="button" onClick={handleClick} name={btnName}>
      <span>{btnName}</span> 
    </button>
  );
  }
export default Button;
