/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries and css
import React from "react";
import './ComponentCss/custominput.css'

const CustomInput = ({placeholder, type, color, backgroundColor, border, borderColor, getValue}) => {
    return (
        <input 
            className="textfield"
            style={{
                color: color,
                backgroundColor: backgroundColor,
                border: border,
                borderColor: borderColor
            }}
            placeholder={placeholder} 
            type={type}
            onChange={(e) => getValue(e.target.value)}
        />
    )
}

export default CustomInput