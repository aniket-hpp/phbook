/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React from "react";

//components
import ContactCard from './ContactCard.js'

//models
import UserModel from "../Model/userModel.js";

//css
import './ComponentCss/contactpannel.css'

const ContactPannel = ({List, setReload}) => {
    
    //list
    let localModel = [UserModel]
    localModel = List
    
    //if no data exists then returns
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