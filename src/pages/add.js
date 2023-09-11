/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import Stylesheet from "reactjs-stylesheet";
import { vcfPraser } from "../vcf/vcf.js";
import { useNavigate } from "react-router-dom";

//data models and its functions
import Category from "../Data/Category.js";
import CheckEmail from "../Data/CheckEmail.js";
import Client from "../Data/Client.js";
import ClientModel from "../Model/communicationModel.js";

//components
import Navbar from "../Components/Navbar.js";
import Wrapper from "../Components/Wrapper.js";
import Select from "../Components/Select.js";
import Input from "../Components/Input.js";
import Radio from "../Components/Radio.js";
import Button from "../Components/Button.js";
import Icon from "../Components/Icon.js";
import Loading from '../Components/Loading.js'
import Dialog from '../Components/Dialog.js'

//assets
import Import from '../icon/import.png'
import Back from '../icon/back.png'

//css
import '../css/add.css'

const AddNewContact = ({tittle, TypeOfPage}) => {

    // Hooks
    const [name, setName] = useState('')
    const [num, setNum] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState(0)
    const [isWp, setWp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [msg, setMsg] = useState('')
    const [userEmail, setUserEmail] = useState('')

    // Use to navigate() between pages
    const navigate = useNavigate()
    
    // Function to handle to Save button
    const handlesave = async () => {
        if(name === '' || num === ''){
            alert('All fields are required!')
        } else {
            if(TypeOfPage !== 'myprofile'){
                if(email !== '' && !CheckEmail(email)){
                    setMsg('Invalid Email!')
                    setDialog(true)
                    return
                }
            }

            if(auth.currentUser){
                setLoading(true)
                let Model = ClientModel

                Model.uid = auth.currentUser.email
                Model.type = 'getData'

                if((await Client(Model)).length >= 51){
                    setMsg('You have reached the limit of maximum Contacts to store. Please upgrade your plan.')
                    setDialog(true)
                    setLoading(false)
                    return
                }

                if(TypeOfPage === 'myprofile'){
                    Model.data.email = (auth.currentUser)?(auth.currentUser.email):(email)
                    Model.data.isProfile = true
                } else {
                    Model.data.email = email
                    Model.data.isProfile = false
                }

                Model.data.name = name
                Model.data.num = parseInt(num)
                Model.data.plan = 0
                Model.data.cat = Category[category].cat
                Model.data.isWp = isWp
                Model.data._id = undefined

                Model.uid = auth.currentUser.email
                Model.type = 'saveData'

                let result = await Client(Model)
                setLoading(false)
                if(result === 'success'){
                    setMsg(((TypeOfPage === 'myprofile')?'Details Updated':'Contact Added!'))
                    setDialog(true)
                }else{
                    setMsg(`Same ${result}`)
                    setDialog(true)
                }
            }else{
                return
            }
        }
    }

    //Function to handel selectedFile
    const selectFile = async (e) => {

        e.preventDefault()

        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = (e.target.result)
            await vcfPraser(text)
            .then(e => {
                setName(e.fn)
                let num = e.tel[0].value
                setNum(num.replace('-', '').replace(' ', ''))
            })
            .catch(e => alert(e))
        };
        
        reader.readAsText(e.target.files[0])
    }

    useEffect(() => {
        const isUser = async () => {
            auth.onAuthStateChanged((user) => {
                if(!user){
                    navigate('/')
                    return
                }else{
                    setUserEmail(user.email)
                }
            })
        }

        isUser()
    }, [navigate])

    //style 
    const AddStyle = Stylesheet.create({
        topbar: {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        hint:{
            width: "100%",
            display:"flex",
            flexDirection: "row",
            justifyContent: (TypeOfPage === 'myprofile')?'center':'space-between',
            marginTop: "20px",
            marginBottom: "-5px",
            color: "gray"
        },
        additionalOption:{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: (TypeOfPage === 'myprofile')?'center':'space-between',
        }
    })

    return (
        <div>
            <div style={{display: (TypeOfPage === 'myprofile')?'none':''}}>
                <Navbar TypeOfPage={'user'}/>
                <Dialog 
                    button1={'OK'} 
                    Show={dialog} 
                    Message={msg}
                    Ok={() => {
                        setDialog(false); 
                        if(!msg.includes('Same') && !msg.includes('Email')){(
                            navigate('/user')
                        )
                    }}}
                />
            </div>
            
            <Loading loading={loading}/>
            <div className="add-container">
                <Wrapper flexDirection={"column"} padding={"20px"}>
                    <div style={AddStyle.topbar}>
                        <Icon icon={Back} name={'Back'} display={true} OnClick={() => navigate(-1)}/>
                        <p style={{margin: "auto", padding: "20px"}}>{(tittle)?tittle:'Add New Contact'}</p>
                        <div className="import">
                            <label htmlFor="file-in">
                                <Icon icon={Import} name={'Import'} display={true}/>
                            </label>
                            <input id="file-in" type="file" accept=".vcf" onChange={e => selectFile(e)}/>
                        </div>
                    </div>

                    <Input Placeholder={"Name"} Type={"text"} Value={name} getValue={setName}/>
                    <Input Placeholder={"Mobile Number"} Type={"text"} Value={num} getValue={setNum}/>
                    <Input 
                        Placeholder={"Email (Optional)"} 
                        Type={"email"} 
                        readOnly={(TypeOfPage==='myprofile')?(true):(false)} 
                        Value={(TypeOfPage==='myprofile')?(userEmail):(email)} 
                        getValue={setEmail}/>

                    <div style={AddStyle.hint}>
                        <p style={{margin: "0", fontSize: "x-small", display: (TypeOfPage === 'myprofile')?'none':'block'}}>Category:</p>
                        <p style={{margin: "0", fontSize: "x-small"}}>Does this user have Whatsapp?</p>
                    </div>

                    <div style={AddStyle.additionalOption}>
                        <div style={{display: (TypeOfPage === 'myprofile')?'none':'block'}}>
                            <Select ItemList={Category} selected={category} setSelected={setCategory}/>
                        </div>
                        <Radio wp={isWp} setWp={() => setWp(!isWp)}/>
                    </div>

                    <Button Text={(TypeOfPage === 'myprofile')?'Submit':'Save'} enable={true} OnClick={handlesave}/>
                </Wrapper>
            </div>
        </div>
    )
}

export default AddNewContact