import React from "react";
import Button from "./Button";

const TabSwitcher = ({heading, tab1, tab2, OnTab1Click, OnTab2Click, tabSelcted}) => {
    return (
        <div style={{
            width: '360px',
            display: "flex",
            flexDirection: 'row',
            backgroundColor: 'rgba(128, 128, 128, 0.11)',
            padding: '10px 15px',
            borderRadius: '10px',
            textAlign: "center",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <p style={{margin: 0}}>{heading}</p>
            <div style={{
                display: "flex",
                gap: "10px"
            }}>
                <Button 
                    Text={tab1} 
                    OnClick={OnTab1Click} 
                    isSelected={tabSelcted === 1}
                    enable={true}
                />
                <Button 
                    Text={tab2} 
                    OnClick={OnTab2Click} 
                    isSelected={tabSelcted === 2}
                    enable={true}
                />
            </div>
    </div>
    )
}

export default TabSwitcher