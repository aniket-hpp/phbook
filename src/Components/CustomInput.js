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