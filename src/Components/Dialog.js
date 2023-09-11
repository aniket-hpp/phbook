/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React from "react";

//components
import Wrapper from "./Wrapper.js";
import Button from "./Button.js";

const Dialog = ({Message, button1, button2, Ok, Cancel, Show}) => {
    return (
        <div style={{
            height: "100%",
            width:"100%",
            display: Show?'flex':'none',
            justifyContent: "center",
            alignItems: "center",
            zIndex: "5",
            position: "absolute",
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
            transform: "translate3d(0, 0, 0)",
            borderRadius: "10px"
        }}>
            <Wrapper 
                flexDirection={"column"} 
                width={"300px"} 
                height={"max-content"} 
                border={"1px solid cornflowerblue"}
                backgroundColor={"white"}
                justifyContent={"space-evenly"}
                gap={"25px"}
            >
                <div style={{color: "cornflowerblue"}}>{Message}</div>
                <div style={{width:"80%", display: "flex", justifyContent: (button1 && button2)?"space-between":"center"}}>
                    <div style={{display: button1?'block':"none"}}>
                        <Button enable={true} Text={button1} OnClick={Ok}/>
                    </div>
                    <div style={{
                        display:button2?'block':'none',
                        filter: "hue-rotate(140deg)"
                    }}>
                        <Button enable={true} Text={button2} OnClick={Cancel}/>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default Dialog