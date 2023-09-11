/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries and css
import React from "react";
import './ComponentCss/Icon.css'

const Icon = ({icon, name, OnClick, width, display, backgroundColor, topRightBorderRadius, bottomRightBorderRadius}) => {
    return (
        <div>
            <img style={{
                width:width, 
                display: display?'block':'none',
                backgroundColor: backgroundColor,
                borderTopRightRadius: topRightBorderRadius,
                borderBottomRightRadius: bottomRightBorderRadius}}
                className="Icon" 
                src={icon} 
                alt={name}
                title={name} 
                onClick={OnClick}/>
            <div style={{width: width, display: display?'none':'block'}}></div>
        </div>
    )
}

export default Icon