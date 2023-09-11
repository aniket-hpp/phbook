/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries and css
import React from "react";
import './ComponentCss/NavbarButton.css'

const NavbarButton = ({Color, Name, onClick}) => {
    return (
        <button 
            style={{
                color: Color
            }}
            className="button"
            onClick={onClick}
        >
            {Name}
        </button>
    )
}

export default NavbarButton