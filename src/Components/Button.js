/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries and css
import React, { useState } from "react";
import './ComponentCss/button.css'

const Button = ({Text, OnClick, enable, isSelected}) => {

    //useState variable
    const [isHovering, setHovering] = useState(false)

    return (
        <button
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="Button"
            onClick={() => {
                if(enable)
                    OnClick()
            }}
            style={{
                color: (enable)?((isHovering || isSelected)?'white':'cornflowerblue'):'gray',
                borderColor: (enable)?((isHovering || isSelected)?'':'cornflowerblue'):'gray',
                cursor: (enable)?'pointer':'default',
                backgroundColor: (enable)?((isHovering || isSelected)?'cornflowerblue':'white'):'white'
            }}
        >{Text}</button>
    )
}

export default Button