import React from "react";

const Wrapper = ({backgroundColor, children, width, height, flexDirection, margin, justifyContent, alignItems, padding, gap, borderRadius, border, color, opacity, display}) => {
    return (
        <div style={{
            width: (width)?width:"fit-content",
            height: (height)?height:"fit-content",
            borderRadius: (borderRadius)?borderRadius:"10px",
            padding: (padding)?padding:"10px",
            backgroundColor: (backgroundColor)?backgroundColor:`rgba(128, 128, 128, ${opacity?opacity:0.11})`,
            display:display?display:"flex",
            flexDirection: flexDirection,
            margin: margin,
            alignItems: (alignItems)?alignItems:"center",
            justifyContent: (justifyContent)?justifyContent:"center",
            gap: (gap)?gap:"10px",
            border: border,
            color: (color)?color:''
        }}>
            {children}
        </div>
    )
}

export default Wrapper