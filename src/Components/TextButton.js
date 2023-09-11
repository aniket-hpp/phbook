/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";

const TextButton = ({text, onClick}) => {
    //useState variables
    const [isHovering, setHovering] = useState(false)

    //style
    const TextButtonStyle = Stylesheet.create({
        container:{
            transition: '0.35s',
            display:'flex',
            width: 'fit-content',
            height: '30px',
            transform: isHovering?'scale(1.01)':'none'
        },
        text:{
            textAlign: 'center',
            color: 'cornflowerblue',
            cursor: 'pointer',
            margin: 'auto'
        }
    })

    return (
        <div style={TextButtonStyle.container}>
            <p 
                onMouseEnter={() => setHovering(true)} 
                onMouseLeave={() => setHovering(false)}
                style={TextButtonStyle.text} 
                onClick={onClick}>{text}
            </p>
        </div>
    )
}   

export default TextButton