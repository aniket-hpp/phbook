import React from "react";
import './ComponentCss/Input.css'

const Input = ({Placeholder, Type, borderColor, outlineColor, getValue, Value, readOnly}) => {

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
