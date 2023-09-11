/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import CheckEmail from "../Data/CheckEmail.js";

//components
import Navbar from "../Components/Navbar.js";
import Button from "../Components/Button.js";
import Input from "../Components/Input.js";
import SignIn from "./signin.js";
import Icon from "../Components/Icon.js";
import Dialog from '../Components/Dialog.js'

//assets
import resend from "../icon/resend.png"
import back from "../icon/back.png"

//css
import '../css/signup.css'

const SignUp = () => {
    //useState variables
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signupButton, setSignup] = useState(false)
    const [dialog, showDialog] = useState(false)
    const [msg, setMsg] = useState()
    const navigate = useNavigate()

    //funtion to enable Email & SignIn button
    const enableButton = () => {
        if(email !== '' && password !== ''){
            setSignup(true)
            return
        }

        setSignup(false)
    }

    //funtion to setEmail
    const Email = (result) => {
        setEmail(result)
        enableButton()
    }

    //funtction to setPassword
    const Password = (result) => {
        setPassword(result)
        enableButton()
    }

    //funtion to handle SignUp button
    const signupClicked = async () => {
        if(email !== '' && password !== ''){
            if(!CheckEmail(email)){
                setMsg("Invalid Email!")
                showDialog(true)
                return
            }

            if(password.length <= 7){
                setMsg("Password is too short!")
                showDialog(true)
                return
            }

            try{
                await createUserWithEmailAndPassword(auth, email, password)
                setMsg('User created sucessfully')
                showDialog(true)

                try{
                    await sendEmailVerification(auth.currentUser)
                    alert('Verification Email Sent!')
                    navigate('/signin')
                }catch(error){
                    setMsg(`${error}`)
                    showDialog(true)
                }
            }catch(error){
                setMsg(`${error}`)
                showDialog(true)
            }


        } else {
            setMsg('Please fillup Email and Password')
            showDialog(true)
        }
    }

    //funtion to handle SignUp button
    const signinCLicked = () => {
        navigate('/signin')
    }

    //function to handle Back button
    const backButton = () => {
        navigate(-1)
    }

    const resendVerificationEmail = async () => {
        if(auth.currentUser){
            try{
                await sendEmailVerification(auth.currentUser)
                setMsg("Verification Email Sent!")
                showDialog(true)
            }catch(error){
                setMsg(`${error}`)
                showDialog(true)
            }
        } else {
            setMsg("No user found!")
            showDialog(true)
        }
    }

    useEffect(() => {
        enableButton()
    }, [email, password])

    return (
        <>
            <Navbar/>

            <Dialog Show={dialog} Message={msg} Ok={() => showDialog(false)} button1={'OK'}/>
            
            <div className="signup-container">
                <div className="signup-items">
                    <div className="top-row">
                        <Icon icon={back} name={"Back"} display={true} OnClick={backButton}/>
                        <p>Signup</p>
                        <Icon icon={resend} name={"Rsend"} display={true} OnClick={resendVerificationEmail}/>
                    </div>

                    <Input Type={"email"} Placeholder={"Email"} getValue={Email}/>

                    <Input Type={"password"} Placeholder={"Password"} getValue={Password}/>

                    <div className="button-container">
                        <Button Text={"Signup"} enable={signupButton} OnClick={signupClicked}/>
                        <Button Text={"Signin"} enable={true} OnClick={signinCLicked}/>
                    </div>

                    <div className="hint">
                        <p>New User?</p>
                        <p>Already an User?</p>
                    </div>
                </div>

                <Routes>
                    <Route path="/signin" element={<SignIn/>}/>
                </Routes>
            </div>
        </>
    )
}

export default SignUp
