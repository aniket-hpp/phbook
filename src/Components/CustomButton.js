import React from "react";
import './ComponentCss/custombutton.css'

const CustomButton = ({Text, color, backgroundColor, hoverColor, hoverBackgroundColor, OnClick}) => {

    const root = document.querySelector(":root")
    if(hoverBackgroundColor) {root.style.setProperty('--hoverBgColor', hoverBackgroundColor)}
    if(hoverColor){root.style.setProperty('--hoverColor', hoverColor)}

    return (
        <button
            className="custombutton"
            id="custombutton"
            style={{
                color: color,
                backgroundColor: backgroundColor,
            }}
            onClick={OnClick}
        >
            <span>{Text}</span>
        </button>
    )
}

export default CustomButton