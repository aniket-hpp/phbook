/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries and css
import React from "react";
import './ComponentCss/Input.css'

const Input = ({Placeholder, Type, borderColor, outlineColor, getValue, Value, readOnly}) => {
    //some css modification using js
    let root = document.querySelector(':root')
    if(outlineColor)  {root.style.setProperty('--outlineColor', outlineColor)}

    return (
        <input
            className="Input"
            style={{
                borderColor: borderColor
            }}
            readOnly={readOnly?('readonly'):''}
            value={Value}
            placeholder={Placeholder}
            type={Type}
            onChange={(e) => {getValue(e.target.value)}}
        />
    )
}

export default Input
