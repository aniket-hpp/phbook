import React from "react";
import './ComponentCss/NavbarButton.css'

const NavbarButton = ({Color,Name, onClick}) => {
    return (
        <button 
            style={{
                color: Color
            }}
            className="button"
            onClick={onClick}
        >{Name}</button>
    )
}

export default NavbarButton