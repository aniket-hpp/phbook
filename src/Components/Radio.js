import React, { useState } from "react";
import Wrapper from "./Wrapper";
import Icon from '../Components/Icon.js'
import Check from '../icon/check.png'
import Whatsapp from '../icon/wp.png'
import UnCheck from '../icon/checkbox.png'

const Radio = ({wp, setWp}) => {
    return (
        <div className="radio-container">
            <Wrapper 
                color={"cornflowerblue"}
                backgroundColor={"white"}
                width={"157px"} 
                height={"27px"} 
                padding={"0px"} 
                borderRadius={"5px"} 
                border={"2px solid cornflowerblue"}
            >
                <Icon icon={Whatsapp} display={true} width={"30px"}  OnClick={() => {}}/>
                <span style={{cursor: "default"}}>:</span>
                <div style={{
                    filter: "invert(57%) sepia(17%) saturate(1714%) hue-rotate(183deg) brightness(97%) contrast(91%)"
                }}>
                    <Icon icon={(wp)?Check:UnCheck} display={true} width={"20px"}  OnClick={setWp}/>
                </div>
                <span onClick={setWp} style={{cursor: "pointer"}}>{(wp)?"Yes":"No"}</span>
            </Wrapper>
        </div>
    )
}

export default Radio