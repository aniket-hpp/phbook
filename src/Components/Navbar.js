/*
      Created By: Aniket Biswas
      Github: https://github.com/thesmartaniket
      LinkedIn: https://www.linkedin.com/in/thesmartaniket/
*/

//libaries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/firebase.js'

//models
import Client from "../Data/Client.js";
import ClientModel from "../Model/communicationModel.js";

//components
import NavbarButton from "./NavbarButton.js";

//assests
import iconImg from '../icon/icon.png'
import iconGif from '../icon/icon.gif'

//css
import './ComponentCss/Navbar.css'

//objects
const client = Client
var clientModel = ClientModel

const Navbar = ({TypeOfPage}) => {
    //useState variables
    const navigate = useNavigate()
    const [icon, setIcon] = useState(iconImg)

    //function to handle Icon change
    const changeIcon = () => {
        setIcon((icon === iconImg)?iconGif:iconImg)
    }

    //function to handle Signout
    const SignOut = async () => {
        if(auth.currentUser){
            clientModel.type = 'signOut'
            clientModel.uid = auth.currentUser.email

            await auth.signOut()
            console.log(await client(clientModel))
            navigate('/')
            console.log('User signed out successfully!')
        }else{
            console.log('Error Signing out!')
            navigate('/')
        }
    }

    //function to handle Title name click
    const handleTitle = () => {
        auth.onAuthStateChanged((user) => {
            if(user){
                navigate('/user')
            }else{
                navigate('/')
            }
        })
    }

    return (
        <div className="navbar" id="navbar">
            <img 
                onMouseLeave={changeIcon}
                className="icon" 
                src={icon} 
                alt=""
            />
            
            <div className="name" onClick={handleTitle}>PhoneBook</div>

            <div style={{display: (TypeOfPage === 'user')?'block':'none'}}>
                <NavbarButton
                    Color={"#4056A1"} 
                    Name={"Signout"}
                    onClick={SignOut}
                />
            </div>
        </div>
    )
}

export default Navbar