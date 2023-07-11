import React from "react";
import './ComponentCss/contactpannel.css'
import ContactCard from './ContactCard.js'
import UserModel from "../Model/userModel";

const ContactPannel = ({List, setReload}) => {
    let localModel = [UserModel]
    localModel = List

    if(localModel.length === 0)
        return

    return (
        <div className="List-container">
                {
                    localModel.map((element, index) => {
                        return (
                            <ContactCard reload={setReload} data={element} key={index}/>
                        )
                    })
                }
        </div>
    )
}

export default ContactPannel