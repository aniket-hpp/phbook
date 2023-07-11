import React from "react";
import './ComponentCss/Tile.css'

const Tile = ({image, heading, text, backgroundColor, color}) => {
    return(
        <div 
            style={{
                backgroundColor: backgroundColor, 
                color: color,
                height: (image)?'':'100px'
            }}
            className="container"
        >
            <div className="heading">{heading}</div>
            <img className="image" src={image} alt={''}/>
            <div 
                className="description"
                style={{
                    gridColumn: (image)?'2 / 3':'1 / 3'
                }}
            >{text}</div>
        </div>
    )
}

export default Tile