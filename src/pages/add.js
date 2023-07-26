import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.js";
import Wrapper from "../Components/Wrapper.js";
import Select from "../Components/Select.js";
import Input from "../Components/Input.js";
import Category from "../Data/Category.js";
import Radio from "../Components/Radio.js";
import '../css/add.css'
import Button from "../Components/Button.js";
import CheckEmail from "../Data/CheckEmail.js";
import Client from "../Data/Client.js";
import { auth } from "../firebase/firebase.js";
import ClientModel from "../Model/communicationModel.js";
import { useNavigate } from "react-router-dom";
import Icon from "../Components/Icon.js";
import Back from '../icon/back.png'
import Loading from '../Components/Loading.js'
import Dialog from '../Components/Dialog.js'
import Import from '../icon/import.png'
import { vcfPraser } from "../vcf/vcf.js";

const AddNewContact = ({tittle, TypeOfPage}) => {
    const [name, setName] = useState('')
    const [num, setNum] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState(0)
    const [isWp, setWp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [msg, setMsg] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const navigate = useNavigate()
    
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

                Model.uid = auth.currentUser.uid
                Model.type = 'getData'

                if((await Client(Model)).length >= 51){
                    setMsg('You have reached the limit of maximum Contacts to store. Please upgrade your plan.')
                    setDialog(true)
                    setLoading(false)
                    return
                }

                if(TypeOfPage === 'myprofile'){
                    Model.data.name = name
                    Model.data.num = parseInt(num)
                    Model.data.email = (auth.currentUser)?(auth.currentUser.email):(email)
                    Model.data.plan = 0
                    Model.data.cat = Category[category].cat
                    Model.data.isWp = isWp
                    Model.data._id = undefined

                    Model.data.isProfile = true
                } else {
                    Model.data.name = name
                    Model.data.num = parseInt(num)
                    Model.data.email = email
                    Model.data.cat = Category[category].cat
                    Model.data.plan = 0
                    Model.data.isWp = isWp
                    Model.data._id = undefined

                    Model.data.isProfile = false
                }

                Model.uid = auth.currentUser.uid
                Model.type = 'saveData'

                let result = await Client(Model)
                setLoading(false)
                if(result === 'success'){
                    setMsg(((TypeOfPage === 'myprofile')?'Details Updated':'Contact Added!'))
                    setDialog(true)
                }else{
                    setMsg(`Same ${result.toUpperCase()}`)
                    setDialog(true)
                }
            }else{
                return
            }
        }
    }

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
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
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
                    <div style={{
                        width: "100%",
                        display:"flex",
                        flexDirection: "row",
                        justifyContent: (TypeOfPage === 'myprofile')?'center':'space-between',
                        marginTop: "20px",
                        marginBottom: "-5px",
                        color: "gray"
                    }}>
                        <p style={{margin: "0", fontSize: "x-small", display: (TypeOfPage === 'myprofile')?'none':'block'}}>Category:</p>
                        <p style={{margin: "0", fontSize: "x-small"}}>Does this user have Whatsapp?</p>
                    </div>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: (TypeOfPage === 'myprofile')?'center':'space-between',
                    }}>
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