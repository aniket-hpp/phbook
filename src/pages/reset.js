/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";

//data models and its functions
import CheckEmail from "../Data/CheckEmail.js";

//components
import Navbar from "../Components/Navbar.js";
import Button from "../Components/Button.js";
import Input from "../Components/Input.js";
import Icon from "../Components/Icon.js";
import Dialog from "../Components/Dialog.js";

//assests
import back from "../icon/back.png"

//css
import '../css/signup.css'

const Reset = () => {
    //useState variables
    const [email, setEmail] = useState('')
    const [resetButton, setReset] = useState(false)

    const [msg, setMsg] =useState()
    const [dialog, showDialog] = useState(false)
    const navigate = useNavigate()

    //funtion to enable Reset button
    const enableButton = () => {
        if(email !== ''){
            setReset(true)
            return
        }

        setReset(false)
    }

    //function to setEmail
    const Email = (result) => {
        setEmail(result)
        enableButton()
    }

    //function to handle reset button
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

    //fucntion to handle back button
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