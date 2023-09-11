/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useState } from "react";
import {auth} from '../firebase/firebase.js'

//data models and its functions
import ClientModel from '../Model/communicationModel.js'
import CheckEmail from "../Data/CheckEmail.js"
import Category from "../Data/Category.js";
import UserModel from "../Model/userModel.js";
import CategoryIcon from "../Data/categoryIcon.js";
import Client from '../Data/Client.js'

//components
import Icon from './Icon.js'
import Button from "./Button.js";
import Input from "./Input.js";
import Select  from "../Components/Select.js"
import Radio from "../Components/Radio.js"

//assests
import mobile from '../icon/call.png'
import emailIcon  from '../icon/email.png'
import Edit from '../icon/edit.png'
import whatsapp from '../icon/wp.png'
import cross from '../icon/exit.png'
import remove from '../icon/delete.png'

//css
import './ComponentCss/contactcard.css'

const ContactCard = ({data, reload}) => {
    //variables and useState variables
    let localModel = UserModel

    const [display, setDisplay] = useState(false)
    const [edit, showEdit] = useState(false)

    const [name, setName] = useState('')
    const [num, setNum] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState(0)
    const [isWp, setWp] = useState(true)

    //assing data if present else returns an empty component
    if(data)
    {
        localModel = data
        if(localModel.cat !== 'fa' && localModel.cat !== 'fr' && localModel.cat !== 'of'&& localModel.cat !== 'ot'){
                localModel.cat = 'ot'
        }
    }else{
        return
    }

    //function to handle deletion of a contact-card
    const handleDelete = async () => {
        let Model = ClientModel
        if(auth.currentUser){
            if(window.confirm(`Delete this Contact of ${localModel.name}?`)){
                Model.data = data
                Model.uid = auth.currentUser.email
                Model.type = 'deleteData'
    
                let result = await Client(Model)
    
                if(result === 'removed'){
                    alert('Contact removed!')
                    reload(true)
                } else {
                    alert('Error!')
                }
            }
        }
    }

    //function to handle edit of a contact-card
    const handleEdit = () => {
        setName(localModel.name)
        setNum(localModel.num)
        setEmail(localModel.email)
        setWp(localModel.isWp)
        showEdit(!edit)
        setCategory(Category.findIndex((item) => {
            if(item.cat === localModel.cat)
                return true

            return false
        }))
        setDisplay(false)
    }

    const Save = async () => {

        if((email !== localModel.email 
            || num !== localModel.num
            || name !== localModel.name
            || isWp !== localModel.isWp
            || localModel.cat !== Category[category].cat)
            && (
                name !== ''
                || num !== ''                
            )
        ){
            if(window.confirm('Save this edited data?')){
                if(!CheckEmail(email) && email !== ''){
                    alert('Invalid Email!')
                    return
                }
    
                let Model = ClientModel

                if(auth.currentUser){
                    localModel.name = name
                    localModel.num = num
                    localModel.cat = Category[category].cat
                    localModel.isWp = isWp
                    localModel.email = email

                    Model.data = localModel
                    Model.uid = auth.currentUser.email
                    Model.type = "updateData"
                    
                    let result = await Client(Model)
                    if(result === 'success'){
                        alert('Contact Updated!')
                        reload(true)
                        showEdit(false)
                        setDisplay(true)
                    }else{
                        showEdit(false)
                        setDisplay(true)
                        alert('Unknown Error')
                        reload(true)
                    }
                }else{
                    showEdit(false)
                    setDisplay(true)
                }
            }
        }else{
            if(name === '' || num === ''){
                alert('Name or Number cannot be null')
            }else{
                alert('No changes were made')
                showEdit(false)
                setDisplay(true)
            }
        }
    }

    return (
        <div className="contactcardcontainer">
            {/* NAME BLOCK */}
            <h2 style={{
                margin: '0 auto auto auto'
            }}
                className="contact-name"
                onClick={() => {showEdit(false); setDisplay(!display)}}
            >
                {localModel.name + ((localModel.isProfile)?' (You)':'')}
            </h2>

            {/* MORE DATA CONTAINER [VIEW] */}
            <div 
                id="mdc"
                className="more-details-container"
                style={{
                    display: (display)?'flex':'none'
                }}
            >
                {/* CONTACT CARD TOOLBAR */}
                <div className="contact-row-container" id="extras">
                    <Icon 
                        display={display} 
                        width={'20px'} 
                        icon={remove} 
                        name={'Delete'} 
                        OnClick={handleDelete}
                    />

                    <div style={{display: "flex", gap:"10px"}}>
                        <Icon 
                            display={display} 
                            width={'20px'} 
                            icon={Edit} 
                            name={'Edit'} 
                            OnClick={handleEdit}
                        />

                        <Icon 
                            display={display} 
                            width={'20px'} 
                            icon={cross} 
                            name={'X'} 
                            OnClick={() => setDisplay(!display)}
                        />
                    </div>
                </div>

                {/* ROW: 1 */}
                <div className="contact-row-container">
                    <Icon display={true} icon={mobile}/>
                    <a href={`tel:${localModel.num}`}>{localModel.num}</a>
                </div>

                {/* ROW: 2 */}
                <div style={{display: (localModel.email)?'flex':'none'}} className="contact-row-container">
                    <Icon display={true} icon={emailIcon}/>
                    <a href={`mailto:${localModel.email}`}>{localModel.email}</a>
                </div>
                
                {/* ROW: 3 */}
                <div style={{display: (localModel.isProfile)?'none':''}} className="contact-row-container">
                    <Icon display={true} icon={CategoryIcon[localModel.cat][0]}/>
                    <span>{CategoryIcon[localModel.cat][1]}</span>
                </div>

                {/* ROW: 4 */}
                <div className="contact-row-container"
                    style={{display: localModel.isWp?'':'none'}}
                >
                    <Icon display={true} icon={whatsapp}/>
                    <a 
                        href={`https://api.whatsapp.com/send?phone=${localModel.num}`} 
                        target="_blank"
                        rel="noreferrer"
                        >
                            Whatsapp
                    </a>
                </div>

            </div>
            
            {/* MORE DATA CONTAINER [EDIT] */}
            <div 
                id="mdc"
                className="more-details-container"
                style={{
                    width: "90%",
                    display: (edit)?'flex':'none',
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "0",
                }}>
                
                {/* INPUT: 1 */}
                <Input 
                    Value={name} 
                    Type={'text'} 
                    Placeholder={"New Name"} 
                    getValue={setName}
                />

                {/* INPUT: 2 */}
                <Input 
                    Value={num} 
                    Type={'text'} 
                    Placeholder={"New Number"} 
                    getValue={setNum}
                />

                {/* INPUT: 3 */}
                <Input 
                    Value={email} 
                    Type={'email'} 
                    Placeholder={"New Email (Optional)"} 
                    getValue={setEmail}
                />

                {/* SELECTOR: 1 */}
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly"
                }}>
                    <div style={{display: localModel.isProfile?'none':'block'}}>
                        <Select ItemList={Category} selected={category} setSelected={setCategory}/>
                    </div>
                    <Radio wp={isWp} setWp={() => setWp(!isWp)}/>
                </div>

                {/* SAVE or CANCEL BLOCK */}
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    zIndex: "0"
                }}>
                    <Button 
                        enable={true} 
                        Text={"Save"} 
                        OnClick={Save}
                    />

                    <Button 
                        enable={true} 
                        Text={"Cancel"} 
                        OnClick={() => {showEdit(false); setDisplay(true)}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContactCard