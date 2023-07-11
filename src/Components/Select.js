import React, { useState } from "react";
import Button from "./Button";
import '../Components/ComponentCss/select.css'

const Select = ({ItemList, selected, setSelected}) => {
    const [display, setDisplay] = useState('none') 

    return (
        <div className="select-container">
            <Button OnClick={() => {(display === 'none')?setDisplay('flex'):setDisplay('none')}} enable={true} Text={ItemList[selected].name}/>
            <div style={{display: display}}>
                    {
                        ItemList.map((Item, Index) => {
                            if(Index !== selected){
                                return (
                                    <Button enable={true} Text={Item.name} key={Index} OnClick={() => {setDisplay('none'); setSelected(Index)}}/>
                                )
                            }else{
                                return (
                                    <div key={Index}></div>
                                )
                            }
                    })}          
            </div>
        </div>
    )
}

export default Select