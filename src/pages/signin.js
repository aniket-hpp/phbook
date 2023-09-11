/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

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

const SignIn = () => {
    //useState variables
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signinButton, setSignin] = useState(false)

    const [dialog, setDialog] = useState(false)
    const [msg, setMsg] = useState()
    const navigate = useNavigate()

    //funtion to enable Reset button
    const enableButton = () => {
        if(email !== '' && password !== ''){
            setSignin(true)
            return
        }

        setSignin(false)
    }

    //function to setEmail
    const Email = (result) => {
        setEmail(result)
        enableButton()
    }

    //function to setPassword
    const Password = (result) => {
        setPassword(result)
        enableButton()
    }

    //function to handle SignIn button
    const signinClicked = async () => {
        if(email !== '' && password !== ''){
            if(!CheckEmail(email)){
                setMsg("Invalid Email!")
                setDialog(true)
                return
            }

            if(password.length <= 7){
                setMsg("Password is too short!")
                setDialog(true)
                return
            }

            try{
                await signInWithEmailAndPassword(auth, email, password)
                navigate('/user')
                console.log('User signed in sucessfully')
            }catch(error){
                setMsg(`${error}`)
                setDialog(true)
            }
        } else {
            setMsg('Please fillup Email and Password')
            setDialog(true)
        }
    }

    //function to handle Reset Buttom
    const resetCLicked = () => {
        navigate('/reset')
    }

    //funtion to handle
    const backButton = () => {
        navigate(-1)
    }

    useEffect(() => {
        enableButton()
    }, [email, password])

    return (
        <>
            <Navbar/>
            <Dialog Message={msg} button1={'OK'} Ok={() => setDialog(false)} Show={dialog}/>
            <div className="signup-container">
                <div className="signup-items">
                    <div className="top-row">
                        <Icon display={true} icon={back} name={"Back"} OnClick={backButton}/>
                        <p>SignIn</p>
                        <div style={{width: '30px'}}></div>
                    </div>

                    <Input Type={"email"} Placeholder={"Email"} getValue={Email}/>

                    <Input Type={"password"} Placeholder={"Password"} getValue={Password}/>

                    <div className="button-container">
                        <Button Text={"Signin"} enable={signinButton} OnClick={signinClicked}/>
                        <Button Text={"Reset"} enable={true} OnClick={resetCLicked}/>
                    </div>

                    <div className="hint">
                        <p>Already an User?</p>
                        <p>Forgot Something?</p>
                    </div>
                </div>

                <Routes>
                    <Route path="/reset" element={<SignIn/>}/>
                </Routes>
            </div>
        </>
    )
}

export default SignIn