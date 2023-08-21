import React, { useState } from "react";
import './ComponentCss/contactcard.css'
import UserModel from "../Model/userModel";
import Icon from './Icon.js'
import mobile from '../icon/call.png'
import emailIcon  from '../icon/email.png'
import CategoryIcon from "../Data/categoryIcon";
import whatsapp from '../icon/wp.png'
import cross from '../icon/exit.png'
import remove from '../icon/delete.png'
import Client from '../Data/Client.js'
import ClientModel from '../Model/communicationModel.js'
import Edit from '../icon/edit.png'
import {auth} from '../firebase/firebase.js'
import Input from "./Input";
import Button from "./Button";
import Category from "../Data/Category";
import Select  from "../Components/Select.js"
import Radio from "../Components/Radio.js"
import CheckEmail from "../Data/CheckEmail.js"


const ContactCard = ({data, reload}) => {
    let localModel = UserModel

    const [display, setDisplay] = useState(false)
    const [edit, showEdit] = useState(false)

    const [name, setName] = useState('')
    const [num, setNum] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState(0)
    const [isWp, setWp] = useState(true)

    if(data)
    {
        localModel = data
        if(localModel.cat !== 'fa' && localModel.cat !== 'fr' && localModel.cat !== 'of'&& localModel.cat !== 'ot'){
                localModel.cat = 'ot'
            }
    }
    else {
        return
    }

    const handelDelete = async () => {
        
        let Model = ClientModel
        if(auth.currentUser){
            if(window.confirm(`Delete this Contact of ${localModel.name}?`)){
                Model.data = data
                Model.uid = auth.currentUser.uid
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

    const handelEdit = () => {
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
                    Model.uid = auth.currentUser.uid
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
                <h2 style={{
                    margin: '0 auto auto auto'
                }}
                    className="contact-name"
                    onClick={() => {showEdit(false); setDisplay(!display)}}
                >
                    {localModel.name + ((localModel.isProfile)?' (You)':'')}
                </h2>
            <div 
                id="mdc"
                className="more-details-container"
                style={{
                    display: (display)?'flex':'none'
                }}
            >
                <div className="contact-row-container" id="extras">
                    <Icon 
                        display={display} 
                        width={'20px'} 
                        icon={remove} 
                        name={'Delete'} 
                        OnClick={handelDelete}
                    />
                    <div style={{display: "flex", gap:"10px"}}>
                        <Icon 
                            display={display} 
                            width={'20px'} 
                            icon={Edit} 
                            name={'Edit'} 
                            OnClick={handelEdit}
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

                <div className="contact-row-container">
                    <Icon display={true} icon={mobile}/>
                    <a href={`tel:${localModel.num}`}>{localModel.num}</a>
                </div>

                <div style={{display: (localModel.email)?'flex':'none'}} className="contact-row-container">
                    <Icon display={true} icon={emailIcon}/>
                    <a href={`mailto:${localModel.email}`}>{localModel.email}</a>
                </div>
                
                <div style={{display: (localModel.isProfile)?'none':''}} className="contact-row-container">
                    <Icon display={true} icon={CategoryIcon[localModel.cat][0]}/>
                    <span>{CategoryIcon[localModel.cat][1]}</span>
                </div>

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

                <Input 
                    Value={name} 
                    Type={'text'} 
                    Placeholder={"New Name"} 
                    getValue={setName}
                />
                <Input 
                    Value={num} 
                    Type={'text'} 
                    Placeholder={"New Number"} 
                    getValue={setNum}
                />
                <Input 
                    Value={email} 
                    Type={'email'} 
                    Placeholder={"New Email (Optional)"} 
                    getValue={setEmail}
                />
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