import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import '../css/signup.css'
import Navbar from "../Components/Navbar.js";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Icon from "../Components/Icon.js";
import back from "../icon/back.png"
import CheckEmail from "../Data/CheckEmail.js";
import Dialog from "../Components/Dialog.js";

const Reset = () => {
    const [email, setEmail] = useState('')
    const [resetButton, setReset] = useState(false)

    const [msg, setMsg] =useState()
    const [dialog, showDialog] = useState(false)
    const navigate = useNavigate()

    const enableButton = () => {
        if(email !== ''){
            setReset(true)
            return
        }

        setReset(false)
    }

    const Email = (result) => {
        setEmail(result)
        enableButton()
    }

    const resetClicked = async () => {

    if(email !== ''){
        if(!CheckEmail(email)){
            setMsg("Invalid Email!")
            showDialog(true)
            return
        }

        try{
            await sendPasswordResetEmail(auth, email)
            setMsg('Reset email send')
            showDialog(true)
        }catch(error){
            setMsg(`${error}`)
            showDialog(true)
        }
    } else {
        setMsg('Please fillup Email and Password')
        showDialog(true)
    }
    }

    const backButton = () => {
        navigate(-1)
    }

    useEffect(() => {
        enableButton()
    }, [email])

    return (
        <>
            <Navbar/>
            <Dialog Message={msg} Show={dialog} button1={'OK'} Ok={() => showDialog(false)}/>
            <div className="signup-container">
                <div className="signup-items">
                    <div className="top-row">
                        <Icon display={true} icon={back} name={"Back"} OnClick={backButton}/>
                        <p>Reset</p>
                            <div style={{width: '30px'}} >
                        </div>
                    </div>

                    <Input Type={"email"} Placeholder={"Email"} getValue={Email}/>

                    <div className="button-container">
                        <Button Text={"Reset"} enable={resetButton} OnClick={resetClicked}/>
                    </div>

                    <div className="hint">
                        <p>Forgot Something?</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset